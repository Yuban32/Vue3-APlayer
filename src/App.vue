<script setup lang="ts">
import AplayerContainer from "./components/aplayer-container.vue";
</script>

<template>
  <div>
    <AplayerContainer />
  </div>
</template>

<style scoped></style>
<!-- 
  Because I use Vite as my project build tool, 
  I aim to ensure compatibility with non-Vite environments. 
  Therefore, I avoid excessive component encapsulation and 
  try to minimize the use of Vite-specific APIs. 
  因为我使用vite作为项目构建工具，为了兼容到非vite环境下，
  所以我不做过多的组件封装，尽可能不使用vite专属的API。
-->
