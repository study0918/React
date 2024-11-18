<template>
  <div id="cesiumContainer"></div>
</template>
<script setup>
import { onMounted } from "vue";
import * as Cesium from "cesium";
console.log(Cesium);
onMounted(() => {
  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiY2I5NjhmMS0xN2YzLTRlZGEtYjIwMS1lNTg1NGQ4Y2M1OWQiLCJpZCI6MjU1ODg4LCJpYXQiOjE3MzE4MzgyNzF9.MAAyYuUxEt3IuVnx7r9oAhcmpkg9F5fSi5dtMr1Kh2o";
  // viewer是所有API的开始

  const viewer = new Cesium.Viewer("cesiumContainer", {});
  // 返回的是笛卡尔坐标
  const cartsian1 = Cesium.Cartesian3.fromDegrees(110, 20, 20); // 经度，纬度，高度
  const cartsian2 = Cesium.Cartesian3.fromDegrees(110, 20, 30); // 经度，纬度，高度
  console.log(cartsian1, cartsian2);

  // 笛卡尔弧度坐标
  let cartographic = Cesium.Cartographic.fromCartesian(cartsian1);
  // let lon = (180 / Math.PI) * cartographic.longitude;
  // let lat = (180 / Math.PI) * cartographic.latitude;
  let lon = Cesium.Math.toDegrees(cartographic.longitude);
  let lat = Cesium.Math.toDegrees(cartographic.latitude);
  console.log(lon, lat);
});
</script>
<style scoped>
#cesiumContainer {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
