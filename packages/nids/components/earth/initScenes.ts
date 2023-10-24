import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default function createSceneCameraRenderer(el: HTMLElement) {
  const dom = el;
  const width = dom.clientWidth;
  const height = dom.clientHeight;
  const scene = new THREE.Scene(); //场景场景

  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000); //创建透视相机(视场、长宽比、近面、远面)
  camera.position.set(0, 90, 300); //设置相机位置
  camera.lookAt(0, 0, 0);
  //创建渲染器
  const renderer = new THREE.WebGLRenderer({
    antialias: true, //抗锯齿
    alpha: true, //透明
  });
  renderer.setClearColor(0x000000, 0); //设置场景透明度
  renderer.setSize(width, height); //设置渲染区域尺寸

  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.autoRotate = true; //自转(相机)
  orbitControls.enableRotate = true; //鼠标左键控制旋转
  orbitControls.enableZoom = true; //鼠标缩放
  orbitControls.autoRotateSpeed = 15 / 30; //自转速度
  orbitControls.enablePan = false; //右键平移拖拽
  orbitControls.enableDamping = true; //滑动阻尼
  orbitControls.dampingFactor = 0.05; //(默认.25)

  orbitControls.minDistance = 250; //相机距离目标最小距离
  orbitControls.maxDistance = 400; //相机距离目标最大距离
  dom.appendChild(renderer.domElement); //将渲染器添加到dom中形成canvas
  return {
    scene,
    orbitControls,
    renderer,
    camera,
    render: () => {
      renderer.render(scene, camera);
      orbitControls.update(); //鼠标控件实时更新
    },
  };
}
