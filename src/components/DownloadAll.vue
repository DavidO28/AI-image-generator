<template>
  <div class="mt-2 d-flex justify-center">
    <v-btn
      v-if="cardStore.frame.length > 1"
      @click="downloadAllImages"
    >
      Download all images
    </v-btn>
  </div>
</template>

<script setup lang="ts">
  import { useCardStore } from '@/store/card'
  import { downloadAllImages } from '@/composables/useDownload'

  const cardStore = useCardStore()
</script>
