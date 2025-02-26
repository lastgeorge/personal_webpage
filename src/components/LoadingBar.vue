<template>
  <div 
    class="fixed top-0 left-0 right-0 z-50 h-1 bg-blue-400"
    :style="{ width: `${progress}%`, opacity: loading ? 1 : 0 }"
  ></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoadingBar',
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const progress = ref(0)
    let interval: number | null = null

    const startLoading = () => {
      loading.value = true
      progress.value = 0
      
      // Simulate progress
      interval = window.setInterval(() => {
        if (progress.value < 80) {
          progress.value += Math.floor(Math.random() * 10) + 1
        }
      }, 100)
    }

    const endLoading = () => {
      progress.value = 100
      
      // Clear the interval
      if (interval) {
        clearInterval(interval)
        interval = null
      }
      
      // After reaching 100%, fade out
      setTimeout(() => {
        loading.value = false
        progress.value = 0
      }, 300)
    }

    onMounted(() => {
      router.beforeEach((to, from, next) => {
        if (to.path !== from.path) {
          startLoading()
        }
        next()
      })

      router.afterEach(() => {
        endLoading()
      })
    })

    onUnmounted(() => {
      if (interval) {
        clearInterval(interval)
      }
    })

    return {
      loading,
      progress
    }
  }
})
</script>

<style scoped>
div {
  transition: width 0.2s ease-in-out, opacity 0.3s ease-in-out;
}
</style>