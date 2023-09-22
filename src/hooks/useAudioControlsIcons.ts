import { nextTick, ref, watch } from "vue";

export const useChangePlayIcons = (injectPlayStatus: any) => {
  const playIcons = ref<string>("play");
  watch(injectPlayStatus, (newValue: any) => {
    nextTick(() => {
      if (newValue == "play") {
        playIcons.value = "pause";
      } else if (newValue == "pause") {
        playIcons.value = "play";
      }
    });
  });
  return { playIcons };
};
