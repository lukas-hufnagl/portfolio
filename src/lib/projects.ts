import type { Project } from '../content/site'

/** Newest first by year; ties keep their order in the content file. */
export function latestProjects(projects: Project[], count: number): Project[] {
  return projects
    .map((project, index) => ({ project, index }))
    .sort((a, b) => b.project.year.localeCompare(a.project.year) || a.index - b.index)
    .slice(0, Math.max(0, count))
    .map(({ project }) => project)
}

export function findProject(projects: Project[], slug: unknown): Project | undefined {
  return typeof slug === 'string' ? projects.find(p => p.slug === slug) : undefined
}
