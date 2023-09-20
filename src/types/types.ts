export interface IMusicListItems {
  music: string;
  cover: string;
  singer: string;
  album: string;
  musicURL: string;
  durationTime: string;
  currentTime?: string;
}

export interface ICurrentMusicData {
  currentMusicData: IMusicListItems;
}
export interface IAplayerData {
  musicDataList: IMusicListItems[];
  currentMusicData: IMusicListItems;
}
export interface IMusicListData {
  musicDataList: IMusicListItems[];
}
