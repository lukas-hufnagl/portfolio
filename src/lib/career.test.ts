import { describe, expect, it } from 'vitest'
import type { Position } from '../content/site'
import { currentPosition, formatYears, sortByRecency } from './career'

const at = (org: string, start: number, end: number | null): Position => ({
  org,
  title: 'Developer',
  start,
  end,
  note: ''
})

describe('formatYears', () => {
  it('formats open, closed and single-year ranges', () => {
    expect(formatYears({ start: 2025, end: null })).toBe('2025–Now')
    expect(formatYears({ start: 2023, end: 2024 })).toBe('2023–2024')
    expect(formatYears({ start: 2024, end: 2024 })).toBe('2024')
  })
})

describe('currentPosition', () => {
  it('returns the open-ended position wherever it is in the list', () => {
    expect(currentPosition([at('A', 2017, 2022), at('B', 2025, null)])?.org).toBe('B')
  })

  it('falls back to the first entry, and copes with an empty list', () => {
    expect(currentPosition([at('A', 2017, 2022)])?.org).toBe('A')
    expect(currentPosition([])).toBeUndefined()
  })
})

describe('sortByRecency', () => {
  it('puts the current position first, then by end year, without mutating input', () => {
    const input = [at('School', 2017, 2022), at('Now', 2025, null), at('Before', 2023, 2024)]
    expect(sortByRecency(input).map(p => p.org)).toEqual(['Now', 'Before', 'School'])
    expect(input[0].org).toBe('School')
  })
})
