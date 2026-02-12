<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div class="spinner" :class="`spinner--${size ?? 'md'}`">
    <div class="spinner__ring" />
  </div>
</template>

<style scoped>
.spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.spinner__ring {
  border-radius: 50%;
  border: 3px solid rgba(99, 102, 241, 0.2);
  border-top-color: #6366f1;
  animation: spin 0.8s linear infinite;
}

.spinner--sm .spinner__ring { width: 1rem; height: 1rem; border-width: 2px; }
.spinner--md .spinner__ring { width: 1.5rem; height: 1.5rem; }
.spinner--lg .spinner__ring { width: 2.5rem; height: 2.5rem; border-width: 4px; }

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
