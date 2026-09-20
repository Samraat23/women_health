"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { logout } from "@/services/firebase/auth";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logout().catch(() => null);

    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      title="Log out"
      aria-label="Log out"
      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-input text-muted-foreground transition hover:border-[var(--adm-danger)] hover:text-[var(--adm-danger)]"
    >
      <LogOut size={16} aria-hidden />
    </button>
  );
}
