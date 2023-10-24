<template>
  <div class="charts" ref="$el"></div>
</template>
<script lang="ts">
export interface Row {
  time: string;
  [key: string]: number | string;
}
</script>
<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, onMounted, watch, onUnmounted } from "vue";
import moment from "moment";
import numformatter from "../utils/numformatter";
const props = defineProps<{
  data?: Row[];
}>();
let myChart: echarts.ECharts;
const $el = ref();

watch(() => props.data, setChart);

function parseData(arr: { [key: string]: number | string }[]) {
  const obj: Record<string, (number | string)[][]> = {};
  for (let item of arr) {
    Object.keys(item).forEach((key) => {
      if (key !== "time") {
        obj[key] = obj[key] || [];
        obj[key].push([
          moment(+item.time).format("YYYY-MM-DD HH:mm:ss"),
          +(item[key] || 0) / 1024 / 1024,
        ]);
      }
    });
  }
  const res = Object.entries(obj).map(([key, data]) => {
    return {
      name: key,
      data,
    };
  });
  return res;
}
onMounted(setChart);
const color = [
  "#468FF7",
  "#f7ad46",
  "#46e9f7",
  "#067c87",
  "#468FF7",
  "#f75446",
  "red",
  "green",
  "yellow",
  "#fff",
];

function setChart() {
  const seriesData = props.data || [];
  const option = {
    grid: {
      top: 50,
      bottom: 20,
      left: 30,
      right: 25,
    },
    legend: {
      show: true,
      right: 10,
      top: 10,
      textStyle: {
        color: "#01c0ff",
        fontSize: 10,
      },
    },
    xAxis: {
      type: "time",
      axisLabel: {
        color: "#61B9C8",
        fontSize: 10,
        formatter: {
          year: "{yyyy}",
          month: "{MMM}",
          day: "{MM}-{d}",
          hour: "{HH}:{mm}",
          minute: "{HH}:{mm}",
          second: "{HH}:{mm}:{ss}",
          none: "{MM}-{dd}",
        },
      },
      axisLine: {
        symbol: ["none", "arrow"],
        symbolSize: [6, 6],
        symbolOffset: [0, 5],
        lineStyle: {
          color: "#122C49",
        },
      },
      minInterval: 10 * 60 * 1000,
      axisTick: {
        color: "#122C49",
        inside: true,
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: (item: any) => {
        return item.max / 0.9;
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
      },
      splitLine: {
        show: false,
      },
      name: "(兆)",
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
    series: parseData(seriesData!)?.map((item, index) => {
      return {
        name: item.name,
        type: "line",
        smooth: true,
        symbol: "none", //空心小圆点。线条小圆点形状
        // symbolSize: 6, //小圆点大小
        itemStyle: {
          //还是小圆点设置
        },
        data: item.data,
        label: {
          show: false, //不显示小圆点上的label文字
        },
        lineStyle: {
          width: 1, //线条设置
        },
        areaStyle: {
          //填充线条下面的面积区域颜色。（areaStyle只是锦上添花）
          opacity: 0.2,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: color[index % color.length], // 上处的颜色
              },
              {
                offset: 1,
                color: "transparent", // 下处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      };
    }),
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
</style>
