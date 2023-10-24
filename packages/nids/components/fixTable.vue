<template>
  <div style="padding: 10px; width: 100%; height: 100%; overflow: hidden">
    <div style="display: flex; width: 100%; margin-bottom: 3px">
      <div style="width: 20%" class="tt th">机房名称</div>
      <div style="width: 20%" class="tt th">信息展示</div>
      <div style="width: 20%" class="tt th">信息展示</div>
      <div style="width: 20%" class="tt th">信息展示</div>
      <div style="width: 20%" class="tt th">信息展示</div>
    </div>
    <div style="height: calc(100% - 28px)">
      <div
        style="display: flex; width: 100%"
        class="tr"
        v-for="(item, index) in tableData"
        :key="index"
      >
        <div style="width: 20%" class="tt td">{{ item.name }}</div>
        <div style="width: 20%" class="tt td">{{ item.col1 }}</div>
        <div style="width: 20%" class="tt td">{{ item.col1 }}</div>
        <div style="width: 20%" class="tt td">{{ item.col1 }}</div>
        <div style="width: 20%" class="tt td">{{ item.col1 }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export interface Row {
  name: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
}
</script>
<script lang="ts" setup>
import { ref, computed } from "vue";
const props = defineProps<{
  data: Row[];
}>();
const tableData = computed(() => {
  const total = 19;

  const arr =
    [
      {
        name: "周浦",
        col1: "200",
        col2: "100",
        col3: "400",
        col4: "500",
      },
      {
        name: "周浦2",
        col1: "200",
        col2: "100",
        col3: "400",
        col4: "500",
      },
      {
        name: "周浦4",
        col1: "200",
        col2: "100",
        col3: "400",
        col4: "500",
      },
      {
        name: "万国",
        col1: "200",
        col2: "100",
        col3: "400",
        col4: "500",
      },
    ] || props.data?.slice(0, total);
  if (arr.length < total) {
    arr.push(
      ...new Array(total - arr.length).fill({
        name: "*",
        col1: "*",
        col2: "*",
        col3: "*",
        col4: "*",
      })
    );
  }
  return arr;
});
</script>
<style lang="less" scoped>
.tt {
  text-align: left;
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
.tr + .tr {
  margin-top: 3px;
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
