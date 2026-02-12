<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
  icon?: string
  label?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="input-group">
    <label v-if="label" class="input-group__label">{{ label }}</label>
    <div class="input-group__wrapper">
      <span v-if="icon" class="input-group__icon">{{ icon }}</span>
      <input
        class="input-group__input"
        :class="{ 'input-group__input--icon': !!icon }"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>

<style scoped>
.input-group__label {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: #94a3b8;
  margin-bottom: 0.4rem;
}

.input-group__wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-group__icon {
  position: absolute;
  left: 0.85rem;
  font-size: 1.1rem;
  pointer-events: none;
  z-index: 1;
}

.input-group__input {
  width: 100%;
  padding: 0.7rem 1rem;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  outline: none;
  transition: all 0.2s ease;
}

.input-group__input--icon {
  padding-left: 2.6rem;
}

.input-group__input::placeholder {
  color: #64748b;
}

.input-group__input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  background: rgba(255, 255, 255, 0.08);
}
</style>
