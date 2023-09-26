<template>
  <div class="app">
    <Vue3AplayerApp :musicDataList="musicDataList" />
  </div>
</template>

<script setup lang="ts">
import Vue3AplayerApp from "../Vue3-Aplayer-App.vue";
import lyric1 from "./05.ギターと孤独と蒼い惑星.json";
import lyric2 from "./Cyua - A Letter.json";

const getAssets = (path: string) => {
  return new URL(path, import.meta.url).href;
};
/**
 * @description MT EN
 * cover : Accept local images or use URLs to use online images
 * musicURL : Accept local audio resource or use URLs to use online audio resource
 *             and resource supported by audio elements
 * lyric : Only supports .lrc format for lyric files. and they need to be converted to a string type.
 *        If you are using local files, you need to import these files
 *        and convert them to a string type before using them.
 * @description ZH
 * cover : 接受本地的图片或者使用URL的形式引用在线图片.使用本地图片之前需要import,否则会报错.
 * musicURL : 接受本地的音频资源或者使用URL的形式引用在线音频资源,且必须是audio标签元素所支持的格式
 * lyric : 只支持.lrc格式的歌词文件而且需要转换成字符串形式才能使用.
 *         如果你使用的是本地的文件,你需要自行import导入文件,并且在使用前转换成字符串形式
 */
const musicDataList = [
  {
    cover: getAssets("./05.ギターと孤独と蒼い惑星2.png"),
    music: "ギターと孤独と蒼い惑星",
    singer: "結束バンド",
    album: "ギターと孤独と蒼い惑星",
    musicURL: getAssets("./05.ギターと孤独と蒼い惑星.flac"),
    lyric: lyric1,
  },
  {
    cover: getAssets("./Cyua - A Letter.png"),
    music: "A Letter",
    singer: "Cyua",
    album: "機動戦士ガンダムUC オリジナル・サウンドトラック",
    musicURL: getAssets("./Cyua - A Letter.mp3"),
    lyric: lyric2,
  },
];
</script>
<style scoped></style>
