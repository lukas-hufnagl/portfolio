<!-- One screen: name, who and where, one sentence, and how to reach me. -->
<template>
  <div class="frame flex flex-1 flex-col justify-center py-[clamp(1rem,3.5vh,4rem)]">
    <!-- A size container, so the name can be sized to the column's width. -->
    <header class="@container">
      <h1
        class="-mt-[0.1em] -mb-[0.14em] overflow-hidden pt-[0.1em] pb-[0.14em] text-[min(14cqi,6rem)] leading-[0.95] font-semibold tracking-[-0.055em] whitespace-nowrap lg:text-[min(8.5vw,13svh,7.5rem)]"
      >
        <!-- -ml: optical alignment, pulling the L's stem onto the text edge. -->
        <span class="-ml-[0.05em] inline-block">
          {{ person.name }}
        </span>
      </h1>
      <p class="mono mt-[clamp(0.75rem,2vh,1.125rem)] text-ink-2">
        {{ subtitle }}
      </p>
      <p
        class="mt-[clamp(0.875rem,2.5vh,1.25rem)] max-w-[32ch] text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-[1.35] font-[450] tracking-[-0.014em] text-pretty text-ink-2 lg:max-w-[36ch]"
      >
        Building web applications with Vue, TypeScript and .NET — focused on the parts people
        actually touch.
      </p>
    </header>

    <ul class="rows mt-[clamp(1.75rem,5vh,3.5rem)]">
      <ContactRow />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { experience, person } from '../content/site'
import { currentPosition } from '../lib/career'
import ContactRow from '../components/ContactRow.vue'

const current = currentPosition(experience)
// "Full Stack Developer at ABB · Based in Austria"
const subtitle = [current && `${current.title} at ${current.org}`, `Based in ${person.location}`]
  .filter(Boolean)
  .join(' · ')
</script>
