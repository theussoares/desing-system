<script setup lang="ts">
defineProps<{
  brandName?: string
  links?: Array<{ label: string; href: string; active?: boolean }>
}>()
</script>

<template>
  <nav class="navbar">
    <div class="navbar__brand">
      <span class="navbar__logo">⚡</span>
      <span class="navbar__title">{{ brandName ?? 'MicroFrontends' }}</span>
    </div>
    <div class="navbar__links">
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        class="navbar__link"
        :class="{ 'navbar__link--active': link.active }"
      >
        {{ link.label }}
      </a>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: sticky;
  top: 0;
  z-index: 50;
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.navbar__logo {
  font-size: 1.4rem;
}

.navbar__title {
  font-size: 1.1rem;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navbar__links {
  display: flex;
  gap: 0.25rem;
}

.navbar__link {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.navbar__link:hover {
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.06);
}

.navbar__link--active {
  color: #c7d2fe;
  background: rgba(99, 102, 241, 0.15);
}
</style>
