<template>
  <div>
    <input
      v-model="cardStore.prompt"
      placeholder="prompt"
    />
    <button @click="generateImage">Generate</button>
    <img
      v-if="cardStore.card[0].isLoading"
      :src="cardStore.card[0].url"
      width="500"
      height="250"
    />
  </div>
</template>

<script setup lang="ts">
  import { useCardStore } from '@/store/card'

  const cardStore = useCardStore()

  const generateImage = () => {
    const finalWidth = cardStore.width
    const finalHeight = cardStore.height

    const imageUrl = `https://image.pollinations.ai/prompt/${cardStore.prompt}?width=${finalWidth}&height=${finalHeight}`
    cardStore.card[0].isLoading = true
    cardStore.card[0].url = imageUrl
  }
</script>
