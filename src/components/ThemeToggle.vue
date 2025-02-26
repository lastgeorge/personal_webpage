<template>
  <button 
    @click="toggleTheme" 
    class="p-2 rounded-full transition-colors duration-200 focus:outline-none"
    :class="{ 
      'text-yellow-400 hover:text-yellow-500': theme === 'dark',
      'text-gray-700 hover:text-gray-900': theme === 'light'
    }"
    aria-label="Toggle dark mode"
  >
    <i 
      class="mdi text-xl" 
      :class="{ 
        'mdi-white-balance-sunny': theme === 'dark', 
        'mdi-moon-waning-crescent': theme === 'light' 
      }"
    ></i>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useThemeStore } from '../stores/theme'

export default defineComponent({
  name: 'ThemeToggle',
  setup() {
    const themeStore = useThemeStore()

    return {
      theme: themeStore.theme,
      toggleTheme: themeStore.toggleTheme
    }
  }
})
</script>