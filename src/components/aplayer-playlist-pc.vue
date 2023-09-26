<template>
  <div class="aplayer-playlist-wrap">
    <div class="header">
      <span>待播清单</span>
      <span>清除</span>
    </div>
    <div
      :class="
        props.musicDataList.length == 0
          ? 'playlist-container dont-has-music-list'
          : 'playlist-container'
      "
    >
      <p v-if="props.musicDataList.length == 0">无待播歌曲。</p>
      <ul v-else>
        <li
          v-for="(item, index) in props.musicDataList"
          :key="index"
          class="playlist-item"
          :tabindex="index"
          :data-index="index"
          ref="playListItem"
          @dblclick="playCureentMusic(item)"
        >
          <div class="cover-wrap">
            <img :src="item.cover" />
          </div>
          <div class="playlist-content">
            <div class="playlist-content-left">
              <p class="playlist-music-title">{{ item.music }}</p>
              <p class="playlist-music-singer">{{ item.singer }}</p>
            </div>
            <div class="playlist-content-right">
              <span class="menu">···</span>
              <!-- <span class="durationTime">{{ item.durationTime }}</span> -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import { IMusicListData, IMusicListItems } from "../types/types";
const props = defineProps<IMusicListData>();

const emit = defineEmits(["updateCurrentPlay"]);

//handle play list focus and blur
const playListItem = ref();
const resetClassName = (element: HTMLElement[]) => {
  element.forEach((item: HTMLElement) => {
    item.classList.remove("blur");
    item.classList.remove("focus");
  });
};
if (props.musicDataList?.length) {
  nextTick(() => {
    playListItem.value.forEach((item: HTMLElement) => {
      item.addEventListener(
        "focus",
        (event: FocusEvent) => {
          const target = event.target as HTMLElement;
          resetClassName(playListItem.value);
          target.classList.add("focus");
        },
        true
      );
      item.addEventListener(
        "blur",
        (event: FocusEvent) => {
          const target = event.target as HTMLElement;
          resetClassName(playListItem.value);
          target.classList.add("blur");
        },
        true
      );
    });
  });
}
const playCureentMusic = (item: IMusicListItems) => {
  // console.log(item.lyric);
  emit("updateCurrentPlay", item);
};
</script>

<style scoped>
.aplayer-playlist-wrap {
  padding: 20px 20px 20px 20px;
  width: 280px;
  min-height: calc(100vh - 95px);
  max-height: calc(100vh - 95px);
  border-left: 0.5px solid var(--aplayer-list-border-color);
  background-color: #fdfdfdcc;
  position: fixed;
  top: 0;
  right: 0;
  white-space: nowrap;
  overflow-x: hidden;
}
.header {
  padding-bottom: 12px;
  display: flex;
  justify-content: space-between;
}
.header span:first-child {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.29412;
  color: var(--aplayer-list-primary-text-color);
}
.header span:last-child {
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.33338;
  color: var(--aplayer-primary-key-color);
  user-select: none;
  cursor: pointer;
}
.playlist-container {
  border-bottom: 1px solid var(--aplayer-list-border-color);
  border-top: 1px solid var(--aplayer-list-border-color);
}
.playlist-container.dont-has-music-list {
  width: 280px;
  min-height: calc(100vh - 129px);
  border-bottom: none;
  border-top: none;
  display: flex;
  justify-items: center;
  align-items: center;
  text-align: center;
}
.playlist-container.dont-has-music-list p {
  width: 280px;
  font-size: 12px;
  font-weight: 400;
  color: var(--aplayer-list-second-text-color);
}
.playlist-item {
  width: calc(100% - 20px);
  padding: 0 10px;
  height: 55px;
  display: flex;
  overflow: hidden;
  box-sizing: content-box;
  align-items: center;
  font-size: 13px;
  border-radius: 6px;
  user-select: none;
  /* background-color: #fdfdfd; */
}

.playlist-item .cover-wrap {
  height: 100%;
  padding-right: 10px;
  display: flex;
  align-items: center;
}
.cover-wrap img {
  width: 40px;
  height: 40px;
  border-radius: 6px;
}
.playlist-music-title {
  color: var(--aplayer-list-primary-text-color);
}
.playlist-music-singer {
  color: var(--aplayer-list-second-text-color);
}
.playlist-content {
  width: 100%;
  height: 99.9%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--aplayer-list-border-color);
}
.playlist-item:last-child .playlist-content {
  border: none;
}
.playlist-content-left > p {
  /* color: inherit; */
  width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.playlist-content-right {
  position: relative;
  height: 100%;
}

.playlist-content-right .menu {
  color: var(--aplayer-primary-key-color);
  font-size: 28px;
  opacity: 0;
}
.playlist-content-right span {
  position: absolute;
  width: 35px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: var(--aplayer-list-transition);
  cursor: pointer;
}
.playlist-item:hover .menu {
  opacity: 1;
}
.playlist-item:hover .durationTime {
  opacity: 0;
}
.playlist-content-right .durationTime {
  opacity: 1;
  color: var(--aplayer-list-second-text-color);
}

/* play list blur or focus */
.focus {
  background-color: var(--aplayer-primary-key-color);
}
.blur {
  background-color: var(--aplayer-second-key-color);
}
.blur .playlist-content {
  border: none;
}
.focus .playlist-content {
  border: none;
}
.focus .menu {
  color: #fff;
}
.focus .playlist-music-title {
  color: #fff;
}
.focus .playlist-music-singer {
  color: #fff;
}
</style>
