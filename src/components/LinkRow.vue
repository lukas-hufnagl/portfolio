<template>
  <!-- One row of a .rows list that opens another page. Render inside a <ul class="rows">. -->
  <li>
    <RouterLink :to="to" class="row row--link">
      <span class="mono row__label">{{ label }}</span>
      <span class="row__body"><slot /></span>
      <span class="arrow" aria-hidden="true">→</span>
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
defineProps<{ to: string; label?: string }>()
</script>

<style scoped>
.arrow {
  color: var(--ink-2);
  transition: color 0.2s;
}
.row--link:hover .arrow,
.row--link:focus-visible .arrow {
  color: var(--ink);
}
</style>
