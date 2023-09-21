<template>
  <div class="aplayer-lyric-wrap">
    <div class="bg" ref="bg"></div>
    <div class="close-lyric-view">
      <APlayerIcon icon="close" @click="sendCloseLyricStatus" />
    </div>
    <div class="lyric-controls-wrap">
      <div class="lyric-controls">
        <div class="lyric-controls-cover-wrap">
          <img
            id="image"
            :src="props.currentMusicData.cover"
            alt="cover"
            ref="img"
            v-if="props.currentMusicData.cover != ''"
          />
          <APlayerIcon icon="music" v-else />
        </div>
        <div class="lyric-controls-music-info">
          <p class="music-title">{{ props.currentMusicData.music }}</p>
          <p class="singer">
            {{ props.currentMusicData.singer }} -
            <span class="album">{{ props.currentMusicData.album }}</span>
          </p>
        </div>
        <div class="lyric-controls-music-progress-bar-wrap">
          <input
            type="range"
            class="music-progress-bar progress"
            v-model="progressValue"
            @input="handleProgressValueInput"
            ref="progressRefs"
            min="0"
            max="100"
          />
          <p>
            <span class="currentTime">{{ currentTime }}</span>
            <span class="durationTime">{{ durationTime }}</span>
          </p>
        </div>
        <div class="lyric-controls-icons">
          <APlayerIcon icon="shuffle" className="repeat-icons" />
          <APlayerIcon icon="backward" />
          <APlayerIcon
            :icon="playIcons"
            @click="emitPlayStatus"
            :key="playIcons"
          />
          <APlayerIcon icon="forward" />
          <APlayerIcon icon="repeat-one" className="repeat-icons" />
        </div>
        <div class="lyric-controls-volume-progress-wrap">
          <APlayerIcon
            :icon="handleVolumeIcon"
            className="volume"
            :key="handleVolumeIcon"
            @click="volumeValue = 0"
          />
          <input
            type="range"
            class="volume-progress progress"
            ref="volumeRefs"
            v-model="volumeValue"
            min="0"
            max="100"
          />
        </div>
      </div>
    </div>
    <div class="lyric-content-wrap">没有可显示的歌词。</div>
  </div>
</template>

<script setup lang="ts">
//vue
import { Ref, inject, nextTick, ref, watch } from "vue";
//components
import APlayerIcon from "./aplayer-icon.vue";
//hooks
import { useVolumeIcons } from "../hooks/useVolumeIcons";
//types
import { ICurrentMusicData } from "../types/types";

const props = defineProps<ICurrentMusicData>();
const img = ref<HTMLImageElement>();
const volumeRefs = ref();
const bg = ref<HTMLDivElement>();
nextTick(() => {
  (
    bg.value?.style as CSSStyleDeclaration
  ).backgroundImage = `url(${props.currentMusicData.cover})`;
});
const emit = defineEmits([
  "closeLyric",
  "updateVolume",
  "updateCurrentTime",
  "changePlayStatus",
]);
const sendCloseLyricStatus = () => {
  emit("closeLyric", true);
};
//inject
const currentTime = inject<string>("currentTime");
const durationTime = inject<string>("durationTime");
const audioProgressValue = inject<Ref<number>>("audioProgressValue");
const defaultVolume = inject<number>("defaultVolume");

const { handleVolumeIcon, volumeValue } = useVolumeIcons(
  volumeRefs,
  defaultVolume!
);
watch(volumeValue, (newValue: any) => {
  emit("updateVolume", newValue);
});
const progressValue = ref<number>(0);
watch(
  () => audioProgressValue,
  (newValue) => {
    progressValue.value = newValue!.value;
  },
  { deep: true }
);
const handleProgressValueInput = () => {
  emit("updateCurrentTime", progressValue);
};
const playIcons = ref<string>("play");
//provide inject
const injectPlayStatus = inject("playStatus");
watch(injectPlayStatus, (newValue: any) => {
  nextTick(() => {
    if (newValue == "play") {
      playIcons.value = "pause";
    } else if (newValue == "pause") {
      playIcons.value = "play";
    }
  });
});
const emitPlayStatus = () => {
  emit("changePlayStatus", playIcons.value);
};
</script>

<style scoped>
.aplayer-lyric-wrap {
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  filter: blur(10px);
  background: #c7c7c7;
  animation: BGrotate infinite 9s linear forwards;
  background-position: center center;
  background-repeat: no-repeat;
  z-index: -1;
}
@keyframes BGrotate {
  0% {
    transform: rotate(0deg) scale(7);
  }
  50% {
    transform: rotate(182.5deg) scale(15);
  }
  100% {
    transform: rotate(365deg) scale(7);
  }
}
.close-lyric-view {
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
}
.icon.icon-close {
  width: 18px;
  height: 18px;
}
.aplayer-lyric-wrap .lyric-controls-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 5%;
}
.lyric-controls {
  max-width: 450px;
  min-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.lyric-controls-wrap .lyric-controls-cover-wrap {
  max-width: inherit;
  min-width: inherit;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 5px 20px 1px #1616166e;
  background-color: var(--lyric-primary-color);
}
.lyric-controls-wrap .lyric-controls-cover-wrap img {
  aspect-ratio: auto 600 / 600;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}
.lyric-controls-wrap .lyric-controls-cover-wrap .icon-music {
  aspect-ratio: auto 600 / 600;
  width: 200px;
  border-radius: inherit;
  cursor: auto;
}
::v-deep(.icon-music .aplayer-icon-fill) {
  fill: #cccccd;
}
.lyric-controls-wrap .lyric-controls-music-info {
  padding-top: 10px;
  font-size: 17px;
  text-align: center;
  text-decoration: none;
}
.music-title {
  color: var(--lyric-primary-color);
}
.singer {
  color: var(--lyric-second-color);
}

/* icons */
.lyric-controls-icons {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  width: 50px;
  cursor: pointer;
}
.icon-play {
  width: 55px;
  height: 55px;
}
::v-deep(.aplayer-icon-fill) {
  fill: #ffffcc;
  transition: fill 0.5s;
}
.repeat-icons {
  height: 28px;
}
.icon:hover ::v-deep(.aplayer-icon-fill) {
  fill: #ffffff;
}

.aplayer-lyric-wrap .lyric-content-wrap {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--lyric-second-color);
  font-size: 12px;
  line-height: 1.25;
}
/* progress including volume and music */
.lyric-controls-volume-progress-wrap,
.lyric-controls-music-progress-bar-wrap {
  width: 100%;
  height: 28px;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.lyric-controls-music-progress-bar-wrap {
  flex-direction: column;
}
.lyric-controls-music-progress-bar-wrap p {
  width: 100%;
  padding-top: 5px;
  font-size: 12px;
  color: var(--lyric-second-color);
  display: flex;
  justify-content: space-between;
}
.progress {
  width: 100%;
  max-width: 100%;
  height: 4px;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: linear-gradient(
    to right,
    var(--lyric-primary-color) 0%,
    var(--lyric-primary-color) var(--percentage, 0%),
    var(--lyric-second-color) var(--percentage, 0%),
    var(--lyric-second-color) 100%
  );
}
.progress::-webkit-slider-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background-color: var(--lyric-primary-color);
  /* border: 1px solid #fff; */
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  outline: none;
}

.progress ::-moz-range-thumb {
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
