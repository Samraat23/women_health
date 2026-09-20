import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import fallbackHomeContent from "@/data/homePageContent.json";
import { getSection } from "@/lib/cms/publicContent";
import type {
  HomeHeroContent,
  HomeNavbarContent,
  HomePageContent,
  HomeTrainerContent,
} from "@/types/homeContent";

const contentFilePath = path.join(process.cwd(), "src/data/homePageContent.json");
const uploadDirectory = path.join(process.cwd(), "public/uploads/home");

export function getFallbackHomePageContent(): HomePageContent {
  return fallbackHomeContent as HomePageContent;
}

/**
 * Content for the navbar, hero and trainer blocks.
 *
 * Firestore is the source of truth: these three are sections in `cms_sections`
 * and the admin panel writes them there. The on-disk JSON is only a fallback
 * for a project whose content has not been imported yet, or a request where
 * Firestore is unreachable.
 *
 * Each block is resolved independently, so a half-imported project still gets
 * the live copy for whichever sections do exist.
 */
export async function getHomePageContent(): Promise<HomePageContent> {
  const file = await readContentFile();

  const [navbar, hero, trainer] = await Promise.all([
    getSection<HomeNavbarContent>("navbar", file.navbar),
    getSection<HomeHeroContent>("hero", file.hero),
    getSection<HomeTrainerContent>("trainer", file.trainer),
  ]);

  return { navbar, hero, trainer };
}

/** The JSON file on disk, or the copy compiled into the build. */
async function readContentFile(): Promise<HomePageContent> {
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
