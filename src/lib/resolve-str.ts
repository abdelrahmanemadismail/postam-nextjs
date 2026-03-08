/**
 * Sanity typegen can't prove that `coalesce(field[$locale], ...)` resolves to
 * `string` when a dynamic key is used, so it unions in the raw localizedString
 * array type. This helper narrows it back to `string | null` at the TS level.
 * At runtime coalesce already resolved the value, so this is always a no-op.
 */
export function resolveStr(val: unknown): string | null {
  return typeof val === "string" ? val : null;
}
