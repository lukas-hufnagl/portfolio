<template>
  <a href="#main" class="skip mono">Skip to content</a>
  <div class="shell">
    <SiteHeader />
    <main id="main" class="shell__main" tabindex="-1">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<style scoped>
/* Header, page, footer: the page grows, so a short page still puts the footer at the bottom. */
.shell {
  display: flex;
  flex-direction: column;
  min-height: 100svh;
}
.shell__main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.shell__main:focus {
  outline: none;
}

.skip {
  position: fixed;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 60;
  padding: 0.5rem 0.75rem;
  background: var(--ink);
  color: var(--bg);
  transform: translateY(-200%);
}
.skip:focus-visible {
  transform: none;
}

/* Page change: a short cross-fade, nothing more. */
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.22s var(--ease),
    transform 0.22s var(--ease);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.page-leave-to {
  opacity: 0;
}
</style>
