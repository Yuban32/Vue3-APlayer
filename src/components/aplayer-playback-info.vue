<template>
  <div class="playback-info-wrap">
    <div class="album-cover">
      <img
        v-if="playbackInfo.cover != '' ? playbackInfo.cover : false"
        :src="playbackInfo.cover"
        alt="cover"
      />
      <AplayerIcon v-else icon="music" />
    </div>
    <div class="playback-info-container">
      <div class="title">{{ playbackInfo.music }}</div>
      <div class="info">
        <span class="singer">{{ playbackInfo.singer }}</span> -
        <span class="album">{{ playbackInfo.album }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IPlaybackInfo } from "../types/types";
import AplayerIcon from "./aplayer-icon.vue";
const props = withDefaults(defineProps<IPlaybackInfo>(), {
  playbackInfo: () => ({
    music: "暂无歌曲",
    cover: "",
    singer: "暂无",
    album: "暂无",
  }),
});
console.log(props.playbackInfo);
</script>

<style scoped>
::v-deep(.icon-music) {
  fill: #dcdcdc;
  width: 16px;
  height: 16px;
}
</style>
