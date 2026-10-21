import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { allPages, pageUrl, type Page } from './src/content/pages'

const OUT_DIR = 'docs'

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * GitHub Pages serves files, not routes. Write one HTML entry per page (with that page's
 * title, description and canonical URL already in place), plus a 404.html fallback.
 */
function staticPages(): Plugin {
  return {
    name: 'static-pages',
    apply: 'build',
    closeBundle() {
      const template = readFileSync(resolve(OUT_DIR, 'index.html'), 'utf8')
      const render = (page: Page) => {
        const url = pageUrl(page.path)
        return template
          .replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
          .replace(/(<meta name="description" content=")[^"]*/, `$1${escape(page.description)}`)
          .replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(page.title)}`)
          .replace(
            /(<meta property="og:description" content=")[^"]*/,
            `$1${escape(page.description)}`
          )
          .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
          .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
      }

      for (const page of allPages) {
        if (page.path === '/') continue
        const dir = resolve(OUT_DIR, page.path.slice(1))
        mkdirSync(dir, { recursive: true })
        writeFileSync(resolve(dir, 'index.html'), render(page))
      }
      writeFileSync(resolve(OUT_DIR, '404.html'), template)

      const urls = allPages.map(p => `  <url><loc>${pageUrl(p.path)}</loc></url>`)
      writeFileSync(
        resolve(OUT_DIR, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
      )
    }
  }
}

export default defineConfig({
  plugins: [vue(), tailwindcss(), staticPages()],
  base: '/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: OUT_DIR
  }
})
