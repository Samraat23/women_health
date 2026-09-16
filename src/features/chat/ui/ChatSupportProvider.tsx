"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";

import { findTopicByPath } from "@/features/chat/core/catalog";
import {
  createInitialState,
  getPendingSubmission,
  reduceChat,
  restoreState,
} from "@/features/chat/core/engine";
import type { ChatEvent, ChatMessage, ChatState } from "@/features/chat/core/state";
import type {
  ChatConfig,
  NluResult,
  SubmitResponse,
} from "@/features/chat/core/types";

const storageKey = "kgc-chat-support:v1";

type ConfigStatus = "idle" | "loading" | "ready" | "error";

type ChatSupportContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  config: ChatConfig | null;
  configStatus: ConfigStatus;
  retryConfig: () => void;
  chat: ChatState | null;
  /** Messages shown so far; the rest are still "being typed". */
  revealedCount: number;
  isTyping: boolean;
  unreadCount: number;
  hasOpened: boolean;
  dispatch: (event: ChatEvent) => void;
  sendText: (text: string) => void;
  /** Hidden honeypot value, filled only by form-filling bots. */
  honeypotRef: RefObject<string>;
};

const ChatSupportContext = createContext<ChatSupportContextValue | null>(null);

function revealDelay(message: ChatMessage, reducedMotion: boolean) {
  if (message.role === "user") return 0;
  if (reducedMotion) return 60;
  if (message.type === "text") return Math.min(1200, Math.max(420, 260 + message.text.length * 6));

  return 520;
}

/** This tab's saved conversation, if any. Nothing survives closing the tab. */
function readSavedChat() {
  if (typeof window === "undefined") return null;

  try {
    const saved = window.sessionStorage.getItem(storageKey);

    return saved ? restoreState(JSON.parse(saved)) : null;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); start fresh.
    return null;
  }
}

export function ChatSupportProvider({ children, enabled = true }: { children: ReactNode; enabled?: boolean }) {
  const pathname = usePathname();
  const reducedMotion = Boolean(useReducedMotion());
  // Nothing from the saved chat renders until the launcher appears after a
  // delay, so reading it during the first client render can't mismatch the server HTML.
  const [saved] = useState(readSavedChat);
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(Boolean(saved));
  const [config, setConfig] = useState<ChatConfig | null>(null);
  const [configStatus, setConfigStatus] = useState<ConfigStatus>("idle");
  const [chat, setChat] = useState<ChatState | null>(saved);
  const [revealedCount, setRevealedCount] = useState(saved?.messages.length ?? 0);
  const [seenCount, setSeenCount] = useState(saved?.messages.length ?? 0);
  const configRef = useRef<ChatConfig | null>(null);
  const configStatusRef = useRef<ConfigStatus>("idle");
  const isOpenRef = useRef(false);
  const pathnameRef = useRef(pathname);
  const submittingRef = useRef(false);
  const honeypotRef = useRef("");

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  /** Starts the conversation once the window is open and the config has arrived. */
  const startConversationIfReady = useCallback(() => {
    const currentConfig = configRef.current;

    if (!isOpenRef.current || !currentConfig) return;

    setChat(
      (current) =>
        current ??
        createInitialState(currentConfig, Date.now(), findTopicByPath(currentConfig.catalog, pathnameRef.current))
    );
  }, []);

  useEffect(() => {
    if (!chat) return;

    const timer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(storageKey, JSON.stringify(chat));
      } catch {
        // Not being able to save only means a reload starts a new chat.
      }
    }, 150);

    return () => window.clearTimeout(timer);
  }, [chat]);

  const loadConfig = useCallback(() => {
    if (configStatusRef.current === "loading" || configStatusRef.current === "ready") return;

    const update = (status: ConfigStatus) => {
      configStatusRef.current = status;
      setConfigStatus(status);
    };

    update("loading");
    fetch("/api/chat/config")
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("config"))))
      .then((data: ChatConfig) => {
        configRef.current = data;
        setConfig(data);
        update("ready");
        startConversationIfReady();
      })
      .catch(() => update("error"));
  }, [startConversationIfReady]);

  // Warm the config up once the page has settled, so the first open is instant.
  useEffect(() => {
    if (!enabled) return;

    const timer = window.setTimeout(loadConfig, 2500);

    return () => window.clearTimeout(timer);
  }, [enabled, loadConfig]);

  const dispatch = useCallback((event: ChatEvent) => {
    const currentConfig = configRef.current;

    if (!currentConfig) return;

    setChat((current) => (current ? reduceChat(current, event, currentConfig, Date.now()) : current));

    if (event.type === "restart" || event.type === "forget_details") {
      setRevealedCount(0);
      setSeenCount(0);

      if (event.type === "forget_details") {
        try {
          window.sessionStorage.removeItem(storageKey);
        } catch {
          // Ignore; the next save overwrites it anyway.
        }
      }
    }
  }, []);

  const sendText = useCallback(
    (text: string) => {
      const trimmed = text.trim();

      if (!trimmed || !chat || chat.status !== "idle") return;

      const awaiting = chat.flow?.awaiting ?? null;
      const flow = chat.flow?.kind ?? null;

      dispatch({ type: "user_text", text: trimmed });

      fetch("/api/chat/understand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed, awaiting, flow }),
        signal: AbortSignal.timeout(15_000),
      })
        .then((response) => (response.ok ? (response.json() as Promise<NluResult>) : null))
        .catch(() => null)
        // A missing reading falls back to the engine's local understanding.
        .then((nlu) => dispatch({ type: "understood", text: trimmed, nlu }));
    },
    [chat, dispatch]
  );

  // Send the request once the patient confirms it.
  useEffect(() => {
    if (chat?.status !== "submitting" || submittingRef.current) return;

    const submission = getPendingSubmission(chat);

    if (!submission) {
      dispatch({ type: "submit_failed", message: "" });

      return;
    }

    submittingRef.current = true;

    fetch("/api/chat/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...submission, sourcePath: pathname, website: honeypotRef.current }),
      signal: AbortSignal.timeout(25_000),
    })
      .then(async (response) => {
        const data = (await response.json().catch(() => null)) as SubmitResponse | null;

        if (response.ok && data?.ok) {
          dispatch({ type: "submit_succeeded", result: data });
        } else {
          dispatch({
            type: "submit_failed",
            message: data && !data.ok && !data.fieldErrors ? data.message : "",
            fieldErrors: data && !data.ok ? data.fieldErrors : undefined,
          });
        }
      })
      .catch(() => dispatch({ type: "submit_failed", message: "" }))
      .finally(() => {
        submittingRef.current = false;
      });
  }, [chat, dispatch, pathname]);

  // Reveal bot messages one at a time with a short typing pause.
  const messages = chat?.messages;
  const total = messages?.length ?? 0;
  const nextMessage = messages?.[revealedCount];

  useEffect(() => {
    if (!nextMessage) return;

    // Replies to a closed window arrive instantly and count as unread.
    const delay = isOpen ? revealDelay(nextMessage, reducedMotion) : 0;
    const timer = window.setTimeout(() => setRevealedCount((count) => Math.min(count + 1, total)), delay);

    return () => window.clearTimeout(timer);
  }, [nextMessage, isOpen, reducedMotion, total]);

  // A restart can leave fewer messages than were on screen.
  if (revealedCount > total) setRevealedCount(total);

  const revealedCountRef = useRef(revealedCount);

  useEffect(() => {
    revealedCountRef.current = revealedCount;
  }, [revealedCount]);

  const open = useCallback(() => {
    isOpenRef.current = true;
    setIsOpen(true);
    setHasOpened(true);
    loadConfig();
    startConversationIfReady();
  }, [loadConfig, startConversationIfReady]);

  const close = useCallback(() => {
    isOpenRef.current = false;
    setIsOpen(false);
    // Everything on screen has been seen; replies arriving later count as unread.
    setSeenCount(revealedCountRef.current);
  }, []);
  const toggle = useCallback(() => (isOpen ? close() : open()), [isOpen, open, close]);

  const retryConfig = useCallback(() => {
    configStatusRef.current = "idle";
    loadConfig();
  }, [loadConfig]);

  const unreadCount = hasOpened
    ? (messages ?? []).slice(seenCount).filter((message) => message.role === "bot").length
    : 1;
  const isTyping =
    chat?.status === "understanding" || (Boolean(nextMessage) && nextMessage?.role === "bot");

  const value = useMemo<ChatSupportContextValue>(
    () => ({
      isOpen,
      open,
      close,
      toggle,
      config,
      configStatus,
      retryConfig,
      chat,
      revealedCount,
      isTyping,
      unreadCount: isOpen ? 0 : unreadCount,
      hasOpened,
      dispatch,
      sendText,
      honeypotRef,
    }),
    [isOpen, open, close, toggle, config, configStatus, retryConfig, chat, revealedCount, isTyping, unreadCount, hasOpened, dispatch, sendText]
  );

  return <ChatSupportContext.Provider value={value}>{children}</ChatSupportContext.Provider>;
}

export function useChatSupport() {
  const context = useContext(ChatSupportContext);

  if (!context) throw new Error("useChatSupport must be used inside ChatSupportProvider.");

  return context;
}

/** For components that may render outside the provider (e.g. admin routes). */
export function useOptionalChatSupport() {
  return useContext(ChatSupportContext);
}
