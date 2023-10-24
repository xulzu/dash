<template>
  <div class="charts" ref="$el"></div>
</template>
<script lang="ts">
export interface Row {
  name: string;
  value: number;
}
</script>
<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, onMounted, watch, onUnmounted } from "vue";
import numformatter from "../utils/numformatter";
const props = defineProps<{
  data: Row[];
}>();
let myChart: echarts.ECharts;
let timer: number;
const $el = ref();
let colorList = [
  "#468FF7",
  "#f7ad46",
  "#46e9f7",
  "#067c87",
  "#468FF7",
  "#f75446",
];
let mockData = [
  { name: "0-14岁", value: 25 },
  { name: "5-14岁", value: 55 },
  { name: "15-44岁", value: 85 },
  { name: "45-59岁", value: 65 },
  { name: "≥60岁", value: 45 },
  { name: "未填写", value: 85 },
];
watch(() => props.data, setChart);
onUnmounted(() => {
  clearInterval(timer);
});
onMounted(setChart);

function setChart() {
  let data: ({ realValue?: number } & Row)[] = props.data;
  if (data.length < 10) {
    data.push(
      ...new Array(10 - data.length).fill(0).map((item) => {
        return {
          name: "未知",
          value: 0,
        };
      })
    );
  }
  data =
    data?.map((item) => {
      const oldValue = item.value;

      return {
        ...item,
        value:
          oldValue === 0 || oldValue === 1
            ? 3
            : +(Math.log(oldValue) + 3).toFixed(2),
        realValue: oldValue,
      };
    }) || [];

  const max = Math.max(...data.map((item) => item.value));
  const chartMax = Math.ceil(max * 1.2);
  const diff = data?.map((item) => chartMax - item.value);
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
    color: colorList,
    grid: {
      top: 30,
      bottom: 0,
      left: 30,
      right: 80,
    },
    xAxis: [
      {
        splitLine: {
          show: false,
        },
        type: "value",
        show: false,
        max: chartMax,
      },
      {
        type: "value",
        inverse: true,
        show: false,
        max: chartMax,
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        type: "category",
        axisTick: {
          show: false,
        },
        inverse: true,
        data: data.map((item) => item.name),
        axisLabel: {
          margin: 20,
          align: "left",
          padding: [0, 0, 6],
          formatter: (name: any, index: number) => {
            if (index < 3) {
              return `{icon${index + 1}|${index + 1}}`;
            } else {
              return `{count|${index + 1}}`;
            }
          },
          rich: {
            icon1: {
              width: xuhaofontsize * 1.5,
              height: xuhaofontsize * 1.5,
              align: "center",
              verticalAlign: "bottom",
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
              verticalAlign: "middle",
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
        // zlevel: 10,
      },
      {
        type: "category",
        inverse: true,
        axisTick: "none",
        axisLine: "none",
        show: true,
        axisLabel: {
          color: "#fff",

          formatter(value: number) {
            const [num, unit] = numformatter(value);
            return `{a|${num}}{b|${unit}}`;
          },
          rich: {
            a: {
              fontFamily: "segmentFont",
              fontSize: 15,
              fontWeight: 500,
            },
            b: {
              fontSize: 14,
              color: "red",
              verticalAlign: "bottom",
              padding: [3, 0, 0, 2],
            },
          },
        },

        data: data.map((item) => item.realValue),
      },
    ],
    series: [
      {
        name: "率",
        type: "bar",
        barWidth: 7, // 柱子宽度
        showBackground: true,
        backgroundStyle: {
          color: "#194B72",
        },
        label: {
          show: true,
          offset: [10, -16],
          color: "#01c0ff",
          fontWeight: 500,
          position: "left",
          align: "left",
          formatter: function (params: any) {
            return data[params.dataIndex]?.name || "";
          },
        },
        z: 5,
        data: data.map((item, index) => {
          return {
            name: item.name,
            value: item.value,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#011753",
                  },
                  {
                    offset: 1,
                    color: colorList[index % colorList.length],
                  },
                ],
              },
            },
          };
        }),
      },

      {
        name: "反向",
        type: "bar",
        barWidth: 20, // 柱子宽度
        xAxisIndex: 1,
        barGap: "-180%",
        itemStyle: {
          color: "#061537",
        },
        label: {
          show: false,
        },
        z: 4,
        data: diff,
      },
      {
        name: "外圆",
        type: "scatter",
        emphasis: {
          scale: false,
        },
        symbol: "rect",
        symbolSize: [5, 10],
        symbolOffset: [0, -4],

        itemStyle: {
          color: "#FFF",
          shadowColor: "rgba(255, 255, 255, 0.5)",
          shadowBlur: 5,
          borderWidth: 1,
          opacity: 1,
        },
        z: 6,
        data: data,
        animationDelay: 500,
      },
      {
        name: "移动竖线",
        type: "scatter",
        emphasis: {
          scale: false,
        },
        symbol: "rect",
        symbolSize: [1, 18],
        symbolOffset: [0, -3],
        itemStyle: {
          color: "#FFF",
          shadowColor: "rgba(255, 255, 255, 0.5)",
          shadowBlur: 5,
          borderWidth: 1,
          opacity: 1,
        },
        z: 2,
        data: new Array(data.length).fill(0.2),
        animationDelay: 500,
      },
    ],
  };
  myChart?.dispose();
  myChart?.clear();
  myChart = echarts.init($el.value);
  let dir = true;
  const emptyArr = new Array(data.length).fill(0.2);
  clearInterval(timer);
  timer = setInterval(() => {
    myChart.setOption({
      series: [
        {
          name: "移动竖线",
          animationDurationUpdate: 2000,
          animationEasingUpdate: "linear",
          data: dir ? new Array(data.length).fill(max * 1.1) : emptyArr,
        },
      ],
    });
    dir = !dir;
  }, 3000);

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
