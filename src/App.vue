<template>
  <header class="bg-blue-700 text-white shadow-md">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Dr. Xin Qian</h1>
      <div class="flex space-x-4">
        <router-link 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
          class="hover:text-blue-200 transition duration-200"
          active-class="font-bold underline"
        >
          {{ item.name }}
        </router-link>
      </div>
    </nav>
  </header>

  <main class="container mx-auto px-4 py-8">
    <router-view />
  </main>

  <footer class="bg-gray-100 border-t mt-12">
    <div class="container mx-auto px-4 py-6 text-center text-gray-600">
      <p>&copy; {{ new Date().getFullYear() }} Dr. Xin Qian. All rights reserved.</p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const navItems = ref([
      { name: 'Home', path: '/' },
      { name: 'Research', path: '/research' },
      { name: 'Publications', path: '/publications' },
      { name: 'Useful Links', path: '/contact' }
    ])

    return {
      navItems
    }
  }
})
</script>