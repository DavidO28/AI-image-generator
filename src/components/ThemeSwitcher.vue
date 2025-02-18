<template>
  <v-select
    label="Select theme"
    :items="cardStore.themeOptions"
    v-model="selectedTheme"
    max-width="400px"
    hide-details
  ></v-select>
</template>

<script setup lang="ts">
  import { useCardStore } from '@/store/card'
  import { ref, watch, onMounted } from 'vue'

  const cardStore = useCardStore()

  const selectedTheme = ref('')

  onMounted(() => {
    selectedTheme.value = 'Theme: Realistic'
  })

  watch(selectedTheme, (newValue) => {
    if (newValue) {
      cardStore.frame.forEach((frameItem) => {
        frameItem.theme = `${newValue}`
      })
    }
  })
</script>
