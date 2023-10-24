import * as THREE from "three";

/** @desc  经纬度坐标变换（传入e:纬度、a 经度、t球半径、o球额外距离） */
export function latLongToVector3(e: number, a: number, t: number, o: number) {
  const r = (e * Math.PI) / 180,
    i = ((a - 180) * Math.PI) / 180,
    n = -(t + o) * Math.cos(r) * Math.cos(i),
    s = (t + o) * Math.sin(r),
    l = (t + o) * Math.cos(r) * Math.sin(i);
  return new THREE.Vector3(n, s, l);
}
//销毁组数据
export function clearGroup(group: THREE.Group) {
  //清除缓存
  const clearCache = (item: any) => {
    item.geometry?.dispose(); //必须对组中的material与geometry进行dispose，清除占用的缓存
    item.material?.dispose();
  };
  //移除模型
  const removeObj = (obj: THREE.Object3D) => {
    const arr = obj.children.filter((x) => x);
    arr.forEach((item) => {
      if (item.children.length) {
        removeObj(item);
      } else {
        clearCache(item);
        item.clear();
      }
    });
    obj.clear();
  };
  removeObj(group);
}
