<template>
  <div class="editor-container">
    <!-- 左侧：组件库区域 -->
    <div class="components-panel">
      <h3>组件库</h3>
      <div
        class="component-item"
        v-for="item in componentsList"
        :key="item.type"
        draggable="true"
        @dragstart="handleDragStart(item)"
      >
        {{ item.name }}
      </div>
    </div>

    <!-- 中间：预览画布核心区域 -->
    <div class="canvas-panel">
      <h3>预览画布 (可拖拽/嵌套/选中配置)</h3>
      <div class="canvas-container" @dragover.prevent @drop="handleDrop">
        <!-- 递归渲染组件，支持无限嵌套 -->
        <component-item
          v-for="component in canvasData"
          :key="component.id"
          :component="component"
          :canvas-data="canvasData"
          @select="handleSelectComponent"
          @update="handleUpdateComponent"
          @delete="handleDeleteComponent"
        />
      </div>
    </div>

    <!-- 右侧：属性配置面板 -->
    <div class="config-panel">
      <h3>组件配置</h3>
      <div class="empty-tip" v-if="!selectedComponent">
        请在画布中选中一个组件进行配置
      </div>
      <div class="config-form" v-else>
        <div class="form-item">
          <label>组件名称：</label>
          <input v-model="selectedComponent.name" type="text" />
        </div>
        <div
          class="form-item"
          v-if="
            ['text', 'paragraph', 'button'].includes(selectedComponent.type)
          "
        >
          <label>内容文本：</label>
          <textarea
            v-model="selectedComponent.content"
            :rows="selectedComponent.type === 'paragraph' ? 4 : 2"
          />
        </div>
        <div class="form-item" v-if="selectedComponent.type === 'image'">
          <label>图片地址：</label>
          <input
            v-model="selectedComponent.src"
            type="text"
            placeholder="输入图片URL"
          />
        </div>
        <div class="form-item">
          <label>宽 度：</label>
          <input v-model.number="selectedComponent.style.width" type="number" />
          px
        </div>
        <div class="form-item">
          <label>高 度：</label>
          <input
            v-model.number="selectedComponent.style.height"
            type="number"
          />
          px
        </div>
        <div class="form-item">
          <label>背景色：</label>
          <input
            v-model="selectedComponent.style.backgroundColor"
            type="color"
          />
        </div>
        <div class="form-item">
          <label>内 边 距：</label>
          <input
            v-model.number="selectedComponent.style.padding"
            type="number"
          />
          px
        </div>
        <div class="form-item btn-del">
          <button @click="handleDeleteComponent(selectedComponent.id)">
            删除当前组件
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import componentItem from './componentItem.vue';

// ================= 全局常量与数据 =================
// 左侧组件库数据源
const componentsList = ref([
  { type: 'text', name: '文本组件', icon: 'text' },
  { type: 'paragraph', name: '段落组件', icon: 'paragraph' },
  { type: 'button', name: '按钮组件', icon: 'button' },
  { type: 'image', name: '图片组件', icon: 'image' },
]);

// 画布核心数据 - 存储所有组件，支持嵌套children
const canvasData = ref([]);

// 当前选中的组件
const selectedComponent = ref(null);

// 拖拽时暂存的组件类型
const dragComponent = ref(null);

// ================= 核心方法 =================
// 1. 左侧组件拖拽开始
const handleDragStart = (component) => {
  dragComponent.value = component;
};

// 2. 画布区域放置组件
const handleDrop = () => {
  if (!dragComponent.value) return;
  // 创建新组件并生成唯一ID
  const newComponent = createNewComponent(dragComponent.value.type);
  // 追加到画布根节点
  canvasData.value.push(newComponent);
  dragComponent.value = null;
};

// 3. 创建新组件的公共方法 - 统一初始化组件结构
const createNewComponent = (type) => {
  const baseStyle = {
    width: type === 'text' ? 120 : type === 'button' ? 100 : 200,
    height: type === 'text' ? 40 : type === 'button' ? 40 : 150,
    top: 100,
    left: 100,
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 4,
    position: 'absolute',
    cursor: 'move',
    border: '1px solid #ddd',
  };
  // 不同组件的差异化初始化
  const componentMap = {
    text: { name: '文本组件', content: '我是文本内容', children: [] },
    paragraph: {
      name: '段落组件',
      content: '我是段落内容，支持多行文本展示，可配置样式和内容',
      children: [],
    },
    button: { name: '按钮组件', content: '点击按钮', children: [] },
    image: {
      name: '图片组件',
      src: 'https://picsum.photos/200/150',
      children: [],
    },
  };
  return {
    id: Date.now() + Math.floor(Math.random() * 1000), // 唯一ID
    type,
    ...componentMap[type],
    style: { ...baseStyle },
  };
};

// 4. 选中组件
const handleSelectComponent = (component) => {
  selectedComponent.value = component;
};

// 5. 更新组件属性
const handleUpdateComponent = (updatedComponent) => {
  const findAndUpdate = (list) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === updatedComponent.id) {
        list[i] = { ...list[i], ...updatedComponent };
        return true;
      }
      if (list[i].children && list[i].children.length) {
        if (findAndUpdate(list[i].children)) return true;
      }
    }
    return false;
  };
  findAndUpdate(canvasData.value);
};

// 6. 删除组件
const handleDeleteComponent = (id) => {
  const findAndDelete = (list) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list.splice(i, 1);
        if (selectedComponent.value?.id === id) selectedComponent.value = null;
        return true;
      }
      if (list[i].children && list[i].children.length) {
        if (findAndDelete(list[i].children)) return true;
      }
    }
    return false;
  };
  findAndDelete(canvasData.value);
};
</script>

<style scoped>
.editor-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
}

/* 左侧组件库样式 */
.components-panel {
  width: 200px;
  height: 100%;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}
.component-item {
  padding: 12px;
  margin: 8px 0;
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  cursor: grab;
  transition: all 0.2s;
}
.component-item:hover {
  background: #f0f7ff;
  border-color: #409eff;
}

/* 中间画布样式 */
.canvas-panel {
  flex: 1;
  height: 100%;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.canvas-container {
  width: 100%;
  height: calc(100% - 40px);
  background: #fff;
  border: 1px dashed #ccc;
  position: relative;
  overflow: auto;
}

/* 右侧配置面板样式 */
.config-panel {
  width: 320px;
  height: 100%;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}
.config-form {
  margin-top: 10px;
}
.form-item {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.form-item label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}
.form-item input,
.form-item textarea {
  padding: 8px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  outline: none;
}
.form-item input:focus,
.form-item textarea:focus {
  border-color: #409eff;
}
.btn-del button {
  width: 100%;
  padding: 10px;
  background: #f56c6c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.empty-tip {
  margin-top: 20px;
  text-align: center;
  color: #999;
  font-size: 14px;
}

h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #333;
}
</style>
