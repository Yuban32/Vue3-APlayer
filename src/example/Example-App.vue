<template>
  <div class="app">
    <Vue3AplayerApp :musicDataList="musicDataList" />
  </div>
</template>

<script setup lang="ts">
import Vue3AplayerApp from "../Vue3-Aplayer-App.vue";
import music from "../example/05.ギターと孤独と蒼い惑星.flac";
import cover from "../example/cover.jpg";
import lyric from "./lyric.json";
const musicDataList = [
  {
    cover: cover,
    music: "ギターと孤独と蒼い惑星",
    singer: "結束バンド",
    album: "ギターと孤独と蒼い惑星 ",
    musicURL: music,
    durationTime: "114",
    lyric: lyric,
  },
];
</script>
<style scoped>
.app {
}
</style>
