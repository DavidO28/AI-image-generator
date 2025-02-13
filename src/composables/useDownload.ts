import { useCardStore } from '@/store/card'
import { ref } from 'vue'

const cardStore = useCardStore()

export const errorState = ref(false)
export const errorMessage = ref('')

export const downloadImg = (index: number) => {
  let imgPath = cardStore.frame[index].url
  let fileName = getFileName(imgPath, index)

  fetch(imgPath)
    .then((res) => res.blob())
    .then((blob) => {
      const img = new Image()
      const url = window.URL.createObjectURL(blob)

      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx!.drawImage(img, 0, 0)

        canvas.toBlob((newBlob) => {
          const downloadUrl = window.URL.createObjectURL(newBlob!)
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = downloadUrl
          a.download = fileName
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(downloadUrl)
        }, 'image/png')
      }
      img.src = url
    })
    .catch((error) => {
      console.error('Download failed', error)
    })
}

const getFileName = (str: string, index: number) => {
  const prompt = cardStore.frame[index].prompt
  let fileName = prompt.length > 50 ? prompt.slice(0, 50) : prompt

  return fileName + '.png'
}

export const downloadAllImages = () => {
  const hasGeneratedImage = cardStore.frame.some((frame) => frame.url)

  if (!hasGeneratedImage) {
    errorState.value = true
    errorMessage.value = 'Generate at least one image in order to download'
    return
  }

  cardStore.frame.forEach((frame, index) => {
    if (frame.url) {
      downloadImg(index)
    }
  })
}
