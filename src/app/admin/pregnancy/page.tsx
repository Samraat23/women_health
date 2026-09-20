import type { Metadata } from "next";

import ModuleScreen from "@/features/admin/cms/ModuleScreen";
import { cmsCollections } from "@/lib/cms/collections";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pregnancy Guide | WHealth Admin",
  robots: { index: false, follow: false },
};

export default function AdminPregnancyPage() {
  return (
    <ModuleScreen moduleId="pregnancy" collection={cmsCollections.pregnancy} />
  );
}
