import { nextTick, ref, Ref } from "vue";
import { playTimeFormat } from "../utils/utils";

export const useAudioEvent = (
  audioRef: Ref<HTMLAudioElement | null>,
  currentMusicData: any
) => {
  //status pause or play
  const playStatus = ref<string>("pause");
  const isEnded = ref<boolean>(false);
  const onPauseHandler = () => {
    playStatus.value = "pause";
  };
  const onPlayHandler = () => {
    playStatus.value = "play";
  };
  const onSeekedHandler = () => {};
  const Play = () => {
    if (isEnded.value) {
      //Resolve the error of the prompt DOMException: The element has no supported source after playback
      audioRef.value!.src = currentMusicData.value.musicURL;
    }
    nextTick(() => {
      audioRef.value!.play();
    });
  };
  const Pause = () => {
    nextTick(() => {
      audioRef.value!.pause();
    });
  };
  const onEnded = () => {
    isEnded.value = true;
  };
  const updateVolume = (value: number) => {
    nextTick(() => {
      audioRef.value!.volume = value / 100;
    });
  };
  const currentTime = ref<string>("0 : 00");
  const durationTime = ref<string>("0 : 00");
  const audioProgressValue = ref<number>(0);
  const playTimeFormats = () => {
    onTimeUpdate(() => {
      if (!Number.isNaN(DurationTime())) {
        currentTime.value = playTimeFormat(CurrentTime()!);
        audioProgressValue.value = Number(
          ((CurrentTime()! / DurationTime()) * 100).toFixed(2)
        );
        durationTime.value = playTimeFormat(DurationTime());
      } else {
        durationTime.value = "0 : 00";
      }
    });
  };

  const onTimeUpdate = async (callback: Function) => {
    await nextTick();
    audioRef.value?.addEventListener("timeupdate", () => {
      callback();
    });
  };
  playTimeFormats();
  const CurrentTime = (time?: number) => {
    if (time !== undefined) {
      audioRef.value!.currentTime = (time * DurationTime()) / 100;
      return;
    }
    return audioRef.value!.currentTime;
  };
  const DurationTime = () => {
    return audioRef.value!.duration;
  };
  const resetPlayTimeFormats = () => {
    audioProgressValue.value = 0;
    currentTime.value = "0 : 00";
    durationTime.value = "0 : 00";
    document.body.style.setProperty("--aplayer-audioProgress", `0%`);
  };

  return {
    onPauseHandler,
    onPlayHandler,
    onSeekedHandler,
    Play,
    Pause,
    onEnded,
    updateVolume,
    playTimeFormats,
    onTimeUpdate,
    CurrentTime,
    DurationTime,
    playStatus,
    currentTime,
    durationTime,
    audioProgressValue,
    resetPlayTimeFormats,
  };
};
