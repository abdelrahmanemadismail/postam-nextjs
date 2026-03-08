/**
 * Escape special characters in search strings for safe GROQ matching
 * @param text The search text to escape
 * @returns Escaped text safe for GROQ match operator
 */
export function escapeGroqString(text: string): string {
  // Escape backslashes first to avoid double escaping
  return text
    .replace(/\\/g, "\\\\") // Escape backslashes
    .replace(/"/g, '\\"'); // Escape double quotes
}

/**
 * Build a safe GROQ wildcard pattern for searching
 * @param searchTerm The user's search term
 * @returns A safe wildcard pattern for GROQ matching
 */
export function buildSearchPattern(searchTerm: string): string {
  if (!searchTerm?.trim()) {
    return "";
  }

  const escaped = escapeGroqString(searchTerm.toLowerCase().trim());
  return `*${escaped}*`;
}
