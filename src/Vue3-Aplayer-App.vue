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
  </div>
</template>

<script setup lang="ts">
import { Ref, provide, ref } from "vue";
import AplayerPlayBackContainer from "./components/aplayer-playback-container.vue";
import AplayerPlayListPC from "./components/aplayer-playlist-pc.vue";
import AplayerLyric from "./components/aplayer-lyric.vue";
import { IMusicListData } from "./types/types";
import { playTileFormat } from "./utils/utils";
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
const playStatus = ref<string>("pause");
const onPauseHandler = () => {
  playStatus.value = "pause";
};
const onPlayHandler = () => {
  playStatus.value = "play";
};
const onSeekedHandler = () => {};
const Play = () => {
  audio.value!.play();
};
const Pause = () => {
  audio.value!.pause();
};
const updateVolume = (value: number) => {
  audio.value!.volume = value / 100;
};
const currentTime = ref<string>("0 : 00");
const durationTime = ref<string>("0 : 00");
const audioProgressValue = ref<number>(0);
const onTimeUpdate = () => {
  currentTime.value = playTileFormat(CurrentTime()!);
  audioProgressValue.value = Number(
    ((CurrentTime()! / DurationTime()) * 100).toFixed(2)
  );
  durationTime.value = playTileFormat(DurationTime());
};
const CurrentTime = (time?: number) => {
  if (time !== undefined) {
    audio.value!.currentTime = (time * DurationTime()) / 100;
    return;
  }
  return audio.value!.currentTime;
};
const DurationTime = () => {
  return audio.value!.duration;
};

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
  if (value.value != CurrentTime()) {
    CurrentTime(value.value);
  }
};
const handleUpdateVolume = (value: string) => {
  updateVolume(Number(value));
};
/**
 * provide to multiple components
 */
provide("playStatus", playStatus);
provide("currentTime", currentTime);
provide("durationTime", durationTime);
provide("audioProgressValue", audioProgressValue);
provide("defaultVolume", defaultVolume.value);
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
