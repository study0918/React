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

  const viewer = new Cesium.Viewer("cesiumContainer", {
    timeline: false, // 时间轴控件
    animation: false, // 动画控件
    geocoder: false, // 搜索控件
    homeButton: false, // 主页按钮
    sceneModePicker: false, // 投影方式按钮
    baseLayerPicker: false, // 图层选择按钮
    navigationHelpButton: false, // 帮助手势按钮
    fullscreenButton: false, // 全屏按钮
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
