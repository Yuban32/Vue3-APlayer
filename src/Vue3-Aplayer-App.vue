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
      :src="currentMusicData.musicURL"
      @play="onPlayHandler"
      @pause="onPauseHandler"
      @seeked="onSeekedHandler"
    />
    <!-- controls -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AplayerPlayBackContainer from "./components/aplayer-playback-container.vue";
import AplayerPlayListPC from "./components/aplayer-playlist-pc.vue";
import AplayerLyric from "./components/aplayer-lyric.vue";
import { IMusicListData } from "./types/types";

//Music Data List
// import music1 from "./example/05.ギターと孤独と蒼い惑星.flac";
// import cover from "./example/cover.jpg";
const props = defineProps<IMusicListData>();
// Init Current Music Data
let copyProps = JSON.stringify(props.musicDataList);
copyProps = JSON.parse(copyProps);
console.log(copyProps);

const currentMusicData = ref();
if (props.musicDataList.length == 0) {
  currentMusicData.value = {
    music: "暂无音乐",
    cover: "",
    singer: "暂无",
    album: "暂无",
    musicURL: "",
    durationTime: "",
    currentTime: "",
  };
} else {
  currentMusicData.value = copyProps[0];
}

/**
 * Media Event
 */
const playStatus = ref<boolean>(false);
const audio = ref();
const onTimeUpdate = () => {};
const onPauseHandler = () => {
  playStatus.value = false;
};
const onPlayHandler = () => {
  playStatus.value = true;
};
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
  position: fixed;
  bottom: 0;
  left: 0;
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
