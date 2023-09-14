<script setup lang="ts">
import AplayerPlaybackContainer from "./components/aplayer-playback-container.vue";
import AplayerPlayerLIst from "./components/aplayer-playlist.vue";
</script>

<template>
  <div class="aplayer-body">
    <AplayerPlaybackContainer />
    <AplayerPlayerLIst />
    <audio />
  </div>
</template>

<style scoped>
.aplayer-body {
  position: relative;
  height: 100vh;
}
</style>
