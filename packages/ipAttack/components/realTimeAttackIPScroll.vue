<template>
  <div
    style="
      margin-top: 5px;
      position: relative;
      width: 100%;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
    "
  >
    <div style="width: 100%; display: flex; margin-bottom: 5px">
      <span class="title" style="width: 21%"> 攻击时间 </span>
      <span class="title" style="width: 29%"> 攻击来源</span>
      <span class="title" style="width: 30%"> 攻击目标</span>
      <span class="title" style="width: 20%; min-width: 100px">命中策略</span>
    </div>
    <scrollTable :data="data" class="warp">
      <ul class="item">
        <li v-for="(item, index) in data" :key="index">
          <span style="width: 20%" class="contentItem">
            {{ moment(item.timestamp * 1000).format("YYYY-MM-DD HH:mm:ss") }}
          </span>
          <span style="width: 30%" class="contentItem">
            {{ ipFormat(item.ip) }}({{
              addressFormat(item.country, item.province)
            }})
          </span>
          <span style="width: 30%" class="contentItem">
            {{ item.host }}
          </span>
          <span style="width: 20%" class="contentItem">
            {{ item.rule }}
          </span>
        </li>
      </ul>
    </scrollTable>
  </div>
</template>
<script lang="ts">
export interface Row {
  ip: string;
  rule: string;
  host: string;
  country: string;
  province: string;
  city: string;
  timestamp: number;
  latitude: number;
  longitude: number;
}
</script>
<script lang="ts" setup>
import scrollTable from "./scrollTable.vue";
import { realTimeAttackData } from "./mock";
import moment from "moment";
const props = defineProps<{
  data: Row[];
}>();

function addressFormat(country: string, province: string) {
  if (country === "中国") return province;
  return country;
}
function ipFormat(ip: string) {
  if (ip.length > 20) {
    return ip.slice(0, 20) + "***";
  }
  return ip;
}
</script>
<style lang="less" scoped>
.warp {
  height: calc(100%);
  width: 100%;

  margin: 0 auto;
  overflow: hidden;
  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    li {
      display: block;
      height: 30px;
      line-height: 30px;
      display: flex;
      padding: 0 10px;
      justify-content: space-between;
      font-size: 15px;
      position: relative;
      &:nth-child(2n + 1)::before {
        position: absolute;
        content: "";
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(
          to right,
          #657ea561,
          #ffffff17 20% 80%,
          #657ea561
        );
      }
    }
  }
}
.contentItem {
  text-align: left;
  color: #6eddf1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.countItem {
  width: 20%;
  text-align: center;
  min-width: 100px;
}
.title {
  text-align: left;
  color: #6eddf1;
}
</style>
