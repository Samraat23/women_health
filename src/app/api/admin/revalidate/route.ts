import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { adminSessionCookieName, isAdminSessionValid } from "@/lib/adminAuth";
import { publicCmsCollections } from "@/lib/cms/collections";

export const dynamic = "force-dynamic";

/**
 * Drops the Next.js data cache for a CMS collection after an admin edit.
 *
 * Public pages read Firestore through `@/lib/cms/read`, which caches responses
 * for 60 seconds under a tag per collection. Without this an editor saves,
 * reloads the site, sees the old copy, and concludes the save failed. Calling
 * this straight after a write makes the change visible immediately.
 *
 * Only the collection tags are accepted. Taking an arbitrary tag from the
 * client would let any authenticated request purge caches this route has no
 * business touching.
 */
export async function POST(request: Request) {
  const cookieStore = await cookies();

  if (!(await isAdminSessionValid(cookieStore.get(adminSessionCookieName)?.value))) {
    return NextResponse.json({ message: "Not signed in." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    collection?: string;
  } | null;

  const collection = body?.collection;

  if (!collection) {
    return NextResponse.json(
      { message: "A collection is required." },
      { status: 400 }
    );
  }

  if (!publicCmsCollections.includes(collection as never)) {
    return NextResponse.json(
      { message: `"${collection}" is not a revalidatable collection.` },
      { status: 400 }
    );
  }

  // Next 16 takes a cache-life profile alongside the tag. `expire: 0` purges
  // immediately rather than letting entries live out their 60-second window,
  // which is the whole point of calling this straight after a save.
  revalidateTag(collection, { expire: 0 });

  return NextResponse.json({ ok: true, collection });
}
