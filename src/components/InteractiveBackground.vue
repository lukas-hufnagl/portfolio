<template>
  <!-- Only show on desktop - too heavy for mobile -->
  <div v-if="!isMobile" class="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div 
      v-for="(particle, i) in particles" 
      :key="i"
      class="absolute rounded-full bg-primary/20 dark:bg-primary/10 blur-xl will-change-transform"
      :style="{
        width: particle.size + 'px',
        height: particle.size + 'px',
        left: particle.x + 'px',
        top: particle.y + 'px',
        transform: `translate(-50%, -50%) scale(${particle.scale})`,
        opacity: particle.opacity
      }"
    />
    <div 
      class="absolute w-[600px] h-[600px] rounded-full blur-[150px] will-change-transform"
      :class="isDark ? 'bg-primary/15' : 'bg-primary/10'"
      :style="{ transform: `translate(${mouseX - 300}px, ${mouseY - 300}px)` }"
    />
    <div 
      class="absolute w-[400px] h-[400px] rounded-full blur-[120px] will-change-transform"
      :class="isDark ? 'bg-accent/15' : 'bg-accent/10'"
      :style="{ transform: `translate(${mouseX - 200}px, ${mouseY - 200}px)` }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const mouseX = ref(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
const mouseY = ref(typeof window !== 'undefined' ? window.innerHeight / 2 : 0)
const isDark = ref(true)
const isMobile = ref(false)

interface Particle {
  x: number
  y: number
  size: number
  scale: number
  opacity: number
  vx: number
  vy: number
}

const particles = ref<Particle[]>([])

const initParticles = () => {
  particles.value = Array.from({ length: 4 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 200 + 100,
    scale: 1,
    opacity: Math.random() * 0.3 + 0.1,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3
  }))
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

let animationFrame: number
let lastTime = 0
const fps = 30 // Limit to 30fps for better performance

const animate = (currentTime: number) => {
  if (currentTime - lastTime >= 1000 / fps) {
    lastTime = currentTime
    particles.value.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      if (p.x < -100 || p.x > window.innerWidth + 100) p.vx *= -1
      if (p.y < -100 || p.y > window.innerHeight + 100) p.vy *= -1
    })
  }
  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  // Check if mobile
  isMobile.value = window.innerWidth < 768 || 'ontouchstart' in window
  
  if (!isMobile.value) {
    initParticles()
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animate(0)
  }
  
  isDark.value = document.documentElement.classList.contains('dark')
  const observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  cancelAnimationFrame(animationFrame)
})
</script>
