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
import { ref, onMounted, watch, onUnmounted } from "vue";

const props = defineProps<{
  data: Row[];
}>();
let myChart: echarts.ECharts;
let timer: number;
const $el = ref();
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
        value: oldValue === 0 || oldValue === 1 ? 3 : Math.log(oldValue) + 3,
        realValue: oldValue,
      };
    }) || [];
  const max = Math.max(...data.map((item) => item.value));
  const option = {
    grid: {
      top: 10,
      bottom: 20,
      left: 10,
      right: 10,
    },
    yAxis: [
      {
        splitLine: {
          show: false,
        },
        type: "value",
        show: false,
      },
    ],
    xAxis: [
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
          formatter(val: string) {
            return val?.split("").join("\n");
          },
          verticalAlign: "bottom",
          padding: [0, 28, 10, 0],
        },
      },
      {
        type: "category",
        inverse: true,
        axisTick: "none",
        axisLine: "none",
        show: true,
        offset: -25,
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
        // 内
        type: "bar",
        barWidth: 5,
        legendHoverLink: false,
        silent: true,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(1, 1, 1, 0, [
              {
                offset: 0,
                color: "#011753", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#46e9f7", // 100% 处的颜色
              },
            ]),
          },
        },
        data: data,
        z: 1,
        // animationEasing: "",
      },
      {
        // 分隔
        type: "pictorialBar",
        itemStyle: {
          normal: {
            color: "#061348",
          },
        },
        symbolRepeat: "fixed",
        symbolMargin: 10,
        symbol: "rect",
        symbolClip: true,
        symbolSize: [8, 1],
        symbolPosition: "start",
        symbolOffset: [1, -1],
        symbolBoundingData: max * 1.1,
        data: data,
        z: 2,
        animationEasing: "elasticOut",
      },
      {
        name: "外框",
        type: "bar",
        barGap: "-130%", // 设置外框粗细
        data: new Array(data.length).fill(max * 1.1),
        barWidth: 8,
        animation: false,
        itemStyle: {
          normal: {
            color: "transparent", // 填充色
            barBorderColor: "#1C4B8E", // 边框色
            barBorderWidth: 1, // 边框宽度
            // barBorderRadius: 0, //圆角半径
            label: {
              // 标签显示位置
              show: false,
            },
          },
        },
      },
      {
        name: "hightLightPoniter",
        type: "scatter",
        data: data,
        symbol: "roundRect",
        symbolSize: [9, 3],
        symbolOffset: -0.5,
        zlevel: 2,
        itemStyle: {
          color: "#fff",
          shadowColor: "rgba(115, 243, 255, 1)",
          shadowBlur: 6,
        },
      },
    ],
  };
  myChart?.dispose();
  myChart?.clear();
  myChart = echarts.init($el.value);
  let dir = false;
  const emptyArr = new Array(data.length).fill(0);
  clearInterval(timer);
  timer = setInterval(() => {
    myChart.setOption({
      series: [
        {
          name: "hightLightPoniter",
          animationDurationUpdate: 2000,
          animationEasingUpdate: "linear",
          data: dir ? data.map((item) => item.value) : emptyArr,
        },
      ],
    });
    dir = !dir;
  }, 4000);
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
