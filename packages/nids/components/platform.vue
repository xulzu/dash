<template>
  <div class="platForm">
    <img style="height: 80%" src="../assets/area.png" alt="" />
    <div class="count windows">
      <span
        style="font-size: 12px; font-family: 'Courier New', Courier, monospace"
        >win</span
      >
      <br />
      {{ data_.windows }}
    </div>
    <div class="count linux">
      <span
        style="font-size: 12px; font-family: 'Courier New', Courier, monospace"
        >linux</span
      >
      <br />
      {{ data_.linux }}
    </div>
    <div class="count mac">
      <span
        style="font-size: 12px; font-family: 'Courier New', Courier, monospace"
        >mac</span
      >
      <br />

      {{ data_.mac }}
    </div>
    <div class="count other">
      <span
        style="font-size: 12px; font-family: 'Courier New', Courier, monospace"
        >other</span
      >
      <br />
      {{ data_.other }}
    </div>
    <div class="count sum">
      <span
        style="font-size: 12px; font-family: 'Courier New', Courier, monospace"
        >总数</span
      >
      <br />
      {{ sum }}
    </div>
  </div>
</template>
<script lang="ts">
export interface Row {
  other: number;
  mac: number;
  windows: number;
  linux: number;
}
</script>
<script lang="ts" setup>
import { computed, ref } from "vue";
const props = defineProps<{
  data: Row;
}>();
const mockData = ref({
  other: 100,
  mac: 300,
  windows: 30000,
  linux: 5000,
});
const data_ = computed(() => {
  return {
    other: props.data.other || 0,
    mac: props.data.mac || 0,
    windows: props.data.windows || 0,
    linux: props.data.linux || 0,
  };
});
const sum = computed(() => {
  return Object.values(data_.value).reduce((pre, cur) => pre + cur);
});
</script>
<style lang="less" scoped>
.platForm {
  height: 100%;
  width: 100%;
  display: flex;

  justify-content: center;
  align-items: center;
  position: relative;
  color: var(--baseColor);
}
.windows {
  position: absolute;
  top: 10px;
  left: 10px;
}
.count {
  position: absolute;
  font-family: "segmentFont";
}
.linux {
  top: 10px;
  right: 10px;
}
.mac {
  bottom: 10px;
  left: 10px;
}
.other {
  bottom: 10px;
  right: 10px;
}
.sum {
  font-size: 16px;
  font-weight: bolder;
  color: #fff;
}
</style>
