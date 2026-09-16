import { NextResponse } from "next/server";

import { getChatConfig, toPublicConfig } from "@/features/chat/server/config";

export const dynamic = "force-dynamic";

/** Chat settings and the service catalog, as the browser needs them. */
export async function GET() {
  const config = toPublicConfig(await getChatConfig());

  return NextResponse.json(config, {
    headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
  });
}
