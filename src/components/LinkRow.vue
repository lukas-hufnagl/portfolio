<!-- One row of a `rows` list that opens another page. Render inside a <ul class="rows">. -->
<template>
  <li>
    <RouterLink :to="to" class="group row row-link">
      <span class="mono pt-[0.3em] text-ink-3">{{ label }}</span>
      <span class="max-w-(--measure)"><slot /></span>
      <span
        class="text-ink-2 transition-colors duration-200 group-hover:text-ink group-focus-visible:text-ink"
        aria-hidden="true"
        >→</span
      >
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
defineProps<{ to: string; label?: string }>()
</script>
