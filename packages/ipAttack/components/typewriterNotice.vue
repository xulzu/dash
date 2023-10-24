<template>
  <div class="typeitBox">
    <div ref="multipleStringsRef" class="multipleStrings"></div>
  </div>
</template>
<script lang="ts" setup>
import TypeIt from "typeit";
import { ref } from "vue";
import { onMounted } from "vue";
const multipleStringsRef = ref();
let mockData = [
  "股吧发现大量404请求,股吧发现大量404请求股吧发现大量404请求,股吧发现大量404请求股吧发现大量404请求",
  "股吧发现大量404请求",
  "股吧发现大量404请求",
  "股吧发现大量404请求",
  "股吧发现大量404请求",
  "股吧发现大量404请求",
  "股吧发现大量404请求",
  "股吧发现大量404请求",
  "股吧发现大量404请求",
  "股吧发现大量404请求",
];

let instance: any;
function renderText() {
  return new Promise((res) => {
    multipleStringsRef.value && (multipleStringsRef.value.innerHTML = "");
    instance?.destroy(false);
    instance = new (TypeIt as any)(".multipleStrings", {
      strings: mockData.map(
        (item) => `
      <span class="iconfont icon-huodonggaojing icon-left"></span>
     <span class="icon-right"> ${item}</span>
    `
      ),
      speed: 15,
      waitUntilVisible: true,
      afterString() {
        const ele = document.querySelector(".typeitBox");
        ele?.scrollTo(0, ele?.scrollHeight || 0);
      },
      afterComplete() {
        setTimeout(() => {
          res(0);
          renderText();
        }, 3000);
      },
    }).go();
  });
}
onMounted(() => {
  renderText();
});
</script>
<style lang="less" scoped>
.typeitBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.multipleStrings {
  color: white;
  overflow: hidden;
  text-align: left;
  padding: 10px 15px 50px 15px;
}
</style>
<style>
.icon-right {
  color: #6eddf1;
}
.icon-left {
  color: red;
}
</style>
