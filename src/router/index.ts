import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { pages, projectPage, type Page } from '../content/pages'
import { projects } from '../content/site'
import { findProject } from '../lib/projects'
import HomeView from '../views/HomeView.vue'
import { applyPageMeta } from './meta'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description: string
  }
}

// The home view ships in the main bundle; the subpages load on demand.
const views: Record<Exclude<Page['name'], 'project'>, RouteRecordRaw['component']> = {
  home: HomeView,
  about: () => import('../views/AboutView.vue'),
  career: () => import('../views/CareerView.vue'),
  work: () => import('../views/WorkView.vue')
}

export const routes: RouteRecordRaw[] = [
  ...pages.map(
    (page): RouteRecordRaw => ({
      path: page.path,
      name: page.name,
      component: views[page.name as keyof typeof views]!,
      meta: { title: page.title, description: page.description }
    })
  ),
  {
    path: '/work/:slug',
    name: 'project',
    component: () => import('../views/ProjectView.vue'),
    // An unknown project falls back to the list rather than an empty page.
    beforeEnter: to => (findProject(projects, to.params.slug) ? true : '/work'),
    meta: { title: '', description: '' }
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior: (_to, _from, saved) => saved ?? { top: 0 }
})

router.afterEach(to => {
  const project = to.name === 'project' ? findProject(projects, to.params.slug) : undefined
  applyPageMeta(project ? projectPage(project) : to.meta, to.path)
})

export default router
