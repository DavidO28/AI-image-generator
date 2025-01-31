<template>
  <div class="pa-3">
    <div class="d-flex flex-wrap justify-center ga-4">
      <div
        v-for="(frame, index) in cardStore.card"
        :key="index"
        class="frame rounded-lg overflow-hidden d-flex flex-column"
        :style="getFrameStyles"
      >
        <v-img
          v-if="frame.url && !frame.isLoading"
          :src="frame.url"
          :style="getImageStyles"
          cover
        />
        <div
          @click="generateImage(index)"
          class="icon-container position-relative d-flex justify-center align-center overflow-hidden cursor-pointer"
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
        <v-chip
          variant="elevated"
          color="teal"
          class="position-absolute ma-1 border-md border-primary font-weight-bold"
        >
          {{ index + 1 }}
        </v-chip>
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
  .frame {
    box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.25);
  }

  .text-input {
    height: 50px;
    resize: none;
    scrollbar-width: thin;
    outline: none;
  }

  .icon-container::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      0deg,
      transparent,
      transparent 30%,
      rgba(0, 255, 255, 0.3)
    );
    transform: rotate(-45deg);
    transition: all 0.75s ease;
    opacity: 0;
  }

  .icon-container:hover::before {
    opacity: 1;
    transform: rotate(-45deg) translateY(100%);
  }

  .frame-btn {
    right: 10px;
    bottom: 10px;
    height: 60px;
  }
</style>
