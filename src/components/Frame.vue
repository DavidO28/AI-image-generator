<template>
  <div class="container">
    <div class="card-wrapper">
      <div
        v-for="(frame, index) in cardStore.card"
        :key="index"
        class="frame"
      >
        <img
          v-if="frame.url && !frame.isLoading"
          :src="frame.url"
        />
        <div
          @click="generateImage(index)"
          class="icon-container"
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

        <input
          v-model="frame.prompt"
          placeholder="Enter prompt"
        />
      </div>
    </div>
    <v-btn
      icon="mdi-plus"
      @click="addNewFrame"
    />
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
  import { ref } from 'vue'
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
</script>

<style scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding: 16px;
    width: 100%;
    height: 100vh;
  }

  .card-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

  .frame {
    width: 400px;
    height: 400px;
    border: 2px solid greenyellow;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .frame img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    pointer-events: none;
    user-select: none;
    -webkit-user-drag: none;
  }

  .input {
    padding: 8px;
    width: 100%;
    height: 100px !important;
    outline: none;
  }

  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    cursor: pointer;
    transition: 0.2s background-color;
  }

  .icon-container:hover {
    background-color: aquamarine;
  }
</style>
