<template>
  <article class="view column">
    <PageIntro title="Work">
      Selected projects. Work for ABB and ASKI is not shown here.
    </PageIntro>

    <ul class="rows">
      <LinkRow
        v-for="project in projects"
        :key="project.slug"
        :to="projectPath(project)"
        :label="project.year"
      >
        <span class="project__title">{{ project.title }}</span>
        <span class="project__text">{{ project.summary }}</span>
        <span class="project__stack">{{ project.stack.join(', ') }}</span>
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

<style scoped>
.project__title {
  font-weight: 500;
}
.project__text {
  display: block;
  margin-top: 0.25rem;
  color: var(--ink-2);
}
.project__stack {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: var(--ink-3);
}
</style>
