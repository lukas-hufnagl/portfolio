<template>
  <button
    type="button"
    class="toggle mono"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    @click="toggleDark"
  >
    <span class="toggle__dial" aria-hidden="true" />
    <span class="toggle__label" aria-hidden="true">{{ isDark ? 'Dark' : 'Light' }}</span>
  </button>
</template>

<script setup lang="ts">
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()
</script>

<style scoped>
.toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: var(--ink-2);
  cursor: pointer;
  transition: color 0.2s;
}
.toggle:hover {
  color: var(--ink);
}

/* A half-filled dial that turns when the theme flips. */
.toggle__dial {
  width: 0.6875rem;
  height: 0.6875rem;
  border-radius: 50%;
  border: 1px solid currentColor;
  background: linear-gradient(90deg, currentColor 50%, transparent 50%);
  transition: transform 0.6s var(--ease);
}
:where(.dark) .toggle__dial {
  transform: rotate(180deg);
}
</style>
