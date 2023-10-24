<template>
  <div>
    <div id="threeRef" style="width: 100%; height: 100%"></div>
    <div class="threeMark">
      <span class="threeMark_text">周浦</span>
    </div>
  </div>
</template>
<script lang="ts">
export interface Row {
  marks: {
    name: string;
    lon: number;
    lat: number;
    country?: string;
  }[];
  links: {
    from: string;
    to: string;
  }[];
}
</script>
<script lang="ts" setup>
import useInitScenes from "./index";
import { watch } from "vue";
const props = defineProps<{
  data?: Row;
}>();

useInitScenes(props);
</script>
<style lang="less" scoped>
.threeMark {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  // color:#fff
}
.threeMark_text {
  // transform: translateY(-5px);
  color: #fff;
  // background-color: red;
  font-size: 60px;
  font-weight: 600;
  border-top: 3px solid #0cd1eb;
  padding: 6px 8px;
  min-width: 50px;
  background: rgba(40, 108, 181, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
