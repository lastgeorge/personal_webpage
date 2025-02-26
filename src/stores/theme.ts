import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // Get the initial theme from localStorage or system preference
  const getInitialTheme = (): 'light' | 'dark' => {
    // Check if there's a saved preference in localStorage
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }

    // Default to light
    return 'light'
  }

  const theme = ref<'light' | 'dark'>(
    typeof window !== 'undefined' ? getInitialTheme() : 'light'
  )

  // Apply theme changes to the DOM
  const applyTheme = (newTheme: 'light' | 'dark') => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      // Save to localStorage
      localStorage.setItem('theme', newTheme)
    }
  }

  // Initialize the theme
  if (typeof window !== 'undefined') {
    applyTheme(theme.value)

    // Watch for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        // Only auto-switch if the user hasn't set a preference
        theme.value = e.matches ? 'dark' : 'light'
      }
    })
  }

  // Watch for theme changes
  watch(theme, (newTheme) => {
    applyTheme(newTheme)
  })

  // Toggle theme function
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return {
    theme,
    toggleTheme
  }
})