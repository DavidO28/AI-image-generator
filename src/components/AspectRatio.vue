<template>
  <div
    class="container h-screen d-flex flex-column justify-center text-center pa-3"
  >
    <h1>AI Image generator</h1>
    <h3 class="my-4">Choose Image Aspect Ratio</h3>

    <div
      class="d-flex flex-wrap align-center justify-center ga-5 zoom-animation"
    >
      <v-btn
        v-for="(label, ratio) in aspectRatios"
        :key="ratio"
        variant="outlined"
        class="button aspect-ratio-chip font-weight-bold"
        :class="ratio"
        @click="setAspectRatio(ratio)"
      >
        {{ ratio }}
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useCardStore } from '@/store/card'
  const cardStore = useCardStore()

  const aspectRatios = {
    landscape: { width: '1080', height: '566' },
    square: { width: '566', height: '566' },
    portrait: { width: '566', height: '1080' },
  }

  const setAspectRatio = (ratio: keyof typeof aspectRatios) => {
    cardStore.aspectRatio = ratio

    const dimensions = aspectRatios[ratio]
    cardStore.width = dimensions.width
    cardStore.height = dimensions.height

    cardStore.frame.forEach((frameItem) => {
      frameItem.width = cardStore.width || ''
      frameItem.height = cardStore.height || ''
    })
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

  .aspect-ratio-chip::before {
    content: '';
    margin-right: 0.5rem;
    background-color: black;
    transition: 0.3s all;
  }

  .aspect-ratio-chip.landscape::before {
    width: 1.6rem;
    height: 0.9rem;
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
    width: 200px;
    height: 55px;
    transition: 0.3s all;
  }

  .button:hover {
    border: 1px solid greenyellow;
    color: greenyellow;
    transform: scale(1.1);
  }

  .button:hover.aspect-ratio-chip::before {
    background-color: greenyellow;
  }

  .zoom-animation {
    opacity: 0;
    transform: scale(0);
    animation: zoomIn 1s ease-out forwards;
  }

  @keyframes zoomIn {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
