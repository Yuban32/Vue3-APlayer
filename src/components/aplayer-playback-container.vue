<template>
  <div class="aplayer-playback-container-wrap">
    <div class="player-controls">
      <PlayBackControls />
    </div>
    <div class="player-info-container">
      <PlayBackInfo :playbackInfo="playbackInfo" />
    </div>
    <div class="player-meta-controls">
      <div class="volume"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import PlayBackControls from "./aplayer-playback-controls.vue";
import PlayBackInfo from "./aplayer-playback-info.vue";

const playbackInfo = reactive({});
</script>

<style scoped>
.aplayer-playback-container-wrap {
  height: 54px;
  width: 100vw;
  border-top: 1px solid #e8e8e8;
}
</style>
