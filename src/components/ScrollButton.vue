<template>
  <v-btn
    v-if="showScrollButton"
    class="scroll-btn position-fixed rounded-circle"
    @click="scrollToPosition"
  >
    <v-icon>
      {{ scrollDirection === 'down' ? 'mdi-arrow-down' : 'mdi-arrow-up' }}
    </v-icon>
    <v-tooltip
      activator="parent"
      location="top"
    >
      {{ scrollDirection === 'down' ? 'Scroll down' : 'Scroll up' }}
    </v-tooltip>
  </v-btn>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const showScrollButton = ref<boolean>(false)
  const scrollDirection = ref<'up' | 'down'>('down')
  const scrollY = ref<number>(window.scrollY)
  const documentHeight = ref<number>(document.documentElement.scrollHeight)

  const updateScroll = () => {
    scrollY.value = window.scrollY
    documentHeight.value = document.documentElement.scrollHeight
    showScrollButton.value =
      (scrollY.value < 100 && documentHeight.value > 800) || scrollY.value > 800
    scrollDirection.value = scrollY.value > 800 ? 'up' : 'down'
  }

  const scrollToPosition = () => {
    if (scrollDirection.value === 'down') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', updateScroll)
    window.addEventListener('resize', updateScroll)
  })
</script>

<style scoped>
  .scroll-btn {
    right: 10px;
    height: 60px;
    bottom: 90px;
  }
</style>
