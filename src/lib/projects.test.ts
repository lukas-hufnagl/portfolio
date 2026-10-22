import { describe, expect, it } from 'vitest'
import type { Project } from '../content/site'
import { findProject } from './projects'

const p = (title: string, year: string): Project => ({
  slug: title,
  title,
  year,
  summary: '',
  stack: [],
  links: []
})

describe('findProject', () => {
  it('finds by slug and ignores anything that is not a string', () => {
    const list = [{ ...p('a', '2025'), slug: 'a' }]
    expect(findProject(list, 'a')?.title).toBe('a')
    expect(findProject(list, 'missing')).toBeUndefined()
    expect(findProject(list, ['a'])).toBeUndefined()
  })
})
