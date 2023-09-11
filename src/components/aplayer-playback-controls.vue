<template>
  <div class="playback-controls">
    <div class="svg-wrap">
      <img src="../assets/shuffle.svg" alt="shuffle" />
    </div>
    <div class="svg-wrap">
      <img src="../assets/backward.svg" alt="backward" />
    </div>
    <div class="play-pause-wrap">
      <div class="svg-wrap">
        <img src="../assets/play.svg" alt="play" />
      </div>
      <div class="svg-wrap">
        <img src="../assets/pause.svg" alt="pause" />
      </div>
    </div>
    <div class="svg-wrap">
      <img src="../assets/forward.svg" alt="forward" />
    </div>
    <div class="svg-wrap">
      <img src="../assets/repeat.svg" alt="repeat" />
    </div>
    <div class="svg-wrap">
      <img src="../assets/repeat-one.svg" alt="repeat-one" />
    </div>
    <AplayerIcon icon="play" />
  </div>
</template>
<script lang="ts" setup>
import AplayerIcon from "./aplayer-icon.vue";
</script>
<style scoped>
.playback-controls {
  display: flex;
}
.svg-wrap {
  width: 32px;
  height: 32px;
}
.svg-wrap img {
  width: 100%;
  height: 100%;
}
</style>
