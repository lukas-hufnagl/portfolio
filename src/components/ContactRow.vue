<!-- One row of a `rows` list: render inside a <ul class="rows">. -->
<template>
  <li class="row">
    <span class="mono pt-[0.3em] text-ink-3">{{ label }}</span>
    <div class="max-w-(--measure)">
      <p class="flex flex-wrap items-baseline gap-x-[0.6em]">
        <a :href="`mailto:${person.email}`" class="link-line">{{ person.email }}</a>
        <CopyButton :text="person.email" label="Copy email address" />
      </p>
      <p class="mt-1 flex flex-wrap items-baseline gap-x-[1em]">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="whitespace-nowrap text-ink-2 transition-colors duration-200 hover:text-signal"
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
