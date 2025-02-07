import { computed } from 'vue'
import { useCardStore } from '@/store/card'

const cardStore = useCardStore()

export const getFrameStyles = computed(() => {
  if (cardStore.aspectRatio === 'landscape') {
    return { width: '300px', height: '250px' }
  } else if (cardStore.aspectRatio === 'square') {
    return { width: '250px', height: '250px' }
  } else if (cardStore.aspectRatio === 'portrait') {
    return { width: '300px', height: '500px' }
  }
  return {}
})

export const getImageStyles = computed(() => {
  if (cardStore.aspectRatio === 'landscape') {
    return { height: '200px' }
  } else if (cardStore.aspectRatio === 'square') {
    return { height: '200px' }
  } else if (cardStore.aspectRatio === 'portrait') {
    return { height: '450px' }
  }
  return {}
})
