import { describe, expect, it } from 'vitest'
import { allPages, pages, pageUrl, projectPage } from './pages'
import { projects } from './site'

describe('pageUrl', () => {
  it('serves subpages as folders, the way GitHub Pages does', () => {
    expect(pageUrl('/')).toBe('https://www.lukashufnagl.com/')
    expect(pageUrl('/work')).toBe('https://www.lukashufnagl.com/work/')
    expect(pageUrl('/work/')).toBe('https://www.lukashufnagl.com/work/')
  })
})

describe('pages', () => {
  it('has unique paths and names, and a title and description for each', () => {
    expect(new Set(pages.map(p => p.path)).size).toBe(pages.length)
    expect(new Set(pages.map(p => p.name)).size).toBe(pages.length)
    for (const page of pages) {
      expect(page.title.length).toBeGreaterThan(0)
      expect(page.description.length).toBeGreaterThan(40)
    }
  })
})

describe('project pages', () => {
  it('gives every project its own page under /work', () => {
    for (const project of projects) {
      expect(projectPage(project).path).toBe(`/work/${project.slug}`)
    }
    expect(new Set(allPages.map(p => p.path)).size).toBe(allPages.length)
  })

  it('lists the navigation in the order About, Career, Work', () => {
    expect(pages.filter(p => p.nav).map(p => p.nav)).toEqual(['About', 'Career', 'Work'])
  })
})
