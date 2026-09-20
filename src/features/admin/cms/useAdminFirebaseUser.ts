"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";

import { adminAuth } from "@/features/admin/firebase/adminFirebase";

/**
 * The Firebase user backing the current admin screen.
 *
 * The Next.js session cookie and the Firebase SDK session are two separate
 * things with separate lifetimes. The cookie decides whether the admin pages
 * render; the Firebase session decides whether a Firestore write is allowed.
 * After a reload the SDK restores its session from IndexedDB asynchronously,
 * so `adminAuth.currentUser` is null for the first frames even when the user is
 * signed in.
 *
 * Screens that write must wait for `isResolving` to clear before deciding the
 * user is signed out, otherwise they flash a bogus "session expired" message
 * on every refresh.
 */
export function useAdminFirebaseUser() {
  const [user, setUser] = useState<User | null>(() => adminAuth.currentUser);
  const [isResolving, setIsResolving] = useState(() => !adminAuth.currentUser);

  useEffect(() => {
    return onAuthStateChanged(adminAuth, (nextUser) => {
      setUser(nextUser);
      setIsResolving(false);
    });
  }, []);

  return {
    user,
    email: user?.email?.trim().toLowerCase() || null,
    isResolving,
    isSignedIn: Boolean(user),
  };
}
