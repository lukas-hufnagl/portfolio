<template>
  <article class="frame page-pad">
    <PageIntro title="Career">Where I have worked and studied, most recent first.</PageIntro>

    <ol class="rows">
      <li v-for="p in positions" :key="p.org" class="row">
        <!-- The current position gets the signal-red marker. -->
        <span class="mono pt-[0.3em]" :class="p.end === null ? 'now-mark text-ink' : 'text-ink-3'">
          {{ formatYears(p) }}
        </span>
        <div class="max-w-(--measure)">
          <h2 class="flex flex-wrap items-baseline gap-x-[0.6em] text-[length:inherit] font-normal">
            <span class="font-medium">{{ p.org }}</span>
            <span class="whitespace-nowrap text-ink-3">{{ p.title }}</span>
          </h2>
          <p class="mt-1 text-[0.875rem] text-ink-2">{{ p.note }}</p>
        </div>
      </li>
    </ol>
  </article>
</template>

<script setup lang="ts">
import { experience } from '../content/site'
import { formatYears, sortByRecency } from '../lib/career'
import PageIntro from '../components/PageIntro.vue'

const positions = sortByRecency(experience)
</script>
