<template>
  <div
    class="component-item-container"
    :style="component.style"
    :class="{ selected: isSelected }"
    @click.stop="handleClick"
    @mousedown="handleMouseDown"
    @dragover.prevent
    @drop="handleDrop"
  >
    <!-- 组件内容渲染 -->
    <div class="component-content">
      <template v-if="component.type === 'image'">
        <img
          :src="component.src"
          alt="图片组件"
          style="
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
          "
        />
      </template>
      <template v-else-if="component.type === 'button'">
        <button
          style="
            width: 100%;
            height: 100%;
            background: #409eff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          {{ component.content }}
        </button>
      </template>
      <template v-else>
        <div style="width: 100%; height: 100%; word-break: break-all">
          {{ component.content }}
        </div>
      </template>
    </div>

    <!-- 递归渲染子组件，实现无限嵌套 -->
    <component-item
      v-for="child in component.children"
      :key="child.id"
      :component="child"
      @select="emitSelect"
      @update="emitUpdate"
      @delete="emitDelete"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

// ================= Props与Emits =================
const props = defineProps({
  component: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  canvasData: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['select', 'update', 'delete']);

// ================= 响应式数据 =================
const isSelected = ref(false); // 是否选中当前组件
const dragComponent = ref(null); // 拖拽暂存组件
const startPos = ref({ x: 0, y: 0 }); // 鼠标按下初始位置
const compPos = ref({ x: 0, y: 0 }); // 组件初始位置
let componentInfo = ref({ ...props.component });

// 监听选中状态，同步外部选中的组件
watch(
  () => props.component,
  () => {
    isSelected.value = false;
  },
  { deep: true },
);

// ================= 核心方法 =================
// 1. 点击组件选中
const handleClick = () => {
  isSelected.value = true;
  emit('select', props.component);
};

// 2. 鼠标按下 - 开启自由拖拽逻辑
const handleMouseDown = (e) => {
  e.stopPropagation(); // 阻止冒泡，避免选中父组件
  startPos.value = { x: e.clientX, y: e.clientY };
  compPos.value = {
    x: props.component.style.left,
    y: props.component.style.top,
  };
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
};

// 3. 鼠标移动 - 实时更新组件位置 (核心自由拖拽)
const handleMouseMove = (e) => {
  const dx = e.clientX - startPos.value.x;
  const dy = e.clientY - startPos.value.y;
  const newLeft = compPos.value.x + dx;
  const newTop = compPos.value.y + dy;
  // 更新组件位置，响应式同步到画布
  componentInfo.value.style.left = Math.max(0, newLeft); // 边界处理，不超出画布左侧
  componentInfo.value.style.top = Math.max(0, newTop); // 边界处理，不超出画布顶部
  emit('update', componentInfo.value);
};

// 4. 鼠标抬起 - 结束拖拽
const handleMouseUp = () => {
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
};

// 5. 嵌套放置 - 组件拖入当前组件内部成为子组件
const handleDrop = (e) => {
  e.stopPropagation();
  if (!dragComponent.value) {
    // 从左侧组件库拖入
    dragComponent.value = window.parent.dragComponent?.value;
  }
  if (dragComponent.value) {
    const newComponent = createNewComponent(dragComponent.value.type);
    // 修正嵌套组件的初始位置
    newComponent.style.left = 20;
    newComponent.style.top = 20;
    componentInfo.value.children.push(newComponent);
    emit('update', componentInfo.value);
    dragComponent.value = null;
    window.parent.dragComponent.value = null;
  }
};

// 6. 转发删除事件
const emitDelete = (id) => {
  emit('delete', id);
};

// 7. 转发选中事件
const emitSelect = (component) => {
  emit('select', component);
};

// 8. 转发更新事件
const emitUpdate = (component) => {
  emit('update', component);
};

// 复用根组件的创建组件方法
const createNewComponent = (type) => {
  const baseStyle = {
    width: type === 'text' ? 120 : type === 'button' ? 100 : 200,
    height: type === 'text' ? 40 : type === 'button' ? 40 : 150,
    top: 20,
    left: 20,
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 4,
    position: 'absolute',
    cursor: 'move',
    border: '1px solid #ddd',
  };
  const componentMap = {
    text: { name: '文本组件', content: '我是文本内容', children: [] },
    paragraph: { name: '段落组件', content: '我是段落内容', children: [] },
    button: { name: '按钮组件', content: '点击按钮', children: [] },
    image: {
      name: '图片组件',
      src: 'https://picsum.photos/200/150',
      children: [],
    },
  };
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    type,
    ...componentMap[type],
    style: { ...baseStyle },
  };
};
</script>

<style scoped>
.component-item-container {
  box-sizing: border-box;
  transition: all 0.2s;
  overflow: hidden;
}
.component-item-container.selected {
  border: 2px solid #409eff !important;
  box-shadow: 0 0 8px rgba(64, 158, 255, 0.5);
  z-index: 999;
}
.component-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
