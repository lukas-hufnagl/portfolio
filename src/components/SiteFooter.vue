<template>
  <footer
    class="frame mono flex justify-between gap-4 py-[clamp(0.5rem,2svh,1.25rem)] text-ink-3 sm:py-5"
  >
    <span>© {{ year }} {{ person.name }}</span>
  </footer>
</template>

<script setup lang="ts">
import { person } from '../content/site'

const year = new Date().getFullYear()
</script>
