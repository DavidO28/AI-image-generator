import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCardStore = defineStore('card', () => {
  const prompt = ref<string>('')
  const width = ref<number | null>(null)
  const height = ref<number | null>(null)

  const card = ref([
    {
      width: '',
      height: '',
      prompt: '',
      url: '',
      isLoading: false,
    },
  ])

  return {
    prompt,
    width,
    height,
    card,
  }
})
