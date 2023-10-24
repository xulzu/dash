<template>
  <div class="charts" ref="$el"></div>
</template>
<script lang="ts">
export interface Row {
  name: string;
  data: {
    name: "win" | "linux" | "mac" | "other";
    value: number;
  }[];
}
</script>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted, watch, onUnmounted } from "vue";
// import s from '../assets'
import windowsSVG from "../assets/windows.svg";
import macSVG from "../assets/mac.svg";
import linuxSVG from "../assets/linux.svg";
import otherSVG from "../assets/other.svg";
import jifangSVG from "../assets/机房.svg";

const props = defineProps<{
  data: Row;
}>();
let myChart: echarts.ECharts;
let timer: number;
const $el = ref();
let result = [
  { name: "win", value: 25 },
  { name: "mac", value: 85 },
  { name: "other", value: 65 },
  { name: "linux", value: 55 },
].reverse();
onUnmounted(() => {
  clearInterval(timer);
});
watch(() => props.data, setChart);
onMounted(setChart);
const tagetProperty = {
  win: {
    symbol: windowsSVG,
    symbolSize: 30,
  },
  mac: {
    symbol: macSVG,
    symbolSize: 30,
  },
  linux: {
    symbol: linuxSVG,
    symbolSize: 25,
  },
  other: {
    symbol: otherSVG,
    symbolSize: 20,
  },
};
function setChart() {
  let sum = 0;
  const sortWeight = {
    linux: 4,
    win: 1,
    other: 2,
    mac: 3,
  };
  const data_: any[] =
    [...(props.data?.data || [])]
      ?.sort((a, b) => {
        return sortWeight[a.name] - sortWeight[b.name];
      })
      .map((item, idx) => {
        sum += item.value;
        return {
          name: item.name,
          value: [100, (idx * 2 + 1) * 45, item.value],
          symbol: "image://" + tagetProperty[item.name].symbol,
          symbolSize: tagetProperty[item.name].symbolSize,
          label: {
            show: true,
            formatter: "{a|{b}}\n{b|{@[2]}}",
            offset: [0, 25],
            align: "center",
            rich: {
              a: {
                fontSize: 12,
                color: "#01c0ff",
              },
              b: {
                fontSize: 14,
                color: "#fff",
                fontFamily: "segmentFont",
              },
            },
          },
          itemStyle: {
            color: "red",
          },
        };
      }) || [];

  data_.unshift({
    name: props.data?.name || "",
    value: [0, 0, sum],
    symbol: "image://" + jifangSVG,
    symbolSize: 40,
    symbolOffset: [0, 0],
    label: {
      show: true,
      offset: [0, 30],
      formatter: "{a|{b}}\n{b|{@[2]}}",
      color: "#01c0ff",
      align: "center",
      rich: {
        a: {
          fontSize: 12,
          color: "#01c0ff",
        },
        b: {
          fontSize: 14,
          color: "#fff",
          fontFamily: "segmentFont",
        },
      },
    },
    itemStyle: {
      color: "red",
    },
  });

  const option = {
    xAxis: {
      show: false,
    },

    polar: [
      {
        radius: "90%",
        center: ["50%", "47%"],
      },
    ],
    radiusAxis: {
      type: "value",
      show: false,
    },
    angleAxis: [
      {
        max: 360,
        show: false,
      },
    ],
    yAxis: {
      show: false,
    },
    series: [
      {
        name: "节点",
        type: "graph",
        hoverAnimation: false, // 鼠标悬浮高亮
        coordinateSystem: "polar",
        itemStyle: {
          shadowColor: "none",
        },
        silent: true,
        emphasis: {
          scale: false,
        },
        data: data_,
      },
      {
        name: "线",
        type: "lines",
        silent: true,
        coordinateSystem: "polar",
        polyline: true, // 多线段
        zlevel: 2,
        lineStyle: {
          width: 2,
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: "#585fe1",
            },
            {
              offset: 1,
              color: "#0ff",
            },
          ]),
          type: 4,
          join: "round",
        },
        effect: {
          show: true,
          constantSpeed: 60,
          trailLength: 0,
          symbol: "arrow", //箭头图标
          symbolSize: 6,
          color: "#01c0ff",
          roundTrip: true,
        },
        emphasis: {
          lineStyle: {
            type: "solid",
          },
        },
        data: [
          [
            [20, 180], // 起点
            [74, 30],
            [91, 45], // 终点
          ],
          [
            [20, 180], // 起点
            [84, 150],
            [104, 135], // 终点
          ],
          [
            [20, 180], // 起点
            [84, 210],
            [104, 225], // 终点
          ],
          [
            [20, 180], // 起点
            [74, 330],
            [91, 315], // 终点
          ],
        ],
      },
    ],
  };
  myChart?.dispose();
  myChart?.clear();
  myChart = echarts.init($el.value);
  myChart.resize();
  myChart.setOption(option);
}
</script>
<style lang="less" scoped>
.charts {
  height: 100%;
  width: 100%;
}
.test {
  color: #468ff7;
}
</style>
