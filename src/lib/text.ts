/** "A", "A and B", "A, B and C". */
export function formatList(items: string[]): string {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

/** formatList, read as a sentence: "Fitness, music and cutting videos". */
export function formatSentenceList(items: string[]): string {
  const text = formatList(items)
  return text.charAt(0).toUpperCase() + text.slice(1)
}
