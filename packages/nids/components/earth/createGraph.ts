import * as THREE from "three";
import { option } from "./index";
import { type ThreeOBJFn } from "./threeOBJ";
import html2canvas from "html2canvas";
import light_column from "@/assets/three/light_column.png";
import { latLongToVector3 } from "./utils";
import aperture from "@/assets/three/aperture.png";
import { flyArc } from "./createFlyLine";

export function createGraph(
  data: {
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
  },
  conifg: typeof option
): ThreeOBJFn {
  const countrys = data.marks.map((item) => {
    const posFrom = latLongToVector3(item.lat, item.lon, conifg.baseSize, 0);
    return {
      name: item.name,
      country: item.country,
      x: posFrom.x,
      y: posFrom.y,
      z: posFrom.z,
    };
  });

  const links = data?.links.map((link) => {
    const all = [...countrys];
    return {
      from: all.find((country) => country.name === link.from),
      to: all.find((country) => country.name === link.to),
    };
  });
  const updateFn: { (): void }[] = [];

  return {
    asyncObj: new Promise<THREE.Object3D>((res) => {
      const group = new THREE.Group();
      group.name = "graph";
      help_();
      async function help_() {
        for (const country of countrys) {
          const pillar = createLightPillar({
            x: country.x,
            y: country.y,
            z: country.z,
            color: country.name === "上海" ? "yellow" : "red",
          });
          group.add(pillar);
          let wave: THREE.Mesh;
          if (country.country !== "中国" || country.name === "上海") {
            const mark = await createMark([
              {
                x: country.x,
                y: country.y,
                z: country.z,
                label: country.name,
              },
            ]).asyncObj;
            wave = createWaveMesh({
              x: country.x,
              y: country.y,
              z: country.z,
              radius: conifg.baseSize,
              color: country.name === "上海" ? "yellow" : "red",
            });
            group.add(wave);
            group.add(mark!);
          }

          updateFn.push(() => {
            if (!wave) return;
            wave.userData["scale"] += 0.007;
            wave.scale.set(
              wave.userData["size"] * wave.userData["scale"],
              wave.userData["size"] * wave.userData["scale"],
              wave.userData["size"] * wave.userData["scale"]
            );
            if (wave.userData["scale"] <= 1.5) {
              (wave.material as THREE.Material).opacity =
                (wave.userData["scale"] - 1) * 2; //2等于1/(1.5-1.0)，保证透明度在0~1之间变化
            } else if (
              wave.userData["scale"] > 1.5 &&
              wave.userData["scale"] <= 2
            ) {
              (wave.material as THREE.Material).opacity =
                1 - (wave.userData["scale"] - 1.5) * 2; //2等于1/(2.0-1.5) mesh缩放2倍对应0 缩放1.5被对应1
            } else {
              wave.userData["scale"] = 1;
            }
          });
        }

        for (const link of links) {
          if (link.from && link.to) {
            const posFrom = new THREE.Vector3(
              link.from.x,
              link.from.y,
              link.from.z
            );
            const posTo = new THREE.Vector3(link.to.x, link.to.y, link.to.z);
            const { arcline, update } = flyArc(option.baseSize, posFrom, posTo);
            group.add(arcline);
            updateFn.push(update);
          }
        }
        res(group);
      }
    }),
    update() {
      for (const update of updateFn) {
        update();
      }
    },
  };
}

/** @desc  创建标注 */
function createMark(
  marks: {
    label: string;
    x: number;
    y: number;
    z: number;
  }[]
): ThreeOBJFn {
  let resFn: (obj: THREE.Object3D) => void;
  const promise_ = new Promise<THREE.Object3D>((res) => {
    resFn = res;
  });
  help_();
  async function help_() {
    const markGrop = new THREE.Group();
    markGrop.name = "marks";

    await Promise.all(
      marks.map(async (mark) => {
        const shareContent = document.querySelector(
          ".threeMark"
        ) as HTMLElement;
        const textDom = document.querySelector(
          ".threeMark_text"
        ) as HTMLElement;
        textDom.innerText = mark.label;
        const opts = {
          backgroundColor: null, // 背景透明
          scale: 6,
        };
        const canvas = await html2canvas(shareContent, opts);
        const dataURL = canvas.toDataURL("image/png");
        const map = new THREE.TextureLoader().load(dataURL);
        const material = new THREE.SpriteMaterial({
          map: map,
          // transparent: true,
        });
        const sprite = new THREE.Sprite(material);

        const len = mark.label.length * 3.5;

        sprite.scale.set(len, len * (canvas.height / canvas.width), 1);
        // sprite.scale.set(mark.label.length * 5, 5.5, 1);
        const vec3 = new THREE.Vector3(mark.x, mark.y + 5, mark.z);
        const normal = vec3.normalize();
        const pos = normal.multiplyScalar(68);
        sprite.position.set(pos.x, pos.y, pos.z || 0);
        markGrop.add(sprite);
      })
    );
    resFn(markGrop);
  }

  return {
    asyncObj: promise_,
    update() {
      //
    },
  };
}
// function createFlyLine() {}

/** @desc  创建柱状 */
export const createLightPillar = (options: {
  x: number;
  y: number;
  z: number;
  color: string;
}) => {
  const height = 10;
  const width = 5;
  const geometry = new THREE.PlaneGeometry(width, height);

  geometry.rotateX(Math.PI / 2);
  geometry.translate(0, 0, height / 2);
  const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(light_column),
    color: new THREE.Color(options.color || "red"),
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  const group = new THREE.Group();
  group.name = "光柱";
  // 两个光柱交叉叠加
  group.add(mesh); //几何体绕x轴旋转了，所以mesh旋转轴变为z
  group.add(mesh.clone().rotateZ(Math.PI / 2));
  group.position.set(options.x, options.y, options.z); //设置mesh位置
  const coordVec3 = new THREE.Vector3(
    options.x,
    options.y,
    options.z
  ).normalize();
  const meshNormal = new THREE.Vector3(0, 0, 1);
  group.quaternion.setFromUnitVectors(meshNormal, coordVec3);

  return group;
};
/** @desc  创建波动光圈 */
export const createWaveMesh = (options: {
  radius: number;
  x: number;
  y: number;
  z: number;
  color?: string;
}) => {
  const geometry = new THREE.PlaneGeometry(1, 1); //默认在XOY平面上
  const texture = new THREE.TextureLoader().load(aperture);
  const material = new THREE.MeshBasicMaterial({
    color: options.color || "red",
    map: texture,
    transparent: true, //使用背景透明的png贴图，注意开启透明计算
    opacity: 1.0,
    depthWrite: false, //禁止写入深度缓冲区数据
  });
  const mesh = new THREE.Mesh(geometry, material);

  // 经纬度转球面坐标
  const size = options.radius * 0.2; //矩形平面Mesh的尺寸
  mesh.scale.set(size, size, size); //设置mesh大小
  mesh.userData["size"] = size; //自顶一个属性，表示mesh静态大小
  mesh.userData["scale"] = Math.random() * 1.0; //自定义属性._s表示mesh在原始大小基础上放大倍数  光圈在原来mesh.size基础上1~2倍之间变化
  mesh.position.set(options.x, options.y, options.z);
  const coordVec3 = new THREE.Vector3(
    options.x,
    options.y,
    options.z
  ).normalize();
  const meshNormal = new THREE.Vector3(0, 0, 1);
  mesh.quaternion.setFromUnitVectors(meshNormal, coordVec3);
  return mesh;
};
