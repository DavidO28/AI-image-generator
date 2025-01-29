import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCardStore = defineStore('card', () => {
  const prompt = ref<string>('')
  const width = ref<number | null>(null)
  const height = ref<number | null>(null)
  const aspectRatio = ref<string>('')

  const card = ref([
    {
      width: '',
      height: '',
      prompt: '',
      url: '',
      isLoading: false,
    },
  ])

  const addCard = () => {
    card.value.push({
      width: '',
      height: '',
      prompt: '',
      url: '',
      isLoading: false,
    })
  }

  const setAspectRatio = (ratio: string) => {
    aspectRatio.value = ratio
    const dimensions: Record<string, [number, number]> = {
      landscape: [1080, 566],
      square: [1080, 1080],
      portrait: [566, 1080],
    }
    if (dimensions[ratio]) {
      ;[width.value, height.value] = dimensions[ratio]
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
