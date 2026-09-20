"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  collection as firestoreCollection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import {
  AlertTriangle,
  Check,
  Copy,
  ImageIcon,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react";

import { useAdminFirebaseUser } from "@/features/admin/cms/useAdminFirebaseUser";
import {
  adminAuth,
  adminDb,
  adminStorage,
} from "@/features/admin/firebase/adminFirebase";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  EmptyState,
  Panel,
  StatCard,
} from "@/features/admin/ui/primitives";
import { cmsCollections } from "@/lib/cms/collections";

/**
 * Uploads images to Cloud Storage and indexes them in Firestore.
 *
 * Storage holds the bytes; `cms_media` holds a small document per file with its
 * public download URL, so the library can be listed without a Storage API call
 * per image and content editors can paste a URL straight into an image field.
 *
 * Both halves are written as the signed-in admin, so Storage rules and
 * Firestore rules each get their say.
 */

type MediaItem = {
  id: string;
  name: string;
  url: string;
  path: string;
  size: number;
  contentType: string;
  uploadedAt?: string;
};

const acceptedTypes = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/avif",
  "image/svg+xml",
];

const maxBytes = 5 * 1024 * 1024;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** "Dr Kusum Photo.PNG" -> "dr-kusum-photo-1700000000.png" */
function toStorageName(fileName: string) {
  const lastDot = fileName.lastIndexOf(".");
  const extension =
    lastDot > 0 ? fileName.slice(lastDot).toLowerCase() : ".png";
  const base = (lastDot > 0 ? fileName.slice(0, lastDot) : fileName)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${base || "image"}-${Date.now()}${extension}`;
}

export default function MediaLibraryPanel() {
  const { isSignedIn, isResolving } = useAdminFirebaseUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);

    try {
      const snapshot = await getDocs(
        firestoreCollection(adminDb, cmsCollections.media)
      );

      const loaded = snapshot.docs.map((document) => {
        const data = document.data() as Partial<MediaItem> & {
          updatedAt?: { toDate?: () => Date };
        };

        return {
          id: document.id,
          name: data.name || document.id,
          url: data.url || "",
          path: data.path || "",
          size: data.size || 0,
          contentType: data.contentType || "",
          uploadedAt: data.updatedAt?.toDate?.().toISOString(),
        } satisfies MediaItem;
      });

      loaded.sort((left, right) =>
        (right.uploadedAt || "").localeCompare(left.uploadedAt || "")
      );

      setItems(loaded);
    } catch {
      // A rules failure here is the common case before the rules are deployed.
      setError(
        "Could not list the media library. Deploy the Firestore rules, then reload."
      );
      setItems([]);
    }
  }, []);

  useEffect(() => {
    if (isResolving) return;

    void load();
  }, [isResolving, load]);

  const upload = useCallback(
    async (files: FileList) => {
      setIsUploading(true);
      setError(null);

      try {
        // The rules require this exact value in updatedBy, so a lapsed
        // Firebase session must fail here rather than at the write.
        const actor = adminAuth.currentUser?.email?.trim().toLowerCase();

        if (!actor) {
          throw new Error(
            "Your Firebase session has expired. Log out and back in."
          );
        }

        for (const file of Array.from(files)) {
          if (!acceptedTypes.includes(file.type)) {
            throw new Error(
              `${file.name} is a ${file.type || "unknown"} file. Upload a PNG, JPG, WebP, AVIF, or SVG.`
            );
          }

          if (file.size > maxBytes) {
            throw new Error(
              `${file.name} is ${formatBytes(file.size)}. The limit is 5 MB.`
            );
          }

          const storageName = toStorageName(file.name);
          const path = `cms/${storageName}`;
          const fileRef = storageRef(adminStorage, path);

          await uploadBytes(fileRef, file, { contentType: file.type });

          const url = await getDownloadURL(fileRef);

          // The rules require updatedAt/updatedBy on every cms_* write.
          await setDoc(doc(adminDb, cmsCollections.media, storageName), {
            id: storageName,
            name: file.name,
            url,
            path,
            size: file.size,
            contentType: file.type,
            status: "published",
            order: 0,
            updatedAt: serverTimestamp(),
            updatedBy: actor,
          });
        }

        await load();
      } catch (uploadError) {
        setError(
          uploadError instanceof Error
            ? uploadError.message
            : "Upload failed. Check the Storage rules and try again."
        );
      } finally {
        setIsUploading(false);

        // Clearing lets the same file be picked again after a failure.
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [load]
  );

  const remove = useCallback(
    async (item: MediaItem) => {
      setError(null);

      try {
        // Storage first: a Firestore row pointing at a deleted file is a
        // broken image, but a stored file with no row is merely orphaned.
        if (item.path) {
          await deleteObject(storageRef(adminStorage, item.path)).catch(
            () => null
          );
        }

        await deleteDoc(doc(adminDb, cmsCollections.media, item.id));
        await load();
      } catch {
        setError("Could not delete that file.");
      }
    },
    [load]
  );

  const copy = useCallback(async (item: MediaItem) => {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopiedId(item.id);
      window.setTimeout(() => setCopiedId(null), 1500);
    } catch {
      setError("Could not copy to the clipboard.");
    }
  }, []);

  const totalBytes = (items || []).reduce((total, item) => total + item.size, 0);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Files" value={items?.length ?? 0} tone="accent" />
        <StatCard label="Total size" value={formatBytes(totalBytes)} />
        <StatCard label="Per-file limit" value="5 MB" />
      </div>

      <Panel
        eyebrow="Storage"
        title="Media library"
        icon={ImageIcon}
        description="Images uploaded here get a public URL you can paste into any image field."
        action={
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedTypes.join(",")}
              multiple
              className="hidden"
              onChange={(event) => {
                if (event.target.files?.length) void upload(event.target.files);
              }}
            />
            <Button
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || (!isSignedIn && !isResolving)}
            >
              {isUploading ? (
                <Loader2 className="animate-spin" aria-hidden />
              ) : (
                <Upload aria-hidden />
              )}
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </>
        }
      >
        {error ? (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle aria-hidden />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        {items === null ? (
          <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
            <Loader2 size={16} className="animate-spin" aria-hidden />
            Loading library...
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            icon={ImageIcon}
            title="No images yet"
            description="Upload a PNG, JPG, WebP, AVIF, or SVG to get a URL you can use anywhere in the site content."
          />
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="overflow-hidden rounded-lg border border-border bg-white"
              >
                <div className="grid h-36 place-items-center overflow-hidden bg-secondary">
                  {/* Plain <img>: these are runtime Storage URLs, which
                      next/image would reject unless the host is allow-listed
                      in next.config. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="border-t border-border px-3 py-2.5">
                  <p
                    className="truncate text-sm font-semibold text-foreground"
                    title={item.name}
                  >
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {formatBytes(item.size)}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => void copy(item)}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-input px-2 py-1.5 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check size={12} aria-hidden />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy size={12} aria-hidden />
                          Copy URL
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => void remove(item)}
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-muted-foreground transition hover:bg-[var(--adm-danger-soft)] hover:text-[var(--adm-danger)]"
                      aria-label={`Delete ${item.name}`}
                    >
                      <Trash2 size={13} aria-hidden />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
