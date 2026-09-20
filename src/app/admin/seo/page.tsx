import type { Metadata } from "next";

import ModuleScreen from "@/features/admin/cms/ModuleScreen";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SEO | WHealth Admin",
  robots: { index: false, follow: false },
};

export default function AdminSeoPage() {
  return <ModuleScreen moduleId="seo" />;
}
