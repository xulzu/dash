<template>
  <div class="singleAreaChart" ref="$el"></div>
</template>
<script lang="ts">
export interface Row {
  timestamp: number;
  time: string;
  malice: number;
  normal: number;
}
</script>
<script lang="ts" setup>
import TWEEN from "@tweenjs/tween.js";
import * as echarts from "echarts";
import { ref, onMounted, watch, nextTick } from "vue";
import moment from "moment";
// import { lineData } from "./mock";
const props = defineProps<{
  data: Row[];
}>();
let myChart: echarts.ECharts;
watch(
  () => props.data,
  (val) => {
    nextTick(setChart);
  }
);
const $el = ref();
function numParse(num: number) {
  if (num >= 100000) {
    return Number(num / 10000).toFixed(0) + "W";
  }
  if (num >= 10000) {
    return Number(num / 1000).toFixed(0) + "K";
  }
  return num;
}
onMounted(setChart);
function setChart() {
  const lineData = props.data?.map((item) => {
    item.time = moment(item.timestamp * 1000).format("YYYY-MM-DD");
    return item;
  });
  let option = {
    grid: {
      top: "30",
      bottom: "12%",
      left: "10%",
      right: "5%",
    },
    xAxis: {
      type: "time",
      boundaryGap: false,
      axisLabel: {
        color: "#61B9C8",
        fontSize: 10,
      },
      axisLine: {
        symbol: ["none", "arrow"],
        symbolSize: [6, 6],
        symbolOffset: [0, 5],
        lineStyle: {
          color: "#122C49",
        },
      },
      axisTick: {
        color: "#122C49",
        inside: true,
      },
      z: 2,
      // data: lineData.map((item) => item.time),
    },
    yAxis: {
      type: "value",
      min: 0,
      max: (item: any) => {
        return item.max / 0.8;
      },
      axisLine: {
        show: true,

        symbol: ["none", "arrow"],
        symbolSize: [6, 6],
        lineStyle: {
          color: "#122C49",
        },
      },
      axisLabel: {
        color: "#61B9C8",
        showMaxLabel: false,
        fontSize: 10,
        formatter: function (value: number) {
          return numParse(value);
        },
      },
      splitLine: {
        show: false,
      },
      name: "(次)",
      nameTextStyle: {
        color: "#61B9C8",
        fontSize: 9,
        align: "right",
        padding: [0, 6, 0, 0],
      },
      axisTick: {
        show: true,
      },
    },

    series: [
      {
        name: "恶意流量",
        type: "line",
        symbol: "none",
        zlevel: 2,
        smooth: true,
        data: lineData.map((item) => [item.timestamp * 1000, item.malice]),
        lineStyle: {
          width: 1,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#B21356", // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "#B21356", // 40% 处的颜色
              },
              {
                offset: 1,
                color: "#F59111", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          }, //背景渐变色
        },
        itemStyle: {
          color: "rgb(212,37,23)",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            opacity: 0.7,
            colorStops: [
              {
                offset: 0,
                color: "#A41B68", // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "rgba(112,20,82,1)", // 40% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(112,20,82,0)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          }, //背景渐变色
          origin: "start",
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
}
</script>

<style lang="less" scoped>
.singleAreaChart {
  width: 100%;
  height: 100%;
}
</style>
