import { NextResponse, type NextRequest } from "next/server";

import {
  adminSessionCookieName,
  isAdminSessionValid,
} from "@/lib/adminAuth";
import { saveHomeUpload } from "@/lib/homeContentStore";

export const dynamic = "force-dynamic";

const allowedTypes = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export async function POST(request: NextRequest) {
  const sessionValue = request.cookies.get(adminSessionCookieName)?.value;

  if (!(await isAdminSessionValid(sessionValue))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Image file is required." }, { status: 400 });
  }

  if (!allowedTypes.has(file.type)) {
    return NextResponse.json(
      { message: "Only JPG, PNG, WEBP, AVIF or GIF images are allowed." },
      { status: 400 }
    );
  }

  if (file.size > 6 * 1024 * 1024) {
    return NextResponse.json(
      { message: "Image must be smaller than 6 MB." },
      { status: 400 }
    );
  }

  const url = await saveHomeUpload(file);

  return NextResponse.json({ url });
}
