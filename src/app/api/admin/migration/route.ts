import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { adminSessionCookieName, isAdminSessionValid } from "@/lib/adminAuth";
import { buildSeedGroup, buildSeedSummary } from "@/lib/cms/seed";

export const dynamic = "force-dynamic";

/**
 * Serves the built-in content as migration payloads.
 *
 * The browser does the actual Firestore writes, as the signed-in admin, so this
 * route never needs write credentials. It only assembles and hands over the
 * data — which is why the seed modules (300KB of article bodies) can stay on
 * the server.
 *
 *   GET /api/admin/migration              -> per-group counts and sizes
 *   GET /api/admin/migration?group=<id>   -> the documents for one group
 *
 * The admin session cookie is required. That is a convenience gate, not the
 * security boundary: the content here is the same content the public site
 * already serves. The real boundary is on the write side, in Firestore rules.
 */

async function hasAdminSession() {
  const cookieStore = await cookies();

  return isAdminSessionValid(cookieStore.get(adminSessionCookieName)?.value);
}

export async function GET(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ message: "Not signed in." }, { status: 401 });
  }

  const groupId = new URL(request.url).searchParams.get("group");

  if (!groupId) {
    return NextResponse.json({ groups: buildSeedSummary() });
  }

  try {
    const group = buildSeedGroup(groupId);

    if (!group) {
      return NextResponse.json(
        { message: `Unknown migration group "${groupId}".` },
        { status: 404 }
      );
    }

    return NextResponse.json({ group });
  } catch (error) {
    // A source file changed shape. Surface it rather than writing a partial
    // or empty document set into Firestore.
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Migration payload could not be built.",
      },
      { status: 500 }
    );
  }
}
