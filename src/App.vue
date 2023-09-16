<script setup lang="ts">
import { provide, ref } from "vue";
import AplayerPlayBackContainer from "./components/aplayer-playback-container.vue";
import AplayerPlayListPC from "./components/aplayer-playlist-pc.vue";
import AplayerLyric from "./components/aplayer-lyric.vue";
import { IMusicDataList } from "./types/types";

//MusicData
const data = withDefaults(defineProps<IMusicDataList>(), {
  data: () => [
    {
      music: "暂无歌曲",
      cover: "",
      singer: "暂无",
      album: "暂无",
      musicURL: "",
      durationTime: "0/0",
    },
  ],
});

provide("musicDataList", data);
const playListStatus = ref<boolean>(false);
//"value" default value is false
//see AplayerPlayBackContainer component
const handlePlayListStatus = (value: boolean) => {
  playListStatus.value = value;
};
</script>

<template>
  <div class="aplayer-body">
    <AplayerPlayBackContainer
      @playListStatus="handlePlayListStatus"
      ref="aplayerPlayBackContainerRef"
    />
    <AplayerLyric />
    <Transition name="aplay-list">
      <AplayerPlayListPC v-show="playListStatus" />
    </Transition>
    <audio />
  </div>
</template>

<style scoped>
.aplayer-body {
  position: relative;
  height: 100vh;
  /* background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  ); */
}
/* transition animation */
.aplay-list-enter-active,
.aplay-list-leave-active {
  transition: all 0.3s ease;
}

.aplay-list-enter-from,
.aplay-list-leave-to {
  width: 0px;
  opacity: 0;
}
</style>
