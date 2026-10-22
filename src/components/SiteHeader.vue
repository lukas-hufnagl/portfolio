<template>
  <header
    class="sticky top-0 z-20 h-(--header) bg-paper transition-[box-shadow,background-color] duration-300"
    :class="scrolled ? 'shadow-[0_1px_0_var(--line)]' : 'shadow-[0_1px_0_transparent]'"
  >
    <div class="frame flex h-full items-center gap-5 text-[0.8125rem]">
      <RouterLink to="/" class="inline-flex items-center" :aria-label="`${person.name}, home`">
        <!-- The home page already sets the name large, so there the mark stays short. -->
        <WordMark :open="!isHome" />
      </RouterLink>

      <nav class="ml-auto flex gap-[clamp(1rem,3vw,1.75rem)]" aria-label="Main">
        <!-- Current page: a short signal-coloured rule under the label. -->
        <RouterLink
          v-for="page in nav"
          :key="page.path"
          :to="page.path"
          class="relative transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-[0.35rem] after:h-px after:origin-left after:bg-signal after:transition-transform after:duration-350 after:ease-soft hover:text-ink"
          :class="
            isCurrent(page.path) ? 'text-ink after:scale-x-100' : 'text-ink-2 after:scale-x-0'
          "
        >
          {{ page.nav }}
        </RouterLink>
      </nav>

      <ThemeToggle class="ml-[clamp(0.25rem,2vw,1.25rem)]" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { person } from '../content/site'
import { pages } from '../content/pages'
import ThemeToggle from './ThemeToggle.vue'
import WordMark from './WordMark.vue'

const nav = pages.filter(p => p.nav)
const route = useRoute()
const isHome = computed(() => route.name === 'home')
// A project page (/work/…) still counts as being in Work.
const isCurrent = (path: string) => route.path === path || route.path.startsWith(`${path}/`)

const scrolled = ref(false)
const onScroll = () => (scrolled.value = window.scrollY > 8)
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>
