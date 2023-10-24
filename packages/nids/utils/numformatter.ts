/* 将数字格式化为k，w,kw的格式 */
export default function numParse(num: number) {
  let res = num,
    unit = "";
  if (num >= 10000) {
    res = +Number(num / 1000).toFixed(0);
    unit = "k";
  }
  if (num >= 100000) {
    res = +Number(num / 10000).toFixed(0);
    unit = "w";
  }
  if (num >= 100000000) {
    res = +Number(num / 10000000).toFixed(0);
    unit = "kw";
  }
  return [res, unit];
}
