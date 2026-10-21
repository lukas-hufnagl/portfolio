<template>
  <!--
    "LH." that unfolds into "Lukas Hufnagl." — the L and the H never move out of the word;
    only the letters between and after them open up. Closed on the home page, where the name
    is already the headline; open everywhere else.
  -->
  <span class="mark" :class="{ 'is-open': open }" aria-hidden="true"
    >L<span class="mark__fold" style="--i: 0"
      ><span class="mark__clip"><span class="mark__text">ukas&nbsp;</span></span></span
    >H<span class="mark__fold" style="--i: 1"
      ><span class="mark__clip"><span class="mark__text">ufnagl</span></span></span
    ><span class="mark__dot"
  /></span>
</template>

<script setup lang="ts">
defineProps<{ open: boolean }>()
</script>

<style scoped>
.mark {
  display: inline-flex;
  align-items: baseline;
  font-size: 1.0625rem;
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 1;
  white-space: nowrap;
}

/*
 * Each fold is a grid track animating 0fr <-> 1fr: a smooth width change to the text's own
 * width. Opening runs left to right ("ukas" first), closing right to left and a little faster.
 * Under prefers-reduced-motion all of this resolves instantly (main.css).
 */
.mark__fold {
  display: inline-grid;
  grid-template-columns: 0fr;
  transition: grid-template-columns 0.4s var(--ease-io);
  transition-delay: calc((1 - var(--i)) * 50ms);
}
.mark__clip {
  min-width: 0;
  overflow: hidden;
}
.mark__text {
  display: inline-block;
  opacity: 0;
  transform: translateX(-0.4em);
  transition:
    opacity 0.2s var(--ease),
    transform 0.4s var(--ease-io);
  transition-delay: calc((1 - var(--i)) * 50ms);
}

.is-open .mark__fold {
  grid-template-columns: 1fr;
  transition-duration: 0.6s;
  transition-timing-function: var(--ease);
  transition-delay: calc(var(--i) * 80ms);
}
.is-open .mark__text {
  opacity: 1;
  transform: none;
  transition-duration: 0.45s, 0.7s;
  transition-timing-function: var(--ease);
  transition-delay: calc(var(--i) * 80ms + 90ms);
}

/* The full stop: the site's signal-red square, as in the favicon. */
.mark__dot {
  width: 0.2em;
  height: 0.2em;
  margin-left: 0.07em;
  background: var(--signal);
}

/* Narrow phones keep the short form, so the navigation always fits. */
@media (max-width: 419px) {
  .is-open .mark__fold {
    grid-template-columns: 0fr;
  }
  .is-open .mark__text {
    opacity: 0;
  }
}
</style>
