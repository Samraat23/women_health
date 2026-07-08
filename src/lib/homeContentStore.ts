import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import fallbackHomeContent from "@/data/homePageContent.json";
import type { HomePageContent } from "@/types/homeContent";

const contentFilePath = path.join(process.cwd(), "src/data/homePageContent.json");
const uploadDirectory = path.join(process.cwd(), "public/uploads/home");

export function getFallbackHomePageContent(): HomePageContent {
  return fallbackHomeContent as HomePageContent;
}

export async function getHomePageContent(): Promise<HomePageContent> {
  try {
    const file = await readFile(contentFilePath, "utf8");
    return JSON.parse(file) as HomePageContent;
  } catch {
    return getFallbackHomePageContent();
  }
}

export async function saveHomePageContent(content: HomePageContent) {
  await mkdir(path.dirname(contentFilePath), { recursive: true });
  await writeFile(contentFilePath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
}

export async function saveHomeUpload(file: File) {
  const bytes = Buffer.from(await file.arrayBuffer());
  const extension = path.extname(file.name).toLowerCase() || ".png";
  const baseName = path
    .basename(file.name, extension)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const filename = `${baseName || "home-image"}-${Date.now()}${extension}`;

  await mkdir(uploadDirectory, { recursive: true });
  await writeFile(path.join(uploadDirectory, filename), bytes);

  return `/uploads/home/${filename}`;
}
