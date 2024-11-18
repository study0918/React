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
  // 实体entity
  // 写法一
  // const point = new Cesium.Entity({
  //   position: Cesium.Cartesian3.fromDegrees(120, 30),
  //   point: {
  //     pixelSize: 20, //点像素大小
  //   },
  // });
  // viewer.entities.add(point);
  // viewer.zoomTo(point);
  // console.log(viewer.entities);
  // 写法二
  const point2 = viewer.entities.add({
    id: "point",
    position: Cesium.Cartesian3.fromDegrees(121, 30),
    point: {
      pixelSize: 20, // 像素大小
      color: Cesium.Color.BLUE,
    },
  });
  // viewer.zoomTo(point2);
  const billboard = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(116, 40, 10),
    billboard: {
      image: "/src/assets/position.jpeg",
      scale: 0.3,
      color: Cesium.Color.YELLOW,
    },
  });
  // viewer.zoomTo(billboard);
  // 标题
  const label = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(112, 30),
    label: {
      text: "Cesium",
      fillColor: Cesium.Color.YELLOWGREEN,
      showBackground: true,
      backgroundColor: new Cesium.Color(255, 255, 0),
    },
  });
  console.log(Cesium.Color.YELLOWGREEN);
  console.log(new Cesium.Color(255, 255, 0));
  viewer.zoomTo(label);
});
</script>
<style scoped>
#cesiumContainer {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
