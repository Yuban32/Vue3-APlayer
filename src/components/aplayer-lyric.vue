<template>
  <div class="aplayer-lyric-wrap">
    <div class="bg bg-1"></div>
    <div class="bg bg-2"></div>
    <div class="bg bg-3"></div>
    <div class="bg bg-4"></div>
    <div class="bg bg-5"></div>
    <div class="bg bg-6"></div>
    <div class="close-lyric-view">
      <APlayerIcon icon="close" @click="sendCloseLyricStatus" />
    </div>
    <div class="lyric-controls-wrap">
      <div class="lyric-controls" v-show="showLyricControlsView">
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
    <div class="lyric-content-wrap" v-show="showLyricView">
      <span v-if="props.currentMusicData.lyric == ''">没有可显示的歌词。</span>
      <ul
        v-else
        class="lyric-content"
        :style="{ transform: `translateY(${liTop}px)` }"
      >
        <li
          ref="lyricLiRef"
          v-for="(item, index) in lyricArray"
          :key="index"
          :class="{
            lyricLight: index == lyricIndex,
            hidden: index < lyricIndex == true,
          }"
          @click="fastForward(item)"
        >
          {{ item.lyric }}
        </li>
      </ul>
    </div>
    <div class="lyric-icon-wrap" @click="handleSHowLyricView">
      <APlayerIcon icon="lyric" />
    </div>
  </div>
</template>

<script setup lang="ts">
//vue
import { Ref, inject, nextTick, onMounted, ref, watch } from "vue";
//components
import APlayerIcon from "./aplayer-icon.vue";
//hooks
import { useVolumeIcons } from "../hooks/useVolumeIcons";
import { useChangePlayIcons } from "../hooks/useAudioControlsIcons";
//types
import { ICurrentMusicData } from "../types/types";
//utils
import { parseLyricArray } from "../utils/utils";
const props = defineProps<ICurrentMusicData>();
const img = ref<HTMLImageElement>();
const volumeRefs = ref();
const showLyricView = ref(true);
const showLyricControlsView = ref(true);
//When the screen size is less than 1000px
const handleSHowLyricView = () => {
  if (window.innerWidth <= 1000) {
    showLyricControlsView.value = !showLyricControlsView.value;
    showLyricView.value = !showLyricView.value;
  } else if (window.innerWidth > 1000) {
    showLyricView.value = !showLyricView.value;
  }
};
addEventListener("resize", () => {
  window.innerWidth < 1000
    ? (showLyricView.value = false)
    : (showLyricView.value = true);
});
const changeBG = () => {
  let bgs = document.querySelectorAll(".bg");
  bgs.forEach((item) => {
    (
      item as HTMLDivElement
    ).style.backgroundImage = `url(${props.currentMusicData.cover})`;
  });
};
nextTick(() => {
  changeBG();
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
const onTimeUpdate = inject<Function>("onTimeUpdate");
const CurrentTime = inject<Function>("CurrentTime");
const injectPlayStatus = inject("playStatus");
const { handleVolumeIcon, volumeValue } = useVolumeIcons(
  volumeRefs,
  defaultVolume!
);
const handleProgressValueInput = () => {
  emit("updateCurrentTime", progressValue);
};
const { playIcons } = useChangePlayIcons(injectPlayStatus);

const emitPlayStatus = () => {
  emit("changePlayStatus", playIcons.value);
};
//lyric handle
const lyricLiRef = ref<any>();
let lyricArray = parseLyricArray(props.currentMusicData.lyric);
const lyricIndex = ref(0);
const liTop = ref();
const handleLyric = () => {
  onTimeUpdate!(() => {
    let time = CurrentTime!();
    for (let i = 0; i < lyricArray.length; i++) {
      if (i == lyricArray.length - 1) {
        lyricIndex.value = i;
        break;
      }
      if (time >= lyricArray[i].time && time < lyricArray[i + 1]?.time) {
        lyricIndex.value = i;

        if (time < lyricArray[i + 1].time != undefined) {
          lyricIndex.value = i;
          liTop.value =
            -lyricLiRef.value[i].offsetTop +
            lyricLiRef.value[i].offsetHeight * 4;
          break;
        }
        break;
      }
    }
  });
};

const fastForward = (item: any) => {
  let durationTime = document.querySelector("audio")!.duration;
  let times = (item.time! / durationTime) * 100;
  emit("updateCurrentTime", ref(times));
};

/**
 * watch
 */
//if current change
watch(
  () => props.currentMusicData,
  (newValue) => {
    changeBG();
    handleLyric();
    lyricArray = parseLyricArray(newValue.lyric);
    progressValue.value = 0;
  },
  { deep: true }
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

onMounted(() => {
  handleLyric();
  liTop.value = 132;
  window.innerWidth < 1000
    ? (showLyricView.value = false)
    : (showLyricView.value = true);
});
</script>

<style scoped>
.lyric-icon-wrap {
  position: fixed;
  bottom: 5px;
  right: 10px;
  transform: rotateY(180deg);
}
.lyric-icon-wrap ::v-deep(.icon-lyric) {
  width: 28px;
  height: 28px;
}
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
  filter: blur(18px) contrast(150%) brightness(120%);
  /* background: #c7c7c7; */
  animation: BGRotate infinite 30s linear forwards;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  z-index: -2;
  border-radius: 35px;
  overflow: hidden;
}
.bg::before {
  content: "";
  display: block;
  position: absolute;
  width: inherit;
  height: inherit;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.397);
}
.bg-2 {
  max-width: 150px;
  max-height: 150px;
  left: 0;
  bottom: 0;
  animation: BGRotateAnticlockwise infinite 9s linear forwards;
}
.bg-3 {
  max-width: 150px;
  max-height: 150px;
  right: 0;
  bottom: 0;
}
.bg-4 {
  max-width: 150px;
  max-height: 150px;
  right: 0;
  top: 0;
  animation: BGRotateAnticlockwise infinite 7s linear forwards;
}
.bg-5 {
  max-width: 150px;
  max-height: 150px;
  left: 0;
  top: 0;
}
.bg-6 {
  width: 120px;
  height: 120px;
  right: 50%;
  top: 50%;
  animation: BGRotateAnticlockwise infinite 10s linear forwards;
}
@keyframes BGRotate {
  0% {
    transform: rotate(0deg) scale(3);
  }
  50% {
    transform: rotate(182.5deg) scale(3);
  }
  100% {
    transform: rotate(365deg) scale(3);
  }
}
@keyframes BGRotateAnticlockwise {
  0% {
    transform: rotate(0deg) scale(3);
  }
  50% {
    transform: rotate(-182.5deg) scale(3);
  }
  100% {
    transform: rotate(-365deg) scale(3);
  }
}
.close-lyric-view {
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
  z-index: 2;
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
  background-color: var(--aplayer-aplayer-lyric-primary-color);
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
  color: var(--aplayer-lyric-primary-color);
}
.singer {
  color: var(--aplayer-lyric-second-color);
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
.icon-play,
.icon-pause {
  width: 55px;
  height: 55px;
}
::v-deep(.aplayer-icon-fill) {
  fill: var(--aplayer-lyric-second-color);
  transition: fill 0.5s;
}
.repeat-icons {
  height: 28px;
}
.icon:hover ::v-deep(.aplayer-icon-fill) {
  fill: #ffffff;
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
  color: var(--aplayer-lyric-second-color);
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
    var(--aplayer-lyric-primary-color) 0%,
    var(--aplayer-lyric-primary-color) var(--aplayer-audioProgress, 0%),
    var(--aplayer-lyric-second-color) var(--aplayer-audioProgress, 0%),
    var(--aplayer-lyric-second-color) 100%
  );
}
.volume-progress {
  background: linear-gradient(
    to right,
    var(--aplayer-lyric-primary-color) 0%,
    var(--aplayer-lyric-primary-color) var(--aplayer-volumeProgress, 0%),
    var(--aplayer-lyric-second-color) var(--aplayer-volumeProgress, 0%),
    var(--aplayer-lyric-second-color) 100%
  );
}
.progress::-webkit-slider-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background-color: var(--aplayer-lyric-primary-color);
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
.aplayer-lyric-wrap .lyric-content-wrap {
  width: 100%;
  min-width: 400px;
  height: 75%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--aplayer-lyric-second-color);
  font-size: 12px;
  line-height: 1.25;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}
.lyric-content-wrap::-webkit-scrollbar {
  display: none;
}
.lyric-content-wrap::-moz-scrollbar {
  display: none;
}
.lyric-content-wrap::-ms-scrollbar {
  display: none;
}
.lyric-content-wrap::-o-scrollbar {
  display: none;
}
.lyric-content {
  position: relative;
}
/* .lyric-content::after {
  content: "";
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: yellowgreen;
} */
.lyricLight {
  width: 100%;
  display: block;
  color: var(--aplayer-lyric-primary-color);
}
.hidden {
  opacity: 0;
  pointer-events: none;
}
ul {
  transition: all 0.5s;
  height: 100%;
  max-width: none;
  /* overflow-y: hidden; */
}
li {
  color: var(--aplayer-lyric-second-color);
  font-size: 28px;
  white-space: pre-line;
  font-weight: 600;
  cursor: pointer;
  transition: all 1s;
  line-height: 1.1818181818;
  margin-bottom: 34px;
  padding-right: 10px;
}

@media only screen and (max-width: 1000px) {
  .aplayer-lyric-wrap {
    width: 100vw;
    height: 100vh;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
  }
  .aplayer-lyric-wrap .lyric-content-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 100vw;
  }
  li {
    padding: 0 20px;
  }
}
</style>
