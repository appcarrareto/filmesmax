<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogo.vue'
import IconLight from '@/components/icons/IconLight.vue'
import IconDark from '@/components/icons/IconDark.vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <header class="header">
    <RouterLink to="/" class="header-logo">
      <IconLogo />
    </RouterLink>
    <div class="header-theme">
      <div class="button-theme" @click="themeStore.toggleTheme">
        <IconLight v-if="themeStore.getTheme === 'dark-theme'" />
        <IconDark v-else />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.header-logo {
  width: 200px;
}

.header-logo svg {
  width: 100%;
  color: var(--accent-color);
}

.header-theme {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-theme {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background-color: var(--background-color-secondary);
  cursor: pointer;
}

.button-theme svg {
  width: 20px;
  height: 20px;
  color: var(--text-color-primary);
  stroke-width: 1.5;
}

.button-theme svg:hover {
  opacity: 0.6;
}
</style>
