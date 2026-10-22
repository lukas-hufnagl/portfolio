// Single source of truth for everything the page says.

export interface Link {
  label: string
  href: string
}

export interface Project {
  /** URL segment of the project's page: /work/<slug>. */
  slug: string
  title: string
  summary: string
  year: string
  stack: string[]
  links: { label: string; href: string }[]
}

export interface Position {
  org: string
  title: string
  start: number
  /** null while it is the current position. */
  end: number | null
  note: string
}

export interface SkillGroup {
  area: string
  items: string[]
}

export const person = {
  name: 'Lukas Hufnagl',
  location: 'Austria',
  /** Lower case: shown as one sentence, e.g. "Fitness, music and cutting videos". */
  interests: ['fitness', 'music', 'cutting videos'],
  email: 'lukas.hufnagl02@gmail.com'
}

export const links: Link[] = [
  { label: 'GitHub', href: 'https://github.com/lukas-hufnagl' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/lukas-hufnagl' }
]

export const projects: Project[] = [
  {
    slug: 'portfolio',
    title: 'lukashufnagl.com',
    summary: 'This site.',
    year: '2025',
    stack: ['Vue 3', 'TypeScript', 'Vite', 'Tailwind CSS'],
    links: [{ label: 'Source', href: 'https://github.com/lukas-hufnagl/portfolio' }]
  }
]

export const experience: Position[] = [
  {
    org: 'ABB',
    title: 'Full Stack Developer',
    start: 2025,
    end: null,
    note: 'Web applications with Vue.js, .NET and cloud technologies.'
  },
  {
    org: 'ASKI',
    title: 'Full Stack Developer',
    start: 2023,
    end: 2024,
    note: 'Web applications with Vue.js, .NET and cloud technologies.'
  },
  {
    org: 'HTL Wels',
    title: 'Information Technology',
    start: 2017,
    end: 2022,
    note: 'Technical education focused on software development and IT systems.'
  }
]

export const skills: SkillGroup[] = [
  { area: 'Frontend', items: ['Vue.js', 'TypeScript', 'Tailwind CSS'] },
  { area: 'Backend', items: ['.NET'] },
  { area: 'Data', items: ['MySQL'] }
]
