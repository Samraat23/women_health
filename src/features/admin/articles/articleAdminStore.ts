import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { adminDb } from "@/features/admin/firebase/adminFirebase";
import { articlesCollection } from "@/lib/articlesCollection";
import type { ArticleDoc } from "@/types/article";

/**
 * Admin write path. Mirrors the existing module store: the browser talks to
 * Firestore directly using the signed-in admin's credentials.
 *
 * The whole article is stored as one JSON string rather than a nested map.
 * Firestore cannot hold arrays inside arrays, and article sections legitimately
 * nest lists (cards -> items), so a string sidesteps the limitation and keeps
 * reads on the public side a single parse.
 */

export type SaveResult = {
  ok: boolean;
  message: string;
};

function articleRef(slug: string) {
  return doc(adminDb, articlesCollection, slug);
}

export async function readArticleOverride(
  slug: string
): Promise<ArticleDoc | null> {
  try {
    const snapshot = await getDoc(articleRef(slug));

    if (!snapshot.exists()) return null;

    const contentJson = snapshot.data()?.contentJson;

    if (typeof contentJson !== "string") return null;

    return JSON.parse(contentJson) as ArticleDoc;
  } catch {
    return null;
  }
}

export async function saveArticleOverride(
  slug: string,
  content: ArticleDoc
): Promise<SaveResult> {
  try {
    await setDoc(
      articleRef(slug),
      {
        slug,
        title: content.article.title,
        category: content.article.category,
        contentJson: JSON.stringify(content),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    return { ok: true, message: "Saved to Firebase." };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? `Could not save: ${error.message}`
          : "Could not save to Firebase.",
    };
  }
}

/** Removes the override so the article falls back to the repository seed. */
export async function resetArticleOverride(slug: string): Promise<SaveResult> {
  try {
    await deleteDoc(articleRef(slug));

    return { ok: true, message: "Reset to the original article content." };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? `Could not reset: ${error.message}`
          : "Could not reset the article.",
    };
  }
}
