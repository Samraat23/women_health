import { NextResponse, type NextRequest } from "next/server";

import {
  adminSessionCookieName,
  isAdminSessionValid,
} from "@/lib/adminAuth";
import { getHomePageContent, saveHomePageContent } from "@/lib/homeContentStore";
import type { HomePageContent } from "@/types/homeContent";

export const dynamic = "force-dynamic";

async function isAdminRequest(request: NextRequest) {
  const sessionValue = request.cookies.get(adminSessionCookieName)?.value;

  return isAdminSessionValid(sessionValue);
}

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const content = await getHomePageContent();

  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const content = (await request.json().catch(() => null)) as HomePageContent | null;

  if (!content?.navbar || !content.hero || !content.trainer) {
    return NextResponse.json(
      { message: "Invalid home page content." },
      { status: 400 }
    );
  }

  await saveHomePageContent(content);

  return NextResponse.json({ ok: true, content });
}
