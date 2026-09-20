import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { firebasePublicConfig } from "@/lib/firebasePublicConfig";

/**
 * The browser Firebase app.
 *
 * Configuration lives in `@/lib/firebasePublicConfig` so the client SDK and the
 * server-side REST read path cannot drift apart — they previously carried
 * separate copies, and the server one lacked an API-key fallback.
 */
const firebaseConfig = firebasePublicConfig;

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { firebaseConfig };
