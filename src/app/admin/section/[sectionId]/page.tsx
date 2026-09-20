import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SectionEditorPanel from "@/features/admin/cms/SectionEditorPanel";
import { requireAdminSession } from "@/features/admin/firebase/requireAdminSession";
import AdminShell from "@/features/admin/shell/AdminShell";
import { StatCard } from "@/features/admin/ui/primitives";
import { cmsCollections } from "@/lib/cms/collections";
import { sectionHref } from "@/lib/cms/modules";
import { loadSectionContent } from "@/lib/cms/sectionContent";
import { cmsSectionDefinitions, getCmsSection } from "@/lib/cms/sections";

export const dynamic = "force-dynamic";

type SectionPageProps = {
  params: Promise<{ sectionId: string }>;
};

/**
 * One screen per website section — Navbar, Hero, Trainer, Why Choose Us,
 * Footer and the rest. The sidebar is generated from the same registry, so a
 * new section needs no new route.
 */
export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { sectionId } = await params;
  const section = getCmsSection(sectionId);

  return {
    title: `${section?.label || "Section"} | WHealth Admin`,
    robots: { index: false, follow: false },
  };
}

export function generateStaticParams() {
  return cmsSectionDefinitions.map((section) => ({ sectionId: section.id }));
}

export default async function AdminSectionPage({ params }: SectionPageProps) {
  const { sectionId } = await params;
  const definition = getCmsSection(sectionId);

  if (!definition) {
    notFound();
  }

  const admin = await requireAdminSession(sectionHref(sectionId));
  const section = await loadSectionContent(sectionId);

  if (!section) {
    notFound();
  }

  // How many editable entries this section holds, so the stat row means
  // something for a list ("6 menu items") as well as for a plain object.
  const itemCount = Array.isArray(section.content)
    ? section.content.length
    : section.content && typeof section.content === "object"
      ? Object.keys(section.content).length
      : 0;

  return (
    <AdminShell
      activeModule={sectionId}
      title={section.label}
      description={section.description}
      adminEmail={admin.email}
    >
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label={Array.isArray(section.content) ? "Entries" : "Fields"}
            value={itemCount}
            tone="neutral"
          />
          <StatCard
            label="Status"
            value={section.source === "firestore" ? "Live" : "Seed"}
            tone={section.source === "firestore" ? "success" : "warning"}
          />
          <StatCard
            label="Collection"
            value={
              <span className="text-sm font-semibold">
                {cmsCollections.sections}
              </span>
            }
          />
        </div>

        <SectionEditorPanel
          sectionId={section.id}
          collection={cmsCollections.sections}
          label={section.label}
          description={section.description}
          initialContent={section.content}
          source={section.source}
          updatedAt={section.updatedAt}
          updatedBy={section.updatedBy}
        />
      </div>
    </AdminShell>
  );
}
