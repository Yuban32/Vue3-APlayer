<template>
  <div class="aplayer-container-wrap">
    <div class="player-controls">
      <PlayBackControls />
    </div>
    <div class="player-info-container"></div>
    <div class="player-meta-controls">
      <div class="volume"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayBackControls from "./aplayer-playback-controls.vue";
</script>

<style scoped></style>
