<template>
  <select
    v-model="selectedTheme"
    class="custom-select pa-1 border-primary rounded border-md"
  >
    <option
      v-for="theme in cardStore.themeOptions"
      :key="theme"
      :value="theme"
    >
      {{ theme }}
    </option>
  </select>
</template>

<script setup lang="ts">
  import { useCardStore } from '@/store/card'
  import { ref, watch } from 'vue'

  const cardStore = useCardStore()
  const selectedTheme = ref('Theme: Realistic style')

  watch(
    selectedTheme,
    (newTheme) => {
      cardStore.frame.forEach((frameItem) => (frameItem.theme = newTheme))
    },
    { immediate: true },
  )
</script>

<style scoped lang="css">
  .custom-select {
    width: 250px;
  }
</style>
