<template>
  <div class="aplayer-playback-container-wrap">
    <div class="player-controls">
      <APlayBackControls />
    </div>
    <div class="player-info-container">
      <APlayBackInfo :playbackInfo="playbackInfo" />
    </div>
    <div class="player-meta-controls">
      <APlayerIcon icon="volume-3" className="volume" />
      <APlayerIcon icon="queue-button" className="queue-button" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import APlayBackControls from "./aplayer-playback-controls.vue";
import APlayBackInfo from "./aplayer-playback-info.vue";
import APlayerIcon from "./aplayer-icon.vue";
import { IPlaybackInfoItems } from "../types/types";

const playbackInfo = reactive<IPlaybackInfoItems>({
  music: "21312",
  cover: "",
  singer: "暂无",
  album: "暂无",
});
</script>

<style scoped>
.aplayer-playback-container-wrap {
  height: 54px;
  width: 100vw;
  border-top: 1px solid #e8e8e8;
  display: flex;
  position: absolute;
  bottom: 0;
}
.aplayer-playback-container-wrap > div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.player-controls {
  flex: 1;
}
.player-info-container {
  flex: 2;
}
.player-meta-controls {
  flex: 1;
}
::v-deep(.icon-volume) {
  fill: #707070;
  width: 32px;
  height: 28px;
}
.volume,
.queue-button {
  fill: #707070;
  width: 32px;
  height: 28px;
}
</style>
