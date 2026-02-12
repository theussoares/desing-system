<script setup lang="ts">
defineProps<{
  label: string
  color?: string
}>()
</script>

<template>
  <span
    class="badge"
    :style="color ? { background: color + '22', color: color, borderColor: color + '44' } : {}"
  >
    {{ label }}
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.7rem;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-radius: 9999px;
  border: 1px solid rgba(99, 102, 241, 0.3);
  background: rgba(99, 102, 241, 0.12);
  color: #a5b4fc;
}
</style>
