import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCardStore = defineStore('card', () => {
  const prompt = ref<string>('')
  const width = ref<number | null>(null)
  const height = ref<number | null>(null)
  const aspectRatio = ref<string>('')

  const card = ref([
    {
      id: Math.random(),
      width: '',
      height: '',
      prompt: '',
      url: '',
      isLoading: false,
    },
  ])

  const addCard = () => {
    card.value.push({
      id: Math.random(),
      width: '',
      height: '',
      prompt: '',
      url: '',
      isLoading: false,
    })
  }

  const setAspectRatio = (ratio: string) => {
    aspectRatio.value = ratio
    if (ratio === 'landscape') {
      width.value = 1080
      height.value = 566
    } else if (ratio === 'square') {
      width.value = 1080
      height.value = 1080
    } else if (ratio === 'portrait') {
      width.value = 566
      height.value = 1080
    }
  }

  return {
    prompt,
    width,
    height,
    card,
    addCard,
    aspectRatio,
    setAspectRatio,
  }
})
