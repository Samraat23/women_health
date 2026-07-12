import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { app, auth, firebaseConfig } from "@/services/firebase/firebase";

export const adminFirebaseApp = app;
export const adminAuth = auth;
export const adminDb = getFirestore(adminFirebaseApp);
export const adminStorage = getStorage(adminFirebaseApp);
export const adminFirebaseConfig = firebaseConfig;

