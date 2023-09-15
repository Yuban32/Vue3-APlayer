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
          :tabindex="index"
          :data-index="index"
          ref="playListItem"
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
              <span class="durationTime">{{ item.durationTime }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from "vue";

//handle play list focus and blur
const playListItem = ref();
const resetClassName = (element: HTMLElement[]) => {
  element.forEach((item: HTMLElement) => {
    item.classList.remove("blur");
    item.classList.remove("focus");
  });
};
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

//fake data
const playlist = reactive([
  {
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/ae/04/a9/ae04a9e4-52a5-3676-efa3-a73c1b741a4e/4547366636147.jpg/32x32bb-60.jpg",
    music: "サマータイムシンデレラ",
    singer: "Ryokuoushoku Shakai",
    musicURL: "",
    durationTime: "1445",
  },
  {
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/ae/04/a9/ae04a9e4-52a5-3676-efa3-a73c1b741a4e/4547366636147.jpg/32x32bb-60.jpg",
    music: "サマータイムシンデレラ",
    singer: "Ryokuoushoku Shakai",
    musicURL: "",
    durationTime: "1445",
  },
  {
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/ae/04/a9/ae04a9e4-52a5-3676-efa3-a73c1b741a4e/4547366636147.jpg/32x32bb-60.jpg",
    music: "サマータイムシンデレラ",
    singer: "Ryokuoushoku Shakai",
    musicURL: "",
    durationTime: "1445",
  },
]);
</script>

<style scoped>
.aplayer-playlist-wrap {
  padding: 20px 10px 20px 10px;
  width: 280px;
  min-height: calc(100vh - 95px);
  border-left: 0.5px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(253, 253, 253, 0.8);
  position: absolute;
  right: 0;
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
}
.header span:last-child {
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.33338;
  color: var(--primary-key-color);
}
.playlist-container {
  border-bottom: 1px solid var(--list-border-color);
  border-top: 1px solid var(--list-border-color);
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
.playlist-music-title {
  color: var(--list-primary-text-color);
}
.playlist-music-singer {
  color: var(--list-second-text-color);
}
.playlist-content {
  width: 100%;
  height: 99.9%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--list-border-color);
}
.playlist-item:last-child .playlist-content {
  border: none;
}
.playlist-content-right {
  position: relative;
}

.playlist-content-right .menu {
  color: var(--primary-key-color);
  font-size: 28px;
  opacity: 0;
}
.playlist-content-right span {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: var(--list-transition);
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
  color: var(--list-second-text-color);
}

/* play list blur or focus */
.focus {
  background-color: var(--primary-key-color);
}
.blur {
  background-color: var(--second-key-color);
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
</style>
