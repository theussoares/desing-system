<script setup lang="ts">
defineProps<{
  hoverable?: boolean
}>()
</script>

<template>
  <div class="card" :class="{ 'card--hoverable': hoverable }">
    <div v-if="$slots.header" class="card__header">
      <slot name="header" />
    </div>
    <div class="card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  backdrop-filter: blur(12px);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card--hoverable:hover {
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15);
  transform: translateY(-2px);
}

.card__header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.card__body {
  padding: 1.5rem;
}

.card__footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
</style>
