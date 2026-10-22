<!--
  Phones and tablets: the photo floats beside title and sentence, which wrap around it and
  use the full width again below it; then the rows.
  Desktop: title and rows on the left, the photo large in its own column on the right.
-->
<template>
  <article
    class="frame page-pad lg:grid lg:grid-cols-[minmax(0,1fr)_26rem] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-[clamp(2rem,5vw,5rem)] lg:[grid-template-areas:'intro_photo'_'rows_photo']"
  >
    <!-- First in the markup so that, on phones, title and sentence can flow around it. -->
    <PortraitImage
      class="float-right mt-[0.35rem] mb-3 ml-5 w-[clamp(4.5rem,22vw,6.5rem)] lg:float-none lg:m-0 lg:mt-[0.4rem] lg:w-full lg:[grid-area:photo]"
    />

    <div class="lg:[grid-area:intro]">
      <PageIntro title="About">
        I’m Lukas, a full-stack developer building web applications with Vue, TypeScript and .NET.
      </PageIntro>
    </div>

    <!-- Career lives on its own page; here: where I am, what I work with, what else I do. -->
    <dl class="rows clear-both lg:[grid-area:rows]">
      <div v-for="row in rows" :key="row.label" class="row">
        <dt class="mono pt-[0.3em] text-ink-3">{{ row.label }}</dt>
        <dd class="max-w-(--measure)">{{ row.value }}</dd>
      </div>
    </dl>
  </article>
</template>

<script setup lang="ts">
import { person, skills } from '../content/site'
import PageIntro from '../components/PageIntro.vue'
import PortraitImage from '../components/PortraitImage.vue'
import { formatSentenceList } from '../lib/text'

const rows = [
  { label: 'Based in', value: person.location },
  ...skills.map(group => ({ label: group.area, value: group.items.join(', ') })),
  { label: 'Interests', value: formatSentenceList(person.interests) }
]
</script>
