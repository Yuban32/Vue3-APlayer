import { nextTick, ref, Ref } from "vue";
import { parseLyricArray, playTimeFormat } from "../utils/utils";

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
    audioRef.value!.play();
  };
  const Pause = () => {
    audioRef.value!.pause();
  };
  const onEnded = () => {
    isEnded.value = true;
  };
  const updateVolume = (value: number) => {
    audioRef.value!.volume = value / 100;
  };
  const currentTime = ref<string>("0 : 00");
  const durationTime = ref<string>("0 : 00");
  const audioProgressValue = ref<number>(0);
  const playTimeFormats = () => {
    onTimeUpdate(() => {
      currentTime.value = playTimeFormat(CurrentTime()!);
      audioProgressValue.value = Number(
        ((CurrentTime()! / DurationTime()) * 100).toFixed(2)
      );
      durationTime.value = playTimeFormat(DurationTime());
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
      console.log(time);

      audioRef.value!.currentTime = (time * DurationTime()) / 100;
      return;
    }
    return audioRef.value!.currentTime;
  };
  const DurationTime = () => {
    return audioRef.value!.duration;
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
  };
};
