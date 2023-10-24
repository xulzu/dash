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
    <span class="angle1"></span>
    <span class="angle2"></span>
    <span class="angle3"></span>
    <span class="angle4"></span>
    <div style="display: flex; margin-bottom: 5px">
      <span class="title" style="flex: 1"> IP地址 </span>
      <span class="title" style="width: 48%"> 地区 </span>
      <span
        class="title"
        style="text-align: center; width: 20%; min-width: 100px"
        >攻击次数</span
      >
    </div>
    <scrollTable :data="data" class="warp">
      <ul class="item">
        <li class="tableItem" v-for="(item, index) in data" :key="index">
          <span style="flex: 1" class="contentItem" v-text="item.ip"></span>
          <span
            class="contentItem"
            style="width: 48%"
            v-text="
              (item.country || '***') +
              ' / ' +
              (item.province || '***') +
              ' / ' +
              (item.city || '***')
            "
          ></span>
          <span
            class="contentItem countItem"
            v-text="numParse(item.count)"
          ></span>
        </li>
      </ul>
    </scrollTable>
  </div>
</template>
<script lang="ts">
export interface Row {
  ip: string;
  count: number;
  country: string;
  province: string;
  city: string;
}
</script>
<script lang="ts" setup>
// import { ipAttackCount } from "./mock";
import scrollTable from "./scrollTable.vue";
const props = defineProps<{ data: Row[] }>();
function numParse(num: number) {
  if (num >= 100000) {
    return Number(num / 10000).toFixed(0) + "W";
  }
  if (num >= 10000) {
    return Number(num / 1000).toFixed(0) + "K";
  }
  return num;
}
</script>
<style lang="less">
.warp {
  height: calc(100% - 23px);
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
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      font-size: 15px;
    }
  }
}
.tableItem {
  position: relative;
}
.tableItem:nth-child(2n) {
  background-image: linear-gradient(
    to right,
    #657ea540,
    #ffffff0a 20% 80%,
    #657ea540
  );
}
.contentItem {
  // padding: 4px;
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
  font-weight: 400;
}
.test {
  color: #2988a8;
}
</style>
