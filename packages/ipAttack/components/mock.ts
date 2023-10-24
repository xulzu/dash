import Mock from "mockjs";
// http://mockjs.com/examples.html
const foreign = true;
export const mapData = [
  {
    fromName: "贵阳",
    from: [106.71, 26.57],
    fromCountry: "中国",
    toCountry: "中国",

    to: [113, 28.21],
    toName: "长沙",
    value: 171,
  },
  {
    fromName: "贵阳",
    from: [106.71, 26.57],
    to: [113.23, 23.16],
    toName: "广州",
    value: 171,
    fromCountry: "中国",
    toCountry: "中国",
  },
  {
    fromName: "贵阳",
    from: [106.71, 26.57],
    to: [116.7, 39.53],
    toName: "廊坊",
    value: 171,
    fromCountry: "中国",
    toCountry: "中国",
  },
  {
    fromName: "贵阳",
    from: [106.71, 26.57],
    to: [117.27, 31.86],
    toName: "合肥",
    value: 171,
    fromCountry: "中国",
    toCountry: "中国",
  },
  {
    fromName: "合肥",
    from: [117.27, 31.86],
    to: [125.03, 46.58],
    toName: "大庆",
    value: 229,
    fromCountry: "中国",
    toCountry: "中国",
  },
  {
    fromName: "合肥",
    from: [117.27, 31.86],
    to: [115.480656, 35.23375],
    toName: "菏泽",
    fromCountry: "中国",
    toCountry: "中国",
    value: 229,
  },
  {
    fromName: "菏泽",
    from: [115.480656, 35.23375],
    to: [107.15, 34.38],
    toName: "宝鸡",
    value: 194,
    fromCountry: "中国",
    toCountry: "中国",
  },
  ...(foreign
    ? [
        {
          fromName: "美国",
          fromCountry: "美国",
          toCountry: "中国",
          from: [-109.69796 + 360, 39.79028],
          to: [121.45918, 31.2372],
          toName: "上海",
          value: 300,
        },
        {
          fromName: "巴西",
          fromCountry: "巴西",
          toCountry: "中国",
          from: [-56.02942 + 360, -10.70531],
          to: [121.45918, 31.2372],
          toName: "上海",
          value: 500,
        },
        {
          fromName: "马达加斯加",
          fromCountry: "马达加斯加",
          toCountry: "中国",
          from: [47.08301056835936, -19.65235624472773],
          to: [121.45918, 31.2372],
          toName: "上海",
          value: 100,
        },
        {
          fromName: "马达加斯加",
          fromCountry: "马达加斯加",
          toCountry: "中国",
          from: [46.08301056835936, -19.65235624472773],
          to: [121.45918, 31.2372],
          toName: "上海",
          value: 100,
        },
        {
          fromName: "马达加斯加",
          fromCountry: "马达加斯加",
          toCountry: "中国",
          from: [43.08301056835936, -19.65235624472773],
          to: [121.45918, 31.2372],
          toName: "上海",
          value: 100,
        },
        {
          fromName: "马达加斯加",
          fromCountry: "马达加斯加",
          toCountry: "中国",
          from: [42.08301056835936, -19.65235624472773],
          to: [121.45918, 31.2372],
          toName: "上海",
          value: 100,
        },
        {
          fromName: "马达加斯加",
          fromCountry: "马达加斯加",
          toCountry: "中国",
          from: [41.08301056835936, -19.65235624472773],
          to: [121.45918, 31.2372],
          toName: "上海",
          value: 100,
        },
        {
          fromName: "马达加斯加",
          fromCountry: "马达加斯加",
          toCountry: "中国",
          from: [47.08301056835936, -12.65235624472773],
          to: [121.45918, 31.2372],
          toName: "上海",
          value: 100,
        },
        {
          fromName: "马达加斯加",
          fromCountry: "马达加斯加",
          toCountry: "中国",
          from: [47.08301056835936, -29.65235624472773],
          to: [121.45918, 31.2372],
          toName: "上海",
          value: 100,
        },
        {
          fromName: "马达加斯加",
          fromCountry: "马达加斯加",
          toCountry: "中国",
          from: [47.08301056835936, -39.65235624472773],
          to: [121.45918, 31.2372],
          toName: "上海",
          value: 100,
        },
        {
          fromName: "马达加斯加",
          fromCountry: "马达加斯加",
          toCountry: "中国",
          from: [45.08301056835936, -14.65235624472773],
          to: [121.45918, 31.2372],
          toName: "上海",
          value: 100,
        },
        {
          fromName: "马达加斯加",
          fromCountry: "马达加斯加",
          toCountry: "中国",
          from: [15.08301056835936, -19.65235624472773],
          to: [121.45918, 31.2372],
          toName: "上海",
          value: 800,
        },
        {
          fromName: "马达加斯加",
          fromCountry: "马达加斯加",
          toCountry: "中国",
          from: [45.08301056835936, 24.65235624472773],
          to: [121.45918, 31.2372],
          toName: "上海",
          value: 100,
        },
        {
          fromName: "马达加斯加",
          fromCountry: "马达加斯加",
          toCountry: "中国",
          from: [49.08301056835936, 28.65235624472773],
          to: [121.45918, 31.2372],
          toName: "上海",
          value: 100,
        },
      ]
    : []),
];
export const lineData = [
  ...Mock.mock({
    "arr|10": [
      {
        timestamp: "@integer(1692689528,1692693128)",
        malice: "@natural(40,70)",
        normal: "@natural(40,70)",
        // value: "100",
      },
    ],
  }).arr,
].sort((a, b) => (a.timestamp <= b.timestamp ? -1 : 1));

export const rowBarData = [
  //
  ...Mock.mock({
    "arr|5": [
      {
        name: "@domain",
        count: "@natural(40,70)",
        // value: "100",
      },
    ],
  }).arr,
].sort((a, b) => a.value - b.value);

export const circlePieData = [
  ...Mock.mock({
    "arr|4": [
      {
        systemName: "@ctitle(3, 5)",
        value: "@natural(40,70)",
      },
    ],
  }).arr,
];
export const colBarData = [
  {
    label: "警告数目",
    value: Mock.Random.natural(20, 40),
  },
  {
    label: "节点数目",
    value: Mock.Random.natural(20, 40),
  },
  {
    label: "宕机数目",
    value: Mock.Random.natural(20, 40),
  },
  {
    label: "故障数目",
    value: Mock.Random.natural(20, 40),
  },
  {
    label: "问题解决数量",
    value: Mock.Random.natural(20, 40),
  },
];

export const ipAttackCount = [
  ...Mock.mock({
    "arr|20": [
      {
        ip: "@ip",
        country: "@province",
        province: "@province",
        city: "@city",
        count: "@natural(40,80)",
      },
    ],
  }).arr,
];
export const realTimeAttackData = [
  ...Mock.mock({
    "arr|200": [
      {
        ip: "@ip",
        rule: "'@title(4,10)'",
        host: "@domain",
        address: "@city",
        country: "中国",
        province: "@province",
        city: "@city",
        timestamp: 0,
        latitude: "@float(30, 40, 2, 2)",
        longitude: "@float(85, 110, 2, 2)",
      },
    ],
  }).arr,
];
export const circle2Data = [
  {
    name: "ailiyun.com",
    value: 30,
  },
  {
    name: "B类型",
    value: 10,
  },
  {
    name: "C类型",
    value: 15,
  },
  {
    name: "D类型",
    value: 23,
  },
  {
    name: "E类型",
    value: 10,
  },
  {
    name: "其他",
    value: 12,
  },
];
