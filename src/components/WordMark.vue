<!--
  "LH." that unfolds into "Lukas Hufnagl." — the L and the H never move out of the word;
  only the letters between and after them open up. Closed on the home page, where the name
  is already the headline; open everywhere else. Narrow phones (< 360px) keep the short form,
  so the navigation always fits.

  Each fold is a grid track animating 0fr <-> 1fr: a smooth width change to the text's own
  width. Opening runs left to right ("ukas" first), closing right to left and a little faster;
  the letters slide with it and are clipped by the closing width, never faded.
  Under prefers-reduced-motion all of this resolves instantly (main.css).
-->
<template>
  <span
    class="inline-flex items-baseline text-[1.0625rem] leading-none font-bold tracking-[-0.045em] whitespace-nowrap"
    aria-hidden="true"
    >L<span :class="fold" style="--i: 0"
      ><span class="min-w-0 overflow-hidden"><span :class="letters">ukas&nbsp;</span></span></span
    >H<span :class="fold" style="--i: 1"
      ><span class="min-w-0 overflow-hidden"><span :class="letters">ufnagl</span></span></span
    ><span class="ml-[0.07em] size-[0.2em] bg-signal"
  /></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ open: boolean }>()

// The letters stay opaque: the closing width clips them, so there is never an empty gap.
const fold = computed(() =>
  props.open
    ? 'inline-grid grid-cols-[1fr] transition-[grid-template-columns] duration-600 ease-soft delay-[calc(var(--i)*80ms)] max-[359px]:grid-cols-[0fr]'
    : 'inline-grid grid-cols-[0fr] transition-[grid-template-columns] duration-400 ease-io delay-[calc((1-var(--i))*40ms)]'
)

const letters = computed(() =>
  props.open
    ? 'inline-block translate-x-0 transition-transform duration-600 ease-soft delay-[calc(var(--i)*80ms)]'
    : 'inline-block -translate-x-[0.4em] transition-transform duration-400 ease-io delay-[calc((1-var(--i))*40ms)]'
)
</script>
