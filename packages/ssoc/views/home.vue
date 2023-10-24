<template>
  <div class="home">
    <div class="header">
      <span> 安全监控中心 </span>
    </div>
    <div style="height: 60.6667%">
      <ElRow :gutter="10" class="h100">
        <ElCol :span="5" class="h100">
          <div
            style="height: 50%; width: 100%; position: relative"
            class="area"
          >
            <span class="title"
              ><span class="title-text">agent安装情况（台）</span></span
            >
            <!-- 区域1 -->
            <Platform :data="platformPropData"></Platform>
          </div>
          <div style="height: 50%; width: 100%" class="area">
            <!-- 区域2 -->
            <span class="title"
              ><span class="title-text">agent状态统计（台）</span></span
            >
            <ColBar :data="colBarData"></ColBar>
          </div>
        </ElCol>
        <ElCol :span="5" class="h100">
          <div class="area" style="height: 50%; width: 100%">
            <!-- 区域3 -->
            <span class="title"
              ><span class="title-text">七日内终端登录统计</span></span
            >
            <CirclePie2 :data="circlePie2Data"></CirclePie2>
          </div>
          <div class="area" style="height: 50%; width: 100%">
            <!-- 区域3 -->
            <span class="title"
              ><span class="title-text">风险事件统计</span></span
            >
            <!-- 区域4 -->
            <Radar
              style="transform: translateY(20px)"
              :data="radarData"
            ></Radar>
          </div>
        </ElCol>
        <ElCol :span="8" class="h100 area">
          <span class="title"
            ><span class="title-text">各机房broker分布情况</span></span
          >
          <ElRow style="height: 50%">
            <ElCol :span="12" style="height: 100%">
              <Graph :data="graphData[0]"></Graph>
            </ElCol>
            <ElCol :span="12" style="height: 100%">
              <Graph :data="graphData[1]"></Graph>
            </ElCol>
          </ElRow>
          <ElRow style="height: 50%" class="broker">
            <ElCol :span="12" style="height: 100%">
              <Graph :data="graphData[2]"></Graph>
            </ElCol>
            <ElCol :span="12" style="height: 100%">
              <Graph :data="graphData[3]"></Graph>
            </ElCol>
          </ElRow>
        </ElCol>
        <ElCol :span="6" class="h100">
          <div class="area" style="height: 50%; width: 100%">
            <span class="title"
              ><span class="title-text">borker内存和CPU监控</span></span
            >
            <ElRow style="height: 45%; margin-top: 10px">
              <ElCol :span="12" class="h100" style="display: flex">
                <CircleNormal
                  style="flex: 1"
                  :data="circleData[0]"
                ></CircleNormal>
              </ElCol>
              <ElCol :span="12" class="h100">
                <CircleNormal :data="circleData[1]"></CircleNormal>
              </ElCol>
            </ElRow>
            <ElRow style="height: 45%; margin-top: 10px">
              <ElCol :span="12" class="h100">
                <CircleNormal :data="circleData[2]"></CircleNormal>
              </ElCol>
              <ElCol :span="12" class="h100">
                <CircleNormal :data="circleData[3]"></CircleNormal>
              </ElCol>
            </ElRow>
          </div>
          <div style="height: 50%; width: 100%" class="area">
            <span class="title"
              ><span class="title-text"> 七日内风险事件统计（次）</span></span
            >

            <ColBar :data="rowBarData"></ColBar>
          </div>
        </ElCol>
      </ElRow>
    </div>
    <div style="height: 39.3333%">
      <ElRow class="h100">
        <ElCol :span="11" class="area h100">
          <span class="title"
            ><span class="title-text">主机滚动事件</span></span
          >
          <scrollEventTable :data="scrollEventTableData"></scrollEventTable>
        </ElCol>
        <ElCol :span="7" class="area h100">
          <span class="title"><span class="title-text">agent任务</span></span>
          <FixTable :data="fixTableData"></FixTable>
        </ElCol>
        <ElCol :span="6" class="area h100">
          <span class="title"><span class="title-text">供应链监控 </span></span>
          <RowBar :data="colBarSbomData"></RowBar>
        </ElCol>
      </ElRow>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElCol, ElRow } from "element-plus";
import ColBar, { type Row as ColBarPropType } from "../components/colBar.vue";
import RowBar, { type Row as RowBarPropType } from "../components/rowBar.vue";
import CircleNormal, {
  type Row as CircleNormalPropType,
} from "../components/circleNormal.vue";
import CirclePie2, {
  type Row as CirclePie2PropType,
} from "../components/circlePie2.vue";
import Platform, {
  type Row as PlatformPropType,
} from "../components/platform.vue";
import Radar, { type Row as RadarPropType } from "../components/radar.vue";
import FixTable, {
  type Row as FixTablePropType,
} from "../components/fixTable.vue";
import Graph, { type Row as GraphPropType } from "../components/graph.vue";
import scrollEventTable, {
  type Row as ScrollEventTablePropType,
} from "../components/scrollEventTable.vue";

import axios from "axios";
import { onBeforeUnmount, ref, type Ref } from "vue";
import mockjs from "mockjs";
const platformPropData = factory(async () => {
  return {
    linux: 5976,
    windows: 3295,
    mac: 0,
    other: 0,
  };
}, 20 * 60 * 60 * 1000);
const colBarData = factory(async () => {
  return [
    {
      name: "未激活",
      value: 0,
    },
    {
      name: "在线",
      value: 8420,
    },
    {
      name: "离线",
      value: 851,
    },
    {
      name: "已删除",
      value: 0,
    },
  ];
});
const colBarSbomData = factory(async () => {
  return [
    {
      name: "commons-codec",
      value: 2364,
    },
    {
      name: "commons-logging",
      value: 2235,
    },
    {
      name: "httpcore",
      value: 1831,
    },
    {
      name: "httpclient",
      value: 1830,
    },
    {
      name: "javassist",
      value: 1824,
    },
    {
      name: "common",
      value: 1593,
    },
    {
      name: "rpc-api",
      value: 1509,
    },
    {
      name: "remoting-api",
      value: 1509,
    },
    {
      name: "cluster",
      value: 1509,
    },
    {
      name: "serialization-api",
      value: 1508,
    },
  ];
}, 30 * 1000);
const graphData = factory(async () => {
  return [
    {
      name: "内网节点1",
      data: [
        {
          name: "win",
          value: 1458,
        },
        {
          name: "linux",
          value: 3600,
        },
        {
          name: "mac",
          value: 0,
        },
        {
          name: "other",
          value: 0,
        },
      ],
    },
    {
      name: "内网节点2",
      data: [
        {
          name: "win",
          value: 1,
        },
        {
          name: "linux",
          value: 6,
        },
        {
          name: "mac",
          value: 0,
        },
        {
          name: "other",
          value: 0,
        },
      ],
    },
    {
      name: "内网节点3",
      data: [
        {
          name: "win",
          value: 270,
        },
        {
          name: "linux",
          value: 490,
        },
        {
          name: "mac",
          value: 0,
        },
        {
          name: "other",
          value: 0,
        },
      ],
    },
    {
      name: "内网节点4",
      data: [
        {
          name: "win",
          value: 610,
        },
        {
          name: "linux",
          value: 513,
        },
        {
          name: "mac",
          value: 0,
        },
        {
          name: "other",
          value: 0,
        },
      ],
    },
    {
      name: "内网节点5",
      data: [
        {
          name: "win",
          value: 955,
        },
        {
          name: "linux",
          value: 1364,
        },
        {
          name: "mac",
          value: 0,
        },
        {
          name: "other",
          value: 0,
        },
      ],
    },
    {
      name: "内网节点6",
      data: [
        {
          name: "win",
          value: 0,
        },
        {
          name: "linux",
          value: 2,
        },
        {
          name: "mac",
          value: 0,
        },
        {
          name: "other",
          value: 0,
        },
      ],
    },
    {
      name: "内网节点7",
      data: [
        {
          name: "win",
          value: 1,
        },
        {
          name: "linux",
          value: 1,
        },
        {
          name: "mac",
          value: 0,
        },
        {
          name: "other",
          value: 0,
        },
      ],
    },
  ] as GraphPropType[];
}, 60 * 60 * 1000);

const rowBarData = factory(async () => {
  return [
    {
      name: "测试应用",
      value: 1,
    },
    {
      name: "危险事件",
      value: 11110,
    },
    {
      name: "低危事件",
      value: 31110,
    },
    {
      name: "扣分事件",
      value: 11110,
    },
    {
      name: "每日触发事件",
      value: 300,
    },
  ];
}, 2 * 60 * 1000);

const radarData = factory(async () => {
  return [
    {
      name: "紧急",
      value: 11347,
    },
    {
      name: "高危",
      value: 32596,
    },
    {
      name: "中危",
      value: 278707,
    },
    {
      name: "低危",
      value: 5,
    },
  ];
});

const circlePie2Data = factory(async () => {
  function getName(key: string) {
    switch (key) {
      case "success":
        return "登录成功";
      case "failed":
        return "登录失败";
      case "logout":
        return "退出登录";
      default:
        return "其他";
    }
  }
  return Object.entries({
    success: 1000,
    failed: 200,
    logout: 500,
  }).map(([key, value]) => {
    return {
      name: getName(key),
      value: (value as number) || 0,
    };
  });
});

const scrollEventTableData = factory(async () => {
  return mockjs.mock({
    "a|50": [
      {
        inet: "@ip",
        "level|1": ["高危", "低危", "中危"],
        subject: "@cparagraph(5,15)",
        created_at: "@date",
      },
    ],
  }).a;
});
const fixTableData = factory(async () => {
  return mockjs.mock({
    "a|10": [
      {
        name: "@paragraph(5,10)",
        count: "@integer(10,100)",
        desc: "@cparagraph(10,15)",
      },
    ],
  }).a;
}, 2 * 60 * 10000);

const circleData = factory(async () => {
  return [
    {
      title: "机器1",
      cpu: 1.72,
      mem: 79.34,
    },
    {
      title: "机器2",
      cpu: 1.72,
      mem: 79.34,
    },
    {
      title: "机器3",
      cpu: 1.72,
      mem: 79.34,
    },
    {
      title: "机器4",
      cpu: 1.72,
      mem: 79.34,
    },
  ] as CircleNormalPropType[];
});
function factory<T extends { (): Promise<any> }>(fn: T, delay = 20 * 1000) {
  const timer = ref(0);
  type fnReturnType = Awaited<ReturnType<T>>;
  const data = ref<fnReturnType | []>([]);
  fn().then((arr) => {
    data.value = arr;
  });
  timer.value = setInterval(async () => {
    data.value = await fn();
  }, delay);
  onBeforeUnmount(() => {
    clearInterval(timer.value);
  });
  return data as Ref<fnReturnType>;
}
</script>
<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: var(--themeBKG);
  overflow: hidden;
  padding-top: 45px;
  font-family: "Courier New", Courier, monospace;
  &::before {
    content: " ";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-image: url(../assets/背景图2.gif);
    opacity: 0.25;
    background-position-y: 50px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 0;
  background-image: url(../assets/大标题.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position-y: 10px;

  span {
    -webkit-text-fill-color: transparent;
    background: linear-gradient(0deg, #0095d6, #46daff);
    background-clip: text;
    font-size: 25px;
    letter-spacing: 5px;
    font-weight: bolder;
  }
}
.h100 {
  height: 100%;
}
.area {
  position: relative;
  padding-top: 35px;
}
.title {
  position: absolute;
  display: inline-block;
  color: var(--baseColor);
  font-weight: bolder;
  height: 50px;
  width: 100%;
  padding: 8px;
  left: 0;
  top: 0;
  background-image: url(../assets/标题背景.webp);
  background-repeat: no-repeat;
  // background-position: -5px 0px;
  background-size: 100% 100%;
  text-align: left;

  .title-text {
    position: relative;
    font-size: 16px;
    display: inline-block;
    padding: 5px;
    transform: translate(40px, 3px);
  }
}
.bv {
  border: 1px solid #f75446;
}
.broker {
  position: relative;
  overflow: hidden;
  &::before {
    content: " ";
    width: 100%;
    height: 1px;
    position: absolute;
    left: 0;
    top: 7px;
    // border-bottom: 2px solid var(--themeBKG);
    background-image: linear-gradient(to right, #585fe1, #0ff);
    transform: scaleX(1.5);
    background-origin: border-box;
    opacity: 0.5;
  }
}
</style>
