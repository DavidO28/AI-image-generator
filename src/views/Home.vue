<template>
  <div>
    <AspectRatio v-if="!cardStore.width && !cardStore.height" />
    <Frame v-else />
  </div>
</template>

<script setup lang="ts">
  import AspectRatio from '@/components/AspectRatio.vue'
  import Frame from '@/components/Frame.vue'
  import { useCardStore } from '@/store/card'

  const cardStore = useCardStore()
</script>
