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

  // const position = Cesium.Cartesian3.fromDegrees(110, 20, 20000);
  // viewer.camera.flyTo({
  //   destination: position,
  //   orientation: {
  //     // 默认0,-90,0
  //     heading: Cesium.Math.toRadians(0),
  //     pitch: Cesium.Math.toRadians(0),
  //     roll: Cesium.Math.toRadians(0),
  //   },
  //   duration: 3, // 单位秒
  // });

  // lookAt将视角固定在设置的点位上，可以选择视角，但不能改变位置
  const position2 = Cesium.Cartesian3.fromDegrees(110, 20, 20000);
  viewer.camera.lookAt(
    position2,
    new Cesium.HeadingPitchRange(
      Cesium.Math.toRadians(0),
      Cesium.Math.toRadians(-90),
      20000
    )
  );
});
</script>
<style scoped>
#cesiumContainer {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
