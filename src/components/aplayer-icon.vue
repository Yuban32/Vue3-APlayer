<template>
  <div class="svg-icon" :class="className">
    <svg class="icon" :style="style">
      <use :xlink:href="`#${iconId}`"></use>
    </svg>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
  style: {
    type: Object,
    default: () => ({}),
  },
});
const svgContent: Record<string, any> = import.meta.glob(`../assets/*.svg`);
const iconId: any = computed(() => {
  return `icon-${props.icon}`;
});
// const svgContent: Record<string, any> = import.meta.glob(
//   `../assets/${props.icon}.svg`
// );

// // Parse the SVG content to access <path> element attributes
// const parser = new DOMParser();
// const doc = parser.parseFromString(svgContent, "image/svg+xml");
// const pathElement = doc.querySelector("path");
// if (pathElement) {
//   const viewBox = pathElement.getAttribute("viewBox");
//   const fill = pathElement.getAttribute("fill");
//   console.log("viewBox:", viewBox);
//   console.log("fill:", fill);
// }
</script>
