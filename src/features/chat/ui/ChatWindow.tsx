"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  CalendarDays,
  ChevronDown,
  Info,
  LayoutGrid,
  LoaderCircle,
  MoreVertical,
  RotateCcw,
  SendHorizontal,
  Siren,
  Trash2,
  X,
} from "lucide-react";

import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { formatShortDate } from "@/features/chat/core/dates";
import {
  getComposerState,
  getFieldOrder,
  getFieldValue,
  getQuickReplies,
} from "@/features/chat/core/prompts";
import type {
  ChatMessage,
  ChatState,
  QuickReply,
} from "@/features/chat/core/state";
import type { ChatConfig } from "@/features/chat/core/types";
import { getWhatsAppHref } from "@/lib/whatsapp";
import {
  CategoriesCard,
  CategoryCard,
  ContactCard,
  DoctorCard,
  MenuCard,
  TopicCard,
} from "@/features/chat/ui/ChatCards";
import ChatIcon from "@/features/chat/ui/ChatIcon";
import { ReviewCard, SuccessCard } from "@/features/chat/ui/ChatRequestCards";
import { useChatSupport } from "@/features/chat/ui/ChatSupportProvider";
import { brandGradient, gridPattern, headerGradient } from "@/features/chat/ui/styles";

const mobileQuery = "(max-width: 767px)";

function subscribeToMobileQuery(onChange: () => void) {
  const query = window.matchMedia(mobileQuery);

  query.addEventListener("change", onChange);

  return () => query.removeEventListener("change", onChange);
}

function useIsMobile() {
  return useSyncExternalStore(
    subscribeToMobileQuery,
    () => window.matchMedia(mobileQuery).matches,
    () => false
  );
}

/** The current time, refreshed each minute so slot and date chips stay correct. */
function useNow() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60_000);

    return () => window.clearInterval(timer);
  }, []);

  return now;
}

function subscribeToVisualViewport(onChange: () => void) {
  const visual = window.visualViewport;

  visual?.addEventListener("resize", onChange);
  visual?.addEventListener("scroll", onChange);

  return () => {
    visual?.removeEventListener("resize", onChange);
    visual?.removeEventListener("scroll", onChange);
  };
}

// A string snapshot keeps useSyncExternalStore from seeing a "new" object on every read.
function readVisualViewport() {
  const visual = window.visualViewport;

  return visual ? `${visual.height}:${visual.offsetTop}` : "";
}

/** Keeps the full-screen phone layout above the on-screen keyboard. */
function useVisualViewport(enabled: boolean) {
  const snapshot = useSyncExternalStore(subscribeToVisualViewport, readVisualViewport, () => "");

  if (!enabled || !snapshot) return null;

  const [height, top] = snapshot.split(":").map(Number);

  return { height, top };
}

export default function ChatWindow({ onClosed }: { onClosed: () => void }) {
  const { config, configStatus, retryConfig, chat, close } = useChatSupport();
  const isMobile = useIsMobile();
  const viewport = useVisualViewport(isMobile);
  const reducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLElement>(null);

  // Phones get a full-screen chat; stop the page scrolling underneath it.
  useEffect(() => {
    if (!isMobile) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobile]);

  useEffect(() => () => onClosed(), [onClosed]);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && !event.defaultPrevented) {
      event.stopPropagation();
      close();
    }
  };

  return (
    <motion.section
      ref={panelRef}
      id="chat-support-window"
      role="dialog"
      aria-modal={isMobile}
      aria-labelledby="chat-support-title"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      style={viewport ? { height: viewport.height, top: viewport.top } : undefined}
      className="fixed inset-x-0 top-0 z-[130] flex h-[100dvh] origin-bottom-right flex-col overflow-hidden bg-white text-slate-700 outline-none md:inset-x-auto md:bottom-[112px] md:right-8 md:top-auto md:h-[min(700px,calc(100dvh-136px))] md:w-[400px] md:rounded-[28px] md:border md:border-[#e9e6fb] md:shadow-[0_28px_80px_rgba(15,23,42,0.28)]"
    >
      <ChatHeader />

      {config && chat ? (
        <ChatBody config={config} chat={chat} isMobile={isMobile} panelRef={panelRef} />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
          {configStatus === "error" ? (
            <>
              <p className="text-[14px] font-semibold text-[var(--primary-text-color)]">
                I&apos;m having trouble connecting right now.
              </p>
              <p className="text-[13px] text-slate-500">You can still reach the clinic on WhatsApp.</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={retryConfig}
                  className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full border border-[#e2defa] px-4 text-[13px] font-bold text-[var(--primary-text-color)] hover:bg-[#f8f7ff]"
                >
                  <RotateCcw size={15} aria-hidden="true" />
                  Try again
                </button>
                <a
                  href={getWhatsAppHref("Hello, I would like to consult Dr. Kusum Lata Bhardwaj.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#25d366] px-4 text-[13px] font-bold text-white"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </>
          ) : (
            <LoaderCircle size={26} aria-label="Loading chat" className="animate-spin text-[var(--primary-color)]" />
          )}
        </div>
      )}
    </motion.section>
  );
}

function ChatHeader() {
  const { config, chat, close, dispatch } = useChatSupport();
  const [menuOpen, setMenuOpen] = useState(false);
  const assistant = config?.settings.assistant;
  const flow = chat?.flow;
  const fields = flow && config ? getFieldOrder(config, flow.kind) : [];
  const done = chat && flow ? fields.filter((field) => getFieldValue(chat, field) !== undefined).length : 0;

  return (
    <header className={`relative shrink-0 overflow-hidden px-4 pb-3.5 pt-[calc(12px+env(safe-area-inset-top))] text-white md:pt-3.5 ${headerGradient}`}>
      <div className={gridPattern} />
      <div className="relative flex items-center gap-3">
        <div className="relative h-11 w-11 shrink-0">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white/70 bg-white/15">
            <Image
              src={assistant?.avatar ?? "/image/dr-kusum-lata-bhardwaj.jpg"}
              alt=""
              fill
              sizes="44px"
              className="object-cover object-[center_18%]"
            />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#2d2378] bg-emerald-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p id="chat-support-title" className="truncate text-[15px] font-black leading-5">
            {assistant?.doctorName ?? "Dr. Kusum Lata Bhardwaj"}
          </p>
          <p className="truncate text-[12px] leading-4 text-white/70">
            {assistant ? `${assistant.doctorCredentials} · ${assistant.statusText}` : "Patient support"}
          </p>
        </div>

        {chat && (
          <div className="relative">
            <button
              type="button"
              aria-label="Chat options"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <MoreVertical size={18} aria-hidden="true" />
            </button>
            {menuOpen && (
              <>
                <button
                  type="button"
                  aria-hidden="true"
                  tabIndex={-1}
                  className="fixed inset-0 z-10 cursor-default"
                  onClick={() => setMenuOpen(false)}
                />
                <div
                  role="menu"
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      event.preventDefault();
                      setMenuOpen(false);
                    }
                  }}
                  className="absolute right-0 top-11 z-20 w-52 overflow-hidden rounded-2xl border border-[#e9e6fb] bg-white py-1 text-slate-700 shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
                >
                  {[
                    { label: "Start a new chat", icon: RotateCcw, event: { type: "restart" } as const },
                    { label: "Clear my details", icon: Trash2, event: { type: "forget_details" } as const },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      role="menuitem"
                      autoFocus={item.event.type === "restart"}
                      onClick={() => {
                        setMenuOpen(false);
                        dispatch(item.event);
                      }}
                      className="flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-2.5 text-left text-[13px] font-semibold transition hover:bg-[#f8f7ff] focus-visible:bg-[#f8f7ff] focus-visible:outline-none"
                    >
                      <item.icon size={15} aria-hidden="true" className="text-slate-400" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <button
          type="button"
          aria-label="Close chat"
          onClick={close}
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <X size={18} aria-hidden="true" className="md:hidden" />
          <ChevronDown size={20} aria-hidden="true" className="hidden md:block" />
        </button>
      </div>

      {flow && fields.length > 0 && (
        <div className="relative mt-3" aria-hidden="true">
          <div className="flex items-center justify-between text-[11px] font-semibold text-white/75">
            <span>{flow.kind === "appointment" ? "Appointment request" : "Your question"}</span>
            <span>
              {flow.awaiting === "review" ? "Ready to confirm" : `${done} of ${fields.length} details`}
            </span>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-[width] duration-500"
              style={{ width: `${flow.awaiting === "review" ? 100 : (done / fields.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </header>
  );
}

function ChatBody({
  config,
  chat,
  isMobile,
  panelRef,
}: {
  config: ChatConfig;
  chat: ChatState;
  isMobile: boolean;
  panelRef: React.RefObject<HTMLElement | null>;
}) {
  const { revealedCount, isTyping, dispatch, sendText, close, honeypotRef } = useChatSupport();
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const [draft, setDraft] = useState("");
  // Follow the conversation unless the patient scrolls up to reread something.
  const pinnedRef = useRef(true);
  const ignoreScrollUntilRef = useRef(0);
  const [showJump, setShowJump] = useState(false);
  const reducedMotion = useReducedMotion();
  const nowMs = useNow();
  const allRevealed = revealedCount >= chat.messages.length;
  const replies = allRevealed ? getQuickReplies(chat, config, nowMs) : { replies: [] };
  const composer = getComposerState(chat, config, nowMs);
  const visibleMessages = chat.messages.slice(0, revealedCount);
  const canSend = allRevealed && chat.status === "idle" && draft.trim().length > 0;

  // Desktop: put the cursor in the message box. Phones: focus the dialog
  // instead, so the keyboard doesn't cover the conversation straight away.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (isMobile) panelRef.current?.focus({ preventScroll: true });
      else inputRef.current?.focus({ preventScroll: true });
    }, 60);

    return () => window.clearTimeout(timer);
  }, [isMobile, panelRef]);

  const scrollToLatest = useCallback(
    (smooth: boolean) => {
      const log = logRef.current;

      if (!log) return;

      // Our own scrolling shouldn't read as the patient scrolling away.
      ignoreScrollUntilRef.current = Date.now() + 700;
      log.scrollTo({ top: log.scrollHeight, behavior: smooth && !reducedMotion ? "smooth" : "auto" });
    },
    [reducedMotion]
  );

  useLayoutEffect(() => {
    if (pinnedRef.current) scrollToLatest(true);
  }, [revealedCount, isTyping, replies.replies.length, scrollToLatest]);

  // The suggestion tray and the keyboard resize the log; stay on the latest message.
  useEffect(() => {
    const log = logRef.current;

    if (!log) return;

    const observer = new ResizeObserver(() => {
      if (pinnedRef.current) scrollToLatest(false);
    });

    observer.observe(log);

    return () => observer.disconnect();
  }, [scrollToLatest]);

  const onScroll = () => {
    const log = logRef.current;

    if (!log || Date.now() < ignoreScrollUntilRef.current) return;

    const atBottom = log.scrollHeight - log.scrollTop - log.clientHeight < 90;

    pinnedRef.current = atBottom;
    setShowJump(!atBottom);
  };

  const followLatest = () => {
    pinnedRef.current = true;
    setShowJump(false);
  };

  const onNavigate = () => {
    if (isMobile) close();
  };

  const submitDraft = (event?: FormEvent) => {
    event?.preventDefault();

    if (!canSend) return;

    sendText(draft);
    setDraft("");
    followLatest();
  };

  const onReply = (reply: QuickReply) => {
    if (!reply.event || reply.disabled) return;

    dispatch(reply.event);
    followLatest();

    if (!isMobile) window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 0);
  };

  return (
    <>
      <div
        ref={logRef}
        onScroll={onScroll}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        className="relative flex-1 overflow-y-auto overscroll-contain bg-[linear-gradient(180deg,#faf9ff_0%,#ffffff_220px)] px-3.5 pb-3 pt-4"
      >
        <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Today</p>
        <ol className="space-y-2.5">
          {visibleMessages.map((message, index) => (
            <MessageRow
              key={message.id}
              message={message}
              previous={visibleMessages[index - 1]}
              config={config}
              chat={chat}
              onNavigate={onNavigate}
            />
          ))}
          {isTyping && <TypingIndicator />}
        </ol>

        {showJump && (
          <button
            type="button"
            onClick={() => {
              followLatest();
              scrollToLatest(true);
            }}
            className="sticky bottom-1 left-full ml-auto mt-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#e2defa] bg-white text-[var(--primary-color)] shadow-[0_8px_20px_rgba(27,20,99,0.15)]"
            aria-label="Scroll to latest message"
          >
            <ArrowDown size={16} aria-hidden="true" />
          </button>
        )}
      </div>

      {replies.replies.length > 0 && (
        <div
          role="group"
          aria-label={replies.heading ?? "Suggested replies"}
          className="max-h-[38%] shrink-0 overflow-y-auto border-t border-[#f1effb] bg-white px-3 pb-1 pt-2.5"
        >
          {replies.heading && (
            <p className="mb-1.5 px-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-slate-400">{replies.heading}</p>
          )}
          <div className="flex flex-wrap gap-1.5 pb-1.5">
            {replies.replies.map((reply) => (
              <QuickReplyChip key={reply.id} reply={reply} onReply={onReply} />
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={submitDraft}
        className="relative flex shrink-0 items-end gap-2 border-t border-[#f1effb] bg-white px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 md:pb-2.5"
      >
        <button
          type="button"
          aria-label="Main menu"
          title="Main menu"
          disabled={chat.status !== "idle"}
          onClick={() => {
            dispatch({ type: "show_menu" });
            followLatest();
          }}
          className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full text-slate-500 transition hover:bg-[#f4f2ff] hover:text-[var(--primary-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]/40 disabled:opacity-40"
        >
          <LayoutGrid size={19} aria-hidden="true" />
        </button>

        {composer.dateInput ? (
          <DateField
            min={composer.dateInput.min}
            max={composer.dateInput.max}
            onPick={(value) => {
              dispatch({ type: "answer", field: "date", value, label: formatShortDate(value) });
              followLatest();
            }}
            onCancel={() => dispatch({ type: "toggle_date_picker", open: false })}
          />
        ) : (
          <label className="min-w-0 flex-1">
            <span className="sr-only">Message</span>
            {composer.multiline ? (
              <textarea
                ref={inputRef}
                rows={1}
                value={draft}
                maxLength={composer.maxLength}
                placeholder={composer.placeholder}
                disabled={composer.disabled}
                enterKeyHint="send"
                onChange={(event) => {
                  setDraft(event.target.value);
                  event.target.style.height = "auto";
                  event.target.style.height = `${Math.min(event.target.scrollHeight, 120)}px`;
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                    event.preventDefault();
                    submitDraft();
                  }
                }}
                className="block max-h-[120px] min-h-11 w-full resize-none rounded-[22px] border border-[#e6e3f7] bg-[#f8f7ff] px-4 py-[10px] text-base leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[var(--primary-color)] focus:bg-white focus:ring-4 focus:ring-[var(--primary-color)]/10 disabled:opacity-60 md:text-[14px]"
              />
            ) : (
              <input
                ref={inputRef}
                type={composer.inputMode === "tel" ? "tel" : "text"}
                inputMode={composer.inputMode}
                autoComplete={composer.autoComplete ?? "off"}
                enterKeyHint="send"
                value={draft}
                maxLength={composer.maxLength}
                placeholder={composer.placeholder}
                disabled={composer.disabled}
                onChange={(event) => setDraft(event.target.value)}
                // Don't rely on implicit form submission; some keyboards skip it.
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.nativeEvent.isComposing) {
                    event.preventDefault();
                    submitDraft();
                  }
                }}
                className="block h-11 w-full rounded-[22px] border border-[#e6e3f7] bg-[#f8f7ff] px-4 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[var(--primary-color)] focus:bg-white focus:ring-4 focus:ring-[var(--primary-color)]/10 disabled:opacity-60 md:text-[14px]"
              />
            )}
          </label>
        )}

        {/* Hidden from people; form-filling bots tend to complete it. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          onChange={(event) => {
            honeypotRef.current = event.target.value;
          }}
          className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
        />

        {!composer.dateInput && (
          <button
            type="submit"
            aria-label="Send message"
            disabled={!canSend}
            className={`grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full text-white shadow-[0_8px_20px_rgba(90,79,254,0.3)] transition hover:-translate-y-px focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--primary-color)]/25 disabled:cursor-default disabled:opacity-40 disabled:shadow-none disabled:hover:translate-y-0 ${brandGradient}`}
          >
            <SendHorizontal size={18} aria-hidden="true" />
          </button>
        )}
      </form>
    </>
  );
}

function QuickReplyChip({ reply, onReply }: { reply: QuickReply; onReply: (reply: QuickReply) => void }) {
  const tone = reply.tone ?? "default";
  const toneClass = {
    default:
      "border-[#dcd7fb] bg-white text-[var(--primary-text-color)] hover:border-[var(--primary-color)] hover:bg-[#f7f6ff]",
    primary: `border-transparent text-white shadow-[0_8px_18px_rgba(90,79,254,0.28)] hover:-translate-y-px ${brandGradient}`,
    subtle: "border-dashed border-slate-300 bg-white text-slate-500 hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]",
    whatsapp: "border-[#25d366]/40 bg-[#25d366]/10 text-[#0f7a40] hover:bg-[#25d366]/15",
  }[tone];
  const className = `inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-left text-[13px] font-semibold leading-tight transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--primary-color)]/20 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 ${toneClass}`;
  const content = (
    <>
      <ChatIcon name={reply.icon} size={15} className="h-[15px] w-[15px] shrink-0" />
      <span>{reply.label}</span>
      {reply.hint && <span className="text-[11px] font-medium opacity-70">· {reply.hint}</span>}
    </>
  );

  if (reply.href) {
    const external = reply.href.startsWith("http");

    return (
      <a
        href={reply.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" disabled={reply.disabled} onClick={() => onReply(reply)} className={className}>
      {content}
    </button>
  );
}

function DateField({
  min,
  max,
  onPick,
  onCancel,
}: {
  min: string;
  max: string;
  onPick: (value: string) => void;
  onCancel: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Open the native calendar straight away where the browser allows it.
    try {
      inputRef.current?.showPicker();
    } catch {
      inputRef.current?.focus();
    }
  }, []);

  return (
    <div className="flex min-w-0 flex-1 items-center gap-2">
      <label className="relative flex h-11 min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-[22px] border border-[var(--primary-color)] bg-white px-4 ring-4 ring-[var(--primary-color)]/10">
        <CalendarDays size={17} aria-hidden="true" className="shrink-0 text-[var(--primary-color)]" />
        <span className="truncate text-[14px] font-semibold text-slate-500">Choose a date</span>
        <input
          ref={inputRef}
          type="date"
          min={min}
          max={max}
          aria-label="Preferred date"
          onChange={(event) => event.target.value && onPick(event.target.value)}
          onClick={(event) => {
            try {
              event.currentTarget.showPicker();
            } catch {
              // Browsers without showPicker open their own picker.
            }
          }}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 [color-scheme:light]"
        />
      </label>
      <button
        type="button"
        onClick={onCancel}
        className="h-11 shrink-0 cursor-pointer rounded-full px-3 text-[12.5px] font-bold text-slate-500 transition hover:bg-[#f4f2ff] hover:text-[var(--primary-color)]"
      >
        Back
      </button>
    </div>
  );
}

function TypingIndicator() {
  return (
    <li className="flex items-end gap-2" aria-label="Typing">
      <BotAvatar />
      <div className="flex h-9 items-center gap-1 rounded-[18px] rounded-bl-md bg-[#f1eeff] px-3.5">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--primary-color)]/60"
            style={{ animationDelay: `${delay}ms`, animationDuration: "1s" }}
          />
        ))}
      </div>
    </li>
  );
}

function BotAvatar({ hidden = false }: { hidden?: boolean }) {
  const { config } = useChatSupport();

  return (
    <span aria-hidden="true" className={`relative h-7 w-7 shrink-0 overflow-hidden rounded-full bg-[#f0edff] ${hidden ? "invisible" : ""}`}>
      <Image
        src={config?.settings.assistant.avatar ?? "/image/dr-kusum-lata-bhardwaj.jpg"}
        alt=""
        fill
        sizes="28px"
        className="object-cover object-[center_18%]"
      />
    </span>
  );
}

function MessageRow({
  message,
  previous,
  config,
  chat,
  onNavigate,
}: {
  message: ChatMessage;
  previous?: ChatMessage;
  config: ChatConfig;
  chat: ChatState;
  onNavigate: () => void;
}) {
  const { dispatch } = useChatSupport();
  const reducedMotion = useReducedMotion();
  const animation = reducedMotion
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.22 } };

  if (message.role === "user") {
    return (
      <motion.li {...animation} className="flex justify-end pl-10">
        <p className={`max-w-full whitespace-pre-line break-words rounded-[18px] rounded-br-md px-3.5 py-2 text-[14px] leading-relaxed text-white shadow-[0_6px_16px_rgba(90,79,254,0.22)] ${brandGradient}`}>
          <span className="sr-only">You: </span>
          {message.text}
        </p>
      </motion.li>
    );
  }

  const continuesGroup = previous?.role === "bot";
  const busy = chat.status !== "idle";
  let body: React.ReactNode = null;

  switch (message.type) {
    case "text": {
      const toneClass = {
        default: "bg-[#f1eeff] text-slate-700",
        note: "border border-[#e9e6fb] bg-white text-slate-600",
        warning: "border border-amber-200 bg-amber-50 text-amber-900",
        danger: "border border-rose-200 bg-rose-50 font-semibold text-rose-900",
      }[message.tone ?? "default"];

      body = (
        <p className={`flex gap-2 whitespace-pre-line break-words rounded-[18px] rounded-bl-md px-3.5 py-2 text-[14px] leading-relaxed ${toneClass}`}>
          {message.tone === "danger" && <Siren size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-rose-600" />}
          {message.tone === "note" && <Info size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--primary-color)]" />}
          <span>{message.text}</span>
        </p>
      );
      break;
    }
    case "menu":
      body = <MenuCard config={config} dispatch={dispatch} disabled={busy} />;
      break;
    case "topic":
      body = (
        <TopicCard config={config} topicId={message.topicId} compact={message.compact} dispatch={dispatch} onNavigate={onNavigate} />
      );
      break;
    case "categories":
      body = <CategoriesCard config={config} dispatch={dispatch} />;
      break;
    case "category":
      body = <CategoryCard config={config} categoryId={message.categoryId} dispatch={dispatch} onNavigate={onNavigate} />;
      break;
    case "review": {
      const active = chat.flow?.reviewId === message.id && chat.flow.awaiting === "review";

      body = (
        <ReviewCard
          config={config}
          submission={message.submission}
          active={active}
          submitting={active && chat.status === "submitting"}
          dispatch={dispatch}
        />
      );
      break;
    }
    case "success":
      body = <SuccessCard config={config} submission={message.submission} result={message.result} />;
      break;
    case "contact":
      body = <ContactCard config={config} variant={message.variant} />;
      break;
    case "doctor":
      body = <DoctorCard config={config} onNavigate={onNavigate} />;
      break;
  }

  const isCard = message.type !== "text";

  return (
    <motion.li {...animation} className={`flex items-end gap-2 ${isCard ? "pr-0" : "pr-8"}`}>
      <BotAvatar hidden={continuesGroup} />
      <div className={`min-w-0 ${isCard ? "flex-1" : ""}`}>{body}</div>
    </motion.li>
  );
}
