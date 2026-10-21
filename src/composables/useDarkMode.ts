import { ref, watch } from 'vue'

// Module-level singleton — one reactive ref shared across all components.
// index.html applies the initial class before first paint; this just keeps it in sync.

function readStored(): string | null {
  try {
    return localStorage.getItem('theme')
  } catch {
    return null
  }
}

const media = window.matchMedia('(prefers-color-scheme: dark)')
const stored = readStored()
const isDark = ref(stored ? stored === 'dark' : media.matches)

function apply(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', dark ? '#0f0f0e' : '#f3f2ee')
}

apply(isDark.value)
watch(isDark, apply)

// Follow the OS until the visitor makes an explicit choice.
media.addEventListener('change', e => {
  if (!readStored()) isDark.value = e.matches
})

// Keep other open tabs in step.
window.addEventListener('storage', e => {
  if (e.key === 'theme' && e.newValue) isDark.value = e.newValue === 'dark'
})

export function useDarkMode() {
  return {
    isDark,
    toggleDark: () => {
      isDark.value = !isDark.value
      try {
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
      } catch {
        /* private mode — the toggle still works for this visit */
      }
    }
  }
}
