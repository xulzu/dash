import * as THREE from "three";
import starImg from "@/assets/three/star.jpg";
import { option } from "./index";
import earthGrayscale from "@/assets/three/map_inverted.png";
import { latLongToVector3 } from "./utils";
import { MeshLine, MeshLineMaterial } from "three.meshline";
import ringImg from "@/assets/three/ring_explosion.jpg";
import gsap from "gsap";
import earthGlowImg from "@/assets/three/earth-glow-modified.png";
export type ThreeOBJFn = {
  obj?: THREE.Object3D;
  update: (time?: number) => void;
  asyncObj?: Promise<THREE.Object3D>;
};

//创建宇宙(球形宇宙)
export function createUniverse(): ThreeOBJFn {
  const universeGeometry = new THREE.SphereGeometry(400, 100, 100);
  const universeMaterial = new THREE.MeshBasicMaterial({
    //高光材质
    // map: new THREE.TextureLoader().load(universeImg),
    color: new THREE.Color("#061537"),
    side: THREE.DoubleSide, //双面显示
  });
  //宇宙网格
  const universeMesh = new THREE.Mesh(universeGeometry, universeMaterial);
  universeMesh.name = "宇宙";
  return {
    obj: universeMesh,
    update() {
      //
    },
  };
}
//创建星辰
export function createStars(): ThreeOBJFn {
  const positions = [];
  const colors = [];
  //星辰几何体
  const starsGeometry = new THREE.BufferGeometry();
  //添加星辰的颜色与位置
  for (let i = 0; i < 1000; i++) {
    const vertex = new THREE.Vector3();
    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    positions.push(vertex.x, vertex.y, vertex.z);
    const color = new THREE.Color();
    color.setRGB(255, 255, 255);
    colors.push(color.r, color.g, color.b);
  }
  starsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  starsGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  );
  //星辰材质
  const starsMaterial = new THREE.PointsMaterial({
    map: new THREE.TextureLoader().load(starImg),
    size: 4,
    blending: THREE.AdditiveBlending,
    fog: true,
    depthTest: false, //(不能与blending一起使用)
  });
  //星辰的集合
  const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
  starsMesh.scale.set(1000, 1000, 1000); //设置集合体范围
  starsMesh.name = "星辰";
  return {
    obj: starsMesh,
    update() {
      void 0;
    },
  };
}

//创建光源
export function createLight(): ThreeOBJFn {
  const lightColor = new THREE.Color(0xffffff);
  const ambient = new THREE.AmbientLight(lightColor); //环境光
  ambient.name = "环境光";
  const group = new THREE.Group();
  group.add(ambient);
  const directionalLight1 = new THREE.DirectionalLight(lightColor);
  directionalLight1.position.set(0, 0, 1000);
  group.add(directionalLight1); //平行光源添加到场景中
  const directionalLight2 = new THREE.DirectionalLight(lightColor);
  directionalLight2.position.set(0, 0, -1000);
  group.add(directionalLight2); //平行光源添加到场景中
  const directionalLight3 = new THREE.DirectionalLight(lightColor);
  directionalLight3.position.set(1000, 0, 0);
  group.add(directionalLight3); //平行光源添加到场景中
  const directionalLight4 = new THREE.DirectionalLight(lightColor);
  directionalLight4.position.set(-1000, 0, 0);
  group.add(directionalLight4); //平行光源添加到场景中
  const directionalLight5 = new THREE.DirectionalLight(lightColor);
  directionalLight5.position.set(0, 1000, 0);
  group.add(directionalLight5); //平行光源添加到场景中
  const directionalLight6 = new THREE.DirectionalLight(lightColor);
  directionalLight6.position.set(0, -1000, 0);
  group.add(directionalLight6); //平行光源添加到场景中
  return {
    obj: group,
    update() {
      void 0;
    },
  };
}

//创建球形
export function createSphere(config: typeof option): ThreeOBJFn {
  const globeBufferGeometry = new THREE.SphereGeometry(
    config.baseSize - 3,
    50,
    50
  ); //球体几何体
  const globeInnerMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#01183f"), //颜色
    transparent: true, //透明
    opacity: 0.4, //不透明度
    fog: true,
  });
  const globeInnerMesh = new THREE.Mesh(
    globeBufferGeometry,
    globeInnerMaterial
  );
  return {
    obj: globeInnerMesh,
    update() {
      //
    },
  };
}

/** @desc  根据二值世界地图创建球面斑点  */
export function createSpot(config: typeof option): ThreeOBJFn {
  let resFn: (obj: THREE.Object3D) => void;
  const res = new Promise<THREE.Object3D>((res) => {
    resFn = res;
  });
  const img = new Image();
  img.src = earthGrayscale; //黑白地图
  //图片加载后绘制斑点至球面
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width; //使得canvas尺寸与图片尺寸相同
    canvas.height = img.height;
    canvas.getContext("2d")!.drawImage(img, 0, 0, img.width, img.height); //canvas绘制图片
    const canData = canvas
      .getContext("2d")!
      .getImageData(0, 0, canvas.width, canvas.height); //获取画布像素数据
    const globeCloudBufferGeometry = new THREE.BufferGeometry(); //设置缓冲几何体
    const globeCloudVerticesArray = []; //地球云缓冲几何体顶点
    let o = null; //数组处理时的计数
    for (o = 0; o < canData.data.length; o += 4) {
      const r = (o / 4) % canvas.width,
        i = (o / 4 - r) / canvas.width;
      if ((o / 4) % 2 == 1 && i % 2 == 1)
        if (0 === canData.data[o]) {
          const n = r,
            longitude = (i / (canvas.height / 180) - 90) / -1, //经度
            latitude = n / (canvas.width / 360) - 180; //维度
          const s = latLongToVector3(longitude, latitude, config.baseSize, 0.1); //经纬度变换
          globeCloudVerticesArray.push(s); //将变换后的顶点放入数组
        }
    }
    const l = new Float32Array(3 * globeCloudVerticesArray.length); //创建顶点数组长度
    for (o = 0; o < globeCloudVerticesArray.length; o++) {
      l[3 * o] = globeCloudVerticesArray[o].x; //设置顶点数组数据
      l[3 * o + 1] = globeCloudVerticesArray[o].y;
      l[3 * o + 2] = globeCloudVerticesArray[o].z;
    }
    const positionVal = new THREE.BufferAttribute(l, 3); //设置缓冲区属性值
    globeCloudBufferGeometry.setAttribute("position", positionVal); //给缓冲几何体添加位置属性
    const globeCloudMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(config.baseColor), //颜色
      fog: true,
      size: 1,
      transparent: false,
    }); //球面斑点材质
    const d = new Float32Array(3 * globeCloudVerticesArray.length),
      c = [];
    for (o = 0; o < globeCloudVerticesArray.length; o++) {
      c[o] = new THREE.Color("red"); //球面斑点颜色
      d[3 * o] = c[o].r; //设置地球云数组rgb颜色
      d[3 * o + 1] = c[o].g;
      d[3 * o + 2] = c[o].b;
    }
    const color_val = new THREE.BufferAttribute(d, 3);
    globeCloudBufferGeometry.setAttribute("color", color_val); //给缓冲几何体添加颜色属性,修改颜色直接修改globeCloudBufferGeometry的setAttribute
    const globeCloud = new THREE.Points( //球面的象素点
      globeCloudBufferGeometry,
      globeCloudMaterial
    );
    globeCloud.name = "globeCloud";
    resFn(globeCloud);
  };
  return {
    asyncObj: res,
    update() {
      //
    },
  };
}

/** @desc  创建赤道实线环 */
export function createEquatorSolidRing(config: typeof option): ThreeOBJFn {
  //创建里层的环
  const radius = config.baseSize + 9;
  const ringGeometry = new THREE.RingGeometry(radius - 1, radius + 1, 100);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: config.baseColor,
    opacity: 0.3,
    side: THREE.DoubleSide,
    fog: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
  ringMesh.rotation.x = (90 * Math.PI) / 180;
  return {
    obj: ringMesh,
    update() {
      //
    },
  };
}

/** @desc  创建赤道飞线 */
export function createEquatorFlyline(config: typeof option): ThreeOBJFn {
  const geometry = new THREE.BufferGeometry();
  const path = new THREE.Path();
  path.arc(0, 0, config.baseSize + 19, 0, Math.PI * 2, false);
  const points = path.getPoints(100); //切割段数
  geometry.setFromPoints(points);
  const line = new MeshLine();
  // 设置几何体
  line.setGeometry(geometry);
  const material = new MeshLineMaterial({
    color: config.baseColor,
    lineWidth: 1, // 线条的宽度
    dashArray: 0.5, // 该数值倒数为线段数量
    dashRatio: 0.5, // 不可见与可见比例
    transparent: true, // 设置透明度
  });
  const flylineMesh = new THREE.Mesh(line.geometry, material);
  flylineMesh.rotation.x = (90 * Math.PI) / 180;
  return {
    obj: flylineMesh,
    update: () => {
      flylineMesh.rotation.z -= 0.15;
    },
  };
}

/** @desc  创建赤道自转虚线环 */
export function createEquatorDottedLineRing(config: typeof option): ThreeOBJFn {
  const r = config.baseSize + 5;
  const positions = [];
  const ringPointGeometry = new THREE.BufferGeometry(); //环形点几何体
  const pointNum = 30; //点的数量
  const ringPointAngle = (2 * Math.PI) / pointNum; //环形点角度
  for (let o = 0; o < 500; o++) {
    const n = new THREE.Vector3(); //点的向量
    n.x = r * Math.cos(ringPointAngle * o); //计算点的角度
    n.y = 0;
    n.z = r * Math.sin(ringPointAngle * o);
    positions.push(n.x, n.y, n.z);
  }
  ringPointGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  ); //设置位置属性
  const ringPointMaterial = new THREE.PointsMaterial({
    //环形点材质
    size: 3,
    color: config.baseColor,
    transparent: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const dotLineRingMesh = new THREE.Points(
    ringPointGeometry,
    ringPointMaterial
  );
  dotLineRingMesh.name = "赤道虚线";
  return {
    obj: dotLineRingMesh,
    update() {
      dotLineRingMesh.rotation.y += 5;
    },
  };
}
/** @desc  创建赤道尖刺 */
export function createSpikes(config: typeof option): ThreeOBJFn {
  const spikeRadius = config.baseSize + 12;
  const spikesVerticesArray = [];
  const spikesObject = new THREE.Group(); //创建尖刺的组
  spikesObject.name = "赤道尖刺";
  //创建尖刺
  const spikeNum = 300; //尖刺数量
  const o = (2 * Math.PI) / spikeNum;
  for (let s = 0; s < spikeNum; s++) {
    const r = new THREE.Vector3();
    r.x = spikeRadius * Math.cos(o * s);
    r.y = 0;
    r.z = spikeRadius * Math.sin(o * s);
    r.normalize(); //归一化，将该向量转化为向量单位
    r.multiplyScalar(spikeRadius);
    const i = r.clone(); //克隆r至i
    s % 10 == 1 ? i.multiplyScalar(1.1) : i.multiplyScalar(1.05); //每10个计算一次向量与标量相乘
    spikesVerticesArray.push(r); //将向量存入尖刺顶点列表
    spikesVerticesArray.push(i);
  }
  const n = new Float32Array(3 * spikesVerticesArray.length); //创建顶点数组
  for (let s = 0; s < spikesVerticesArray.length; s++) {
    n[3 * s] = spikesVerticesArray[s].x; //给顶点数组设置坐标
    n[3 * s + 1] = spikesVerticesArray[s].y;
    n[3 * s + 2] = spikesVerticesArray[s].z;
  }
  //尖刺材质
  const spikesMaterial = new THREE.LineBasicMaterial({
    // linewidth: 1,//webgl渲染器限制,不能设置宽度，始终为1(three.meshline插件可解决)
    // color: "#fff",
    color: config.baseColor,
    transparent: true,
    opacity: 0.5,
  });
  const spikesBufferGeometry = new THREE.BufferGeometry(); //创建尖刺几何体
  spikesBufferGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(n, 3)
  ); //添加位置属性
  const spikesMesh = new THREE.LineSegments(
    spikesBufferGeometry,
    spikesMaterial
  );
  spikesObject.add(spikesMesh); //将网格放进组
  return {
    obj: spikesMesh,
    update() {
      //
    },
  };
}

/** @desc  创建上下环 */
export function createUpDownRing(config: typeof option): ThreeOBJFn {
  const r1 = config.baseSize - 50,
    r2 = config.baseSize - 40;
  const ringsObject = new THREE.Group(); //创建环的组
  ringsObject.name = "南北极环";
  //创建内环
  const a = new THREE.RingGeometry(r1, r1 - 2, 100); //圆环几何体(内半径,外半径,分段数)
  const ringsOuterMaterial = new THREE.MeshBasicMaterial({
    color: config.baseColor,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
    fog: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const o = new THREE.Mesh(a, ringsOuterMaterial);
  o.rotation.x = (90 * Math.PI) / 180; //设置旋转
  const r = o.clone(); //克隆外环网格o至r
  // r.rotation.x = Math.PI * (80 / 90);
  o.position.y = 68; //设置位置
  r.position.y = -68;
  ringsObject.add(o);
  ringsObject.add(r);
  //创建外环
  const t = new THREE.RingGeometry(r2, r2 - 2, 100);
  const ringsInnerMaterial = new THREE.MeshBasicMaterial({
    color: config.baseColor,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
    fog: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const i = new THREE.Mesh(t, ringsInnerMaterial);
  i.rotation.x = (90 * Math.PI) / 180;
  const n = i.clone();
  i.position.y = 73;
  n.position.y = -73;
  ringsObject.add(i);
  ringsObject.add(n);
  return {
    obj: ringsObject,
    update() {
      //
    },
  };
}
/** @desc   创建渐变环 */
export function createExpandRing(config: typeof option): ThreeOBJFn {
  const ringMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(ringImg),
    color: new THREE.Color(config.baseColor), //颜色
    transparent: true,
    opacity: 1,
    side: THREE.DoubleSide,
    fog: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const ringGeometry = new THREE.PlaneGeometry(
    config.baseSize * 2,
    config.baseSize * 2,
    10,
    10
  );
  const expandRingMesh = new THREE.Mesh(ringGeometry, ringMaterial);
  expandRingMesh.name = "放大环";
  expandRingMesh.rotation.x = (90 * Math.PI) / 180;
  return {
    obj: expandRingMesh,
    update() {
      gsap.isTweening(expandRingMesh.scale) || //环动画
        (gsap.fromTo(
          expandRingMesh.scale, //缩放渐变
          { x: 1, y: 1 },
          { x: 1.8, y: 1.8, duration: 2 }
        ),
        gsap.fromTo(
          expandRingMesh.material, //材质的透明度渐变
          { opacity: 1 },
          { opacity: 0, duration: 2 }
        ));
    },
  };
}
/** @desc  创建球体发光环 */
export function createSphereGlow(config: typeof option): ThreeOBJFn {
  //SpriteMaterial材质始终朝向平面
  const glowMaterial = new THREE.SpriteMaterial({
    map: new THREE.TextureLoader().load(earthGlowImg),
    color: new THREE.Color(config.baseColor), //颜色
    transparent: true,
    opacity: 1,
    side: THREE.DoubleSide,
    fog: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const glowSprite = new THREE.Sprite(glowMaterial);
  const size = config.baseSize * 2.2;
  glowSprite.scale.set(size, size, 1); //点大小
  return {
    obj: glowSprite,
    update() {
      //
    },
  };
}

export default {
  createUniverse,
  createStars,
  createLight,
  createSphere,
  createSpot,
  createEquatorSolidRing,
  createEquatorFlyline,
  createEquatorDottedLineRing,
  createSpikes,
  createUpDownRing,
  createExpandRing,
  createSphereGlow,
};
