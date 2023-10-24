<template>
  <div class="charts" ref="$el"></div>
</template>
<script lang="ts">
export interface Row {
  name: string;
  value: number;
  children: { name: string; value: number }[];
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
let colorList = [
  "#468FF7",
  "#f7ad46",
  "#46e9f7",
  "#067c87",
  "#468FF7",
  "#f75446",
];
watch(() => props.data, setChart);
onUnmounted(() => {
  clearInterval(timer);
});
onMounted(setChart);
function parseData(data: Row[]) {
  let arr = data.map((item) => item.children).flat(2);
  return arr;
}
function setChart() {
  const data_o = props.data || [];
  const dataPreSum = data_o.reduce(
    (pre, cur) => {
      pre.push((pre.at(-1) || 0) + cur.children.length);
      return pre;
    },
    [0] as number[]
  );
  let data: ({ realValue?: number } & Pick<Row, "name" | "value">)[] =
    parseData(data_o);
  if (data.length < 10) {
    data.push(
      ...new Array(10 - data.length).fill(0).map((item) => {
        return {
          name: "未知",
          value: 0,
        };
      })
    );
  }
  data =
    data?.map((item) => {
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
      top: 30,
      bottom: 0,
      left: 17,
      right: 60,
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
          show: false,
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
          color: "#fff",

          formatter(value: number) {
            const [num, unit] = numformatter(value);
            return `{a|${num}}{b|${unit}}`;
          },
          rich: {
            a: {
              fontFamily: "segmentFont",
              fontSize: 15,
              fontWeight: 500,
            },
            b: {
              fontSize: 14,
              color: "red",
              verticalAlign: "bottom",
              padding: [3, 0, 0, 2],
            },
          },
        },

        data: data.map((item) => item.realValue),
      },
    ],
    series: [
      {
        name: "group",
        type: "custom",
        label: {
          show: true,
        },
        renderItem(params: any, api: any) {
          const barLayout = api.barLayout({
            barGap: "-180%",
            barMaxWidth: 7,
            count: 1,
          })[0];
          const base = 30;
          const step = barLayout.bandWidth / 2 - 7 / 2;
          const length = data_o[params.dataIndex].children.length;
          const preLength = dataPreSum[params.dataIndex];

          let point = [
            base + barLayout.bandWidth * preLength + step,
            base + barLayout.bandWidth * (preLength + length - 1) + step,
          ];

          return {
            type: "polyline",
            style: {
              fill: "#061537",
              stroke: "#fff",
            },
            textContent: {
              style: {
                text: data_o[params.dataIndex].name
                  .split("")
                  .slice(0, 2)
                  .join("\n"),
                y: -10,
                x: -15,
                stroke: "none",
                fill: "#01c0ff",
                textVerticalAlign: "middle",
              },
            },
            textConfig: {
              // position: "left",
              position: [0, "50%"],
            },
            shape: {
              points: [
                [18, point[0]],
                [15, point[0]],
                [15, point[1]],
                [18, point[1]],
              ],
            },
          };
        },
        data: data_o,
        z: 10,
      },
      {
        name: "率",
        type: "bar",
        barWidth: 7, // 柱子宽度
        showBackground: true,
        backgroundStyle: {
          color: "#194B72",
        },
        label: {
          show: true,
          offset: [10, -16],
          color: "#01c0ff",
          fontWeight: 500,
          position: "left",
          align: "left",
          formatter: function (params: any) {
            return data[params.dataIndex]?.name || "";
          },
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
          // color: "red",
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
