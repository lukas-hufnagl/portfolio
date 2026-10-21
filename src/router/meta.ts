import { pageUrl } from '../content/pages'

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  document.querySelector(selector)?.setAttribute(attr, value)
}

/** Keeps title, description, canonical URL and Open Graph tags in step with the current page. */
export function applyPageMeta(meta: { title: string; description: string }, path: string) {
  const url = pageUrl(path)
  document.title = meta.title
  setMeta('meta[name="description"]', 'content', meta.description)
  setMeta('meta[property="og:title"]', 'content', meta.title)
  setMeta('meta[property="og:description"]', 'content', meta.description)
  setMeta('meta[property="og:url"]', 'content', url)
  setMeta('link[rel="canonical"]', 'href', url)
}
