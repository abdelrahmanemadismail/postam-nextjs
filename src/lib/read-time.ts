export function estimateReadTime(text: string, wordsPerMinute = 200) {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length

  if (wordCount === 0) {
    return 1
  }

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}
