<template>
  <div class="circleBox">
    <div class="charts" ref="$el"></div>
  </div>
</template>
<script lang="ts">
export interface Row {
  name: string;
  value: number;
}
</script>
<script lang="ts" setup>
import { ref, onMounted, watch, type PropType, onUnmounted } from "vue";
import * as echarts from "echarts";
let myChart: echarts.ECharts;
const props = defineProps({
  title: {
    type: String,
    default: "在线数目",
  },
  data: {
    type: Array as PropType<Row[]>,
  },
});
onMounted(setChart);
const color = [
  "#00C0FD",
  "#3751E6",
  "#FFC722",
  "#886EFF",
  "#008DEC",
  "#114C90",
  "#00BFA5",
];
watch(() => props.data, setChart);
const $el = ref();
let tiemr: number;
onUnmounted(() => {
  clearTimeout(tiemr);
});
function numParse(num: number) {
  if (num >= 100000000) {
    return `{a|${Number(num / 10000000).toFixed(0)}}` + " 千万";
  }
  if (num >= 100000) {
    return `{a|${Number(num / 10000).toFixed(0)}}` + " 万";
  }
  return `{a|${Number(num).toFixed(0)}}`;
}
function setChart() {
  clearTimeout(tiemr);

  const renderData =
    props.data
      ?.filter((item) => item.name !== "其他")
      .sort((a, b) => b.value - a.value)
      .slice(0, 7) || [];

  const sum = renderData.reduce((pre, cur) => (cur.value || 0) + pre, 0);
  const percentData = renderData?.map((item) => {
    return {
      ...item,
      value: Math.floor((item.value / sum) * 100),
    };
  });
  const option = {
    title: [
      {
        text: numParse(sum),
        left: "center",
        top: "center",
        textStyle: {
          fontSize: 15,
          color: "#fff",
          fontWeight: "normal",
          verticalAlign: "center",
          lineHeight: 25,
          rich: {
            a: {
              fontFamily: "segmentFont",
              fontSize: 25,
              lineHeight: 25,
              color: "#fff",
              verticalAlign: "center",
            },
          },
        },
      },
    ],
    series: [
      {
        name: "pieData",
        type: "pie",
        startAngle: 170,
        radius: ["58%", "60%"],
        hoverAnimation: false,
        label: {
          color: "#01c0ff",
          fontSize: 14,
        },
        data: percentData
          .map((item, index) => {
            return [
              {
                value: item.value,
                name: item.name,
                itemStyle: {
                  borderWidth: 10,
                  shadowBlur: 20,
                  borderColor: color[index],
                  shadowColor: color[index],
                },
              },
              {
                value: 5,
                name: "",
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                itemStyle: {
                  color: "rgba(0, 0, 0, 0)",
                  borderColor: "rgba(0, 0, 0, 0)",
                  borderWidth: 0,
                },
              },
            ];
          })
          .flat(2),
      },
    ],
  };
  myChart?.clear();
  myChart?.dispose();
  myChart = echarts.init($el.value);
  myChart.resize();
  myChart.setOption(option);
  tiemr = setTimeout(() => {
    setChart();
  }, 5000);
}
</script>
<style lang="less" scoped>
.charts,
.circleBox {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
