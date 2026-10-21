import { describe, expect, it } from 'vitest'
import type { Project } from '../content/site'
import { findProject, latestProjects } from './projects'

const p = (title: string, year: string): Project => ({
  slug: title,
  title,
  year,
  summary: '',
  stack: [],
  highlights: [],
  links: []
})

describe('latestProjects', () => {
  it('returns the newest first, limited to the count', () => {
    const list = [p('old', '2023'), p('new', '2026'), p('mid', '2025')]
    expect(latestProjects(list, 2).map(x => x.title)).toEqual(['new', 'mid'])
  })

  it('keeps content order for projects from the same year', () => {
    expect(latestProjects([p('a', '2025'), p('b', '2025')], 2).map(x => x.title)).toEqual([
      'a',
      'b'
    ])
  })

  it('handles empty lists and non-positive counts', () => {
    expect(latestProjects([], 3)).toEqual([])
    expect(latestProjects([p('a', '2025')], 0)).toEqual([])
  })
})

describe('findProject', () => {
  it('finds by slug and ignores anything that is not a string', () => {
    const list = [{ ...p('a', '2025'), slug: 'a' }]
    expect(findProject(list, 'a')?.title).toBe('a')
    expect(findProject(list, 'missing')).toBeUndefined()
    expect(findProject(list, ['a'])).toBeUndefined()
  })
})
