<template>
  <h1>Welcome to AI image studio</h1>
  <h2>Choose Aspect ratio</h2>
  <input
    v-model="cardStore.width"
    placeholder="width"
    type="number"
  />
  <input
    v-model="cardStore.height"
    placeholder="height"
    type="number"
  />
</template>

<script setup lang="ts">
  import { useCardStore } from '@/store/card';

  const cardStore = useCardStore()
</script>
