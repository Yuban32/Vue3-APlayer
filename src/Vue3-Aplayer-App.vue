<template>
  <div class="aplayer-body">
    <AplayerPlayBackContainer
      @playListStatus="handlePlayListStatus"
      @aplayerLyricStatus="handleAplayerLyricStatus"
      @changePlayStatus="handleChangePlayStatus"
      @updateCurrentTime="handleUpdateCurrentTime"
      @updateVolume="handleUpdateVolume"
      ref="aplayerPlayBackContainerRef"
      :musicDataList="musicDataList"
      :currentMusicData="currentMusicData"
      v-show="!aplayerLyricStatus"
    />
    <Transition name="aplayer-lyric">
      <AplayerLyric
        :currentMusicData="currentMusicData"
        @updateVolume="handleUpdateVolume"
        @changePlayStatus="handleChangePlayStatus"
        @updateCurrentTime="handleUpdateCurrentTime"
        v-show="aplayerLyricStatus"
        @closeLyric="handleCloseLyricStatus"
      />
    </Transition>
    <Transition name="aplayer-list">
      <AplayerPlayListPC
        v-show="playListStatus"
        :musicDataList="musicDataList"
        @updateCurrentPlay="handleUpdateCurrentPlay"
      />
    </Transition>
    <audio
      ref="audio"
      :src="currentMusicData.musicURL"
      @play="onPlayHandler"
      @pause="onPauseHandler"
      @seeked="onSeekedHandler"
      @ended="onEnded"
    />
  </div>
</template>

<script setup lang="ts">
import { Ref, nextTick, provide, ref } from "vue";
import AplayerPlayBackContainer from "./components/aplayer-playback-container.vue";
import AplayerPlayListPC from "./components/aplayer-playlist-pc.vue";
import AplayerLyric from "./components/aplayer-lyric.vue";
import { IMusicListData } from "./types/types";
// import { playTimeFormat } from "./utils/utils";
import { useAudioEvent } from "./hooks/useAudioEvent";
//Music Data List
const props = defineProps<IMusicListData>();
// Init Current Music Data
let copyProps = JSON.stringify(props.musicDataList);
copyProps = JSON.parse(copyProps);

// 暂时 以后可能会写个配置项 由使用者来传入默认的配置
const defaultVolume = ref<number>(100);

const currentMusicData = ref();
if (props.musicDataList.length == 0) {
  currentMusicData.value = {
    music: "暂无音乐",
    cover: "",
    singer: "暂无",
    album: "暂无",
    musicURL: "",
    lyric: "",
  };
} else {
  currentMusicData.value = copyProps[0];
}

/**
 * Media Event
 */
//audio element
const audio: Ref<HTMLAudioElement | null> = ref(null);
//status pause or play
const {
  onPauseHandler,
  onPlayHandler,
  onSeekedHandler,
  Play,
  Pause,
  onEnded,
  updateVolume,
  onTimeUpdate,
  CurrentTime,
  playStatus,
  currentTime,
  durationTime,
  audioProgressValue,
  resetPlayTimeFormats,
} = useAudioEvent(audio, currentMusicData);
const playListStatus = ref<boolean>(false);
const aplayerLyricStatus = ref<boolean>(false);
/**
 * aplayer playback container emit
 * see AplayerPlayBackContainer component
 */
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
//value === play or pause
const handleChangePlayStatus = (value: string) => {
  if (value == "play") {
    Play();
  } else if (value == "pause") {
    Pause();
  }
};
const handleUpdateCurrentTime = (value: Ref<number>) => {
  // console.log(value.value);

  if (value.value != CurrentTime()) {
    CurrentTime(value.value);
  }
};
const handleUpdateVolume = (value: string) => {
  updateVolume(Number(value));
};
const handleUpdateCurrentPlay = async (item: any) => {
  await nextTick();
  currentMusicData.value = item;
  audioProgressValue.value = 0;
  resetPlayTimeFormats();
  Play();
};
/**
 * provide to multiple components
 */
provide("playStatus", playStatus);
provide("currentTime", currentTime); //type:String return:mm:ss
provide("CurrentTime", CurrentTime); //type:number return:audio currentTime
provide("durationTime", durationTime); //type:String return:mm:ss
provide("audioProgressValue", audioProgressValue);
provide("defaultVolume", defaultVolume.value);
provide("onTimeUpdate", onTimeUpdate);
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
