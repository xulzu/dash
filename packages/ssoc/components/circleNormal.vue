<template>
  <div style="width: 100%; height: 100%; display: flex">
    <div class="circleBox">
      <div class="svg1box">
        <svg class="svgItem svg1">
          <circle
            id="circle1"
            cx="50%"
            cy="50%"
            r="29%"
            fill="transparent"
            stroke="#A098FC"
            stroke-dasharray="70,1000"
            stroke-width="1"
          />
        </svg>
        <svg class="svgItem svg2">
          <circle
            id="circle2"
            cx="50%"
            cy="50%"
            r="29%"
            fill="transparent"
            stroke="#A098FC"
            stroke-dasharray="70,1000"
            stroke-width="1"
          />
        </svg>
      </div>
      <div class="svg2box">
        <svg class="svgItem svg1">
          <circle
            id="circle1"
            cx="50%"
            cy="50%"
            r="32%"
            fill="transparent"
            stroke="#4386FA"
            stroke-dasharray="100,1000"
            stroke-width="1"
          />
        </svg>
        <svg class="svgItem svg2">
          <circle
            id="circle2"
            cx="50%"
            cy="50%"
            r="32%"
            fill="transparent"
            stroke="#4386FA"
            stroke-dasharray="100,1000"
            stroke-width="1"
          />
        </svg>
      </div>
      <div class="charts" ref="$el"></div>
    </div>
    <div
      style="
        width: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        transform: translateX(-15px);
        color: var(--baseColor);
      "
      class=""
    >
      <span style="font-size: 12px"> cpu</span>
      <span> {{ data?.cpu || "--" }}% </span>
      <div style="width: 10px; height: 5px"></div>
      <span style="font-size: 12px"> mem</span>
      {{ data?.mem || "--" }}%
    </div>
  </div>
</template>
<script lang="ts">
export interface Row {
  cpu: number;
  mem: number;
  title: string;
}
</script>
<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, onMounted, watch, onUnmounted } from "vue";
const props = defineProps<{
  data?: Row;
}>();
let myChart: echarts.ECharts;
let timer: number;
const $el = ref();
onUnmounted(() => {
  clearInterval(timer);
});
onMounted(setChart);
watch(() => props.data, setChart);
function parseData(num: number, max = 100) {
  const totolSplit = max >> 1;
  const arr = [];
  const compare = (num / max) * totolSplit;
  for (let i = 0; i < totolSplit; i++) {
    arr.push({
      value: 1,
      name: i,
      itemStyle: {
        color:
          i < compare
            ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#0ff",
                },
                {
                  offset: 1,
                  color: "#5467df",
                },
              ])
            : "#251f45",
      },
    });
  }
  return arr;
}
function setChart() {
  const cpuData = props.data?.cpu || 0;
  const memData = props.data?.mem || 0;
  const max = Math.max(
    Math.min(100, Math.floor(Math.max(cpuData, memData) * 10)),
    70
  );
  const title = props.data?.title || "未知";
  const option = {
    title: {
      text: title,
      left: "center",
      top: "center",
      textStyle: {
        color: "#01c0ff",
        fontSize: 12,
      },
    },
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    polar: [
      {
        radius: ["70%", "80%"],
        center: ["50%", "50%"],
      },
    ],
    angleAxis: [
      {
        max: max,
        show: false,
      },
    ],
    radiusAxis: {
      type: "category",
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: "外圈发光圆环",
        type: "bar",
        roundCap: true,
        barWidth: 60,
        showBackground: true,
        backgroundStyle: {
          color: "#2e2856",
        },
        data: [cpuData],
        coordinateSystem: "polar",
        polarIndex: 0,
        itemStyle: {
          normal: {
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
          },
        },
      },
      {
        hoverAnimation: false,
        type: "pie",
        z: 2,
        name: "带竖线的内圈圆环",
        data: parseData(memData, max),
        radius: ["50%", "65%"],
        zlevel: 2,
        itemStyle: {
          normal: {
            borderColor: "#180f2a",
            borderWidth: 2,
          },
        },
        label: {
          normal: {
            position: "inside",
            show: false,
          },
        },
      },
    ],
  };
  myChart?.dispose();
  myChart?.clear();
  myChart = echarts.init($el.value);
  let dir = false;
  clearInterval(timer);
  // timer = setInterval(() => {
  //   myChart.setOption({
  //     series: [
  //       {
  //         name: "hightLightPoniter",
  //         animationDurationUpdate: 2000,
  //         animationEasingUpdate: "linear",
  //         data: dir ? data.map((item) => item.value) : emptyArr,
  //       },
  //     ],
  //   });
  //   dir = !dir;
  // }, 4000);
  myChart.resize();
  myChart.setOption(option);
}
</script>
<style lang="less" scoped>
.charts {
  height: 100%;
  flex: 1;
  position: relative;
}
.circleBox {
  position: relative;
  height: 100%;
  width: 100%;
}
.svgItem {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
}

.svg2box,
.svg1box {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}
.svg1box {
  animation: rotate 4s linear infinite;

  .svg2 {
    transform: rotate(180deg);
  }
}
.svg2box {
  animation: rotate2 4s linear infinite;

  .svg1 {
    transform: rotate(80deg);
  }
  .svg2 {
    transform: rotate(260deg);
  }
}
@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
@keyframes rotate2 {
  to {
    transform: rotate(-360deg);
  }
}
</style>
