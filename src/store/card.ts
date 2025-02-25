import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCardStore = defineStore('card', () => {
  const prompt = ref<string>('')
  const theme = ref<string>('')
  const width = ref<string | null>(null)
  const height = ref<string | null>(null)
  const aspectRatio = ref<string>('')
  const themeOptions = [
    'Theme: Realistic style',
    'Theme: Sketch style',
    'Theme: Comic book style',
    'Theme: Animation style',
    'Theme: Anime style',
    'Theme: Pixel style',
    'Theme: Wood style',
    'Theme: Dark novel style',
    'Theme: Futuristic style',
  ]

  const frame = ref([
    {
      id: Math.random(),
      width: '',
      height: '',
      prompt: '',
      url: '',
      isLoading: false,
      theme: '',
    },
  ])

  const addCard = () => {
    frame.value.push({
      id: Math.random(),
      width: '',
      height: '',
      prompt: '',
      url: '',
      isLoading: false,
      theme: '',
    })
  }

  return {
    prompt,
    width,
    height,
    frame,
    addCard,
    aspectRatio,
    themeOptions,
    theme,
  }
})
