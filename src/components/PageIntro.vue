<!-- Phones: spacing shrinks with the visible height, so each page fits one screen. -->
<template>
  <header class="mb-[clamp(1rem,3.5svh,2rem)] sm:mb-[clamp(2rem,6vh,3rem)]">
    <!-- -ml: optical alignment, matching the home page name. -->
    <h1
      class="-ml-[0.04em] text-[clamp(2.25rem,9vw,3.75rem)] leading-none font-semibold tracking-[-0.05em]"
    >
      {{ title }}
    </h1>
    <p
      v-if="$slots.default"
      class="mt-[clamp(0.625rem,1.8svh,1rem)] max-w-[34ch] text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-[1.35] font-[450] tracking-[-0.014em] text-pretty text-ink-2 sm:mt-4"
    >
      <slot />
    </p>
  </header>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>
