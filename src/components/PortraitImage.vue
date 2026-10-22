<!-- Always in its own near-square proportions: sized by width, never cropped. -->
<template>
  <figure
    class="relative max-w-[26rem] overflow-hidden rounded-photo bg-paper-raised after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-line"
  >
    <picture>
      <source type="image/webp" :srcset="SRCSET" :sizes="SIZES" />
      <img
        class="block h-auto w-full"
        src="/img/og.jpg"
        alt="Lukas Hufnagl, smiling, on a forest trail"
        width="1000"
        height="1011"
        fetchpriority="high"
        decoding="async"
      />
    </picture>
  </figure>
</template>

<script setup lang="ts">
const SRCSET = [320, 640, 960].map(w => `/img/portrait-${w}.webp ${w}w`).join(', ')
const SIZES = '(min-width: 1024px) 26rem, 6.5rem'
</script>
