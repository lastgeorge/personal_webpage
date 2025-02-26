<template>
  <div class="flex h-screen">
    <!-- Loading Bar -->
    <loading-bar />
    
    <!-- Sidebar -->
    <aside 
      class="bg-blue-800 text-white dark:bg-dark-surface w-64 fixed h-full overflow-y-auto transform transition-transform duration-300 ease-in-out z-30"
      :class="{'translate-x-0': sidebarOpen, '-translate-x-full': !sidebarOpen}"
    >
      <div class="p-4 border-b border-blue-700 dark:border-gray-700">
        <div class="flex justify-between items-center">
          <h1 class="text-xl font-bold">Dr. Xin Qian</h1>
          <button @click="toggleSidebar" class="text-white focus:outline-none">
            <i class="mdi mdi-close text-2xl"></i>
          </button>
        </div>
      </div>
      <nav class="p-4">
        <ul class="space-y-4">
          <li v-for="item in navItems" :key="item.path">
            <router-link 
              :to="item.path"
              class="flex items-center space-x-4 py-3 px-3 rounded hover:bg-blue-700 dark:hover:bg-blue-900 transition duration-200"
              active-class="bg-blue-700 dark:bg-blue-900"
              @click="sidebarOpen = false"
            >
              <i :class="`mdi ${item.icon} text-2xl`"></i>
              <span class="text-lg">{{ item.name }}</span>
            </router-link>
          </li>
          <li class="pt-4 mt-4 border-t border-blue-700 dark:border-gray-700">
            <div class="flex items-center space-x-4 py-3 px-3">
              <i class="mdi mdi-theme-light-dark text-2xl"></i>
              <span class="text-lg">{{ currentTheme === 'dark' ? 'Dark Mode (On)' : 'Dark Mode (Off)' }}</span>
              <div class="ml-auto">
                <theme-toggle />
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
    
    <!-- Overlay when sidebar is open -->
    <div 
      v-if="sidebarOpen" 
      @click="toggleSidebar" 
      class="fixed inset-0 bg-black bg-opacity-50 z-20"
    ></div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col min-h-screen">
      <header class="bg-blue-700 dark:bg-dark-surface text-white shadow-md z-10">
        <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
          <button @click="toggleSidebar" class="text-white focus:outline-none pl-2">
            <i class="mdi mdi-menu text-2xl"></i>
          </button>
          <div class="flex items-center">
            <div class="flex space-x-8 mr-4">
              <router-link 
                v-for="item in navItems" 
                :key="item.path" 
                :to="item.path"
                class="hover:text-blue-200 dark:hover:text-blue-300 transition duration-200 relative group"
                active-class="text-blue-200 dark:text-blue-300"
              >
                <i :class="`mdi ${item.icon} text-2xl`"></i>
                <span class="absolute left-1/2 transform -translate-x-1/2 mt-1 w-max bg-blue-800 dark:bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {{ item.name }}
                </span>
              </router-link>
            </div>
            <theme-toggle />
          </div>
        </nav>
      </header>

      <main class="container mx-auto px-4 py-8 flex-grow dark:bg-dark-bg dark:text-dark-text" :class="{'ml-64': sidebarOpen}">
        <div :class="{'pl-4': sidebarOpen}">
          <router-view v-slot="{ Component }">
            <page-transition>
              <component :is="Component" />
            </page-transition>
          </router-view>
        </div>
      </main>

      <footer class="bg-gray-100 dark:bg-dark-surface border-t dark:border-gray-800 mt-auto">
        <div class="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} Dr. Xin Qian. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from './stores/theme'
import PageTransition from './components/PageTransition.vue'
import LoadingBar from './components/LoadingBar.vue'
import ThemeToggle from './components/ThemeToggle.vue'

export default defineComponent({
  components: {
    PageTransition,
    LoadingBar,
    ThemeToggle
  },
  name: 'App',
  setup() {
    const router = useRouter();
    const sidebarOpen = ref(false);
    const themeStore = useThemeStore();
    const currentTheme = computed(() => themeStore.theme);
    
    // Fix for mobile viewport height
    if (typeof window !== 'undefined') {
      const setVh = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
      };
      
      window.addEventListener('resize', setVh);
      window.addEventListener('orientationchange', setVh);
      
      // Initial call
      setVh();
    }
    
    // Close sidebar on route change
    if (router) {
      router.afterEach(() => {
        sidebarOpen.value = false;
      });
    }
    
    const navItems = ref([
      { name: 'Home', path: '/', icon: 'mdi-home' },
      { name: 'Research', path: '/research', icon: 'mdi-flask' },
      { name: 'Publications', path: '/publications', icon: 'mdi-file-document-multiple' },
      { name: 'Useful Links', path: '/contact', icon: 'mdi-link-variant' }
    ]);
    
    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value;
    };

    return {
      navItems,
      sidebarOpen,
      toggleSidebar,
      currentTheme
    }
  }
})
</script>

<style>
body {
  overflow-x: hidden;
}

.h-screen {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}

@media (max-width: 768px) {
  .w-64 {
    width: 80vw; /* Make sidebar wider on small screens */
  }
  
  .ml-64 {
    margin-left: 0 !important; /* Don't push content on mobile */
  }
  
  .container {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}
</style>