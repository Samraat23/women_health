/**
 * Firestore collection holding admin-edited article content.
 *
 * Kept in its own module so client components can import the name without
 * pulling the compiled-in article seed into the browser bundle.
 */
export const articlesCollection =
  process.env.NEXT_PUBLIC_FIREBASE_ARTICLES_COLLECTION || "whealth_articles";
