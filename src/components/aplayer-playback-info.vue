<template>
  <div class="playback-info-wrap">
    <div class="album-cover">
      <img
        v-if="playbackInfo.cover != '' ? playbackInfo.cover : false"
        :src="playbackInfo.cover"
        alt="cover"
      />
      <AplayerIcon v-else icon="music" class="icons" />
      <AplayerIcon icon="expand" class="icons expand" />
    </div>
    <div class="playback-info-container">
      <div class="title">{{ playbackInfo.music }}</div>
      <div class="info-wrap">
        <span class="time">1:33</span>
        <div class="info">
          <span class="singer">{{ playbackInfo.singer }}</span> -
          <span class="album">{{ playbackInfo.album }}</span>
        </div>
      </div>
      <input type="range" class="progress" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IPlaybackInfo } from "../types/types";
import AplayerIcon from "./aplayer-icon.vue";
withDefaults(defineProps<IPlaybackInfo>(), {
  playbackInfo: () => ({
    music: "暂无歌曲",
    cover: "",
    singer: "暂无",
    album: "暂无",
  }),
});
</script>

<style scoped>
::v-deep(.icon-music) {
  fill: #dcdcdc;
  width: 41px;
  height: 41px;
}
::v-deep(.icon-expand) {
  opacity: 0;
  fill: #fff;
  width: 41px;
  height: 41px;
  background-color: #d2d2d285;
  transform: rotateX(180deg);
  transition: all 150ms;
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
.album-cover .icons {
  position: absolute;
  top: 0;
  left: 0;
}
.playback-info-container {
  width: 100%;
  font-size: 12px;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: 0em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
.time {
  display: inline-block;
  position: absolute;
  left: 5px;
}
input[type="range"] {
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100%;
  height: 3px;
  display: block;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  /* -webkit-appearance: none; */
  box-sizing: content-box;
  position: relative;
  z-index: 1;
  color: rgb(16, 16, 16);
}
input[type="range"] {
  writing-mode: horizontal-tb !important;
}
input[type="range"]::-webkit-slider-thumb {
  width: 10px;
  height: 10px;
  background: #d60017;
}
</style>
