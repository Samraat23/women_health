/**
 * Heuristics that turn raw content keys into sensible form fields.
 *
 * The CMS stores whatever shape the source data had, and those shapes differ
 * per section, so the editor infers its controls from the data rather than
 * from a hand-written schema per section. These helpers hold the inference
 * rules in one place so they stay consistent (and easy to correct) across
 * every module.
 */

const imageKeyPattern =
  /(image|img|logo|avatar|thumbnail|cover|photo|picture|imageUrl)/i;
/**
 * Keys that *contain* an image word but hold prose, not a path.
 *
 * `imageAlt` is the one that bites: it matches the image pattern, so without
 * this the editor renders alt text as <img src="Dr. Kusum Lata Bhardwaj"> and
 * the browser fires a doomed request against the current directory.
 */
const imageAdjacentTextPattern = /(alt|caption|title|credit|description)$/i;
const urlKeyPattern = /(url|href|link|maps)/i;
const longTextKeyPattern =
  /(description|summary|intro|content|answer|note|detail|body|excerpt|text)/i;
const iconKeyPattern = /^icon$/i;
const colorKeyPattern = /(color|colour)$/i;

/** "primaryCtaLabel" -> "Primary cta label"; "blogSlugs" -> "Blog slugs". */
export function humanizeKey(key: string) {
  const spaced = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();

  if (!spaced) return key;

  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}

export type FieldKind =
  | "text"
  | "longText"
  | "url"
  | "image"
  | "icon"
  | "color"
  | "number"
  | "boolean";

/**
 * Which control to render for a value.
 *
 * The value wins over the key: a key called `image` holding a number is still
 * a number. The key only disambiguates between the string variants, which all
 * look identical in the data.
 */
export function inferFieldKind(key: string, value: unknown): FieldKind {
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";

  if (iconKeyPattern.test(key)) return "icon";
  if (colorKeyPattern.test(key)) return "color";

  // Checked before the image test so `imageAlt` stays a text field.
  if (imageAdjacentTextPattern.test(key)) {
    return typeof value === "string" && value.length > 90 ? "longText" : "text";
  }

  if (imageKeyPattern.test(key)) return "image";
  if (urlKeyPattern.test(key)) return "url";

  if (longTextKeyPattern.test(key)) return "longText";

  // Fall back on length: a 300-character title still needs a textarea.
  if (typeof value === "string" && value.length > 90) return "longText";

  return "text";
}

/**
 * A short label for one entry in a repeatable list.
 *
 * Picks the first human-meaningful string so a collapsed list row reads
 * "Endometriosis care" rather than "Item 3".
 */
const titleKeys = [
  "title",
  "label",
  "name",
  "heading",
  "question",
  "slug",
  "id",
  "tag",
  "week",
];

export function summarizeEntry(value: unknown, fallback: string): string {
  if (typeof value === "string") return value || fallback;
  if (typeof value === "number") return String(value);

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return fallback;
  }

  const record = value as Record<string, unknown>;

  for (const key of titleKeys) {
    const candidate = record[key];

    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }

    if (typeof candidate === "number") {
      return `${humanizeKey(key)} ${candidate}`;
    }
  }

  return fallback;
}

/** A blank entry shaped like the existing ones, for the "Add" button. */
export function blankEntryLike(template: unknown): unknown {
  if (typeof template === "string") return "";
  if (typeof template === "number") return 0;
  if (typeof template === "boolean") return false;
  if (Array.isArray(template)) return [];

  if (template && typeof template === "object") {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(template)) {
      result[key] = blankEntryLike(value);
    }

    return result;
  }

  return "";
}
