import { Layers } from "lucide-react";

import SectionEditorPanel from "./SectionEditorPanel";
import { requireAdminSession } from "@/features/admin/firebase/requireAdminSession";
import AdminShell from "@/features/admin/shell/AdminShell";
import { EmptyState, StatCard } from "@/features/admin/ui/primitives";
import { cmsCollections } from "@/lib/cms/collections";
import { loadCollectionEntries } from "@/lib/cms/collectionContent";
import { getAdminModule } from "@/lib/cms/modules";
import { loadModuleSections } from "@/lib/cms/sectionContent";

/**
 * The screen behind most admin modules.
 *
 * Two shapes of module share it:
 *
 *   sections   the module owns named entries in `cms_sections` (Home, Navbar,
 *              Footer) — driven by the section registry
 *   collection the module owns a whole collection (Categories, Pregnancy,
 *              Surgery, Chat) — every document is one editable panel
 *
 * Both render the same stat cards and the same editor, so adding a module is
 * a registry entry plus a four-line page rather than a bespoke screen.
 */

type ModuleScreenProps = {
  moduleId: string;
  /** Omit for section-backed modules; pass a collection name otherwise. */
  collection?: string;
};

export default async function ModuleScreen({
  moduleId,
  collection,
}: ModuleScreenProps) {
  const moduleItem = getAdminModule(moduleId);
  const admin = await requireAdminSession(moduleItem?.href || "/admin");

  const entries = collection
    ? (await loadCollectionEntries(collection)).map((entry) => ({
        id: entry.id,
        label: entry.title,
        description: entry.category ? `Category: ${entry.category}` : "",
        content: entry.content,
        source: entry.source,
        updatedAt: entry.updatedAt,
        updatedBy: entry.updatedBy,
        order: entry.order,
      }))
    : (await loadModuleSections(moduleId)).map((section, index) => ({
        id: section.id,
        label: section.label,
        description: section.description,
        content: section.content,
        source: section.source,
        updatedAt: section.updatedAt,
        updatedBy: section.updatedBy,
        order: index,
      }));

  const targetCollection = collection || cmsCollections.sections;
  const liveCount = entries.filter((entry) => entry.source === "firestore").length;
  const seedCount = entries.length - liveCount;

  return (
    <AdminShell
      activeModule={moduleId}
      title={moduleItem?.label || moduleId}
      description={moduleItem?.description}
      adminEmail={admin.email}
    >
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Total items" value={entries.length} tone="neutral" />
          <StatCard label="Live in Firestore" value={liveCount} tone="success" />
          <StatCard
            label="Still on seed"
            value={seedCount}
            tone={seedCount > 0 ? "warning" : "neutral"}
          />
        </div>

        {entries.length === 0 ? (
          <EmptyState
            icon={Layers}
            title="Nothing to edit here yet"
            description="This module has no content in Firestore and no built-in seed to fall back on."
          />
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <SectionEditorPanel
                key={entry.id}
                sectionId={entry.id}
                collection={targetCollection}
                label={entry.label}
                description={entry.description}
                initialContent={entry.content}
                source={entry.source}
                updatedAt={entry.updatedAt}
                updatedBy={entry.updatedBy}
                order={entry.order}
              />
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
