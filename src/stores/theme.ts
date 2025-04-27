import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const mode = ref('dark-theme')

  const getTheme = computed(() => mode.value)

  function showTheme() {
    mode.value = localStorage.getItem('theme') || 'dark-theme'
    document.documentElement.className = mode.value
  }

  function toggleTheme() {
    mode.value = mode.value === 'light-theme' ? 'dark-theme' : 'light-theme'
    updateHtmlClass()
  }

  function updateHtmlClass() {
    const html = document.documentElement
    html.className = mode.value
    localStorage.setItem('theme', mode.value)
  }

  return {
    mode,
    getTheme,
    toggleTheme,
    showTheme
  }
})
