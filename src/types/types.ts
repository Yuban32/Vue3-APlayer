export interface IPlaybackInfoItems {
  music: string;
  cover: string;
  singer: string;
  album: string;
  musicURL: string;
  durationTime: string;
  currentTime: string;
}
export interface Items {
  music: string;
  cover: string;
  singer: string;
  album: string;
  musicURL: string;
  durationTime: string;
}
export interface IMusicDataList {
  data?: Items[];
}
export interface IPlaybackInfo {
  playbackInfo: IPlaybackInfoItems;
}
