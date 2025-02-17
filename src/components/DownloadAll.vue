<template>
  <div class="mt-2 d-flex justify-center">
    <v-btn @click="downloadAllImages">Download all images</v-btn>
  </div>
</template>

<script setup lang="ts">
  import { downloadAllImages } from '@/composables/useDownload'
</script>
