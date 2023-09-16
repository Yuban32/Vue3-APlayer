<template>
  <div class="aplayer-lyric-wrap">
    <div class="lyric-controls-wrap">
      <div class="lyric-controls">
        <div class="lyric-controls-cover-wrap">
          <img
            src="https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fe/58/79/fe58795c-1628-230a-9ffe-300c04b6627c/194491717186.jpg/450x450bb-60.jpg"
            alt="cover"
          />
          <!-- <AplayerIcon icon="music" /> -->
        </div>
        <div class="lyric-controls-music-info">
          <p class="music-title">夜に駆ける</p>
          <p class="singer">
            YOASOBI - <span class="album">夜に駆ける - Single</span>
          </p>
        </div>
        <div class="lyric-controls-music-progress-bar-wrap">
          <input type="range" class="music-progress-bar progress" />
          <p>
            <span class="currentTime">1:33</span>
            <span class="durationTime">2:33</span>
          </p>
        </div>
        <div class="lyric-controls-icons">
          <APlayerIcon icon="shuffle" />
          <APlayerIcon icon="backward" />
          <APlayerIcon icon="play" />
          <APlayerIcon icon="forward" />
          <APlayerIcon icon="repeat" />
        </div>
        <div class="lyric-controls-volume-progress-wrap">
          <APlayerIcon
            :icon="handleVolumeIcon"
            className="volume"
            :key="handleVolumeIcon"
            @click="volumeValue = 0"
          />
          <input
            type="range"
            class="volume-progress progress"
            ref="volumeRefs"
            v-model="volumeValue"
            min="0"
            max="100"
          />
        </div>
      </div>
    </div>
    <div class="lyric-content-wrap">没有可显示的歌词。</div>
  </div>
</template>

<script setup lang="ts">
//vue
import { ref } from "vue";
//components
import APlayerIcon from "./aplayer-icon.vue";
//hooks
import { useVolumeIcons } from "../hooks/useVolumeIcons";

const volumeRefs = ref();
const { handleVolumeIcon, volumeValue } = useVolumeIcons(volumeRefs);
</script>

<style scoped>
.aplayer-lyric-wrap {
  width: 100vw;
  height: 100vh;
  position: absolute;
  /* background: linear-gradient(180deg, transparent, #000 80px, #000 50%); */
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
}
.aplayer-lyric-wrap .lyric-controls-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 5%;
}
.lyric-controls {
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.lyric-controls-wrap .lyric-controls-cover-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
}
.lyric-controls-wrap .lyric-controls-cover-wrap img {
  aspect-ratio: auto 600 / 600;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}
.lyric-controls-wrap .lyric-controls-music-info {
  padding-top: 10px;
  font-size: 17px;
  text-align: center;
  text-decoration: none;
}
.music-title {
  color: var(--lyric-primary-color);
}
.singer {
  color: var(--lyric-second-color);
}

/* icons */

.icon {
  width: 32px;
  height: 28px;
}
::v-deep(.aplayer-icon-fill) {
  fill: #707070;
  transition: fill 0.2s;
}
.icon:hover ::v-deep(.aplayer-icon-fill) {
  fill: #1f1f1f;
}

.aplayer-lyric-wrap .lyric-content-wrap {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--lyric-second-color);
  font-size: 12px;
  line-height: 1.25;
}
/* progress including volume and music */
.lyric-controls-volume-progress-wrap,
.lyric-controls-music-progress-bar-wrap {
  width: 100%;
  height: 28px;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.lyric-controls-music-progress-bar-wrap {
  flex-direction: column;
}
.lyric-controls-music-progress-bar-wrap p {
  width: 100%;
  padding-top: 5px;
  font-size: 12px;
  color: var(--lyric-second-color);
  display: flex;
  justify-content: space-between;
}
.progress {
  width: 100%;
  max-width: 100%;
  height: 4px;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: linear-gradient(
    to right,
    var(--lyric-primary-color) 0%,
    var(--lyric-primary-color) var(--percentage, 0%),
    var(--lyric-second-color) var(--percentage, 0%),
    var(--lyric-second-color) 100%
  );
}
.progress::-webkit-slider-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background-color: var(--lyric-primary-color);
  /* border: 1px solid #fff; */
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  outline: none;
}

.progress ::-moz-range-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background-color: #808080;
  border: 1px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  outline: none;
}
</style>
