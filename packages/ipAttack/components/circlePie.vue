<template>
  <div class="circleBox">
    <svg class="svgItem svg1">
      <circle
        id="circle1"
        cx="50%"
        cy="50%"
        r="38%"
        fill="transparent"
        stroke="#0076EF"
        stroke-dasharray="60,1000"
        stroke-width="3"
      />
    </svg>
    <svg class="svgItem svg2">
      <circle
        id="circle2"
        cx="50%"
        cy="50%"
        r="42%"
        fill="transparent"
        stroke="#0076EF"
        stroke-dasharray="60,1000"
        stroke-width="3"
        :stroke-dashoffset="random"
      />
    </svg>
    <div class="charts" ref="$el"></div>
  </div>
</template>
<script lang="ts" setup>
import TWEEN from "@tweenjs/tween.js";
import { ref, onMounted, watch } from "vue";
import { circlePieData } from "./mock";
import * as echarts from "echarts";
let myChart: echarts.ECharts;
const props = defineProps({
  color: {
    type: String,
    default: "red",
  },
  title: {
    type: String,
    default: "在线数目",
  },
  num: {
    type: Number,
    default: 0,
  },
});
onMounted(setChart);
watch(() => props.num, setChart);
let angle = 0; //角度，用来做简单的动画效果的
const $el = ref();
const random = -Math.floor(Math.random() * 60);
function setChart() {
  const option = {
    title: [
      {
        text: String(props.num || 0),
        left: "center",
        top: "center",
        textStyle: {
          color: "#fff",
          fontSize: 22,
          fontFamily: "segmentFont",
        },
      },
      {
        text: props.title,
        left: "center",
        bottom: -5,
        textStyle: {
          color: "#6eddf1",
          fontSize: 14,
        },
      },
    ],
    grid: {
      bottom: 20,
    },
    series: [
      // 外面100圆环
      {
        type: "pie",
        radius: ["67%", "70%"],
        animation: false,
        itemStyle: {
          shadowBlur: 20,
          shadowColor: "rgba(0, 118, 239,1)",
          color: "#0076EF",
        },
        label: {
          show: false,
        },
        data: [100],
      },

      {
        type: "gauge",
        radius: "95%",
        startAngle: 0,
        endAngle: 360,
        splitNumber: 15,
        axisTick: {
          show: false,
        },
        splitLine: {
          length: "15%",
          lineStyle: {
            width: 4,
            color: props.color,
          },
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            opacity: 0,
          },
        },
        detail: {
          show: false,
        },
        data: [100],
      },
    ],
    animation: false,
  };
  myChart?.dispose();
  myChart = echarts.init($el.value);
  const coords = { x: 0 };
  let flag = 0;

  myChart.clear();
  myChart.resize();
  myChart.setOption(option);
}
</script>
<style lang="less" scoped>
.charts,
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
.svg1 {
  animation: rotate 2s linear infinite;
}
.svg2 {
  animation: rotate2 2s linear infinite;
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
