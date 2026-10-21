<template>
  <article v-if="project" class="view column">
    <RouterLink to="/work" class="mono back">← All work</RouterLink>

    <PageIntro :title="project.title">{{ project.summary }}</PageIntro>

    <dl class="rows">
      <div class="row">
        <dt class="mono row__label">Year</dt>
        <dd class="row__body">{{ project.year }}</dd>
      </div>
      <div class="row">
        <dt class="mono row__label">Stack</dt>
        <dd class="row__body">{{ project.stack.join(', ') }}</dd>
      </div>
      <div v-if="project.highlights.length" class="row">
        <dt class="mono row__label">Highlights</dt>
        <dd class="row__body">
          <ul class="highlights">
            <li v-for="item in project.highlights" :key="item">{{ item }}</li>
          </ul>
        </dd>
      </div>
      <div v-if="project.links.length" class="row">
        <dt class="mono row__label">Links</dt>
        <dd class="row__body">
          <p>
            <a
              v-for="link in project.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="out"
            >
              {{ link.label }} <span aria-hidden="true">↗</span>
              <span class="sr-only">(opens in a new tab)</span>
            </a>
          </p>
        </dd>
      </div>
    </dl>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '../content/site'
import { findProject } from '../lib/projects'
import PageIntro from '../components/PageIntro.vue'

// The route guard guarantees the slug exists; v-if covers the moment between navigations.
const route = useRoute()
const project = computed(() => findProject(projects, route.params.slug))
</script>

<style scoped>
.back {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: var(--ink-3);
  transition: color 0.2s;
}
.back:hover {
  color: var(--ink);
}

.highlights {
  display: grid;
  gap: 0.375rem;
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--ink-2);
}
.highlights li::before {
  content: '—';
  margin-right: 0.6em;
  color: var(--ink-3);
}

.out {
  transition: color 0.2s;
}
.out:hover {
  color: var(--signal);
}
</style>
