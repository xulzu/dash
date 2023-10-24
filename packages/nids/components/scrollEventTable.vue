<template>
  <div style="position: relative; width: 100%; height: 100%; padding: 10px">
    <div style="display: flex; width: 100%; margin-bottom: 3px">
      <div style="width: 20%" class="tt th">规则</div>
      <div style="width: 60%" class="tt th">消息</div>
      <div style="width: 20%" class="tt th">时间</div>
    </div>
    <scrollTable ref="scrollTableRef" :data="data" class="warp">
      <div
        style="display: flex; width: 100%"
        class="tr"
        v-for="(item, index) in data"
        :key="index"
      >
        <div style="width: 20%" class="tt td">{{ item.name }}</div>
        <div style="width: 60%" class="tt td">{{ item.msg }}</div>
        <div style="width: 20%" class="tt td">{{ item.time }}</div>
      </div>
    </scrollTable>
  </div>
</template>
<script lang="ts">
export interface Row {
  name: string;
  msg: string;
  time: string;
}
</script>
<script lang="ts" setup>
import { ref } from "vue";
import scrollTable from "./scrollTable.vue";
const props = defineProps<{ data: Row[] }>();
const scrollTableRef = ref<InstanceType<typeof scrollTable>>();
</script>
<style lang="less">
.warp {
  height: calc(100% - 28px);
  width: 100%;
  overflow: hidden;
}
.tt {
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.th {
  color: #dbdada;
  position: relative;
  margin: 0 3px;
  border-top: 1px solid #5770af;
  background-color: #5b6c8229;
  padding: 5px 10px;
  font-weight: bolder;
  font-size: 14px;
}
.tr {
  margin: 2px 0;
}
.td {
  color: #6996cb;
  position: relative;
  margin: 0 3px;
  background-color: #4a5e782e;
  padding: 3px 10px;
  font-size: 13px;
}
.td:nth-child(1) {
  border-left: 1px solid #287fad;
  // padding-left: 2px;
}
</style>
