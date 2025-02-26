<template>
  <component
    :is="tag"
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 400, ease: 'easeOut' } }"
    :leave="{ opacity: 0, y: -20, transition: { duration: 300, ease: 'easeIn' } }"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageTransition',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  }
})
</script>