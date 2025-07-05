<template>
  <el-select
    v-model="selectedValue"
    filterable
    remote
    :remote-method="handleSearch"
    placeholder="请选择"
    @visible-change="handleDropdownVisible"
    :loading="loading"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
    <!-- 底部加载提示 -->
    <div v-if="loadingMore" class="loading-more">加载中...</div>
    <div v-else-if="isFinished" class="loading-more">没有更多了</div>
  </el-select>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

// 选择的值
const selectedValue = ref('');
// 选项列表
const options = ref([]);
// 当前页码
const currentPage = ref(1);
// 每页条数
const pageSize = ref(20);
// 总数据量（可选）
const total = ref(0);
// 是否正在加载
const loading = ref(false);
// 是否正在加载更多
const loadingMore = ref(false);
// 是否加载完成
const isFinished = ref(false);
// 搜索关键词
const searchKeyword = ref('');
// 下拉框DOM引用
let dropdownElement = null;

// 初始化加载数据
const loadData = async (page = 1, keyword = '') => {
  try {
    loading.value = page === 1;
    loadingMore.value = page > 1;

    // 模拟API请求 - 替换为真实API
    const response = await mockApi(page, pageSize.value, keyword);

    if (page === 1) {
      options.value = response.data;
      total.value = response.total;
    } else {
      options.value = [...options.value, ...response.data];
    }

    // 检查是否还有更多数据
    isFinished.value = options.value.length >= total.value;
    currentPage.value = page;
  } catch (error) {
    console.error('加载数据失败:', error);
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};

// 处理下拉框显示/隐藏
const handleDropdownVisible = (visible) => {
  if (visible) {
    // 下拉框显示时添加滚动监听
    nextTick(() => {
      const dropdown = document.querySelector(
        '.el-select-dropdown .el-select-dropdown__wrap',
      );
      if (dropdown) {
        dropdownElement = dropdown;
        dropdown.addEventListener('scroll', handleScroll);
      }
    });
  } else if (dropdownElement) {
    // 下拉框隐藏时移除监听
    dropdownElement.removeEventListener('scroll', handleScroll);
    dropdownElement = null;
  }
};

// 滚动事件处理（带防抖）
let scrollTimer = null;
const handleScroll = (e) => {
  if (scrollTimer) clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    // 滚动到底部判断（留10px缓冲）
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (!loadingMore.value && !isFinished.value) {
        loadData(currentPage.value + 1, searchKeyword.value);
      }
    }
  }, 200);
};

// 搜索处理
const handleSearch = (keyword) => {
  searchKeyword.value = keyword;
  // 重置分页状态
  currentPage.value = 1;
  isFinished.value = false;
  loadData(1, keyword);
};

// 组件卸载时清理事件监听
onBeforeUnmount(() => {
  if (dropdownElement) {
    dropdownElement.removeEventListener('scroll', handleScroll);
  }
});

// 初始加载数据
onMounted(() => {
  loadData();
});

// 模拟API请求函数
const mockApi = (page, pageSize, keyword) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟数据生成
      const data = Array.from({ length: pageSize }, (_, i) => {
        const id = (page - 1) * pageSize + i + 1;
        return {
          value: id,
          label: `${keyword ? keyword + ' ' : ''}选项 ${id}`,
        };
      });

      // 模拟总数（实际项目从API获取）
      const total = 100;

      resolve({
        data,
        total,
      });
    }, 800);
  });
};
</script>

<style scoped>
.loading-more {
  padding: 8px 0;
  text-align: center;
  color: #999;
  font-size: 12px;
  border-top: 1px solid #eee;
}
</style>
