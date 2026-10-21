<template>
  <!-- Always in its own near-square proportions: sized by width, never cropped. -->
  <figure class="portrait">
    <picture>
      <source type="image/webp" :srcset="SRCSET" :sizes="SIZES" />
      <img
        class="portrait__img"
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
const SIZES = '(min-width: 1024px) 26rem, 5.5rem'
</script>

<style scoped>
.portrait {
  position: relative;
  width: 100%;
  max-width: 26rem;
  margin: 0;
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--bg-raised);
}
.portrait::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid var(--line);
  border-radius: inherit;
  pointer-events: none;
}

.portrait__img {
  display: block;
  width: 100%;
  height: auto;
}
</style>
