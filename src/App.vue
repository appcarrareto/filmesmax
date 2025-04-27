<script setup lang="ts">
import { useRoute, RouterView } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { onBeforeMount } from 'vue'
const route = useRoute()

const themeStore = useThemeStore()
const { showTheme } = themeStore

onBeforeMount(() => {
  showTheme()
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="[]">
      <component :is="Component" :key="route.fullPath"></component>
    </keep-alive>
  </router-view>
  <notifications position="bottom center" classes="notifications" :max="1" />
</template>
