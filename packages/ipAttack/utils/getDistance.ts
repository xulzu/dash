function rad(d: number) {
  return (d * Math.PI) / 180.0;
}
// js根据经纬度计算两个点的距离公式
export default function getDistance(
  lng1: number,
  lat1: number,
  lng2: number,
  lat2: number
) {
  const radLat1 = rad(lat1);
  const radLat2 = rad(lat2);
  const a = radLat1 - radLat2;
  const b = rad(lng1) - rad(lng2);
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    );
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  return s;
}
