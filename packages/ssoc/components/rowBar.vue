<template>
  <div class="charts" ref="$el"></div>
</template>
<script lang="ts">
export interface Row {
  name: string;
  value: number;
}
</script>
<script lang="ts" setup>
import * as echarts from "echarts";
import { fa } from "element-plus/es/locale";
import { ref, onMounted, watch, onUnmounted } from "vue";
const props = defineProps<{
  data: Row[];
}>();
let myChart: echarts.ECharts;
let timer: number;
const $el = ref();
let colorList = [
  "#468FF7",
  "#f7ad46",
  "#46e9f7",
  "#067c87",
  "#468FF7",
  "#f75446",
];
let mockData = [
  { name: "0-14岁", value: 25 },
  { name: "5-14岁", value: 55 },
  { name: "15-44岁", value: 85 },
  { name: "45-59岁", value: 65 },
  { name: "≥60岁", value: 45 },
  { name: "未填写", value: 85 },
];
watch(() => props.data, setChart);
onUnmounted(() => {
  clearInterval(timer);
});
onMounted(setChart);
function setChart() {
  const data =
    props.data?.map((item) => {
      const oldValue = item.value;

      return {
        ...item,
        value:
          oldValue === 0 || oldValue === 1
            ? 3
            : +(Math.log(oldValue) + 3).toFixed(2),
        realValue: oldValue,
      };
    }) || [];
  const max = Math.max(...data.map((item) => item.value));
  const chartMax = Math.ceil(max * 1.2);
  const diff = data?.map((item) => chartMax - item.value);

  const option = {
    color: colorList,
    grid: {
      top: 10,
      bottom: 20,
      left: 150,
      right: 80,
    },
    xAxis: [
      {
        splitLine: {
          show: false,
        },
        type: "value",
        show: false,
        max: chartMax,
      },
      {
        type: "value",
        inverse: true,
        show: false,
        max: chartMax,
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        type: "category",
        axisTick: {
          show: false,
        },
        inverse: true,
        data: data.map((item) => item.name),
        axisLabel: {
          color: "#01c0ff",
          fontSize: 12,
          margin: 10,
        },
        // zlevel: 10,
      },
      {
        type: "category",
        inverse: true,
        axisTick: "none",
        axisLine: "none",
        show: true,
        axisLabel: {
          fontFamily: "segmentFont",
          color: "#fff",
          fontSize: 15,
          fontWeight: 500,
        },

        data: data.map((item) => item.realValue),
      },
    ],
    series: [
      {
        name: "率",
        type: "bar",
        barWidth: 7, // 柱子宽度
        showBackground: true,
        backgroundStyle: {
          color: "#194B72",
        },
        label: {
          show: false,
        },
        z: 5,
        data: data.map((item, index) => {
          return {
            name: item.name,
            value: item.value,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#011753",
                  },
                  {
                    offset: 1,
                    color: colorList[index % colorList.length],
                  },
                ],
              },
            },
          };
        }),
      },

      {
        name: "反向",
        type: "bar",
        barWidth: 20, // 柱子宽度
        xAxisIndex: 1,
        barGap: "-180%",
        itemStyle: {
          color: "#061537",
        },
        label: {
          show: false,
        },
        z: 4,
        data: diff,
      },
      {
        name: "外圆",
        type: "scatter",
        emphasis: {
          scale: false,
        },
        symbol: "rect",
        symbolSize: [5, 10],
        symbolOffset: [0, -4],

        itemStyle: {
          color: "#FFF",
          shadowColor: "rgba(255, 255, 255, 0.5)",
          shadowBlur: 5,
          borderWidth: 1,
          opacity: 1,
        },
        z: 6,
        data: data,
        animationDelay: 500,
      },
      {
        name: "移动竖线",
        type: "scatter",
        emphasis: {
          scale: false,
        },
        symbol: "rect",
        symbolSize: [1, 18],
        symbolOffset: [0, -3],
        itemStyle: {
          color: "#FFF",
          shadowColor: "rgba(255, 255, 255, 0.5)",
          shadowBlur: 5,
          borderWidth: 1,
          opacity: 1,
        },
        z: 2,
        data: new Array(data.length).fill(0.2),
        animationDelay: 500,
      },
    ],
  };
  myChart?.dispose();
  myChart?.clear();
  myChart = echarts.init($el.value);
  let dir = true;
  const emptyArr = new Array(data.length).fill(0.2);
  clearInterval(timer);
  timer = setInterval(() => {
    myChart.setOption({
      series: [
        {
          name: "移动竖线",
          animationDurationUpdate: 2000,
          animationEasingUpdate: "linear",
          data: dir ? new Array(data.length).fill(max * 1.1) : emptyArr,
        },
      ],
    });
    dir = !dir;
  }, 3000);

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
