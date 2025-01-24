<template>
  <v-label class="mb-2">Aspect Ratio</v-label>
  <v-divider class="mb-4" />
  <div class="d-flex flex-wrap align-center justify-center">
    <div
      class="button-size flex-grow-1 pa-4 flex-row align-center rounded border-primary text-caption aspect-ratio-chip font-weight-bold landscape"
      :class="aspectRatio === 'landscape' ? 'selected' : 'unselected'"
      @click="setAspectRatio('landscape')"
    >
      16:9 Landscape
    </div>
    <div
      class="button-size pa-4 my-2 flex-grow-1 flex-row align-center rounded border-primary text-caption aspect-ratio-chip font-weight-bold square"
      :class="aspectRatio === 'square' ? 'selected' : 'unselected'"
      @click="setAspectRatio('square')"
    >
      1:1 Square
    </div>
    <div
      class="button-size pa-4 flex-grow-1 flex-row align-center rounded border-primary text-caption aspect-ratio-chip font-weight-bold portrait"
      :class="aspectRatio === 'portrait' ? 'selected' : 'unselected'"
      @click="setAspectRatio('portrait')"
    >
      9:16 Portrait
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useCardStore } from '@/store/card'
  import { ref } from 'vue'

  const cardStore = useCardStore()
  const aspectRatio = ref<string>()

  const setAspectRatio = (ratio: string) => {
    aspectRatio.value = ratio
    if (ratio === 'landscape') {
      cardStore.width = 1080
      cardStore.height = 566
    } else if (ratio === 'square') {
      cardStore.width = 1080
      cardStore.height = 1080
    } else if (ratio === 'portrait') {
      cardStore.width = 1080
      cardStore.height = 1350
    }
  }

  if (!aspectRatio.value) {
    setAspectRatio('landscape')
  }
</script>

<style scoped>
  .selected {
    border: 2px solid #ff9ecf;
    cursor: pointer;
  }

  .unselected {
    border: 2px solid #8e4e6e;
    cursor: pointer;
  }

  .selected-bg-color {
    background-color: #ff9ecf;
  }

  .caption-style {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10rem;
  }

  .aspect-ratio-chip {
    display: inline-flex;
    align-items: center;
    font-weight: bold;
    text-transform: none;
  }

  .aspect-ratio-chip::before {
    content: '';
    margin-right: 0.5rem;
    background-color: #8e4e6e;
  }

  .aspect-ratio-chip.selected::before {
    background-color: #ff9ecf;
  }

  .aspect-ratio-chip.landscape::before {
    width: 1.6rem;
    height: 0.9rem;
    aspect-ratio: 16/9;
  }

  .aspect-ratio-chip.square::before {
    width: 1rem;
    height: 1rem;
  }

  .aspect-ratio-chip.portrait::before {
    width: 0.9rem;
    height: 1.6rem;
  }

  .style-card-title {
    border-top-right-radius: 8rem;
    bottom: 0;
    left: 0;
  }

  .button-size {
    width: 300px !important;
    height: 50px !important;
  }
</style>
