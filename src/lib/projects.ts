import type { Project } from '../content/site'

export function findProject(projects: Project[], slug: unknown): Project | undefined {
  return typeof slug === 'string' ? projects.find(p => p.slug === slug) : undefined
}
