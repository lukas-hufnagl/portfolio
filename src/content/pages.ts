// Every page of the site. Read by the router (navigation, live <title>) and by
// vite.config.js (a static HTML entry per page, so direct links work on GitHub Pages).

import { person, projects, type Project } from './site'

export interface Page {
  path: string
  name: 'home' | 'about' | 'career' | 'work' | 'project'
  /** Label in the header navigation; pages without one aren't in it. */
  nav?: string
  title: string
  description: string
}

/** Fixed pages, in navigation order. */
export const pages: Page[] = [
  {
    path: '/',
    name: 'home',
    title: `${person.name} — Full-stack developer`,
    description: `${person.name}, full-stack developer in ${person.location}, building web applications with Vue, TypeScript and .NET. Currently at ABB.`
  },
  {
    path: '/about',
    name: 'about',
    nav: 'About',
    title: `About — ${person.name}`,
    description: `About ${person.name}, full-stack developer based in ${person.location}, and the tools he works with.`
  },
  {
    path: '/career',
    name: 'career',
    nav: 'Career',
    title: `Career — ${person.name}`,
    description: `Where ${person.name} has worked and studied: ABB, ASKI and HTL Wels.`
  },
  {
    path: '/work',
    name: 'work',
    nav: 'Work',
    title: `Work — ${person.name}`,
    description: `Selected projects by ${person.name}, full-stack developer in ${person.location}.`
  }
]

export const projectPath = (project: Pick<Project, 'slug'>) => `/work/${project.slug}`

/** One detail page per project. */
export function projectPage(project: Project): Page {
  return {
    path: projectPath(project),
    name: 'project',
    title: `${project.title} — Work — ${person.name}`,
    description: `${project.title}: ${project.summary}`
  }
}

export const allPages: Page[] = [...pages, ...projects.map(projectPage)]

export const SITE_URL = 'https://www.lukashufnagl.com'

/** Public URL of a page. Subpages are served as folders on GitHub Pages, hence the slash. */
export function pageUrl(path: string): string {
  const folder = path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`
  return new URL(folder, SITE_URL).href
}
