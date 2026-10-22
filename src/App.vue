<template>
  <a
    href="#main"
    class="mono fixed top-3 left-3 z-60 -translate-y-[200%] bg-ink px-3 py-2 text-paper focus-visible:translate-y-0"
  >
    Skip to content
  </a>
  <!-- Header, page, footer: the page grows, so a short page still puts the footer at the bottom. -->
  <div class="flex min-h-svh flex-col">
    <SiteHeader />
    <!--
      Page change: a short cross-fade, nothing more. Every page must render a single root
      element (no comment before it), or the out-in transition can't animate it.
    -->
    <main id="main" class="flex flex-1 flex-col focus:outline-none" tabindex="-1">
      <RouterView v-slot="{ Component, route }">
        <Transition
          mode="out-in"
          enter-active-class="transition duration-[220ms] ease-soft"
          enter-from-class="translate-y-1.5 opacity-0"
          leave-active-class="transition duration-[220ms] ease-soft"
          leave-to-class="opacity-0"
        >
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
