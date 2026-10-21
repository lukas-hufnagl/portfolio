<template>
  <article class="view column about">
    <PageIntro title="About" class="about__intro">
      I’m Lukas, a full-stack developer building web applications with Vue, TypeScript and .NET.
    </PageIntro>

    <PortraitImage class="about__portrait" />

    <!-- Career lives on its own page; here: where I am, what I work with, what else I do. -->
    <dl class="rows about__rows">
      <div class="row">
        <dt class="mono row__label">Based in</dt>
        <dd class="row__body">{{ person.location }}</dd>
      </div>
      <div v-for="group in skills" :key="group.area" class="row">
        <dt class="mono row__label">{{ group.area }}</dt>
        <dd class="row__body">{{ group.items.join(', ') }}</dd>
      </div>
      <div class="row">
        <dt class="mono row__label">Interests</dt>
        <dd class="row__body">{{ interests }}</dd>
      </div>
    </dl>
  </article>
</template>

<script setup lang="ts">
import { person, skills } from '../content/site'
import PageIntro from '../components/PageIntro.vue'
import PortraitImage from '../components/PortraitImage.vue'
import { formatSentenceList } from '../lib/text'

const interests = formatSentenceList(person.interests)
</script>

<style scoped>
/*
 * Phones and tablets: a profile header — title and sentence, the photo small beside them —
 * then the rows across the full width.
 * Desktop: title and rows on the left, the photo large in its own column on the right.
 */
.about {
  display: grid;
  grid-template-columns: minmax(0, 1fr) clamp(5.5rem, 26vw, 9rem);
  grid-template-areas:
    'intro photo'
    'rows  rows';
  column-gap: 1.25rem;
  row-gap: 2rem;
  align-items: start;
}
.about .about__intro {
  grid-area: intro;
  margin-bottom: 0;
}
.about__portrait {
  grid-area: photo;
  /* Level with the top of the title's capitals. */
  margin-top: 0.35rem;
}
.about__rows {
  grid-area: rows;
}

@media (min-width: 1024px) {
  .about {
    grid-template-columns: minmax(0, 1fr) 26rem;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'intro photo'
      'rows  photo';
    column-gap: clamp(2rem, 5vw, 5rem);
    row-gap: clamp(2rem, 6vh, 3rem);
  }
  .about__portrait {
    margin-top: 0.4rem;
  }
}
</style>
