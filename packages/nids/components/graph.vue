<template>
  <div style="position: relative" class="charts">
    <div class="charts" ref="$el"></div>
    <div id="canvasBox" ref="canvasBoxRef"></div>
  </div>
</template>
<script lang="ts">
export interface Row {
  oh: string;
  rh: string;
  port: string;
  count: number;
}
</script>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted, watch, onUnmounted, createApp } from "vue";
import ipIcon from "../assets/ipIcon.svg";
import html2canvas from "html2canvas";
// import hostIcon from "./hostIcon.vue";
import hostIocn from "../assets/机房.svg";
const props = defineProps<{
  data?: Row[];
}>();
let myChart: echarts.ECharts;
let timer: number;
const $el = ref();
const mockData = [
  {
    oh: "未知1",
    rh: "未知目地1",
    port: "9090",
    count: 100,
  },
  {
    oh: "未知1",
    rh: "未知目地1",
    port: "900",
    count: 100,
  },
  {
    oh: "未知3",
    rh: "未知目地1",
    port: "9090",
    count: 100,
  },
  {
    oh: "未知2",
    rh: "未知目地2",
    port: "9091",
    count: 100,
  },
  {
    oh: "未知2",
    rh: "未知目地2",
    port: "91",
    count: 100,
  },
  {
    oh: "未知2",
    rh: "未知目地2",
    port: "691",
    count: 100,
  },
  {
    oh: "未知2",
    rh: "未知目地2",
    port: "951",
    count: 100,
  },
  {
    oh: "未知2",
    rh: "未知目地2",
    port: "901",
    count: 100,
  },
  {
    oh: "未知3",
    rh: "未知目地3",
    port: "9091",
    count: 100,
  },
  {
    oh: "未知4",
    rh: "未知目地3",
    port: "9091",
    count: 100,
  },
  {
    oh: "未知5",
    rh: "未知目地4",
    port: "9091",
    count: 100,
  },
];
onUnmounted(() => {
  clearInterval(timer);
});
watch(() => props.data, setChart);
onMounted(setChart);

async function setChart() {
  myChart?.dispose();
  myChart?.clear();
  myChart = echarts.init($el.value);
  const data = parseNode(props.data?.length ? props.data : mockData);

  const option = {
    grid: {
      bottom: 40,
      left: 0,
      top: 20,
      right: 10,
    },
    xAxis: {
      type: "value",
      max: 100,
      min: 0,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      inverse: true,
      max: 100,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    series: [
      {
        name: "线",
        type: "lines",
        silent: true,
        coordinateSystem: "cartesian2d",
        // polyline: true, // 多线段
        // zlevel: 2,
        lineStyle: {
          width: 1,
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
          type: 4,
          join: "round",
        },
        effect: {
          show: true,
          constantSpeed: 60,
          trailLength: 0.2,
          symbol: "arrow", //箭头图标
          symbolSize: 3.5,
          color: "red",
        },

        data: data.links,
      },
      {
        type: "graph",
        layout: "none",
        coordinateSystem: "cartesian2d",
        roam: true,
        label: {
          show: true,
        },
        edgeSymbol: ["circle", "arrow"],
        autoCurveness: true,
        edgeSymbolSize: [4, 7],
        data: [
          ...data.fromNode.map((item) => {
            return {
              name: item.key,
              value: item.value,
              symbol: "image://" + ipIcon,
              symbolSize: 23,
              symbolOffset: [0, -15],
              label: {
                color: "#01c0ff",
                position: "bottom",
                fontSize: 10,
              },
            };
          }),
          ...(await Promise.all(
            data.toNode.map(async (item) => {
              return {
                name: item.key,
                value: item.value,
                symbolSize: [25, 30],
                ports: item.ports,
                host: item.name,
                label: {
                  show: true,
                  color: "#fff",
                  position: "bottom",
                  // offset: [0, 10],
                  fontSize: 10,
                  formatter(params: any) {
                    const data = params.data;
                    const portsStr = Object.entries(data.ports || {})
                      .map(([key, val]) => {
                        return `{a|p:${key} c:${val}}`;
                      })
                      .slice(0, 3)
                      .join("\n");
                    return `h:${data.host}\n${portsStr}`;
                  },
                  rich: {
                    a: {
                      color: "#01c0ff",
                      fontSize: 10,
                      lineHeight: 14,
                    },
                  },
                },
                symbolKeepAspect: true,
                symbol: "image://" + hostIocn,
              };
            })
          )),
        ],
      },
    ],
  };

  myChart.resize();
  myChart.setOption(option);
}

function parseNode(data: Row[]) {
  interface Node {
    name: string;
    value: [number, number];
    key: string;
    ports: { [key: string]: number };
  }
  interface link {
    source: string;
    target: string;
  }
  const fromNode: Node[] = [];
  const toNode: Node[] = [];
  const links: link[] = [];

  const cache = new Map<string, Node>();
  for (let item of data) {
    const node_from: Node = {
      name: item.oh,
      value: [0, 0],
      key: item.oh,
      ports: {},
    };
    const node_to: Node = {
      name: item.rh,
      key: item.rh + "_to",
      value: [0, 0],
      ports: {
        [item.port]: item.count,
      },
    };
    const link = {
      source: item.oh,
      target: item.rh + "_to",
    };

    if (cache.has(node_to.key)) {
      const ports = cache.get(node_to.key)!.ports!;
      ports[item.port] = ports[item.port] || 0;
      ports[item.port] += item.count;
    } else {
      if (toNode.length >= 5) {
        continue;
      }
      toNode.push(node_to);
      cache.set(node_to.key, node_to);
    }

    if (!cache.has(node_from.key)) {
      if (fromNode.length >= 7) {
        continue;
      }
      fromNode.push(node_from);
      cache.set(node_from.key, node_from);
    }
    links.push(link);
  }
  let count = 0;

  //添加一些假数据
  let length = fromNode.length;

  for (let i = 0; i < Math.max(0, 4 - length); i++) {
    fromNode.push({
      name: "**-**",
      value: [0, 0],
      key: "**-**" + i,
      ports: {},
    });
  }
  length = toNode.length;
  for (let i = 0; i < Math.max(0, 5 - length); i++) {
    toNode.push({
      name: "未知",
      value: [0, 0],
      key: "未知_" + i,
      ports: {
        80: 0,
      },
    });
  }

  help_(fromNode, true);
  help_(toNode, false);
  return {
    fromNode,
    toNode,
    links: buildLink(fromNode, toNode, links),
  };
  //解析位置
  function help_(arr: Node[], dir: boolean) {
    const step = 100 / (arr.length + 1);
    const base = dir ? 20 : 80;
    for (let i = 0; i < arr.length; i++) {
      arr[i].value = [dir ? 20 : 80, (i + 1) * step] as [number, number];
    }
    return arr;
  }
  function buildLink(from: Node[], to: Node[], links: link[]) {
    const map = [...from, ...to].reduce((pre, cur) => {
      pre[cur.key] = cur.value;
      return pre;
    }, {});
    const res: [number, number][][] = [];
    for (let { source, target } of links) {
      res.push([map[source], map[target]] as [number, number][]);
    }
    return res;
  }
}
</script>
<style lang="less" scoped>
.charts {
  height: 100%;
  width: 100%;
  // background-color: red;
}
#canvasBox {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}
.test {
  color: #468ff7;
}
</style>
