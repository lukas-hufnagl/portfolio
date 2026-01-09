<template>
  <footer class="py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-[#0A0A0F]">
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-col items-center text-center">
        <nav class="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10">
          <a v-for="link in navLinks" :key="link.href" :href="link.href" class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
            {{ t(`nav.${link.key}`) }}
          </a>
        </nav>

        <div class="flex gap-3 sm:gap-4 mb-8 sm:mb-10">
          <a 
            v-for="social in socials" 
            :key="social.name"
            :href="social.url"
            target="_blank"
            :aria-label="social.name"
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary hover:scale-110 transition-all"
          >
            <component :is="social.icon" class="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
          <span>© {{ new Date().getFullYear() }} Lukas Hufnagl</span>
          <span class="hidden sm:inline">·</span>
          <span>{{ t('footer.made_with') }} 💙</span>
          <span class="hidden sm:inline">·</span>
          <button @click="scrollToTop" class="hover:text-primary transition-colors flex items-center gap-1 group">
            {{ t('footer.back_to_top') }}
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { socials } from './icons'

const { t } = useI18n()

const navLinks = [
  { key: 'home', href: '#hero' },
  { key: 'about', href: '#about' },
  { key: 'timeline', href: '#timeline' },
  { key: 'contact', href: '#contact' }
]

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>
