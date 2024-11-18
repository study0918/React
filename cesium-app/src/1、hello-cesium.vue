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
  // ArcGIS影像图层
  const esri = new Cesium.ArcGisMapServerImageryProvider({
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
    enablePickFeatures: false,
  });
  new Cesium.Viewer("cesiumContainer", {
    imageryProvider: esri, // 自定义图层，默认是谷歌的影像图层
    terrainProvider: Cesium.createWorldTerrain({
      requestWaterMask: true, // 水面特效
    }), // 地形图层
  });
});
</script>
<style scoped>
#cesiumContainer {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
