import { Ref, computed, nextTick, ref, watch } from "vue";

export const useVolumeIcons = (
  volumeRefs: Ref<HTMLElement>,
  defaultVolume: number
) => {
  const volumeValue = ref<number>(defaultVolume);
  nextTick(() => {
    volumeRefs.value.style.setProperty(
      "--aplayer-volumeProgress",
      `${volumeValue.value}%`
    );
  });
  watch(volumeValue, async () => {
    await nextTick();
    volumeRefs.value.style.setProperty(
      "--aplayer-volumeProgress",
      `${volumeValue.value}%`
    );
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
