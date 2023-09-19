import { Ref, computed, nextTick, ref, watch } from "vue";

//TODO 尚未完善 后续需要介入AUDIO事件
export const useVolumeIcons = (volumeRefs: Ref<HTMLElement>) => {
  const volumeValue = ref<number>(0);
  watch(volumeValue, async () => {
    await nextTick();
    volumeRefs.value.style.setProperty("--percentage", `${volumeValue.value}%`);
  });
  const handleVolumeIcon = computed(() => {
    let icons = "";
    if (volumeValue.value > 60) {
      icons = "volume-2";
    } else if (volumeValue.value <= 60 && volumeValue.value > 0) {
      icons = "volume-1";
    } else if (volumeValue.value == 0) {
      icons = "volume-mute";
    }
    return icons;
  });
  return { handleVolumeIcon, volumeValue };
};
