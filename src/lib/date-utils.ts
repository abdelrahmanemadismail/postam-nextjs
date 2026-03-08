/**
 * Safely parse and format a date string
 * @param dateString The date string to parse
 * @param locale The locale for formatting
 * @param options Intl.DateTimeFormat options
 * @returns Formatted date string or empty string if invalid
 */
export function formatDate(
  dateString: string | null | undefined,
  locale: string,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!dateString) {
    return "";
  }

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date string: ${dateString}`);
      return "";
    }

    return date.toLocaleDateString(locale, options || {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.warn(`Error formatting date: ${dateString}`, error);
    return "";
  }
}

/**
 * Check if a date string is valid
 * @param dateString The date string to check
 * @returns True if the date is valid
 */
export function isValidDate(dateString: string | null | undefined): boolean {
  if (!dateString) {
    return false;
  }

  try {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  } catch {
    return false;
  }
}
