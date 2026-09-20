import type { Metadata } from "next";

import ModuleScreen from "@/features/admin/cms/ModuleScreen";
import { cmsCollections } from "@/lib/cms/collections";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Chat Assistant | WHealth Admin",
  robots: { index: false, follow: false },
};

export default function AdminChatPage() {
  return <ModuleScreen moduleId="chat" collection={cmsCollections.chat} />;
}
