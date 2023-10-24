<template>
  <div class="charts" ref="$el"></div>
</template>

<script lang="ts">
export interface Row {
  name: string;
  value: number;
  children?: Row[];
}
</script>
<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, onMounted, watch, onUnmounted } from "vue";

const props = defineProps<{
  data: Row[];
}>();
let myChart: echarts.ECharts;
const $el = ref();
watch(() => props.data, setChart);
onMounted(setChart);
let color = ["#468FF7", "#f7ad46", "#46e9f7", "#067c87", "#468FF7", "#f75446"];
// 层级样式
function getLevelOption1() {
  return [
    {
      color: color,
      itemStyle: {
        gapWidth: 2,
        color: "#061537",
        borderWidth: 1,
        borderColor: "#061537",
      },
    },
    {
      upperLabel: {
        color: "#fff",
        show: true,
        height: 18,
        // position: [5, 32],
        // distance: 5,
        // position: "insideLeft",
      },
      // colorAlpha: [1, 0.1],
      itemStyle: {
        color: "#061537",
        borderWidth: 1,
        borderColor: "#061537",
        gapWidth: 0,
        // opacity: 0.3,
      },
    },
  ];
}

function setChart() {
  const dtlData = props.data;
  const option = {
    series: [
      {
        name: "矩形树图",
        type: "treemap",
        roam: false,
        left: 5,
        right: 5,
        top: 15,
        bottom: 0,
        silent: true,
        levels: getLevelOption1(),
        data: dtlData,
        squareRatio: 1,
        childrenVisibleMin: 10,
        breadcrumb: {
          show: false,
        },
        label: {
          show: true,
          color: "#01c0ff",
        },
        itemStyle: {
          color,
          borderWidth: 0.2,
          borderColor: "#01c0ff",
        },
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
