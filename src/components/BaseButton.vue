<script setup lang="ts">
defineProps<{
  label: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :disabled="disabled"
    class="btn"
    :class="[
      `btn--${variant ?? 'primary'}`,
      `btn--${size ?? 'md'}`,
    ]"
    @click="$emit('click', $event)"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Inter', sans-serif;
}

.btn:active { transform: scale(0.97); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* Sizes */
.btn--sm { padding: 0.4rem 0.9rem; font-size: 0.8rem; }
.btn--md { padding: 0.6rem 1.3rem; font-size: 0.9rem; }
.btn--lg { padding: 0.8rem 1.8rem; font-size: 1rem; }

/* Variants */
.btn--primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
}
.btn--primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
  transform: translateY(-1px);
}

.btn--secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
}
.btn--secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn--ghost {
  background: transparent;
  color: #94a3b8;
}
.btn--ghost:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.06);
  color: #e2e8f0;
}
</style>
