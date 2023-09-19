<template>
  <div class="playback-controls">
    <AplayerIcon icon="shuffle" />
    <AplayerIcon icon="backward" />
    <AplayerIcon icon="play" />
    <AplayerIcon icon="forward" />
    <AplayerIcon icon="repeat" />
  </div>
</template>
<script lang="ts" setup>
import AplayerIcon from "./aplayer-icon.vue";
</script>
<style scoped>
.playback-controls {
  display: flex;
}
.icon {
  width: 32px;
  height: 28px;
  cursor: pointer;
}
::v-deep(.aplayer-icon-fill) {
  fill: #707070;
  transition: fill 0.2s;
}
.icon:hover ::v-deep(.aplayer-icon-fill) {
  fill: #1f1f1f;
}
</style>
