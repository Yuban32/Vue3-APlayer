<template>
  <svg
    :class="`icon ${className == undefined ? '' : className} ${classNames}`"
    :viewBox="svg.viewBox"
    :p-id="svg.pid"
    width="100%"
    height="100%"
  >
    <use :xlink:href="`#${iconId}`"></use>
    <path class="aplayer-icon-fill" :d="svg.d" :p-id="svg.pid"></path>
  </svg>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  className: {
    type: String,
  },
});

interface ISvg {
  value: any;
  d: string;
  viewBox: string;
  pid: string;
}
const svg: ISvg = ref<any>({});
const iconId: any = computed(() => {
  return `icon-${props.icon}`;
});
const classNames = computed(() => {
  return `icon-${props.icon}`;
});
const svgContent: any = ref<any>();
svgContent.value = import.meta.glob(`@/assets/*.svg`);
Object.keys(svgContent.value).forEach(async (item: any) => {
  if (item.includes(props.icon)) {
    const res = await fetch(item)
      .then((res) => res.text())
      .then((res) => res);
    const viewBoxRegex = /viewBox="([^"]+)"/;
    const dRegex = /<path d="([^"]+)"/;
    const pidRegex = /p-id="([^"]+)"/;
    const viewBoxMatch = res.match(viewBoxRegex);
    const dMatch = res.match(dRegex);
    const pidMatch = res.match(pidRegex);
    svg.value.pid = pidMatch ? pidMatch[1] : null;
    svg.value.viewBox = viewBoxMatch ? viewBoxMatch[1] : null;
    svg.value.d = dMatch ? dMatch[1] : null;
  }
});
</script>
