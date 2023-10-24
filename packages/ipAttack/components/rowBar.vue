<template>
  <div class="charts" ref="$el"></div>
</template>
<script lang="ts">
export interface Row {
  name: string;
  count: number;
}
</script>
<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, onMounted, watch, nextTick } from "vue";
// import { pieData } from "./mock";
const $el = ref();
let timer: any;
let myChart: echarts.ECharts;

const props = defineProps<{
  data: Row[];
}>();

watch(
  () => props.data,
  (val) => {
    nextTick(setChart);
  }
);
onMounted(setChart);

function numParse(num: number) {
  if (num >= 100000000) {
    return Number(num / 10000000).toFixed(0) + "KW";
  }
  if (num >= 100000) {
    return Number(num / 10000).toFixed(0) + "W";
  }
  if (num >= 10000) {
    return Number(num / 1000).toFixed(0) + "K";
  }
  return num;
}
function setChart() {
  const pieData =
    props.data?.map((item) => {
      return {
        ...item,
        count:
          item.count === 0 ? 0 : item.count === 1 ? 1 : Math.log(item.count),
      };
    }) || [];
  const xuhaofontsize = 10;
  const img1 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAyCAYAAAAnWDnqAAAAAXNSR0IArs4c6QAAAt5JREFUaEPtmj1oFEEYhp/vjD9nEklhY5EUIgp2ooVaaW+jjXYKglaKJCgH/mEQCYKnJigqCGkEbWJjEdJopRaKhRAQxEILLVKImktikv1kJpNLuLvo7uyOOWW/5rjdvZln33lvjvveFTIunWIrs/QjTFOgR1YzmuUUktVg+o31tHAJOAa0uHFngHvMcFHWMZbFXKmBVVnFBCeAc0AHMAs8AlYCB4AVwFfgMkUGRPiZBjwVsFbYD1wFNjmI58ANlA/2vbAROAXsduffA2dkLY99ob2AdZxtCGVgj5vYABpQA1xfYoENuLkBU89QuqWVN0nBEwHrOBvs0gpHgIJb6rvAEGqtsHSJtYaxyHFnnQhl0FhJWvkcFzwWsCpFJulGKQFtwLT1qXCfiO9xJ7PXFWhHOQocdD7/AfRS5GYcf/8WWBVhgkNAH9DlwJ6i9AOfEoHWX9yJcBLYm8TfSwJrhZ3AdbCvpt6h1revU4LWfnw7Qg+wOY6/64B1gi7UKmqUNefHUG4DT4AoY9i54RL4uwqsShsVSgjdQBGYQnlAgUEiKkFAawdt5G+hjzWUxZjT3Jv16SSHUa6A3QXMkREiBoAvfwX0z/7+CJQo8lC0wouqT4W3QJnIvjZDGX+bFd/iYF4aYHU+OkvEiFW4ucrs9/sQLsxZYh5Y2dFcnDU0wqscOOgK5QoHldf+uOQeDqtxrnBYfXMPh9Y3VzhXuE6BfFsLbYpc4Vzh/B9HaA/8hwr3Bm1H+S9I3d/8hUZKuIafL26DRkrYlqovaG0rdqFVNT9ipk1rX8w4zcDasRvEAs3Zbm0AboKXW8Audy5MQzthYLN8kYFnJLYcoUwHapMkr9AxFnD1i5ku9jLJqEmOTILUDnjFuomAF4H7BIungU7Xix72Dc69gKvgSaNbZRSlR9oY9t35UgGbSZcIx4cc0GKfnqfIHRFrBe9KDVxV+195/KBu/zYPeERcs8cDPODxC0lMg5hwur7YAAAAAElFTkSuQmCC";
  const img2 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAyCAYAAAAnWDnqAAAAAXNSR0IArs4c6QAAAxFJREFUaEPtmjFoE2EUx//vfZ4SsNDBxSH2EgMBO4kO4mQGty7tUkdB0MlSWiwdikXpUBRLsVCwIhRc7FIXh27qUh0UpxYCJVyTwaVDQTFgvO/JV75KiNc0yd21Ddy3Hd/dez/++X/vyHtHiHhtb29f8n3/mYhURWQil8ttRZmCogpWLBbPOY7zCMBdAKds3N8AFohoJpPJ7EaRKzTwxsbG6VQqdR/AFIBeAD6AVQBnAAwAYAA7IjJdLpeXCoXCnzDgoYA9zxvUWj8BkDMQRLQuIvNa65K9zhPRGIAr5lpENpl5PJPJrHUK3RGw9ek8gJs2sQE0oOtBIMxcADACIG3315RS4319fZvtgrcFHODTXRF5QUSrWmtjhQOXUsrRWg8T0R0APQCMNZZqtdp0Pp/faRW8JeAgnxLRCoCXvu//aDWZtUkvEd0DMARAATCHcaZarS709/ebQ9p0HQp8mE8PS3DQPjNniWhURK7be7aYecJ13bfNYh4I7HneZa31HIAbrfg0BLgBHgWQtTE+MPOY67rfgmL+B+x53nkRmRGR27YktezTENBKRIasVUxp1ES0TERTrut+r4/7D7hSqaRqtZopQZMAzgKoAVgholft+rRTcKVUj4iYQzkMwAHwE8Cs4zhz6XS6uncGRIRKpdItIpoFcMHWy/fM/Nz3/UqnycM8p5RKa61HiMiUQ7PKIjKZzWbfGNhPAK7ZjSKAOa311zAJo3qWmc0Lx/zqeRvzowEWq+pjAO9EREeVMIo4RGRe7QNE9HDPEvvAWuurUSSIKwYzf0mA41LXxE0UjlPdROG41U0UThQOUCApa3HbIlE4UbhBgcQSiSUSS8TtgUTh41ZYRLrmb343NVI+d1+rat+KQc1AInotIsta619HYdmWmoGNIAHtVjMBWoyzjcXM7bdbA8AbG9qxNAqZOVxDOwB8UESeishF2zSMpBUb+cigHjzKZjcRxTuUqQcPM0440rFXC/4+mYPFIH83G90qpXIi8uDYR7f14E2G4+a2/eHhyRiO14N3zecHjTaJ+wOPvxF8nWDb371gAAAAAElFTkSuQmCC";
  const img3 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAyCAYAAAAnWDnqAAAAAXNSR0IArs4c6QAAA5tJREFUaEPtmU9oVFcUxn/ffZkEq4ILF3VRF6UguJORiXWlrt3UjUI3AaGFQlsZiyQ11GmdJqF/RjEgVCi4KbQbu+lC3FRcNG1M2oIQKIiLdtEushDaaifOu6fcmYmtmclk5s08FXl3NY8775zfO++793HPJwY8bGp0d4x9inE/ctEpTczdHmQKDSqYfZLfHleH3kf2GjDUjLti0uxQtVpW6ee7g8jVN7CVdg/73OY3TZoEtgExcAVsBHQYcBjLcnbGVTdfUul6rR/wvoBr04VXMD4CXqpDiO+A8x7dCZfO2y6JokE+XBssITuZm7h5NSl0IuCV6b17nKkCOtBMfEfG+dgpALeMyDho2FvAC83JqxE6qXd/WOoVvCfghk6js4igUwfcNeMzM3+FKApSWH/E5OT8UaHjwFaghulSNFI7o3cWl7sF7wq4jU4fIH1l6HPD/uw2WV013m+T9DpwBIjCQ8us7B78PavS0spGsTYEbtGpcQNxzku/bRS807zDXgROYOxv/u824tTQxPzXne5bF7hXnSaFj7ztN3ECCA8QluZ1LysOTyz81C5mC7B9mN8Ru6iMMdazTpNSx3EkuSMSQSpha/SIy5GPJ3V68ff/h30IbJWXN/lqXDRjHNgCJNZpUm6hrcKOY3YUyAF/Scy4kaii4tz9+howQ/FM4RjGDLCzmexb4EK/Ok0K7szC9he2wYPNGL8ixqPx+S9Vmy7MYeyrq0f84lAlhsWkyQZ5XwR5jxVl7GrImxuqTRWs8ds+MPFN+D4NMmn/sbyTcVjovbokVoG9tLf/4OlFcGYLGXB69YWswmlWN8TOKpxVeE0FMklkksgkkbYGsgpnFe5cgWwfTlshWYWzCj9z+7DgdOy5RqT6sf/pGWuO+fFU4UeDPfUjNHbLjIp37tbTANzSSBHfy0q4ODc6hqwM7Gh09rmGMeud/ngS4M7b84gicKiZ/79W1SqQlQ5sqeXujQdPAtgEVBFfmHHZpHuPA1xmz0mMYbwKjLRtBq4FsZn8zthHoTF4rKESlk12Md02VlOnpjcQ27tqt64FXymP7nORnUu7UdhOpz72bw9PLsy3e6sdLYM0W7EdW6rhva4zNvQ4wn2DbHZ307TutF66An64MPuxE3qwBQYGvBqorWEjPo7RzXbJejVeBg68GrDFEoNHrIak1lZqwHV9t5rjdTMHC+Z4MvMwVeAO+g5TiezZxwLcRt//JDXAOwH/C2NeWG8WRbglAAAAAElFTkSuQmCC";
  const img4 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAyCAYAAAAnWDnqAAAAAXNSR0IArs4c6QAAAt9JREFUaEPtmj9oFEEUxn/vEpVAAgHTpDCFiIKdaKFW2ttooekUBGMURS4oAeO/EOQIeGpCLjlBSCMYi9hYhDRaqYViIQQEsdBCBQVBUWLiPpm9OXLsnZu72d0YZac5lmW++e233wzceyvEPSZ0Kx7XfNkMfRyXuTiXkNjEitqBxxWUY0Cz1V1EuEWGS/TIpzjWig58T9fymVMoA0A78AuYtnAHgCbgC8IFPjLBZVmMAh4NeFz3owwDmyzEY+AG8MZebwTOALvt9RxKHydlxhXaDXhct6HkgT12YQNoQA1wrWGAzwIb7M0Z13w3BlzUThYZQjjibynzqqGIMI36UQgba4BDwFGgDXDKd33AeW1hHVmEfqAVWACmEG6jfG3o9Xq0k6EHqMz3EOsZ5aD8XE4rHFhVKNCNkAO6rNhDYAR4t5z4MveD+X6NcI5euR8278/AJqceYwi7rMAr8HP7PCJocLrJt9mY5gHMeISQpVde1FqnGrg6p+b8LKA8QPBihi3JCU2oHxETFXM0eiiTNDNAj7yvXHMJOM6cuj6V0Ib6m9JsTrNJv6HkmCdPVn6Uni3ZnLqim+PvNLDXCrxF6ecEd4WCPgF2JpxTV/DtQBbYYgWeGmC1F4OJ5tQVWckg7AMuliKxBLzDVXOF5j1LgRN2OnU4YYNJHU4dDjiQRiKNRBqJpDOQOpw6HO5Aeg4nnZDU4dTh/+4cPk+GWb9ItJpGjb/5S4UU4SUeeczv6hg1CimlUtVhhKtAJ/gOzwKjwIe/xB1SqioTjWkrGfpRvzTUAsyj3EGYBL6vCHhdxcAgSVG78MihdPuVIVil5dYgeEFNgfD6ChQKTU77gM0WocGCdiV4sqXYYE4jtgwqweMsdtfKKQzSwc3oTZnqfLu3vRpoC4Rt8PraXkEFt8Zi3Y2X+IHLio23buvKaXLARrl2c3zKNlWcmofJApfV/5nPD4J2mA88lBGUBdcGeJjDvwEuqGXYEDGELgAAAABJRU5ErkJggg==";

  const option = {
    grid: {
      top: 20,
      bottom: 0,
      right: 10,
    },
    xAxis: {
      type: "value",
      max: (item: any) => {
        return item.max * 1.2;
      },
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: true,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "category",
      data: pieData.map((item) => item.count),
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        margin: 20,
        align: "left",
        formatter: (name: any, index: number) => {
          const idx = pieData.length - index;

          if (idx < 3) {
            return `{icon${idx}|${idx}}`;
          } else {
            return `{count|${idx}}`;
          }
        },
        rich: {
          icon1: {
            width: xuhaofontsize * 1.5,
            height: xuhaofontsize * 1.5,
            align: "center",
            padding: [2, 0, 2, 0],
            backgroundColor: {
              image: img1,
            },
            color: "#ffffff",
            fontSize: xuhaofontsize,
          },
          icon2: {
            width: xuhaofontsize * 1.5,
            height: xuhaofontsize * 1.5,
            padding: [2, 0, 2, 0],
            align: "center",
            backgroundColor: {
              image: img2,
            },
            color: "#ffffff",
            fontSize: xuhaofontsize,
          },
          icon3: {
            width: xuhaofontsize * 1.5,
            height: xuhaofontsize * 1.5,
            padding: [2, 0, 2, 0],
            align: "center",
            backgroundColor: {
              image: img3,
            },
            color: "#ffffff",
            fontSize: xuhaofontsize,
          },
          count: {
            width: xuhaofontsize * 1.5,
            height: xuhaofontsize * 1.5,
            padding: [2, 0, 2, 0],
            align: "center",
            backgroundColor: {
              image: img4,
            },
            color: "#ffffff",
            fontSize: xuhaofontsize,
          },
        },
      },
    },
    series: [
      {
        name: "curValue",
        type: "bar",
        xAxisIndex: 0,
        yAxisIndex: 0,
        barWidth: 6,
        data: pieData.map((item) => item.count),
        silent: true,
        label: {
          show: true,
          offset: [10, -16],
          color: "#fff",
          fontWeight: 500,
          position: "left",
          align: "left",
          formatter: function (params: any) {
            return pieData[params.dataIndex]?.name || "";
          },
        },
        itemStyle: {
          emphasis: {
            barBorderRadius: [0, 20, 20, 0],
          },
          normal: {
            barBorderRadius: [0, 20, 20, 0],
            color: function () {
              return new echarts.graphic.LinearGradient(
                0,
                0,
                1,
                0,
                [
                  {
                    offset: 0,
                    color: "#00C0FD00", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#00C0FD", // 100% 处的颜色
                  },
                ],
                false
              );
            },
          },
        },
      },
      {
        name: "背景",
        type: "bar",
        barWidth: 6,
        barGap: "-100%",
        animation: false,
        data: new Array(pieData.length).fill(
          Math.max(...pieData.map((item) => item.count)) * 1.2
        ),
        itemStyle: {
          normal: {
            color: "#02BAF433",
            barBorderRadius: [30, 30, 30, 30],
          },
        },
        label: {
          show: true,
          offset: [30, 0],
          color: "#5CB1C1",
          fontWeight: 500,
          position: "right",
          align: "right",
          formatter: function (params: any) {
            return numParse(props.data[params.dataIndex]?.count || 0) + " 次";
          },
        },
      },
      {
        name: "hightLightPoniter",
        type: "scatter",
        data: new Array(pieData.length).fill(0),
        symbol: "circle",
        symbolSize: 8,
        zlevel: 2,
        itemStyle: {
          color: "#00C0FD",
          shadowColor: "rgba(115, 243, 255, 1)",
          shadowBlur: 6,
        },
      },
    ],
  };
  myChart?.clear();
  myChart?.dispose();
  myChart = echarts.init($el.value);
  let dir = true;
  const emptyArr = new Array(pieData.length).fill(0);
  clearInterval(timer);
  timer = setInterval(() => {
    myChart.setOption({
      series: [
        {
          name: "hightLightPoniter",
          animationDurationUpdate: 3000,
          animationEasingUpdate: "linear",
          data: dir ? pieData.map((item) => item.count) : emptyArr,
        },
      ],
    });
    dir = !dir;
  }, 5000);
  myChart.clear();
  myChart.resize();
  myChart.setOption(option);
}
</script>

<style lang="less" scoped>
.charts {
  height: 100%;
  width: 100%;
}
</style>
