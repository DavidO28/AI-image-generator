<template>
  <div class="container">
    <div class="card-wrapper">
      <div
        v-for="(frame, index) in cardStore.card"
        :key="index"
        class="frame"
      >
        <img
          v-if="frame.url"
          :src="frame.url"
        />
        <div
          @click="generateImage(index)"
          class="icon-container"
          v-else
        >
          <v-icon>mdi-creation</v-icon>
          {{ frame.isLoading ? 'Generating...' : 'Generate image' }}
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

  const generateImage = (index: number) => {
    const frame = cardStore.card[index]
    if (!frame.prompt.trim()) {
      errorState.value = true
      errorMessage.value = 'Prompt is required'
      return
    }
    frame.isLoading = true
    frame.url = `https://image.pollinations.ai/prompt/${frame.prompt}?width=${frame.width}&height=${frame.height}`
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
