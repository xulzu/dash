<template>
  <div class="home">
    <span style="width: 26%; height: 100%">
      <div class="left">
        <div class="left1">
          <span class="title"><span class="title-text">攻击IP详情</span></span>
          <attackIPScroll :data="attckTableData"></attackIPScroll>
        </div>
        <div class="left1">
          <span class="title"><span class="title-text">被攻击排行</span></span>
          <span class="angle1"></span>
          <span class="angle2"></span>
          <span class="angle3"></span>
          <span class="angle4"></span>
          <rowBar :data="walfHostData"></rowBar>
        </div>
        <div class="left1">
          <span class="title"><span class="title-text">恶意流量</span></span>
          <span class="angle1"></span>
          <span class="angle2"></span>
          <span class="angle3"></span>
          <span class="angle4"></span>
          <singleArea :data="singleAreakData"></singleArea>
        </div>
      </div>
    </span>
    <span style="width: 48%; height: 100%">
      <div class="main-title">攻击可视化平台</div>
      <div style="position: relative; width: 100%; height: 65%">
        <div
          style="
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 2;
          "
        ></div>
        <border style="margin-top: -22px"></border>
        <border position="right-top" style="margin-top: -22px"></border>
        <border position="left-bottom" style="margin-bottom: -10px"></border>
        <border position="right-bottom" style="margin-bottom: -10px"></border>

        <chinaMap :data="chinaMapData"></chinaMap>
      </div>
      <div
        class="realTimeAttackIPScroll"
        style="width: 100%; height: calc(35% - 60px)"
      >
        <realTimeAttackIPScroll
          :data="realAttackData.slice(0, 100)"
        ></realTimeAttackIPScroll>
      </div>
    </span>
    <span style="width: calc(26% - 5px)">
      <div class="right1" style="height: 40%; width: 100%">
        <span class="title"><span class="title-text">应用数据</span></span>

        <span class="angle1" style="margin-top: 25px"></span>
        <span class="angle2" style="margin-top: 25px"></span>
        <span class="angle3"></span>
        <span class="angle4"></span>
        <div style="display: flex; height: 40%; width: 100%">
          <div class="cirle">
            <circlePie title="应用数量" :num="circleData.app || 0"></circlePie>
          </div>
          <div class="cirle">
            <circlePie
              color="#c618e6"
              title="集群数量"
              :num="circleData.cluster"
            ></circlePie>
          </div>
          <div class="cirle">
            <circlePie
              color="orange"
              title="上游数量"
              :num="circleData.upstream"
            ></circlePie>
          </div>
          <div class="cirle">
            <circlePie
              color="yellow"
              title="域名数量"
              :num="circleData.host"
            ></circlePie>
          </div>
        </div>
        <div style="height: 60%; width: 100%; margin-bottom: 0px">
          <colBar :data="colBarData"></colBar>
        </div>
      </div>
      <div class="right1" style="height: 33%; width: 100%">
        <span class="title"><span class="title-text">策略排名</span></span>
        <span class="angle1"></span>
        <span class="angle2"></span>
        <span class="angle3"></span>
        <span class="angle4"></span>
        <rowBar :data="wafRuleData"></rowBar>
      </div>
      <div class="right1" style="height: 27%; width: 100%">
        <span class="title"><span class="title-text">恶意IP运营商</span></span>
        <span class="angle1"></span>
        <span class="angle2"></span>
        <span class="angle3"></span>
        <span class="angle4"></span>
        <circlePie2 :data="circle2Data"></circlePie2>
      </div>
    </span>
  </div>
</template>

<script lang="ts" setup>
import chinaMap, { type Row as MapRow } from "../components/chinaMap.vue";
import singleArea from "../components/singleArea.vue";
import rowBar from "../components/rowBar.vue";
import realTimeAttackIPScroll from "@soc/components/realTimeAttackIPScroll.vue";
import circlePie from "@soc/components/circlePie.vue";
import colBar from "@soc/components/colBar.vue";
import attackIPScroll from "@soc/components/attackIPScroll.vue";
import border from "../components/border.vue";
import axios from "@soc/utils/axios";
import { onBeforeUnmount, ref, watch, computed } from "vue";
import type { Row } from "@soc/components/rowBar.vue";
import type { Ref } from "vue";
import type { Row as AttackProp } from "@soc/components/attackIPScroll.vue";
import type { Row as RealAttackProp } from "@soc/components/realTimeAttackIPScroll.vue";
import type { Row as SingleAreakProp } from "@soc/components/singleArea.vue";
import type { Row as MapProp } from "@soc/components/chinaMap.vue";
import type { Row as circlePie2Prop } from "@soc/components/circlePie2.vue";
import mockjs from "mockjs";
import circlePie2 from "@soc/components/circlePie2.vue";
import {
  rowBarData,
  ipAttackCount,
  realTimeAttackData,
  lineData,
  mapData,
  circle2Data as circle2DataMock,
} from "../components/mock";
const isMock = process.env.VUE_APP_MOCK === "true";
const wafRuleData = factory(async () => {
  return [
    {
      name: "new_Caifuhao-Analysis-Spider-add",
      count: 57187553,
    },
    {
      name: "Guba-Analysis-Spider",
      count: 80384057,
    },
    {
      name: "主站限流",
      count: 126753641,
    },
    {
      name: "GetSearchList_GetCMSSearchList_GetSearchGroup下线",
      count: 177336624,
    },
    {
      name: "股吧主站扫描器拦截",
      count: 203122574,
    },
    {
      name: "股吧爬虫智能分析策略",
      count: 1012027512,
    },
  ];
});
const walfHostData = factory(async () => {
  return [
    {
      name: "baidu.com",
      count: 12795508,
    },
    {
      name: "xinlang.com",
      count: 17311173,
    },
    {
      name: "maomi.cn",
      count: 38348761,
    },
    {
      name: "google.com",
      count: 69607482,
    },
    {
      name: "gapde.com",
      count: 234689880,
    },
    {
      name: "weizhi.com",
      count: 1422911577,
    },
  ] as Row[];
});
const attckTableData = factory(async () => {
  return [
    {
      ip: "2001:da8:1007:4001::1:66d7",
      count: 89348037,
      country: "中国",
      province: "江苏",
      city: "南京",
      isp: "教育网",
      organization: "南京大学",
      longitude: 118.88064,
      latitude: 32.11352,
    },
    {
      ip: "125.74.158.86",
      count: 73625939,
      country: "中国",
      province: "甘肃",
      city: "张掖",
      isp: "电信",
      organization: "其他",
      longitude: 100.4527,
      latitude: 38.92947,
    },
    {
      ip: "211.143.79.108",
      count: 44993792,
      country: "中国",
      province: "河北",
      city: "保定",
      isp: "移动",
      organization: "其他",
      longitude: 115.49715,
      latitude: 38.88322,
    },
    {
      ip: "118.195.136.125",
      count: 22272199,
      country: "中国",
      province: "江苏",
      city: "南京",
      isp: "电信/联通/移动",
      organization: "tencent.com",
      longitude: 118.88064,
      latitude: 32.11352,
    },
    {
      ip: "139.196.148.64",
      count: 19517854,
      country: "中国",
      province: "上海",
      city: "上海",
      isp: "阿里云/电信/联通/移动/教育网",
      organization: "aliyun.com",
      longitude: 121.5447,
      latitude: 31.22249,
    },
    {
      ip: "58.213.8.177",
      count: 17389406,
      country: "中国",
      province: "江苏",
      city: "南京",
      isp: "电信",
      organization: "其他",
      longitude: 118.88064,
      latitude: 32.11352,
    },
    {
      ip: "2001:da8:1007:4001::3:2f85",
      count: 12707060,
      country: "中国",
      province: "江苏",
      city: "南京",
      isp: "教育网",
      organization: "南京大学",
      longitude: 118.88064,
      latitude: 32.11352,
    },
    {
      ip: "120.198.197.10",
      count: 11788574,
      country: "中国",
      province: "广东",
      city: "深圳",
      isp: "移动",
      organization: "其他",
      longitude: 114.13116,
      latitude: 22.54836,
    },
    {
      ip: "120.195.211.129",
      count: 9080279,
      country: "中国",
      province: "江苏",
      city: "无锡",
      isp: "移动",
      organization: "其他",
      longitude: 120.2853,
      latitude: 31.91996,
    },
    {
      ip: "120.43.32.176",
      count: 7797060,
      country: "中国",
      province: "福建",
      city: "宁德",
      isp: "电信",
      organization: "其他",
      longitude: 119.5039,
      latitude: 27.45996,
    },
  ];
});
const realAttackData = factory(async () => {
  return mockjs.mock({
    "a|50": [
      {
        ip: "@ip",
        host: "@domain",
        rule: "@cparagraph(4,10)",
        timestamp: '@date("T")',
        country: "中国",
        province: "@province",
        city: "@city",
        "isp|1": ["电信", "联通", "移动"],
        organization: "其他",
        longitude: 120.98074,
        latitude: 31.38464,
      },
    ],
  }).a;
});
const chinaMapData = computed(() => {
  return mapData as MapRow[];
});

const singleAreakData = factory(async () => {
  return lineData;
});
const circleData = factory(async () => {
  return {
    app: 439,
    host: 71,
    cluster: 107,
    upstream: 916,
    node: 344,
    inactive: 0,
    active: 0,
    install: 0,
    online: 337,
    offline: 7,
  };
});
const colBarData = computed(() => {
  return [
    {
      label: "未激活",
      value: circleData.value.inactive || 0,
    },
    {
      label: "已激活",
      value: circleData.value.active || 0,
    },
    {
      label: "在线",
      value: circleData.value.online || 0,
    },
    {
      label: "离线",
      value: circleData.value.offline || 0,
    },

    {
      label: "安装",
      value: circleData.value.install || 0,
    },
  ];
});

const circle2Data = factory(async () => {
  return [
    {
      name: "其他",
      value: 301588509,
    },
    {
      name: "南京大学",
      value: 102952702,
    },
    {
      name: "阿里云",
      value: 32965155,
    },
    {
      name: "腾讯云",
      value: 24328308,
    },
    {
      name: "微软云",
      value: 4247116,
    },
    {
      name: "福州大学",
      value: 3235842,
    },
    {
      name: "金山云",
      value: 3207935,
    },
    {
      name: "drpeng.com.cn",
      value: 2626052,
    },
    {
      name: "华胜天成",
      value: 2005800,
    },
    {
      name: "有孚",
      value: 1564954,
    },
    {
      name: "网银互联",
      value: 1242487,
    },
    {
      name: "baidu.com",
      value: 1173224,
    },
    {
      name: "互联港湾",
      value: 1129462,
    },
    {
      name: "中联网盟",
      value: 802878,
    },
  ];
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
span {
  display: inline-block;
}
.home {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #03044a;
  overflow: hidden;
}
.left {
  width: 100%;
  height: 100%;
}
.left1 {
  border-bottom: 1px solid #0d2451;
  background: #151456;
  height: 33%;
  width: 100%;
  padding: 20px 0 5px 0;
  box-sizing: border-box;
  position: relative;
}
.right1 {
  border-bottom: 1px solid #0d2451;
  background: #151456;
  padding: 20px 0px 0px 0;
  box-sizing: border-box;
  position: relative;
}
.main-title {
  width: 100%;
  padding: 2px;
  box-sizing: border-box;
  text-align: center;
  color: #75deef;
  font-size: 30px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(../assets/headimg.png);
    background-size: 170% 115%;
    background-position: center center;
    background-repeat: no-repeat;
  }
  letter-spacing: 10px;
  font-weight: bold;

  background-image: linear-gradient(
    -30deg,
    #75deef,
    #2043aa 40%,
    #75deef 60%,
    #2043aa 90%,
    #75deef
  );
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 100%;
  animation: masked-animation 3s 1s infinite linear;
}
@keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
.title {
  position: absolute;
  display: inline-block;
  color: #6eddf1;
  height: 18px;
  padding: 8px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url("../assets/方形 (27).png");
  background-repeat: no-repeat;
  // background-position: -5px 0px;
  background-size: 100% 90%;

  .title-text {
    position: relative;
    font-size: 16px;
    display: inline-block;
    padding: 0px 4px;

    transform: translateY(-2px);
  }
}
.cirle {
  width: 25%;
}
.typewriterNotice {
  background-image: url("../assets/方形.png");
  background-size: 120% 118%;
  background-position: 40% 10%;
}
.realTimeAttackIPScroll {
  position: relative;
}
.realTimeAttackIPScroll::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("../assets/圆形.webp");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  opacity: 0.3;
}
</style>
