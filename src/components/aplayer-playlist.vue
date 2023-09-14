<template>
  <div class="aplayer-playlist-wrap">
    <div class="header">
      <span>待播清单</span>
      <span>清除</span>
    </div>
    <div class="playlist-container">
      <ul>
        <li
          v-for="(item, index) in playlist"
          :key="index"
          class="playlist-item"
        >
          <div class="cover-wrap">
            <img :src="item.cover" />
          </div>
          <div class="playlist-content">
            <p>{{ item.music }}</p>
            <p>{{ item.singer }}</p>
          </div>
          <div class="remove-btn">···</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { IPlaybackInfo } from "../types/types";
withDefaults(defineProps<IPlaybackInfo>(), {
  playbackInfo: () => ({
    music: "暂无歌曲",
    cover: "",
    singer: "暂无",
    album: "暂无",
    musicURL: "",
  }),
});
const playlist = reactive([
  {
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/ae/04/a9/ae04a9e4-52a5-3676-efa3-a73c1b741a4e/4547366636147.jpg/32x32bb-60.jpg",
    music: "サマータイムシンデレラ",
    singer: "Ryokuoushoku Shakai",
    musicURL: "",
  },
  {
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/ae/04/a9/ae04a9e4-52a5-3676-efa3-a73c1b741a4e/4547366636147.jpg/32x32bb-60.jpg",
    music: "サマータイムシンデレラ",
    singer: "Ryokuoushoku Shakai",
    musicURL: "",
  },
  {
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/ae/04/a9/ae04a9e4-52a5-3676-efa3-a73c1b741a4e/4547366636147.jpg/32x32bb-60.jpg",
    music: "サマータイムシンデレラ",
    singer: "Ryokuoushoku Shakai",
    musicURL: "",
  },
]);
</script>

<style scoped>
.aplayer-playlist-wrap {
  padding: 20px;
  width: 280px;
  min-height: calc(100vh - 95px);
  border-left: 0.5px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(253, 253, 253, 0.8);
  /* background-color: rgba(0, 0, 0, 0.8); */
  /* background-color: rgba(0, 0, 0, 0.8); */
  /* background-color: rgba(0, 0, 0, 0.8); */
  position: absolute;
  right: 0;
}
.header {
  padding-bottom: 20px;
}
.playlist-item {
  display: flex;
}
</style>
