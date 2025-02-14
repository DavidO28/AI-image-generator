import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCardStore = defineStore('card', () => {
  const prompt = ref<string>('')
  const width = ref<string | null>(null)
  const height = ref<string | null>(null)
  const aspectRatio = ref<string>('')
  const frameThemes = ref([
    {
      default: '',
      sketch: 'Theme: sketch (black and white colors only) style',
      comic: 'Theme: comic book style',
      animation: 'Theme: animation style',
      anime: 'Theme: anime style',
      pixel: 'Theme: pixel style',
      wood: 'Theme: wood style',
      dark: 'Theme: dark novel style',
      cyberpunk: 'Theme: cyberpunk, futuristic style',
    },
  ])

  const frame = ref([
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
    frame.value.push({
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
      width.value = '1080'
      height.value = '566'
    } else if (ratio === 'square') {
      width.value = '566'
      height.value = '566'
    } else if (ratio === 'portrait') {
      width.value = '566'
      height.value = '1080'
    }

    frame.value.forEach((frameItem) => {
      frameItem.width = width.value || ''
      frameItem.height = height.value || ''
    })
  }

  return {
    prompt,
    width,
    height,
    frame,
    addCard,
    aspectRatio,
    setAspectRatio,
  }
})
