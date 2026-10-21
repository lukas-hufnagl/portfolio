import type { Position } from '../content/site'

/** The position without an end year; falls back to the first entry. */
export function currentPosition(positions: Position[]): Position | undefined {
  return positions.find(p => p.end === null) ?? positions[0]
}

/** "2023–2024", "2025–Now", or a single year when start and end match. */
export function formatYears(p: Pick<Position, 'start' | 'end'>): string {
  if (p.end === null) return `${p.start}–Now`
  return p.start === p.end ? String(p.start) : `${p.start}–${p.end}`
}

/** Newest first, current position on top. */
export function sortByRecency(positions: Position[]): Position[] {
  const endOf = (p: Position) => p.end ?? Number.POSITIVE_INFINITY
  return [...positions].sort((a, b) => endOf(b) - endOf(a) || b.start - a.start)
}
