<template>
  <div
    class="container h-screen d-flex flex-column justify-center align-center text-center"
  >
    <h3 class="mb-4">Choose Image Aspect Ratio</h3>

    <div class="d-flex flex-wrap align-center justify-center ga-5">
      <v-btn
        variant="outlined"
        class="button aspect-ratio-chip landscape font-weight-bold"
        @click="cardStore.setAspectRatio('landscape')"
      >
        16:9 Landscape
      </v-btn>
      <v-btn
        variant="outlined"
        class="button aspect-ratio-chip square font-weight-bold"
        @click="cardStore.setAspectRatio('square')"
      >
        1:1 Square
      </v-btn>
      <v-btn
        variant="outlined"
        class="button aspect-ratio-chip portrait font-weight-bold"
        @click="cardStore.setAspectRatio('portrait')"
      >
        9:16 Portrait
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useCardStore } from '@/store/card'

  const cardStore = useCardStore()
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
</style>
