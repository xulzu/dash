<template>
  <div class="charts" ref="$el"></div>
</template>
<script lang="ts">
export interface Row {
  label: string;
  value: number;
}
</script>
<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, onMounted, watch } from "vue";
// import { colBarData } from "./mock";
const $el = ref();
const props = defineProps<{
  data: Row[];
}>();

onMounted(setChart);
watch(() => props.data, setChart);
let myChart: echarts.ECharts;
let timer: any;
function setChart() {
  const colBarData =
    props.data?.map((item) => {
      return {
        ...item,
        count:
          item.value === 0 || item.value === 1 ? 3 : Math.log(item.value) + 3,
      };
    }) || [];
  const option = {
    grid: {
      top: 40,
      bottom: 0,
      left: 0,
      right: 0,
    },

    xAxis: {
      data: colBarData.map((item) => item.label),
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },

      axisLabel: {
        show: true,
        color: "#5CB1C1",
        formatter(val: string) {
          return val?.split("").join("\n");
        },
        verticalAlign: "bottom",
        // margin: [-10, 0, 0, 0],

        padding: [0, 40, 15, 0],
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    series: [
      {
        name: "状态",
        type: "bar",
        animation: false,

        barWidth: 16,
        label: {
          show: true,
          position: "top",
          color: "#fff",
          formatter: function (params: any) {
            return colBarData[params.dataIndex]?.value || 0;
          },
        },

        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: "#1F0D5E",
            },
            {
              offset: 1,
              color: "#1480C2",
            },
          ]),

          borderRadius: [20, 20, 5, 5],
        },
        data: colBarData.map((item) => item.count),
      },
      {
        name: "effect",
        type: "bar",
        barWidth: 16,
        barGap: "-100%",
        zlevel: 2,
        label: {
          show: false,
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#c618e6",
            },
            {
              offset: 0.5,
              color: "#634bf3",
            },
            {
              offset: 1,
              color: "#1480C2",
            },
          ]),
          borderRadius: [20, 20, 5, 5],
        },
        data: new Array(colBarData.length).fill(0),
      },
    ],
  };
  myChart?.dispose();
  myChart = echarts.init($el.value);
  let flag = 0;
  myChart.on("finished", () => {
    flag++;
    if (flag !== 1) return;
    let dir = true;
    const emptyArr = new Array(colBarData.length).fill(0);
    clearInterval(timer);
    timer = setInterval(() => {
      myChart.setOption({
        series: [
          {
            name: "effect",
            animationDurationUpdate: 3000,
            animationEasingUpdate: "linear",
            data: dir ? colBarData.map((item) => item.count) : emptyArr,
          },
        ],
      });
      dir = !dir;
    }, 5000);
  });

  myChart.clear();
  myChart.resize();
  myChart.setOption(option);
}
</script>

<style lang="less" scoped>
.charts {
  height: 100%;
  width: 100%;
  color: #9f335373;
}

.test {
  color: #468ff7;
  color: #00fed2;
  color: #ffd37a;
  color: #468ff7;
  color: #00fed2;
  color: #c618e6;
}
</style>
