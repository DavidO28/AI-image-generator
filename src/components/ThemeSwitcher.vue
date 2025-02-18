<template>
  <div
    v-for="frameItem in cardStore.frame"
    :key="frameItem.id"
  >
    <select v-model="frameItem.theme">
      <option
        v-for="(theme, id) in cardStore.themeOptions"
        :key="id"
        :value="theme"
      >
        {{ theme }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
  import { useCardStore } from '@/store/card'
  import { watch } from 'vue'

  const cardStore = useCardStore()

  watch(
    () => cardStore.frame,
    (newFrames) => {
      newFrames.forEach((frameItem) => {
        if (!frameItem.theme) {
          frameItem.theme = 'Theme: Realistic'
        }
      })
    },
    { immediate: true },
  )
</script>
