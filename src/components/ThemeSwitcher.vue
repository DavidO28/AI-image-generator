<template>
  <div
    v-for="frameItem in cardStore.frame"
    :key="frameItem.id"
  >
    <select
      v-model="frameItem.theme"
      class="custom-select"
    >
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

<style scoped>
  .custom-select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
  }

  .custom-select:focus {
    border-color: #007bff;
    outline: none;
  }
</style>
