<template>
  <div>
    <select
      name="theme-selector"
      v-model="selectedTheme"
      class="custom-select pa-1 border-primary rounded border-md"
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
  import { onMounted, ref, watch } from 'vue'

  const cardStore = useCardStore()
  const selectedTheme = ref('')

  onMounted(() => {
    selectedTheme.value = 'Theme: Realistic style'
  })

  watch(
    () => selectedTheme.value,
    (newTheme) => {
      if (newTheme) {
        cardStore.frame.forEach((frameItem) => {
          frameItem.theme = newTheme
        })
      }
    },
    { immediate: true },
  )
</script>

<style scoped lang="css">
  .custom-select {
    width: 250px;
  }
</style>
