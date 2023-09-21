const zeroFill = (num: number) => {
  return (num < 10 ? "0" + num : num) as string;
};
/**
 * @description time format
 * @param time
 * @returns minutes : seconds
 */
export const playTileFormat = (time: number) => {
  // let minutes: string = zeroFill(Math.floor((time % 3600) / 60));
  let minutes: string = JSON.stringify(Math.floor((time % 3600) / 60));
  let seconds: string = zeroFill(Math.floor(time % 60));
  return `${minutes} : ${seconds}`;
};
