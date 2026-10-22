<template>
  <article class="frame page-pad">
    <PageIntro title="Work">Selected projects. Work for ABB and ASKI is not shown here.</PageIntro>

    <ul class="rows">
      <LinkRow
        v-for="project in projects"
        :key="project.slug"
        :to="projectPath(project)"
        :label="project.year"
      >
        <span class="font-medium">{{ project.title }}</span>
        <span class="mt-1 block text-ink-2">{{ project.summary }}</span>
        <span class="mt-1 block text-[0.875rem] text-ink-3">{{ project.stack.join(', ') }}</span>
      </LinkRow>
    </ul>
  </article>
</template>

<script setup lang="ts">
import { projects } from '../content/site'
import { projectPath } from '../content/pages'
import PageIntro from '../components/PageIntro.vue'
import LinkRow from '../components/LinkRow.vue'
</script>
