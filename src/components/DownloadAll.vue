<template>
  <v-btn @click="downloadAllImages">Download all images</v-btn>
</template>

<script setup lang="ts">
  import { downloadAllImages } from '@/composables/useDownload'
</script>
