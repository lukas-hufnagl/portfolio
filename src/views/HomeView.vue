<template>
  <div class="home column">
    <header class="intro">
      <h1 class="intro__name">
        <span>{{ person.name }}</span>
      </h1>
      <p class="intro__statement">
        Full-stack developer building web applications with Vue, TypeScript and .NET — focused on
        the parts people actually touch.
      </p>
    </header>

    <!-- One line per page, in navigation order, then contact. -->
    <nav class="overview" aria-label="Overview">
      <ul class="rows rows--stack">
        <LinkRow to="/about" label="About">
          <span class="row__line">
            <span>Based in {{ person.location }}</span>
            <span class="row__aside">{{ person.keySkills.join(', ') }}</span>
          </span>
        </LinkRow>
        <LinkRow v-if="current" to="/career" label="Career">
          <span class="row__line">
            <span>{{ current.title }}, {{ current.org }}</span>
            <span class="row__aside">since {{ current.start }}</span>
          </span>
        </LinkRow>

        <!-- The row leads to /work; each project name leads to its own page. -->
        <li class="row row--link work-row">
          <RouterLink to="/work" class="mono row__label work-row__link">Work</RouterLink>
          <span class="row__body row__line">
            <RouterLink
              v-for="project in latest"
              :key="project.slug"
              :to="projectPath(project)"
              class="work-row__project"
            >
              {{ project.title }}
            </RouterLink>
            <span class="row__aside">{{ latest[0]?.year }}</span>
          </span>
          <span class="work-row__arrow" aria-hidden="true">→</span>
        </li>

        <ContactRow />
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { experience, person, projects } from '../content/site'
import { projectPath } from '../content/pages'
import { currentPosition } from '../lib/career'
import { latestProjects } from '../lib/projects'
import ContactRow from '../components/ContactRow.vue'
import LinkRow from '../components/LinkRow.vue'

const current = currentPosition(experience)
// The newest three: enough to show range, few enough for one line; /work lists everything.
const latest = latestProjects(projects, 3)
</script>

<style scoped>
/* One screen: the intro sits in the optical centre, the overview right below it. */
.home {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-block: clamp(1rem, 3.5vh, 4rem);
}

/* ------------------------------------------------ intro */
/* The intro is a size container, so the name can be set to span its width exactly. */
.intro {
  container-type: inline-size;
}
.intro__name {
  overflow: hidden;
  /* Room for ascenders and descenders inside the clipping box. */
  padding-block: 0.1em 0.14em;
  margin-block: -0.1em -0.14em;
  /* "Lukas Hufnagl" sets about 6.1em wide: on phones it fills ~85% of the width, with air. */
  font-size: min(14cqi, 6rem);
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.055em;
  white-space: nowrap;
}
.intro__name > span {
  display: inline-block;
  /* Optical alignment: pull the L's stem onto the text edge. */
  margin-left: -0.05em;
  animation: rise 1s var(--ease) 0.1s both;
}

.intro__statement {
  margin-top: clamp(1rem, 2.5vh, 1.25rem);
  font-size: clamp(1.0625rem, 1rem + 0.3vw, 1.25rem);
  font-weight: 450;
  line-height: 1.35;
  letter-spacing: -0.014em;
  color: var(--ink-2);
  max-width: 32ch;
  text-wrap: pretty;
  animation: fade 0.9s var(--ease) 0.2s both;
}

/* ------------------------------------------------ overview */
.overview {
  margin-top: clamp(1.5rem, 5vh, 3.5rem);
  animation: fade 0.9s var(--ease) 0.32s both;
}
/* Phones: one line of content per row; the details live on the pages themselves. */
@media (max-width: 639px) {
  .overview .row__aside {
    display: none;
  }
}

/*
 * Work row: the "Work" link is stretched over the whole row (so the row opens /work),
 * and the project names sit above it as their own links.
 */
.work-row {
  position: relative;
}
.work-row__link::after {
  content: '';
  position: absolute;
  inset: 0;
}
.work-row__project {
  position: relative;
  z-index: 1;
  background-image: linear-gradient(var(--line-strong), var(--line-strong));
  background-size: 100% 1px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-image 0.2s;
}
.work-row__project:hover,
.work-row__project:focus-visible {
  background-image: linear-gradient(currentColor, currentColor);
}
.work-row__arrow {
  color: var(--ink-2);
}

@media (min-width: 1024px) {
  .intro__name {
    font-size: min(8.5vw, 13svh, 7.5rem);
  }
  .intro__statement {
    max-width: 36ch;
  }
}

@keyframes rise {
  from {
    transform: translateY(105%);
  }
}
@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
}
</style>
