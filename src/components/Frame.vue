<template>
  <div class="mt-2 d-flex justify-center">
    <v-btn
      v-if="cardStore.frame.length > 1"
      @click="downloadAllImages"
    >
      Download all images
    </v-btn>
  </div>
  <div class="d-flex flex-wrap justify-center ga-4 pa-3">
    <div
      v-for="(frame, index) in cardStore.frame"
      :key="index"
      class="border-md rounded-lg overflow-hidden d-flex flex-column"
      :style="getFrameStyles"
    >
      <v-card
        variant="flat"
        class="position-relative"
        :style="getImageStyles"
      >
        <v-img
          v-if="frame.url && !frame.isLoading"
          :src="frame.url"
          :style="getImageStyles"
          cover
          class="image"
        />
        <div
          v-else
          :class="{ 'hover-effect': !frame.url }"
          class="w-100 h-100 d-flex justify-center align-center overflow-hidden cursor-pointer"
          @click="generateImage(index)"
        >
          <v-progress-circular
            v-if="frame.isLoading"
            color="black"
            indeterminate
          ></v-progress-circular>
          <v-icon v-else>mdi-creation</v-icon>
          <span class="ms-3">
            {{ frame.isLoading ? 'Generating...' : 'Generate image' }}
          </span>
        </div>
        <v-chip
          variant="elevated"
          color="teal"
          class="position-absolute left-0 top-0 ma-1 border-md border-primary font-weight-bold chip"
        >
          {{ index + 1 }}
        </v-chip>
        <v-chip
          v-if="cardStore.frame.length > 1"
          variant="elevated"
          color="red"
          class="position-absolute ma-1 border-md border-primary font-weight-bold right-0 top-0 chip cursor-pointer"
        >
          <v-tooltip
            activator="parent"
            location="start"
          >
            Delete frame
          </v-tooltip>
          <v-dialog
            v-model="dialogs[index]"
            max-width="250"
            activator="parent"
          >
            <v-card
              prepend-icon="mdi-delete"
              title="Delete frame?"
              class="d-flex flex-column align-center"
            >
              <template v-slot:actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="red"
                  @click="dialogs[index] = false"
                >
                  No
                </v-btn>

                <v-btn
                  color="green"
                  @click.stop="deleteFrame(frame.id, index)"
                >
                  Yes
                </v-btn>
              </template>
            </v-card>
          </v-dialog>
          <v-icon>mdi-delete</v-icon>
        </v-chip>
        <v-chip
          v-if="frame.url"
          @click.stop="downloadImg(index)"
          variant="elevated"
          color="white"
          class="position-absolute ma-1 border-md border-primary font-weight-bold right-0 bottom-0 chip"
        >
          <v-tooltip
            activator="parent"
            location="start"
          >
            Download
          </v-tooltip>
          <v-icon>mdi-download</v-icon>
        </v-chip>
      </v-card>

      <v-divider></v-divider>
      <textarea
        class="text-input px-2 py-1"
        v-model="frame.prompt"
        placeholder="Enter your prompt"
        name="prompt"
      ></textarea>
    </div>
  </div>

  <v-btn
    class="frame-btn position-fixed rounded-circle"
    @click="addNewFrame"
  >
    <v-icon>mdi-plus</v-icon>
    <v-tooltip
      activator="parent"
      location="top"
    >
      Add new frame
    </v-tooltip>
  </v-btn>

  <v-snackbar
    v-model="errorState"
    timeout="2000"
    rounded="pill"
    color="red"
  >
    <p class="font-bold text-center">{{ errorMessage }}</p>
    <template v-slot:actions>
      <v-btn
        color="gray"
        variant="text"
        @click="errorState = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useCardStore } from '@/store/card'

  const cardStore = useCardStore()
  const errorState = ref(false)
  const errorMessage = ref('')
  const dialogs = ref<boolean[]>([])

  const addNewFrame = () => {
    cardStore.addCard()
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    }, 100)
  }

  const generateImage = async (index: number) => {
    const frame = cardStore.frame[index]

    if (!frame.prompt.trim()) {
      errorState.value = true
      errorMessage.value = 'Prompt is required'
      return
    }

    frame.isLoading = true

    try {
      const response = await fetch(
        `https://image.pollinations.ai/prompt/${frame.prompt}?width=${frame.width}&height=${frame.height}`,
      )

      if (response.ok) {
        const imageBlob = await response.blob()
        frame.url = URL.createObjectURL(imageBlob)
      } else {
        errorState.value = true
        errorMessage.value = 'Failed to generate, Try changing prompt'
      }
    } catch (error) {
      errorState.value = true
      errorMessage.value = 'An error occurred while generating the image'
    } finally {
      frame.isLoading = false
    }
  }

  const getFrameStyles = computed(() => {
    if (cardStore.aspectRatio === 'landscape') {
      return { width: '300px', height: '250px' }
    } else if (cardStore.aspectRatio === 'square') {
      return { width: '250px', height: '250px' }
    } else if (cardStore.aspectRatio === 'portrait') {
      return { width: '300px', height: '500px' }
    }
    return {}
  })

  const getImageStyles = computed(() => {
    if (cardStore.aspectRatio === 'landscape') {
      return { height: '200px' }
    } else if (cardStore.aspectRatio === 'square') {
      return { height: '200px' }
    } else if (cardStore.aspectRatio === 'portrait') {
      return { height: '450px' }
    }
    return {}
  })

  const deleteFrame = (id: number, index: number) => {
    cardStore.frame = cardStore.frame.filter((frame) => frame.id !== id)
    dialogs.value[index] = false
  }

  const downloadImg = (index: number) => {
    let imgPath = cardStore.frame[index].url
    let fileName = getFileName(imgPath)

    fetch(imgPath)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      })
      .catch((error) => {
        console.error('Download failed', error)
      })
  }

  const getFileName = (str: string) => {
    return str.substring(str.lastIndexOf('/') + 1)
  }

  const downloadAllImages = () => {
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
</script>

<style scoped>
  .hover-effect:hover {
    background-color: greenyellow;
  }

  .image {
    user-select: none;
    pointer-events: none;
  }

  .text-input {
    height: 50px;
    resize: none;
    scrollbar-width: thin;
    outline: none;
  }

  .frame-btn {
    right: 10px;
    bottom: 10px;
    height: 60px;
  }
</style>
