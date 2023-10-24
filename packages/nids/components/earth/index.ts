import { onMounted, onUnmounted, watch } from "vue";
import initScenes from "./initScenes";
import * as THREE from "three";
import { createGraph } from "./createGraph";
import {
  createUniverse,
  createStars,
  createLight,
  createSphere,
  createSpot,
  createEquatorSolidRing,
  createEquatorDottedLineRing,
  createSpikes,
  createUpDownRing,
  createExpandRing,
  createSphereGlow,
} from "./threeOBJ";
import { clearGroup } from "./utils";
export const option = {
  baseSize: 60, //地球半径
  baseColor: "#01c0ff", //球面斑点颜色
};
export default function useInitScenes(props: any) {
  let dataChangeFn: { (): Promise<void> };
  let resolve: { (): void };
  const afterInit = new Promise<void>((res) => {
    resolve = res;
  });
  watch(
    () => props.data,
    (val) => {
      afterInit.then(() => {
        dataChangeFn?.();
      });
    }
  );
  const nameMap = [
    "周浦_0",
    "周浦_1",
    "浦江_0",
    "浦江_1",
    "万国_0",
    "万国_1",
    "宛平",
    "龙田",
  ];
  const mockData = {
    links: [
      {
        from: {
          type: "country",
          name: "上海",
        },
        to: {
          type: "mark",
          name: "周浦_0",
        },
      },
      {
        from: {
          type: "country",
          name: "上海",
        },
        to: {
          type: "mark",
          name: "宛平",
        },
      },
      {
        from: {
          type: "country",
          name: "美国",
        },
        to: {
          type: "mark",
          name: "龙田",
        },
      },
      {
        from: {
          type: "mark",
          name: "宛平",
        },
        to: {
          type: "mark",
          name: "龙田",
        },
      },
    ],
    // @ts-nocheck
    marks: new Array(8)
      .fill(0)
      .map((_, i) => {
        return {
          type: "mark",
          name: nameMap[i],
          lon: 1,
          lat: 0,
        };
      })
      .concat([
        {
          type: "country",
          name: "上海",
          lon: 121.472644,
          lat: 31.231706,
        },
        {
          type: "country",
          name: "美国",
          lon: -95.712891,
          lat: 37.09024,
        },
      ]) as any[],
  };
  let destroyFn: () => void;
  onMounted(async () => {
    let data = props.data || mockData;
    const updateArr: { (time?: number): void }[] = [];
    const updateArrWatch: { (time?: number): void }[] = []; //会跟随props变化的更新方法

    const { scene, render, renderer, camera } = initScenes(
      document.querySelector("#threeRef")!
    );
    const earthGroup = new THREE.Group();
    earthGroup.rotateY(Math.PI * 0.8);
    scene.add(earthGroup);
    let animationId = 0;

    //不带动画的元素
    earthGroup.add(createUniverse().obj!);
    earthGroup.add(createStars().obj!);
    earthGroup.add(createLight().obj!);
    earthGroup.add(createSphere(option).obj!);
    earthGroup.add(await createSpot(option).asyncObj!);
    earthGroup.add(createEquatorSolidRing(option).obj!);
    earthGroup.add(createSpikes(option).obj!);
    earthGroup.add(createUpDownRing(option).obj!);
    earthGroup.add(createSphereGlow(option).obj!);

    //带有动画的元素
    const equatorDottedLineRing = createEquatorDottedLineRing(option);
    earthGroup.add(equatorDottedLineRing.obj!);
    updateArr.push(equatorDottedLineRing.update);
    const expandRing = createExpandRing(option);
    earthGroup.add(expandRing.obj!);
    updateArr.push(expandRing.update);

    //创建飞线和标注
    let graphObj = await createGraphAddToEarth();

    dataChangeFn = async () => {
      data = props.data || mockData;
      graphObj && earthGroup.remove(graphObj);
      updateArrWatch.length = 0;
      graphObj = await createGraphAddToEarth()!;
    };

    update();
    resolve();

    destroyFn = destroy;
    window.addEventListener("resize", onWindowResize, false);
    async function createGraphAddToEarth() {
      try {
        const graph = createGraph(data, option);
        const graphObj = await graph.asyncObj!;
        graphObj.name = "graph";
        earthGroup.add(graphObj);
        updateArrWatch.push(graph.update);
        return graphObj;
      } catch (error) {
        console.error(error);
      }
    }
    function update() {
      cancelAnimationFrame(animationId);
      render();
      for (const updateChild of updateArr) {
        updateChild();
      }
      for (const updateChild of updateArrWatch) {
        updateChild();
      }
      animationId = requestAnimationFrame(update);
    }
    function destroy() {
      clearGroup(earthGroup);
      cancelAnimationFrame(animationId); //根据动画id停止动画渲染
      window.removeEventListener("resize", onWindowResize, false);
      renderer?.forceContextLoss(); //强制失去上下文
      renderer?.dispose();
      scene?.clear();
    }
    //窗口尺寸改变重设渲染器
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight; //修改相机宽高比
      camera.updateProjectionMatrix(); // 更新投影的变换矩阵
      renderer.setSize(window.innerWidth, window.innerHeight); //设置渲染器尺寸
    }
  });
  onUnmounted(() => {
    destroyFn?.();
  });
}
