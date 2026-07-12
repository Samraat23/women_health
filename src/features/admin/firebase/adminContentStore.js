import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { adminContentCollection } from "./adminModules";
import { adminDb } from "./adminFirebase";

export async function readAdminModuleContent(moduleId, fallbackContent = {}) {
  try {
    const snapshot = await getDoc(doc(adminDb, adminContentCollection, moduleId));

    if (!snapshot.exists()) {
      return fallbackContent;
    }

    const data = snapshot.data();
    const content = data[moduleId] || data.content || {};

    return {
      ...fallbackContent,
      ...(typeof content === "object" && content ? content : {}),
    };
  } catch {
    return fallbackContent;
  }
}

export async function saveAdminModuleContent(moduleId, content) {
  await setDoc(
    doc(adminDb, adminContentCollection, moduleId),
    {
      [moduleId]: content,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

