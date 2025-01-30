<template>
  <div class="pa-3">
    <div class="card-wrapper">
      <div
        v-for="(frame, index) in cardStore.card"
        :key="index"
        class="frame"
        :style="getFrameStyles"
      >
        <img
          v-if="frame.url && !frame.isLoading"
          :src="frame.url"
          :style="getImageStyles"
        />
        <div
          @click="generateImage(index)"
          class="icon-container"
          :style="getImageStyles"
          v-else
        >
          <v-progress-circular
            v-if="frame.isLoading"
            color="primary"
            indeterminate
          ></v-progress-circular>
          <v-icon v-else>mdi-creation</v-icon>
          <span class="ms-3">
            {{ frame.isLoading ? 'Generating...' : 'Generate image' }}
          </span>
        </div>
        <v-divider></v-divider>
        <textarea
          class="text-input px-2 py-1"
          v-model="frame.prompt"
          placeholder="Enter your prompt"
        ></textarea>
      </div>
    </div>

    <v-btn
      class="frame-btn"
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
  </div>

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

  const addNewFrame = () => cardStore.addCard()

  const generateImage = async (index: number) => {
    const frame = cardStore.card[index]

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
        errorMessage.value = 'Failed to generate image'
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
</script>

<style scoped>
  .card-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

  .frame {
    border: 2px solid black;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .frame img {
    width: 100%;
    object-fit: cover;
    pointer-events: none;
    user-select: none;
    -webkit-user-drag: none;
  }

  .text-input {
    width: 100%;
    height: 50px;
    resize: none;
    scrollbar-width: thin;
  }

  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    cursor: pointer;
    transition: 0.2s background-color;
  }

  .icon-container:hover {
    background-color: aquamarine;
  }

  .frame-btn {
    position: fixed;
    right: 10px;
    bottom: 10px;
    height: 60px;
    border-radius: 50%;
  }
</style>
