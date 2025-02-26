import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // Get the initial theme from localStorage or system preference
  const getInitialTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    
    try {
      // Check if there's a saved preference in localStorage
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'dark' || savedTheme === 'light') {
        console.log('Found saved theme in localStorage:', savedTheme);
        return savedTheme;
      }

      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('Using system dark mode preference');
        return 'dark';
      }

      // Default to light
      console.log('No preference found, defaulting to light');
      return 'light';
    } catch (error) {
      console.error('Error determining theme:', error);
      return 'light';
    }
  }

  // Get the initial theme
  const initialTheme = getInitialTheme();
  console.log('Initial theme value:', initialTheme);
  
  const theme = ref<'light' | 'dark'>(initialTheme);

  // Apply theme changes to the DOM
  const applyTheme = (newTheme: 'light' | 'dark') => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    try {
      console.log('Applying theme to DOM:', newTheme);
      
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
        console.log('Added dark class to document');
      } else {
        document.documentElement.classList.remove('dark');
        console.log('Removed dark class from document');
      }
      
      // Save to localStorage
      localStorage.setItem('theme', newTheme);
      console.log('Theme saved to localStorage:', newTheme);
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }

  // Initialize the theme
  if (typeof window !== 'undefined') {
    // Initial application of theme
    applyTheme(theme.value);

    // Watch for system preference changes
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          // Only auto-switch if the user hasn't set a preference
          console.log('System preference changed:', e.matches ? 'dark' : 'light');
          theme.value = e.matches ? 'dark' : 'light';
        }
      });
    } catch (error) {
      console.error('Error setting up media query listener:', error);
    }
  }

  // Watch for theme changes
  watch(theme, (newTheme) => {
    console.log('Theme changed to:', newTheme);
    applyTheme(newTheme);
  });

  // Toggle theme function
  const toggleTheme = () => {
    console.log('Toggle theme: Current theme is', theme.value);
    const newTheme = theme.value === 'light' ? 'dark' : 'light';
    console.log('Switching to', newTheme);
    theme.value = newTheme;
  }

  return {
    theme,
    toggleTheme
  }
})