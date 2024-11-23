import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(
  45,//视角
  window.innerWidth / window.innerHeight,//宽高
  0.1, // 近平面
  1000 // 远平面
)

// 创建渲染器
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement)

// // // 创建几何体
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// // 创建材质
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00,Wireframe:true });

// const cube = new THREE.Mesh(geometry, material)

// console.log(geometry)

// // 将网格添加到场景中
// scene.add(cube)

// 创建几何体
const geometry = new THREE.BufferGeometry();

// 创建顶点数据，顶点是有顺序的，逆时针为正面，顺时针为反面，顶点未共用
// const vertices = new Float32Array([
//   -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, // 第一个面逆时针
//   // -1.0, -1.0, 0.0, 1.0, 1.0, 0.0 , 1.0, -1.0, 0.0 // 第一个面顺时针
//  1.0,1.0,0,-1.0,1.0,0,-1.0,-1.0,0 // 第二个面顺时针，画正方形
// ])
// // 创建顶点数据
// geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

// 创建顶点数据，共用顶点
const vertices = new Float32Array([
  -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0
])
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
// 创建索引
const indices = new Uint16Array([0, 1, 2, 2, 3, 0])
geometry.setIndex(new THREE.BufferAttribute(indices,1))
console.log(geometry)
// 创建材质
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  // side:THREE.DoubleSide
  wireframe:true // 线框
})
// 创建平面
const plane = new THREE.Mesh(geometry, material)
scene.add(plane)
// 设置相机位置
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 2;
camera.lookAt(0, 0, 0);

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置带阻尼的惯性
controls.enableDamping = true;
// 设置阻尼系数
controls.dampingFactor = 0.05;

// 渲染函数
function animate () {
  controls.update()
  requestAnimationFrame(animate);
  // 渲染
  renderer.render(scene,camera)
};

animate()

window.addEventListener('resize', () => {
  // 重置渲染器宽高比
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 重置相机宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新相机投影矩阵
  camera.updateProjectionMatrix()
});