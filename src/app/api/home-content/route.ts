import { NextResponse } from "next/server";

import { getHomePageContent } from "@/lib/homeContentStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getHomePageContent();

  return NextResponse.json(content);
}
