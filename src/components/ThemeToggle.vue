<template>
  <button
    type="button"
    class="mono inline-flex cursor-pointer items-center gap-2 py-2 text-ink-2 transition-colors duration-200 hover:text-ink"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    @click="toggleDark"
  >
    <!-- A half-filled dial that turns when the theme flips. -->
    <span
      class="size-[0.6875rem] rounded-full border border-current bg-[linear-gradient(90deg,currentColor_50%,transparent_50%)] transition-transform duration-600 ease-soft dark:rotate-180"
      aria-hidden="true"
    />
    <span class="max-sm:hidden" aria-hidden="true">{{ isDark ? 'Dark' : 'Light' }}</span>
  </button>
</template>

<script setup lang="ts">
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()
</script>
