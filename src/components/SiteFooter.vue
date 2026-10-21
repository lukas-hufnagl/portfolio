<template>
  <footer class="footer column mono muted">
    <span>© {{ year }} {{ person.name }}</span>
  </footer>
</template>

<script setup lang="ts">
import { person } from '../content/site'

const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 1.25rem;
}
</style>
