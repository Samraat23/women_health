import type { Metadata } from "next";

import ModuleScreen from "@/features/admin/cms/ModuleScreen";
import { cmsCollections } from "@/lib/cms/collections";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Surgery Services | WHealth Admin",
  robots: { index: false, follow: false },
};

export default function AdminSurgeryPage() {
  return (
    <ModuleScreen moduleId="surgery" collection={cmsCollections.surgery} />
  );
}
