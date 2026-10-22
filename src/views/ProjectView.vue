<template>
  <article v-if="project" class="frame page-pad">
    <RouterLink
      to="/work"
      class="mono mb-[clamp(0.75rem,2.5svh,1.5rem)] inline-block text-ink-3 transition-colors duration-200 hover:text-ink"
    >
      ← All work
    </RouterLink>

    <PageIntro :title="project.title">{{ project.summary }}</PageIntro>

    <dl class="rows">
      <div class="row">
        <dt class="mono pt-[0.3em] text-ink-3">Year</dt>
        <dd class="max-w-(--measure)">{{ project.year }}</dd>
      </div>
      <div class="row">
        <dt class="mono pt-[0.3em] text-ink-3">Stack</dt>
        <dd class="max-w-(--measure)">{{ project.stack.join(', ') }}</dd>
      </div>
      <div v-if="project.links.length" class="row">
        <dt class="mono pt-[0.3em] text-ink-3">Links</dt>
        <dd class="flex max-w-(--measure) flex-wrap gap-x-[1em]">
          <a
            v-for="link in project.links"
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-colors duration-200 hover:text-signal"
          >
            {{ link.label }} <span aria-hidden="true">↗</span>
            <span class="sr-only">(opens in a new tab)</span>
          </a>
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
