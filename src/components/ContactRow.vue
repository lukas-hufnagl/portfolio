<template>
  <!-- One row of a .rows list: render inside a <ul class="rows">. -->
  <li class="row">
    <span class="mono row__label">{{ label }}</span>
    <div class="row__body">
      <p>
        <a :href="`mailto:${person.email}`" class="link">{{ person.email }}</a>
        <CopyButton :text="person.email" label="Copy email address" />
      </p>
      <p class="links">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="links__item"
        >
          {{ link.label }} <span aria-hidden="true">↗</span>
          <span class="sr-only">(opens in a new tab)</span>
        </a>
      </p>
    </div>
  </li>
</template>

<script setup lang="ts">
import { links, person } from '../content/site'
import CopyButton from './CopyButton.vue'

withDefaults(defineProps<{ label?: string }>(), { label: 'Contact' })
</script>

<style scoped>
.links {
  column-gap: 1em;
}
.links__item {
  color: var(--ink-2);
  white-space: nowrap;
  transition: color 0.2s;
}
.links__item:hover {
  color: var(--signal);
}
</style>
