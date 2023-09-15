<script setup lang="ts">
import { provide, reactive } from "vue";
import AplayerPlaybackContainer from "./components/aplayer-playback-container.vue";
import AplayerPlayerList from "./components/aplayer-playlist.vue";
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
</script>

<template>
  <div class="aplayer-body">
    <AplayerPlaybackContainer />
    <AplayerPlayerList />
    <audio />
  </div>
</template>

<style scoped>
.aplayer-body {
  position: relative;
  height: 100vh;
}
</style>
