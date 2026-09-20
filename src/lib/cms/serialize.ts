import { serializeContentIcon } from "./icons";

/**
 * Makes compiled-in content safe to store in Firestore.
 *
 * The seed data is TypeScript, not JSON, and carries two things that cannot be
 * written to a document:
 *
 *   - Lucide icon components (`icon: Microscope`), which become icon names
 *   - `StaticImageData` from `next/image` imports, which become their `src`
 *
 * Anything else is copied through. Unsupported values (functions that are not
 * icons, symbols, undefined) are dropped rather than written as null, so a
 * document never gains a key the renderer has to special-case.
 */

/** A `StaticImageData` from a static `next/image` import. */
function isStaticImageData(
  value: object
): value is { src: string; width: number; height: number } {
  return (
    "src" in value &&
    typeof (value as { src: unknown }).src === "string" &&
    "width" in value &&
    "height" in value
  );
}

/** React components, including the forwardRef objects Lucide exports. */
function isComponentLike(value: unknown) {
  if (typeof value === "function") return true;

  return (
    typeof value === "object" &&
    value !== null &&
    "$$typeof" in (value as Record<string, unknown>)
  );
}

export type JsonSafe =
  | string
  | number
  | boolean
  | null
  | JsonSafe[]
  | { [key: string]: JsonSafe };

export function toJsonSafe(value: unknown): JsonSafe | undefined {
  if (value === null) return null;

  const valueType = typeof value;

  if (valueType === "string" || valueType === "boolean") {
    return value as string | boolean;
  }

  if (valueType === "number") {
    // NaN and Infinity are not valid JSON and Firestore rejects them.
    return Number.isFinite(value) ? (value as number) : null;
  }

  if (valueType === "undefined" || valueType === "symbol") return undefined;

  if (valueType === "bigint") return (value as bigint).toString();

  if (value instanceof Date) return value.toISOString();

  if (isComponentLike(value)) {
    // An icon becomes its registry name; any other component is dropped.
    return serializeContentIcon(value);
  }

  if (Array.isArray(value)) {
    return value
      .map((entry) => toJsonSafe(entry))
      .filter((entry): entry is JsonSafe => entry !== undefined);
  }

  if (valueType === "object") {
    const objectValue = value as Record<string, unknown>;

    if (isStaticImageData(objectValue)) {
      return objectValue.src as string;
    }

    const result: Record<string, JsonSafe> = {};

    for (const [key, entry] of Object.entries(objectValue)) {
      const converted = toJsonSafe(entry);

      if (converted !== undefined) {
        result[key] = converted;
      }
    }

    return result;
  }

  return undefined;
}

/**
 * Same conversion, but for a value known to be an object or array.
 *
 * Throws when the input serialises to nothing, which during a migration means
 * a source file changed shape and the operator needs to know rather than get a
 * silently empty document.
 */
export function toJsonSafeContent(value: unknown, label: string): JsonSafe {
  const converted = toJsonSafe(value);

  if (converted === undefined) {
    throw new Error(`Content for "${label}" could not be serialised.`);
  }

  return converted;
}
