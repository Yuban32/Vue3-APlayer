export interface IPlaybackInfoItems {
  music: string;
  cover: string;
  singer: string;
  album: string;
  musicURL: string;
  durationTime: string;
  currentTime: string;
}
export interface IMusicListItems {
  music: string;
  cover: string;
  singer: string;
  musicURL: string;
  durationTime: string;
}
export interface IPlaybackInfo {
  currentMusicData: IPlaybackInfoItems;
}
export interface IAplayerData {
  musicDataList: IMusicListItems[];
  currentMusicData: IPlaybackInfoItems;
}
export interface IMusicListData {
  musicDataList: IMusicListItems[];
}
