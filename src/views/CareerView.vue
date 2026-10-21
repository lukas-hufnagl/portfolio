<template>
  <article class="view column">
    <PageIntro title="Career"> Where I have worked and studied, most recent first. </PageIntro>

    <ol class="rows">
      <li v-for="p in positions" :key="p.org" class="row">
        <span class="mono row__label" :class="{ 'is-now': p.end === null }">
          {{ formatYears(p) }}
        </span>
        <div class="row__body">
          <h2 class="pos__head">
            <span class="pos__org">{{ p.org }}</span>
            <span class="row__aside">{{ p.title }}</span>
          </h2>
          <p class="pos__note">{{ p.note }}</p>
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

<style scoped>
.pos__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 0.6em;
  font-size: inherit;
  font-weight: 400;
}
.pos__org {
  font-weight: 500;
}
.pos__note {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: var(--ink-2);
}

/* The one point of colour: marks where things stand now. */
.is-now {
  color: var(--ink);
}
.is-now::after {
  content: '';
  display: inline-block;
  width: 0.3125rem;
  height: 0.3125rem;
  margin-left: 0.4rem;
  vertical-align: 0.1em;
  background: var(--signal);
}
</style>
