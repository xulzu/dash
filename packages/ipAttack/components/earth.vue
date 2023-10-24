<template>
  <div style="height: 100%; width: 100%; position: absolute; top: 0; left: 0">
    <div ref="el" class="earthMap"></div>
    <div id="universe"></div>
  </div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { mapData } from "./mock";
import { ref, onMounted } from "vue";
import "echarts-gl";

import bkg from "@/assets/bkg.png";
import world from "../assets/world.json";
//@ts-ignore
echarts.registerMap("world", world);
onMounted(() => {
  drawEarth();
  var starCount = 100;
  var maxTime = 200;

  var universe = document.getElementById("universe") as HTMLElement;
  var width = universe.clientWidth;
  var height = universe.clientHeight;
  for (var i = 0; i < starCount; ++i) {
    var ypos = Math.round(Math.random() * height);
    var star = document.createElement("div");
    var speed = 1000 * (Math.random() * maxTime + 1);
    star.setAttribute(
      "class",
      "star" + Math.floor((speed / 1000 / maxTime) * 3)
    );
    star.style.backgroundColor = "white";
    universe.appendChild(star);
    star?.animate(
      [
        {
          transform: "translate3d(" + width + "px, " + ypos + "px, 0)",
        },
        {
          transform:
            "translate3d(-" + Math.random() * 256 + "px, " + ypos + "px, 0)",
        },
      ],
      {
        delay: Math.random() * -speed,
        duration: speed,
        iterations: 1000,
      }
    );
  }
});
const el = ref();
function getBaseTexture() {
  let canvas = document.createElement("canvas");
  const baseTexture = echarts.init(canvas, undefined, {
    width: 4096,
    height: 4096,
  });
  const img = document.createElement("img");
  img.src = require("@/assets/bkg13.png");
  img.width = 10;

  // img.width='500'

  baseTexture.setOption({
    // backgroundColor: "#03044a22",
    series: [
      {
        type: "map",
        map: "world",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        boundingCoords: [
          [-180, 90],
          [180, -90],
        ],
        label: {
          show: false,
        },
        itemStyle: {
          // areaColor: "#2911c5",
          areaColor: {
            image: img,
            repeat: "repeat",
          },

          borderColor: "#fff",
          borderWidth: 2,
        },
      },
    ],
  });
  return baseTexture;
}
function convertData(data_: any): number[][] {
  const cityMap: {
    [key: string]: [number[], number];
  } = {};
  for (let item of data_) {
    cityMap[item.fromName] = cityMap[item.fromName] || [null, 0];
    cityMap[item.toName] = cityMap[item.toName] || [null, 0];
    cityMap[item.fromName][0] = item.from;
    cityMap[item.toName][0] = item.to;
    cityMap[item.toName][1] += item.value;
  }

  return Object.values(cityMap).map((item) => {
    return [...item[0], item[1]];
  });
}
function drawEarth() {
  const img = document.createElement("img");
  img.src = bkg;
  const option = {
    visualMap: [
      {
        //图例值控制
        type: "continuous",
        min: 0,
        max: Math.max(...convertData(mapData).map((item) => item[2])),
        show: false,
        inRange: {
          color: ["#00eaff", "#fc9700", "#ffde00", "#f44336"],
          symbolSize: [7, 15],
        },
        calculable: true,
        color: ["#f44336", "#fc9700", "#ffde00", "#ffde00", "#00eaff"],
        indicatorStyle: {
          opacity: 0.1,
        },
      },
    ],
    globe: {
      shading: "color",
      baseTexture: getBaseTexture(),
      globeOuterRadius: 300,
      zlevel: 3,
      light: {
        main: { intensity: 1.5, alpha: 30 },
      },
      atmosphere: {
        show: true,
      },
    },
    series: [
      {
        name: "lines3D",
        type: "lines3D",
        coordinateSystem: "globe",
        effect: {
          show: true,
          period: 2,
          trailLength: 0.3,
          trailOpacity: 1,
          trailColor: "#0087f4",
        },
        // blendMode: "lighter",
        lineStyle: {
          width: 1,
          color: "#0087f4",
          opacity: 0,
        },

        data: mapData.map((item) => {
          return {
            coords: [item.from, item.to, 4000],
            value: 4000,
          };
        }),
      },
    ],
  };

  let myChart = echarts.init(el.value);
  myChart.clear();
  myChart.resize();
  myChart.setOption(option);
}
</script>
<style lang="less">
#universe {
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.earthMap {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
}

.star0 {
  height: 1px;
  width: 1px;
  opacity: 1;
  top: 0;
  z-index: 0;
  position: absolute;
  color: #00800015;
}

.star1 {
  height: 2px;
  width: 2px;
  top: 0;
  border-radius: 50%;
  opacity: 1;
  color: #231ecf;
  z-index: 0;
  position: absolute;
}

.star2 {
  height: 3px;
  width: 3px;
  top: 0;
  z-index: 0;
  border-radius: 50%;
  opacity: 1;
  position: absolute;
}
</style>
