<template>
  <div class="aplayer-body">
    <AplayerPlayBackContainer
      @playListStatus="handlePlayListStatus"
      @aplayerLyricStatus="handleAplayerLyricStatus"
      ref="aplayerPlayBackContainerRef"
      :musicDataList="musicDataList"
      :currentMusicData="currentMusicData"
      v-show="!aplayerLyricStatus"
    />
    <Transition name="aplayer-lyric">
      <AplayerLyric
        :currentMusicData="currentMusicData"
        v-show="aplayerLyricStatus"
        @closeLyric="handleCloseLyricStatus"
      />
    </Transition>
    <Transition name="aplayer-list">
      <AplayerPlayListPC
        v-show="playListStatus"
        :musicDataList="musicDataList"
      />
    </Transition>
    <audio
      ref="audio"
      @timeupdate="onTimeUpdate"
      src="https://m10.music.126.net/20230919112727/2ea2558b8da5afedb524068f129358a0/yyaac/015c/070f/0458/66b75383e60e68db735f32db616ae627.m4a"
      @play="onPlayHandler"
      @pause="onPauseHandler"
      @seeked="onSeekedHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AplayerPlayBackContainer from "./components/aplayer-playback-container.vue";
import AplayerPlayListPC from "./components/aplayer-playlist-pc.vue";
import AplayerLyric from "./components/aplayer-lyric.vue";
import { IAplayerData } from "./types/types";

//Music Data List
withDefaults(defineProps<IAplayerData>(), {
  //Current Music Data
  musicDataList: () => [
    {
      cover:
        "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/ae/04/a9/ae04a9e4-52a5-3676-efa3-a73c1b741a4e/4547366636147.jpg/32x32bb-60.jpg",
      music: "サマータイムシンデレラ",
      singer: "Ryokuoushoku Shakai",
      musicURL: "",
      durationTime: "114",
    },
    {
      cover:
        "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/ae/04/a9/ae04a9e4-52a5-3676-efa3-a73c1b741a4e/4547366636147.jpg/32x32bb-60.jpg",
      music: "サマータイムシンデレラ",
      singer: "Ryokuoushoku Shakai",
      musicURL: "",
      durationTime: "114",
    },
  ],
  //Current Music Data
  // currentMusicData: () => ({
  //   music: "暂无音乐",
  //   cover: "",
  //   singer: "暂无",
  //   album: "暂无",
  //   musicURL: "",
  //   durationTime: "",
  //   currentTime: "",
  // }),

  currentMusicData: () => ({
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/ae/04/a9/ae04a9e4-52a5-3676-efa3-a73c1b741a4e/4547366636147.jpg/32x32bb-60.jpg",
    music: "サマータイムシンデレラ",
    singer: "Ryokuoushoku Shakai",
    album: "暂无",
    musicURL: "",
    durationTime: "114",
    currentTime: "111",
  }),
});
const playStatus = ref<boolean>(false);

/**
 * Media Event
 */
const audio = ref();
const onTimeUpdate = () => {};
const onPauseHandler = () => {};
const onPlayHandler = () => {};
const onSeekedHandler = () => {};
// provide("musicDataList", musicDataList);
const playListStatus = ref<boolean>(false);
const aplayerLyricStatus = ref<boolean>(false);
//"value" default value is false
//see AplayerPlayBackContainer component
const handlePlayListStatus = (value: boolean) => {
  playListStatus.value = value;
};
//value === true
const handleAplayerLyricStatus = (value: boolean) => {
  playListStatus.value = false;
  aplayerLyricStatus.value = value;
};
//value === true
const handleCloseLyricStatus = (value: boolean) => {
  aplayerLyricStatus.value = !value;
};
</script>
<style scoped>
.aplayer-body {
  position: relative;
  height: 100vh;
}
/* transition animation */
.aplayer-list-enter-active,
.aplayer-list-leave-active {
  transition: all 0.3s ease;
}

.aplayer-list-enter-from,
.aplayer-list-leave-to {
  width: 0px;
  padding-left: 0;
  padding-right: 0;
  opacity: 0;
}
</style>
