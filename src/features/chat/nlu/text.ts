/**
 * Text helpers for matching patient messages against the lexicon.
 */

/** Lower-cased, apostrophes dropped ("can't" -> "cant"), whitespace collapsed. */
export function normalizeMessage(text: string) {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/['’‘`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Only letters and digits, single-spaced — the form phrases are matched in. */
export function toTokens(text: string) {
  return normalizeMessage(text)
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
}

export type MatchText = {
  tokens: string[];
  /** Tokens joined with a space on both ends so phrases match whole words only. */
  padded: string;
};

export function toMatchText(text: string): MatchText {
  const tokens = toTokens(text);

  return { tokens, padded: ` ${tokens.join(" ")} ` };
}

export function containsPhrase(match: MatchText, phraseTokens: string[]) {
  return phraseTokens.length > 0 && match.padded.includes(` ${phraseTokens.join(" ")} `);
}

/** Edit distance allowing adjacent swaps ("fibriods"), stopping early past `max`. */
export function editDistance(a: string, b: string, max: number) {
  if (Math.abs(a.length - b.length) > max) return max + 1;

  const rows: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );

  for (let i = 1; i <= a.length; i += 1) {
    let rowMin = Infinity;

    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let value = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + cost);

      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        value = Math.min(value, rows[i - 2][j - 2] + 1);
      }

      rows[i][j] = value;
      rowMin = Math.min(rowMin, value);
    }

    if (rowMin > max) return max + 1;
  }

  return rows[a.length][b.length];
}

/** How many typos a word of this length may contain and still count as a match. */
export function allowedTypos(length: number) {
  if (length >= 8) return 2;
  if (length >= 5) return 1;

  return 0;
}
