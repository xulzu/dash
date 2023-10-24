<template>
  <div ref="$el" class="chinaMap"></div>
  <div
    v-if="chinaCount + foreignCount"
    style="position: absolute; top: 0; left: 20px"
  >
    <div class="title">
      国内攻击占比<span>{{
        toFix2(chinaCount / (chinaCount + foreignCount))
      }}</span
      ><i>%</i>
    </div>
    <div class="title">
      国外攻击占比<span>{{
        toFix2(foreignCount / (foreignCount + chinaCount))
      }}</span
      ><i>%</i>
    </div>
  </div>
</template>

<script lang="ts">
export interface Row {
  fromName: string;
  from: [number, number];
  fromCountry: string;
  toCountry: string;

  to: [number, number];
  toName: string;
  value: number;
}
</script>
<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, onMounted, watch, nextTick } from "vue";
import registerMapChinaMap from "../assets/chinaMap";
import wordtest from "../assets/world.json";
import getDistance from "../utils/getDistance";
import shot from "../assets/瞄准 (1).png";
registerMapChinaMap(echarts);
//@ts-ignore
echarts.registerMap("world", wordtest);
const $el = ref();
let toolTipTimer: any;
const props = defineProps<{
  data: Row[];
}>();

watch(
  () => props.data,
  (val) => {
    nextTick(setMap);
  }
);
onMounted(setMap);
interface PosMap {
  [key: string]: {
    pos: [number, number];
    name: string;
    country: string;
    attack: number;
    attackObj: Set<string>;
    attacked: number;
    attackedObj: Set<string>;
  };
}
function convertData(data_: any) {
  const posMap: PosMap = {};

  for (let item of data_) {
    const fromKey = item.from?.join(",");
    const toKey = item.to?.join(",");
    posMap[fromKey] = posMap[fromKey] || {};
    posMap[fromKey].pos = item.from;
    posMap[fromKey].name = item.fromName;
    posMap[fromKey].country = item.fromCountry;
    posMap[fromKey].attack = (posMap[fromKey].attack || 0) + item.value;
    posMap[fromKey].attacked = posMap[fromKey].attacked || 0;
    posMap[fromKey].attackObj = posMap[fromKey].attackObj || new Set();
    posMap[fromKey].attackObj.add(toKey);
    posMap[fromKey].attackedObj = posMap[fromKey].attackedObj || new Set();

    posMap[toKey] = posMap[toKey] || {};
    posMap[toKey].pos = item.to;
    posMap[toKey].name = item.toName;
    posMap[toKey].country = item.toCountry;
    posMap[toKey].attack = posMap[toKey].attack || 0;
    posMap[toKey].attacked = (posMap[toKey].attacked || 0) + item.value;
    posMap[toKey].attackObj = posMap[toKey].attackObj || new Set();
    posMap[toKey].attackedObj = posMap[toKey].attackedObj || new Set();
    posMap[toKey].attackedObj.add(fromKey);
  }
  return posMap;
}
/** @desc  如果来自国外的攻击总数超过20%，则显示地图或者线路时过滤掉国外数据 */
function isFilterForeign() {
  const length = props.data?.length || 0;
  const foreignLength = props.data?.filter(
    (item) => item.fromCountry !== "中国"
  ).length;
  return foreignLength / length > 0.2;
}
function getLinesData(map: PosMap) {
  const flag = isFilterForeign();
  const min = flag ? 2000 : 500;
  const linesData: [PosMap["key"]["pos"], PosMap["key"]["pos"], number][] = [];
  const pointsData = new Set<string>();
  const heightLightRegions = new Set<string>();
  let foreignCount = 0; //来自国外的攻击数目
  let chinaCount = 0; //来自国内的攻击数目
  for (let key in map) {
    if (map[key].attacked <= 0) continue;

    const allAttackedObj = [...map[key].attackedObj];
    const filter = new Set<number>();
    //合并相邻的攻击点对同一个目标点攻击的情况
    for (let i = 0; i < allAttackedObj.length; i++) {
      for (let j = i + 1; j < allAttackedObj.length; j++) {
        if (filter.has(i)) continue;
        const pos1 = map[allAttackedObj[i]].pos;
        const pos2 = map[allAttackedObj[j]].pos;
        if (getDistance(...pos1, ...pos2) < min) filter.add(j);
      }
    }
    for (let i = 0; i < allAttackedObj.length; i++) {
      if (map[allAttackedObj[i]].country === "中国") {
        chinaCount++;
      } else {
        foreignCount++;
        if (!flag) continue;
      }
      if (!filter.has(i)) {
        pointsData.add(key);
        pointsData.add(allAttackedObj[i]);
        if (
          getDistance(...map[key].pos, ...map[allAttackedObj[i]].pos) >= min
        ) {
          heightLightRegions.add(allAttackedObj[i]);
          linesData.push([
            map[allAttackedObj[i]].pos,
            map[key].pos,
            map[allAttackedObj[i]].attack,
          ]);
        }
      }
    }
  }
  return {
    linesData,
    pointsData: [...pointsData].map((key) => map[key]),
    foreignCount,
    chinaCount,
    heightLightRegions: [...heightLightRegions]
      .map((key) => map[key])
      .filter((item) => {
        if (flag) {
          return item.country !== "中国";
        } else {
          return true;
        }
      })
      .map((item) => (flag ? item.country : item.name)),
  };
}
let myChart: echarts.ECharts;
const chinaCount = ref(0);
const foreignCount = ref(0);

function setMap() {
  const mapData =
    props.data?.map((item) => {
      item.from[0] = (item.from[0] + 360) % 360;
      item.to[0] = (item.to[0] + 360) % 360;

      return item;
    }) || [];
  const dataConverted = convertData(mapData);
  const hasForeign = isFilterForeign();
  const {
    linesData,
    pointsData,
    heightLightRegions,
    chinaCount: c_count,
    foreignCount: f_count,
  } = getLinesData(dataConverted);
  chinaCount.value = c_count;
  foreignCount.value = f_count;
  let option = {
    silent: true,
    animation: false,

    geo: {
      zoom: hasForeign ? 1.3 : 1.2,
      map: hasForeign ? "world" : "china",
      roam: false,
      itemStyle: {
        areaColor: "#2043AA",
        borderColor: "#2ab8ff",
        borderWidth: 0.5,
        shadowColor: "#231ecf",
        shadowBlur: 5,
        shadowOffsetY: 10,
      },

      silent: true,
      regions: heightLightRegions.map((name) => ({
        name,
        label: {
          show: true,
          color: "#6eddf1",
        },
        itemStyle: {
          areaColor: "#2988a8",
          shadowColor: "#033a4d",
          borderColor: "#1b03f4",
        },
      })),
    },
    tooltip: {
      show: true,
    },
    visualMap: [
      {
        //图例值控制
        type: "piecewise",
        min: 0,
        max: Math.max(
          ...Object.values(dataConverted).map((item) => item.attack),
          0
        ),
        left: 15,
        bottom: 10,
        show: true,
        itemWidth: 7,
        itemHeight: 15,
        orient: hasForeign ? "horizontal" : "",
        inRange: {
          color: ["#fff", "yellow", "#2088aa", "#c618e6", "red"],
        },
        calculable: false,
        indicatorStyle: {
          opacity: 0.1,
        },
        text: ["大量攻击", "少量攻击"].map((item) => {
          return hasForeign ? item : item.split("").join("\n");
        }),
        textStyle: {
          color: "#6eddf1",
        },
      },
    ],
    series: [
      {
        type: "lines",
        zlevel: 2,
        silent: true,
        effect: {
          show: true,
          period: hasForeign ? 3 : 2, //箭头指向速度，值越小速度越快
          trailLength: 0.2, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: "arrow", //箭头图标
          symbolSize: 6, //图标大小
        },
        lineStyle: {
          width: 0,
          curveness: 0.3, //尾迹线条曲直度
        },
        data: linesData.map((item) => {
          return {
            coords: [item[0], item[1]],
            value: item[2],
          };
        }),
      },
      {
        name: "scatter",
        type: "scatter",
        coordinateSystem: "geo",
        zlevel: 2,
        silent: true,
        data: pointsData
          .sort((a, b) => b.attacked - a.attacked)
          .map((item) => {
            return {
              value: [...item.pos, item.attack],
              symbolSize: item.attacked ? 20 : 13,
              symbol: item.attacked ? "image://" + shot : "circle",
              ...(item.attacked
                ? {}
                : {
                    itemStyle: {
                      shadowColor: "rgba(115, 243, 255, 1)",
                      shadowBlur: 6,
                    },
                  }),
            };
          }),
        tooltip: {
          formatter: (params: any) => {
            const { dataIndex } = params;
            if (pointsData[dataIndex].attacked > 0) {
              return `${pointsData[dataIndex].name}被攻击<span style='color:red'>${pointsData[dataIndex].attacked}</span>
            次`;
            } else {
              return `${pointsData[dataIndex].name}发起攻击<span style='color:red'>${pointsData[dataIndex].attack}</span>
            次`;
            }
          },
          textStyle: {
            color: "#6eddf1",
            fontWeight: "bold",
          },
          borderColor: "#6eddf1",
          backgroundColor: "#9f335373",
        },
      },
    ],
  };
  myChart?.clear();
  myChart?.dispose();
  myChart = echarts.init($el.value);
  myChart.clear();
  myChart.resize();
  myChart.setOption(option);
  showToolTip(myChart);
}
function showToolTip(myChart: echarts.ECharts) {
  clearInterval(toolTipTimer);
  let i = 0;
  const series: { name: string; [key: string]: any }[] = (
    myChart.getOption() as any
  )?.series;
  const idx = series.findIndex((item) => item.name === "scatter");
  const data = series[idx].data;
  if (!data) return;
  const length = data.length;
  toolTipTimer = setInterval(() => {
    i %= Math.min(length, 10);
    myChart.dispatchAction({
      type: "showTip",
      seriesIndex: idx,
      dataIndex: i,
    });
    i++;
  }, 3000);
}
function toFix2(num: number) {
  return +Number(num).toFixed(1) * 100;
}
</script>
<style lang="less" scoped>
.chinaMap {
  height: 100%;
  color: rgb(255, 196, 0);
}
.title {
  color: #6eddf1;
  // font-weight: bolder;
  line-height: 30px;
  display: flex;
  align-items: center;

  span {
    margin-left: 5px;
    font-family: segmentFont;
    font-size: 28px;
    color: red;
    font-weight: 900;
  }
  i {
    // font-size: 28px;
    color: red;

    font-weight: 900;
  }
}
</style>
