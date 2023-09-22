const zeroFill = (num: number) => {
  return (num < 10 ? "0" + num : num) as string;
};
/**
 * @description time format
 * @param time
 * @returns minutes : seconds
 */
export const playTimeFormat = (time: number) => {
  // let minutes: string = zeroFill(Math.floor((time % 3600) / 60));
  let minutes: string = JSON.stringify(Math.floor((time % 3600) / 60));
  let seconds: string = zeroFill(Math.floor(time % 60));
  return `${minutes} : ${seconds}`;
};

export const parseLyricArray = (lyric: any) => {
  let lyricArray = lyric.split("\n");
  let reg = /\[(\d+):(\d+\.\d+)\](.*)/;
  let parseLyric = lyricArray.map((lc: any) => {
    let regResult = reg.exec(lc);
    if (regResult) {
      return {
        time: (parseInt(regResult[1]) * 60 + parseFloat(regResult[2])).toFixed(
          2
        ),
        lyric: regResult[3],
      };
    }
  });
  return parseLyric;
};
