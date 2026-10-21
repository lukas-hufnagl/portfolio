<template>
  <button type="button" class="mono copy" :aria-label="label" @click="copy">
    <span aria-hidden="true">{{ state === 'copied' ? 'Copied' : 'Copy' }}</span>
  </button>
  <span class="sr-only" role="status" aria-live="polite">{{
    state === 'copied' ? 'Copied to clipboard' : ''
  }}</span>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const props = defineProps<{ text: string; label: string }>()

const state = ref<'idle' | 'copied'>('idle')
let timer: number | undefined

async function copy() {
  try {
    await navigator.clipboard.writeText(props.text)
    state.value = 'copied'
    clearTimeout(timer)
    timer = window.setTimeout(() => (state.value = 'idle'), 2000)
  } catch {
    // Clipboard blocked (insecure context, permissions): select-and-copy is still possible.
    state.value = 'idle'
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.copy {
  color: var(--ink-3);
  cursor: pointer;
  transition: color 0.2s;
}
.copy:hover {
  color: var(--signal);
}
</style>
