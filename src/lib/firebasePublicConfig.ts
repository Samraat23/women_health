/**
 * The Firebase web config, in one place.
 *
 * These values are public by design: they ship in the browser bundle of every
 * Firebase web app and identify the project rather than authorise anything.
 * Access is controlled by the Firestore and Storage rules, not by hiding this.
 *
 * The literals are fallbacks for a checkout with no `.env.local`. They exist
 * because omitting one used to fail silently and confusingly: the server-side
 * read path defaulted its API key to "", decided Firebase was unconfigured, and
 * returned no documents — so the site rendered seed content and every admin
 * screen reported "0 documents in Firestore" while the data sat there
 * perfectly intact.
 *
 * Set the environment variables to point a deployment at a different project.
 */
export const firebasePublicConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyC53T-kF7BlQxlNUCVzYhcrGWo5fWsxiGs",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "drkusumlata-36b7a.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "drkusumlata-36b7a",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "drkusumlata-36b7a.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1043022401253",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:1043022401253:web:983de804a5e74c87da8e0c",
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-MF4BXZK5KZ",
} as const;
