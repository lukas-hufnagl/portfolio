<template>
  <header class="intro">
    <h1 class="intro__title">{{ title }}</h1>
    <p v-if="$slots.default" class="intro__lede"><slot /></p>
  </header>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<style scoped>
.intro {
  margin-bottom: clamp(2rem, 6vh, 3rem);
}

.intro__title {
  font-size: clamp(2.25rem, 9vw, 3.75rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.05em;
  /* Optical alignment, matching the home page name. */
  margin-left: -0.04em;
}

.intro__lede {
  margin-top: 1rem;
  font-size: clamp(1.0625rem, 1rem + 0.3vw, 1.25rem);
  font-weight: 450;
  line-height: 1.35;
  letter-spacing: -0.014em;
  color: var(--ink-2);
  max-width: 34ch;
  text-wrap: pretty;
}
</style>
