<template>
  <v-btn
    class="frame-btn position-fixed rounded-circle"
    @click="addNewFrame"
  >
    <v-icon>mdi-plus</v-icon>
    <v-tooltip
      activator="parent"
      location="left"
    >
      Add new frame
    </v-tooltip>
  </v-btn>
</template>

<script setup lang="ts">
  import { defineEmits } from 'vue'

  const emit = defineEmits(['add-frame'])

  const addNewFrame = () => {
    emit('add-frame')
  }
</script>

<style scoped>
  .frame-btn {
    right: 10px;
    bottom: 10px;
    height: 60px;
  }
</style>
