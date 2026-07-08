"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

import { login } from "@/services/firebase/auth";

type LoginState = {
  message: string;
  type: "error" | "success" | null;
};

const defaultAdminEmail =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL || "drkusumlata@gmail.com";

function getNextPath() {
  if (typeof window === "undefined") {
    return "/admin";
  }

  const nextPath = new URLSearchParams(window.location.search).get("next");

  return nextPath?.startsWith("/admin") ? nextPath : "/admin";
}

function getFirebaseLoginErrorMessage(error: unknown) {
  const code =
    error && typeof error === "object" && "code" in error
      ? String((error as { code?: string }).code)
      : "";

  if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
    return "Invalid Firebase email or password.";
  }

  if (code === "auth/user-not-found") {
    return "No Firebase user exists for this email.";
  }

  if (code === "auth/too-many-requests") {
    return "Too many login attempts. Please wait and try again.";
  }

  if (code === "auth/network-request-failed") {
    return "Firebase is not reachable. Please check your connection.";
  }

  return "Firebase login failed. Please try again.";
}

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState(defaultAdminEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState<LoginState>({
    message: "",
    type: null,
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setState({ message: "", type: null });

    try {
      const credential = await login(email.trim(), password);
      const idToken = await credential.user.getIdToken();

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        setState({
          message: data?.message || "Unable to login. Please try again.",
          type: "error",
        });
        setIsSubmitting(false);
        return;
      }

      setState({
        message: "Login successful. Opening admin panel...",
        type: "success",
      });

      router.push(getNextPath());
      router.refresh();
    } catch (error) {
      setState({
        message: getFirebaseLoginErrorMessage(error),
        type: "error",
      });
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-lg border border-white/40 bg-white/95 p-6 shadow-[0_28px_80px_rgba(15,23,42,0.20)] backdrop-blur md:p-8"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#eef2ff] text-[#4f46e5]">
        <ShieldCheck size={24} />
      </div>

      <div className="mt-6">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#4f46e5]">
          Private Admin
        </p>
        <h1 className="mt-2 text-3xl font-black leading-tight text-slate-950">
          Login to website control panel
        </h1>
        <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">
          Use the Firebase Auth email and password for the administrator account.
        </p>
      </div>

      <div className="mt-7 space-y-4">
        <label className="block">
          <span className="text-sm font-bold text-slate-700">Email</span>
          <span className="mt-2 flex h-12 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 text-slate-600 focus-within:border-[#4f46e5] focus-within:ring-4 focus-within:ring-[#4f46e5]/10">
            <Mail size={18} className="shrink-0 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={defaultAdminEmail}
              autoComplete="email"
              required
              className="h-full min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            />
          </span>
        </label>

        <label className="block">
          <span className="text-sm font-bold text-slate-700">Password</span>
          <span className="mt-2 flex h-12 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 text-slate-600 focus-within:border-[#4f46e5] focus-within:ring-4 focus-within:ring-[#4f46e5]/10">
            <LockKeyhole size={18} className="shrink-0 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              required
              className="h-full min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </span>
        </label>
      </div>

      {state.message && (
        <p
          className={`mt-4 rounded-lg px-4 py-3 text-sm font-bold ${
            state.type === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#4f46e5] px-5 text-sm font-black text-white shadow-[0_14px_28px_rgba(79,70,229,0.28)] transition hover:bg-[#4338ca] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Signing in..." : "Login"}
      </button>
    </form>
  );
}
