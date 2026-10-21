<template>
  <header class="header" :class="{ 'is-scrolled': scrolled }">
    <div class="column header__inner">
      <RouterLink to="/" class="header__home" :aria-label="`${person.name}, home`">
        <!-- The home page already sets the name large, so there the mark stays short. -->
        <WordMark :open="!isHome" />
      </RouterLink>

      <nav class="header__nav" aria-label="Main">
        <RouterLink
          v-for="page in nav"
          :key="page.path"
          :to="page.path"
          class="header__link"
          :class="{ 'is-current': isCurrent(page.path) }"
        >
          {{ page.nav }}
        </RouterLink>
      </nav>

      <ThemeToggle class="header__theme" />
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

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  height: var(--header);
  background: var(--bg);
  box-shadow: 0 1px 0 transparent;
  transition:
    box-shadow 0.3s,
    background-color 0.4s var(--ease-io);
}
.header.is-scrolled {
  box-shadow: 0 1px 0 var(--line);
}

.header__inner {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  font-size: 0.8125rem;
}

.header__home {
  display: inline-flex;
  align-items: center;
}

.header__nav {
  display: flex;
  gap: clamp(1rem, 3vw, 1.75rem);
  margin-left: auto;
}

.header__link {
  position: relative;
  color: var(--ink-2);
  transition: color 0.2s;
}
.header__link:hover,
.header__link.is-current {
  color: var(--ink);
}
/* Current page: a short signal-coloured rule under the label. */
.header__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.35rem;
  height: 1px;
  background: var(--signal);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s var(--ease);
}
.header__link.is-current::after {
  transform: scaleX(1);
}

.header__theme {
  margin-left: clamp(0.25rem, 2vw, 1.25rem);
}

@media (max-width: 639px) {
  .header__theme :deep(.toggle__label) {
    display: none;
  }
}
</style>
