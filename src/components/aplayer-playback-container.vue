<template>
  <div class="aplayer-playback-container-wrap">
    <div class="player-controls">
      <APlayBackControls />
    </div>
    <div class="player-info-container">
      <APlayBackInfo :playbackInfo="playbackInfo" />
    </div>
    <div class="player-meta-controls">
      <APlayerIcon
        :icon="handleVolumeIcon"
        className="volume"
        :key="handleVolumeIcon"
        @click="volumeValue = 0"
      />
      <input
        type="range"
        class="volume-progress"
        ref="volumeRefs"
        v-model="volumeValue"
        min="0"
        max="100"
      />
      <APlayerIcon icon="queue-button" className="queue-button" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from "vue";
import APlayBackControls from "./aplayer-playback-controls.vue";
import APlayBackInfo from "./aplayer-playback-info.vue";
import APlayerIcon from "./aplayer-icon.vue";
import { IPlaybackInfoItems } from "../types/types";

const playbackInfo = reactive<IPlaybackInfoItems>({
  music: "21312",
  cover: "",
  singer: "暂无",
  album: "暂无",
  musicURL: "",
  durationTime: "144",
  currentTime: "1",
});
const volumeValue = ref(0);
const volumeRefs = ref();
watch(volumeValue, async () => {
  await nextTick();
  volumeRefs.value.style.setProperty("--percentage", `${volumeValue.value}%`);
});
const handleVolumeIcon = computed(() => {
  let icons = "";
  if (volumeValue.value > 50) {
    icons = "volume-2";
  } else if (volumeValue.value <= 50 && volumeValue.value > 0) {
    icons = "volume-1";
  } else if (volumeValue.value == 0) {
    icons = "volume-mute";
  }
  return icons;
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
.aplayer-playback-container-wrap:hover::v-deep(
    .progress::-webkit-slider-thumb,
    .progress ::-moz-range-thumb
  ) {
  opacity: 1;
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
  cursor: pointer;
}
.volume-progress {
  width: 70px;
  height: 3px;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: linear-gradient(
    to right,
    #7f7f7f 0%,
    #7f7f7f var(--percentage, 0%),
    #e5e5e5 var(--percentage, 0%),
    #e5e5e5 100%
  );
}
.volume-progress::-webkit-slider-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background-color: #808080;
  border: 1px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  outline: none;
}

.volume-progress ::-moz-range-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background-color: #808080;
  border: 1px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  outline: none;
}
</style>
