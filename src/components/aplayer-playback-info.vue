<template>
  <div class="playback-info-wrap">
    <div class="album-cover">
      <img
        v-if="
          props.currentMusicData.cover != ''
            ? props.currentMusicData.cover
            : false
        "
        :src="props.currentMusicData.cover"
        alt="cover"
      />
      <AplayerIcon v-else icon="music" class="icons" />
      <AplayerIcon
        icon="expand"
        class="icons expand"
        @click="sendAplayerLyricStatus"
      />
    </div>
    <div class="playback-info-container">
      <div class="title">{{ props.currentMusicData.music }}</div>
      <div class="info-wrap">
        <span class="currentTime">{{ currentTime }}</span>
        <div class="info">
          <span class="singer">{{ props.currentMusicData.singer }}</span> -
          <span class="album">{{ props.currentMusicData.album }}</span>
        </div>
      </div>
      <div class="progress-container">
        <input
          type="range"
          class="progress"
          v-model="progressValue"
          @input="handleProgressValueInput"
          ref="progressRefs"
          min="0"
          max="100"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, inject, nextTick, ref, watch } from "vue";
import { ICurrentMusicData } from "../types/types";
import AplayerIcon from "./aplayer-icon.vue";
const props = defineProps<ICurrentMusicData>();

//inject
const currentTime = inject<string>("currentTime");
// const durationTime = inject<string>("durationTime");
const audioProgressValue = inject<Ref<number>>("audioProgressValue");
const progressRefs = ref();
const progressValue = ref<number>(0);

const emit = defineEmits(["aplayerLyricStatus", "updateCurrentTime"]);
const sendAplayerLyricStatus = () => {
  emit("aplayerLyricStatus", true);
};

watch(
  () => audioProgressValue,
  (newValue) => {
    progressValue.value = newValue!.value;
  },
  { deep: true }
);
//适配Audio进度条
watch(progressValue, async () => {
  await nextTick();
  progressRefs.value.style.setProperty(
    "--percentage",
    `${progressValue.value}%`
  );
});
const handleProgressValueInput = () => {
  emit("updateCurrentTime", progressValue);
};
</script>

<style scoped>
::v-deep(.icon-music) {
  fill: #dcdcdc;
  width: 41px;
  height: 41px;
}
::v-deep(.icon-expand) {
  opacity: 0;
  width: 41px;
  height: 41px;
  background-color: #d2d2d29c;
  transform: rotateX(180deg);
  transition: all 150ms;
  cursor: pointer;
}
::v-deep(.icon-expand .aplayer-icon-fill) {
  fill: #fff;
}
.playback-info-wrap {
  display: flex;
  height: 41px;
  width: 100%;
  justify-content: left;
  align-items: center;
  border: 1px solid #e8e8e8;
  position: relative;
  border-radius: 5px;
}
.playback-info-wrap:hover .expand {
  opacity: 1;
}
.playback-info-wrap:hover .info-wrap > .info {
  color: #d60017;
}
.album-cover {
  height: 100%;
  width: 45px;
  border: 1px solid #d2d2d2;
  position: relative;
  left: -1px;
  border-radius: 5px;
}
.album-cover img {
  width: 100%;
}
.album-cover .icons {
  position: absolute;
  top: 0;
  left: 0;
}
.playback-info-container {
  width: 100%;
  height: 100%;
  font-size: 12px;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: 0em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
.title {
  width: 100%;
  text-align: center;
  color: #000000e0;
}
.info-wrap {
  width: 100%;
  color: #0000008f;
  display: flex;
  position: relative;
}
.info-wrap > .info {
  width: 100%;
  text-align: center;
}
.currentTime {
  display: inline-block;
  position: absolute;
  left: 5px;
}
.progress {
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100%;
  height: 3px;
  display: block;
  border: 0;
  /* background-color: #808080; */
  background: linear-gradient(
    to right,
    #7f7f7f 0%,
    #7f7f7f var(--percentage, 0%),
    #e5e5e5 var(--percentage, 0%),
    #e5e5e5 100%
  );
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  box-sizing: content-box;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  color: rgb(16, 16, 16);
  writing-mode: horizontal-tb;
}

.progress::-webkit-slider-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 5px;
  height: 13px;
  background-color: #808080;
  border: 1px solid #fff;
  cursor: pointer;
  z-index: 1;
  outline: none;
  opacity: 0;
  transition: opacity 150ms;
}

.progress ::-moz-range-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 5px;
  height: 13px;
  background-color: #808080;
  border: 1px solid #fff;
  cursor: pointer;
  z-index: 1;
  outline: none;
  opacity: 0;
  transition: opacity 150ms;
}
</style>
