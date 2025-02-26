<template>
  <button 
    @click="toggleTheme" 
    class="p-2 rounded-full transition-colors duration-200 focus:outline-none"
    :class="{ 
      'text-blue-300 hover:text-blue-200': isDark,
      'text-yellow-500 hover:text-yellow-600': !isDark
    }"
    aria-label="Toggle dark mode"
  >
    <!-- Debug info to see current theme value -->
    <span class="sr-only">Current theme: {{ currentTheme }}</span>
    
    <!-- Fixed icon approach - using conditional rendering instead of class binding -->
    <i v-if="isDark" class="mdi mdi-moon-waning-crescent text-2xl"></i>
    <i v-else class="mdi mdi-white-balance-sunny text-2xl"></i>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useThemeStore } from '../stores/theme'

export default defineComponent({
  name: 'ThemeToggle',
  setup() {
    const themeStore = useThemeStore()
    
    // Use computed properties to ensure reactivity
    const currentTheme = computed(() => themeStore.theme)
    const isDark = computed(() => currentTheme.value === 'dark')
    
    console.log('ThemeToggle setup, initial theme:', currentTheme.value)

    return {
      currentTheme,
      isDark,
      toggleTheme: themeStore.toggleTheme
    }
  }
})
</script>