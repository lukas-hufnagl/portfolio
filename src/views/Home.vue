<template>
  <div class="relative z-10">
    <Hero />
    
    <!-- Combined About & Timeline Section for large screens -->
    <section id="about-timeline" class="hidden 2xl:block py-16 px-6 bg-white dark:bg-black">
      <div class="max-w-[1600px] mx-auto grid grid-cols-2 gap-16">
        <!-- About Side -->
        <div id="about">
          <About :compact="true" />
        </div>
        <!-- Timeline Side -->
        <div id="timeline">
          <Timeline :compact="true" />
        </div>
      </div>
    </section>
    
    <!-- Regular sections for smaller screens -->
    <div class="2xl:hidden">
      <About />
      <Timeline />
    </div>
    
    <Achievements />
    <Contact />
  </div>
</template>

<script setup lang="ts">
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Timeline from '../components/Timeline.vue'
import Achievements from '../components/Achievements.vue'
import Contact from '../components/Contact.vue'
</script>
