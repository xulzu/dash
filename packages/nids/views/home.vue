<template>
  <div class="home">
    <Earth class="earth" :data="earthData"></Earth>
    <div class="header">
      <span>流量监控中心 </span>
    </div>
    <div style="height: 64.6667%; position: relative">
      <div
        style="
          position: absolute;
          left: 0;
          top: 0;
          height: calc(100vh - 50px);
          width: 37.5%;
          z-index: 2;
        "
      >
        <ElRow style="height: 64.6667%; width: 100%">
          <ElCol :span="12" class="area h100">
            <!-- 横向柱状图 -->
            <span class="title"
              ><span class="title-text"
                >{{ rowDuration }}小时内恶意IP攻击次数 TOP10
                <el-popover placement="right" trigger="hover">
                  <div>
                    <el-radio-group v-model="rowDuration">
                      <div
                        style="
                          display: flex;
                          flex-direction: column;
                          z-index: 10;
                        "
                      >
                        <el-radio :label="24">24小时内</el-radio>
                        <el-radio :label="12">12小时内</el-radio>
                        <el-radio :label="6">6小时内</el-radio>
                      </div>
                    </el-radio-group>
                  </div>
                  <template #reference>
                    <ElIcon style="transform: translate(-5px, 1px)"
                      ><Switch></Switch
                    ></ElIcon>
                  </template>
                </el-popover> </span
            ></span>
            <RowBar :data="rowBarData"></RowBar>
          </ElCol>
          <ElCol :span="12" class="h100">
            <div style="height: 50%; width: 100%" class="area">
              <span class="title"
                ><span class="title-text"
                  >{{ lineDuration }}小时内机房流量信息
                  <el-popover placement="right" trigger="hover">
                    <div>
                      <el-radio-group v-model="lineDuration">
                        <div
                          style="
                            display: flex;
                            flex-direction: column;
                            z-index: 10;
                          "
                        >
                          <el-radio :label="24">24小时内</el-radio>
                          <el-radio :label="12">12小时内</el-radio>
                          <el-radio :label="6">6小时内</el-radio>
                          <el-radio :label="3">3小时内</el-radio>
                        </div>
                      </el-radio-group>
                    </div>
                    <template #reference>
                      <ElIcon style="transform: translate(-5px, 1px)"
                        ><Switch></Switch
                      ></ElIcon>
                    </template>
                  </el-popover> </span
              ></span>
              <!-- {{ lineData }} -->
              <rowLine :data="lineData[0]"></rowLine>
            </div>
            <div style="height: 50%; width: 100%" class="area">
              <rowLine :data="lineData[1]"></rowLine>
            </div>
          </ElCol>
        </ElRow>
        <div style="height: 35.3333%; width: 100%" class="area">
          <span class="title"
            ><span class="title-text"
              >{{ strategyDataDuration }}小时内策略命中TOP4
              <el-popover placement="right" trigger="hover">
                <div>
                  <el-radio-group v-model="strategyDataDuration">
                    <div
                      style="display: flex; flex-direction: column; z-index: 10"
                    >
                      <el-radio :label="24">24小时内</el-radio>
                      <el-radio :label="12">12小时内</el-radio>
                      <el-radio :label="6">6小时内</el-radio>
                    </div>
                  </el-radio-group>
                </div>
                <template #reference>
                  <ElIcon style="transform: translate(-5px, 1px)"
                    ><Switch></Switch
                  ></ElIcon>
                </template>
              </el-popover> </span
          ></span>

          <ElRow style="height: 60%; margin-top: 50px">
            <ElCol :span="6" class="h100" style="display: flex">
              <CircleNormal
                style="flex: 1"
                :data="strategyData.strategy?.[0] || []"
              ></CircleNormal>
            </ElCol>
            <ElCol :span="6" class="h100">
              <CircleNormal
                :data="strategyData.strategy?.[1] || []"
              ></CircleNormal>
            </ElCol>
            <ElCol :span="6" class="h100">
              <CircleNormal
                :data="strategyData.strategy?.[2] || []"
              ></CircleNormal>
            </ElCol>
            <ElCol :span="6" class="h100">
              <CircleNormal
                :data="strategyData.strategy?.[3] || []"
              ></CircleNormal>
            </ElCol>
          </ElRow>
        </div>
      </div>
      <ElRow :gutter="10" class="h100">
        <ElCol :span="9"> </ElCol>
        <ElCol :span="9" class="h100 area"> </ElCol>
        <ElCol :span="6" class="h100 area">
          <span class="title"
            ><span class="title-text"
              >{{ strategyDataDuration }}小时内各机房触发策略TOP3
              <el-popover placement="right" trigger="hover">
                <div>
                  <el-radio-group v-model="strategyDataDuration">
                    <div
                      style="display: flex; flex-direction: column; z-index: 10"
                    >
                      <el-radio :label="24">24小时内</el-radio>
                      <el-radio :label="12">12小时内</el-radio>
                      <el-radio :label="6">6小时内</el-radio>
                    </div>
                  </el-radio-group>
                </div>
                <template #reference>
                  <ElIcon style="transform: translate(-5px, 1px)"
                    ><Switch></Switch
                  ></ElIcon>
                </template>
              </el-popover>
            </span>
          </span>
          <rowBarGroup :data="strategyData.treeMap"></rowBarGroup>
        </ElCol>
      </ElRow>
    </div>
    <div style="height: 35.3333%">
      <ElRow class="h100">
        <ElCol :span="9" class="area h100"> </ElCol>
        <ElCol :span="15" class="area h100">
          <span class="title" style="background-size: 50% 100%"
            ><span class="title-text">实时攻击事件 </span></span
          >
          <scrollEventTable :data="scrollEventTableData"></scrollEventTable>
        </ElCol>
      </ElRow>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Earth, {
  type Row as EarthPropType,
} from "../components/earth/index.vue";
import {
  ElCol,
  ElRow,
  ElPopover,
  ElIcon,
  ElRadio,
  ElRadioGroup,
} from "element-plus";
import { Switch } from "@element-plus/icons-vue";
import RowBar, { type Row as RowBarPropType } from "../components/rowBar.vue";
import CircleNormal, {
  type Row as CircleNormalPropType,
} from "../components/circleNormal.vue";

import scrollEventTable, {
  type Row as ScrollEventTablePropType,
} from "../components/scrollEventTable.vue";

import axios from "axios";
import { onBeforeUnmount, ref, type Ref, createApp, watch } from "vue";
import rowLine, { type Row as LineProp } from "../components/rowLine.vue";

import rowBarGroup, {
  type Row as TreemapRow,
} from "../components/rowBarGroup.vue";

import { lineChart } from "./mock";
import mockjs from "mockjs";
function logNumber(num: number) {
  return num === 0 || num === 1 ? 1 : Math.log(num) + 1;
}
const strategyDataDuration = ref(24);
const { data: strategyData, reload } = factory(async () => {
  return {
    treeMap: [
      {
        name: "机0",
        value: 1851,
        children: [
          {
            name: "log4j2远程命令执行",
            value: 1784,
          },
          {
            name: "fastjson反序列化攻击",
            value: 43,
          },
          {
            name: "java远程命令执行",
            value: 24,
          },
        ],
      },
      {
        name: "机1",
        value: 458,
        children: [
          {
            name: "log4j2远程命令执行",
            value: 455,
          },
          {
            name: "fastjson反序列化攻击",
            value: 1,
          },
          {
            name: "java远程命令执行",
            value: 1,
          },
        ],
      },
      {
        name: "机3",
        value: 72,
        children: [
          {
            name: "ssh暴力破解",
            value: 72,
          },
        ],
      },
      {
        name: "机4",
        value: 50,
        children: [
          {
            name: "ssh被成功爆破",
            value: 18,
          },
          {
            name: "sqli注入探测",
            value: 11,
          },
          {
            name: "主动连接DNSLOG域名",
            value: 8,
          },
        ],
      },
      {
        name: "机5",
        value: 33,
        children: [
          {
            name: "sqli注入探测",
            value: 15,
          },
          {
            name: "主动连接DNSLOG域名",
            value: 12,
          },
        ],
      },
    ],
    strategy: [
      {
        title: "log4j2远程命令执行",
        count: 2242,
        percent: 92.64462809917356,
      },
      {
        title: "ssh暴力破解",
        count: 83,
        percent: 3.4297520661157024,
      },
      {
        title: "fastjson反序列化攻击",
        count: 44,
        percent: 1.8181818181818181,
      },
      {
        title: "sqli注入探测",
        count: 26,
        percent: 1.0743801652892562,
      },
      {
        title: "java远程命令执行",
        count: 25,
        percent: 1.0330578512396695,
      },
    ],
  };
}, 30 * 1000);
watch(strategyDataDuration, () => {
  reload();
});
const lineDuration = ref(6);
const { data: lineData, reload: reloadLineData } = factory(async () => {
  return lineChart as LineProp[][];
}, 30 * 1000);
watch(lineDuration, reloadLineData);
const rowDuration = ref(24);
const { data: rowBarData, reload: reloadRowBarData } = factory(async () => {
  return [
    {
      name: "129.227.155.142",
      value: 142,
    },
    {
      name: "104.234.140.162",
      value: 60,
    },
    {
      name: "104.234.140.159",
      value: 54,
    },
    {
      name: "104.234.140.144",
      value: 52,
    },
    {
      name: "104.234.140.164",
      value: 52,
    },
    {
      name: "104.234.140.160",
      value: 52,
    },
    {
      name: "104.234.140.163",
      value: 51,
    },
    {
      name: "104.234.140.169",
      value: 50,
    },
    {
      name: "104.234.140.146",
      value: 49,
    },
    {
      name: "104.234.140.165",
      value: 49,
    },
  ];
}, 60 * 1000);
watch(rowDuration, () => {
  reloadRowBarData();
});
const { data: scrollEventTableData } = factory(async () => {
  return mockjs.mock({
    "a|50": [
      {
        name: "@ctitle(5,10)",
        msg: "@cparagraph(10,20)",
        time: "@date('yyyy-MM-dd HH:mm:ss')",
      },
    ],
  }).a;
});
const { data: earthData } = factory(
  async () => {
    return {
      marks: [
        {
          name: "荷兰",
          country: "荷兰",
          lon: 5.291266,
          lat: 52.132633,
        },
        {
          name: "上海",
          lon: 121.45918,
          lat: 31.2372,
          country: "中国",
        },
        {
          name: "其他",
          country: "中国",
          lon: 114.233106,
          lat: 22.315698,
        },
        {
          name: "日本",
          country: "日本",
          lon: 138.252924,
          lat: 36.204824,
        },
        {
          name: "北京",
          country: "中国",
          lon: 116.48548,
          lat: 39.9484,
        },
        {
          name: "天津",
          country: "中国",
          lon: 117.70162,
          lat: 39.02668,
        },
        {
          name: "郑州",
          country: "中国",
          lon: 113.66057,
          lat: 34.80028,
        },
        {
          name: "美国",
          country: "美国",
          lon: -95.712891,
          lat: 37.09024,
        },
        {
          name: "深圳",
          country: "中国",
          lon: 114.13116,
          lat: 22.54836,
        },
        {
          name: "东莞",
          country: "中国",
          lon: 114.069313,
          lat: 22.79327,
        },
      ],
      links: [
        {
          from: "荷兰",
          to: "上海",
        },
        {
          from: "其他",
          to: "上海",
        },
        {
          from: "日本",
          to: "上海",
        },
        {
          from: "北京",
          to: "上海",
        },
        {
          from: "天津",
          to: "上海",
        },
        {
          from: "上海",
          to: "上海",
        },
        {
          from: "郑州",
          to: "上海",
        },
        {
          from: "美国",
          to: "上海",
        },
        {
          from: "深圳",
          to: "上海",
        },
        {
          from: "东莞",
          to: "上海",
        },
      ],
    };
  },
  60 * 1000,
  null
);
function factory<T extends { (): Promise<any> }>(
  fn: T,
  delay = 20 * 1000,
  init: any = []
) {
  const timer = ref(0);
  type fnReturnType = Awaited<ReturnType<T>>;
  const data = ref<fnReturnType | any[] | undefined>(init);

  function help_() {
    clearTimeout(timer.value);
    fn().then((arr) => {
      data.value = arr;
    });
    timer.value = setTimeout(help_, delay);
  }
  help_();
  onBeforeUnmount(() => {
    clearTimeout(timer.value);
  });
  return {
    data: data as Ref<fnReturnType>,
    reload: help_,
  };
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
    font-size: 14px;
    display: inline-block;
    padding: 5px;

    transform: translate(60px, 4px);
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

.earth {
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 100px;
  top: -90px;
  // z-index: 2;
}
</style>
