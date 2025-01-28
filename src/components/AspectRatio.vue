<template>
  <div
    class="h-screen container d-flex flex-column justify-center align-center text-center"
  >
    <v-label class="mb-2 font-weight-black">Choose Image Aspect Ratio</v-label>
    <v-divider class="mb-4" />
    <div class="d-flex flex-wrap align-center justify-center">
      <div
        class="button ma-3 pa-4 flex-row align-center rounded border-primary text-caption aspect-ratio-chip font-weight-bold landscape"
        @click="setAspectRatio('landscape')"
      >
        16:9 Landscape
      </div>
      <div
        class="button pa-4 ma-3 flex-row align-center rounded border-primary text-caption aspect-ratio-chip font-weight-bold square"
        @click="setAspectRatio('square')"
      >
        1:1 Square
      </div>
      <div
        class="button pa-4 ma-3 flex-row align-center rounded border-primary text-caption aspect-ratio-chip font-weight-bold portrait"
        @click="setAspectRatio('portrait')"
      >
        9:16 Portrait
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useCardStore } from '@/store/card'
  import { ref } from 'vue'

  const cardStore = useCardStore()
  const aspectRatio = ref('')

  const setAspectRatio = (ratio: string) => {
    aspectRatio.value = ratio
    const dimensions: Record<string, [number, number]> = {
      landscape: [1080, 566],
      square: [1080, 1080],
      portrait: [566, 1080],
    }
    if (dimensions[ratio]) {
      ;[cardStore.width, cardStore.height] = dimensions[ratio]
    }
  }
</script>

<style scoped>
  .container {
    background-image: linear-gradient(
      105.5deg,
      rgba(31, 212, 248, 1) 11%,
      rgba(218, 15, 183, 1) 74.9%
    );
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
    background-color: white;
    transition: 0.3s all;
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

  .button {
    width: 200px !important;
    height: 70px !important;
    border: 2px solid white;
    color: white;
    cursor: pointer;
    transition: 0.3s all;
  }

  .button:hover {
    border: 2px solid greenyellow;
    color: greenyellow;
    transform: scale(1.1);
  }

  .button:hover.aspect-ratio-chip::before {
    background-color: greenyellow;
  }
</style>
