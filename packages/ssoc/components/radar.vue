<template>
  <div class="circleBox">
    <div class="charts" ref="$el"></div>
    <div class="charts gauge" ref="$el2"></div>
  </div>
</template>
<script lang="ts">
export interface Row {
  name: string;
  value: number;
}
</script>
<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, onMounted, watch, onUnmounted } from "vue";
import numformatter from "../utils/numformatter";
const props = defineProps<{
  data: Row[];
}>();
let myChart: echarts.ECharts;
let timer: number;
const $el = ref();
const $el2 = ref();
const data = [
  {
    name: "高危",
    value: 70,
  },
  {
    name: "低危",
    value: 80,
  },
  {
    name: "中危",
    value: 90,
  },
  {
    name: "其他",
    value: 100,
  },
];
onUnmounted(() => {
  clearInterval(timer);
});
watch(() => props.data, setChart);

onMounted(() => {
  setChart();
  setGaugeCharts();
});
function setgauge(i: number, base = 0) {
  return {
    name: "gauge" + i,
    type: "gauge",
    detail: false,
    splitNumber: 10, //刻度数量
    radius: "90%", //图表尺寸
    center: ["50%", "50%"],
    // startAngle: 90 + 72 * i + 18, //开始刻度的角度
    // endAngle: 90 + 72 * (i + 1) - 18, //结束刻度的角度
    startAngle: 0 - 18 + 90 * i + base, //开始刻度的角度
    endAngle: -90 + 18 + 90 * i + base, //结束刻度的角度
    axisLine: {
      show: false,
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "#66ccff",
        width: 1,
      },
      length: 6,
      splitNumber: 1,
    },
    splitLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  };
}
function setGaugeCharts() {
  const option = {
    series: [setgauge(0), setgauge(1), setgauge(2), setgauge(3)],
  };
  const chart = echarts.init($el2.value);
  chart.resize();
  chart.setOption(option);
}
function setChart() {
  const data =
    props.data?.map((item) => {
      const oldValue = item.value;
      return {
        ...item,
        value: oldValue === 0 || oldValue === 1 ? 3 : Math.log(oldValue) + 3,
        realValue: oldValue,
      };
    }) || [];
  if (!Array.isArray(data) || !data.length) return;
  const max = Math.max(...data.map((item) => item.value));

  const indicator_ = data?.map((item) => {
    return {
      name: item.name,
      max: max * 1.2,
      min: 0,
    };
  });
  const data_ = data?.map((item) => item.value);
  const option = {
    color: ["#00C0FD"],
    radar: {
      shape: "circle",
      center: ["50%", "50%"],
      radius: "60%",
      indicator: indicator_,
      axisName: {
        color: "#00C0FD",
        fontSize: 14,
      },
      splitNumber: 4,
      splitArea: {
        // 坐标轴在 grid 区域中的分隔区域，默认不显示。
        show: true,
        areaStyle: {
          // 分隔区域的样式设置。
          color: ["rgba(27, 50, 66, 0.4)"],
        },
      },
      axisLine: {
        //指向外圈文本的分隔线样式
        lineStyle: {
          color: "#203f5d",
        },
      },
      splitLine: {
        lineStyle: {
          color: "rgba(99,192,251,0.2)", // 分隔线颜色
          width: 2, // 分隔线线宽
        },
      },
    },
    series: [
      {
        type: "radar",
        color: "#f7e31f",
        silent: true,
        lineStyle: {
          color: "#00C0FD",
          // type: "dashed",
        },
        label: {
          show: true,
          color: "#fff",
          formatter: (params: any) => {
            const [num, unit] = numformatter(
              data[params.dimensionIndex]?.realValue || 0
            );
            return `{a|${num}}${unit}`;
          },
          // fontFamily: "segmentFont",
          rich: {
            a: {
              fontFamily: "segmentFont",
            },
          },
        },
        areaStyle: {
          opacity: 0.8, // 区域透明度
          color: {
            type: "radial",
            x: 0.5, //右
            y: 0.5, //下
            r: 1,
            colorStops: [
              {
                offset: 1,
                color: "#4BFFFC",
              },
              {
                offset: 0,
                color: "rgba(0,0,0,0)",
              },
            ],
            globalCoord: false,
          },
        },
        data: [
          {
            value: data_,
          },
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
  position: absolute;
  top: 0;
  left: 0;
}
.circleBox {
  position: relative;
  height: 100%;
  width: 100%;
}
.gauge {
  animation: rotate 10s linear infinite;
}
@keyframes rotate2 {
  to {
    transform: rotate(-360deg);
  }
}
</style>
