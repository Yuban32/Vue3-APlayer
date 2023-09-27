import { ref } from "vue";
import { IMusicListData, IMusicListItems } from "../types/types";

export const useAudioPlayRules = ({ musicDataList }: IMusicListData) => {
  const useCurrentMusicData = ref<IMusicListItems>();
  const REPEAT = {
    REPEAT_ONE: "REPEAT_ONE",
    REPEAT_ALL: "REPEAT_ALL",
    REPEAT_NONE: "REPEAT_NONE",
  };
  const repeatFlag = ref(REPEAT.REPEAT_ALL);

  const handlePreviousPlay = (currentMusicData: IMusicListItems) => {
    if (musicDataList.length == 1) {
      useCurrentMusicData.value = musicDataList[1];
    }
    return useCurrentMusicData;
  };
  const handleNextPlay = () => {};

  const repeatMode = (flag: string) => {
    switch (flag) {
      case REPEAT.REPEAT_ONE:
        repeatFlag.value = REPEAT.REPEAT_ALL;
        break;
      case REPEAT.REPEAT_ALL:
        repeatFlag.value = REPEAT.REPEAT_NONE;
        break;
      case REPEAT.REPEAT_NONE:
        repeatFlag.value = REPEAT.REPEAT_ONE;
        break;
      default:
        new Error("repeatMode() only accept REPEAT_ONE REPEAT_NONE REPEAT_ALL");
    }
  };
};
