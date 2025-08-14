<template>
  <div>
    <!-- 添加打开弹框的按钮 -->
    <el-button type="primary" @click="dialogVisible = true">打开弹框</el-button>

    <!-- 主页面上的滚动选择器 -->
    <el-select
      v-model="selectedValue"
      filterable
      remote
      :remote-method="handleSearch"
      placeholder="请选择"
      @visible-change="handleDropdownVisible"
      :loading="loading"
      style="margin-top: 20px; width: 100%"
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

    <!-- 弹框 -->
    <el-dialog v-model="dialogVisible" title="表单弹框" width="600px">
      <el-form :model="form" label-width="100px">
        <!-- 表单中的滚动选择器 -->
        <el-form-item label="选项选择">
          <el-select
            v-model="form.selectedValue"
            filterable
            remote
            :remote-method="dialogHandleSearch"
            placeholder="请选择"
            @visible-change="dialogHandleDropdownVisible"
            :loading="dialogLoading"
            style="width: 100%"
          >
            <el-option
              v-for="item in dialogOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
            <!-- 底部加载提示 -->
            <div v-if="dialogLoadingMore" class="loading-more">加载中...</div>
            <div v-else-if="dialogIsFinished" class="loading-more">
              没有更多了
            </div>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

// 主选择器状态
const selectedValue = ref('');
const options = ref([]);
const currentPage = ref(1);
const pageSize = ref(20);
const total = ref(0);
const loading = ref(false);
const loadingMore = ref(false);
const isFinished = ref(false);
const searchKeyword = ref('');
let dropdownElement = null;

// 弹框相关状态
const dialogVisible = ref(false);
const form = ref({
  selectedValue: '',
});

// 弹框中的选择器状态
const dialogOptions = ref([]);
const dialogCurrentPage = ref(1);
const dialogPageSize = ref(20);
const dialogTotal = ref(0);
const dialogLoading = ref(false);
const dialogLoadingMore = ref(false);
const dialogIsFinished = ref(false);
const dialogSearchKeyword = ref('');
let dialogDropdownElement = null;

// 主选择器加载数据
const loadData = async (page = 1, keyword = '') => {
  try {
    loading.value = page === 1;
    loadingMore.value = page > 1;

    const response = await mockApi(page, pageSize.value, keyword);

    if (page === 1) {
      options.value = response.data;
      total.value = response.total;
    } else {
      options.value = [...options.value, ...response.data];
    }

    isFinished.value = options.value.length >= total.value;
    currentPage.value = page;
  } catch (error) {
    console.error('加载数据失败:', error);
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};

// 弹框选择器加载数据
const dialogLoadData = async (page = 1, keyword = '') => {
  try {
    dialogLoading.value = page === 1;
    dialogLoadingMore.value = page > 1;

    const response = await mockApi(page, dialogPageSize.value, keyword, true);

    if (page === 1) {
      dialogOptions.value = response.data;
      dialogTotal.value = response.total;
    } else {
      dialogOptions.value = [...dialogOptions.value, ...response.data];
    }

    dialogIsFinished.value = dialogOptions.value.length >= dialogTotal.value;
    dialogCurrentPage.value = page;
  } catch (error) {
    console.error('弹框加载数据失败:', error);
  } finally {
    dialogLoading.value = false;
    dialogLoadingMore.value = false;
  }
};

// 主选择器下拉框显示/隐藏处理
const handleDropdownVisible = (visible) => {
  if (visible) {
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
    dropdownElement.removeEventListener('scroll', handleScroll);
    dropdownElement = null;
  }
};

// 弹框选择器下拉框显示/隐藏处理
const dialogHandleDropdownVisible = (visible) => {
  if (visible) {
    nextTick(() => {
      // 在弹框内查找选择器下拉框
      const dropdown = document.querySelector(
        '.el-dialog .el-select-dropdown .el-select-dropdown__wrap',
      );
      if (dropdown) {
        dialogDropdownElement = dropdown;
        dropdown.addEventListener('scroll', dialogHandleScroll);
      }
    });
  } else if (dialogDropdownElement) {
    dialogDropdownElement.removeEventListener('scroll', dialogHandleScroll);
    dialogDropdownElement = null;
  }
};

// 主选择器滚动处理
let scrollTimer = null;
const handleScroll = (e) => {
  if (scrollTimer) clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (!loadingMore.value && !isFinished.value) {
        loadData(currentPage.value + 1, searchKeyword.value);
      }
    }
  }, 200);
};

// 弹框选择器滚动处理
let dialogScrollTimer = null;
const dialogHandleScroll = (e) => {
  if (dialogScrollTimer) clearTimeout(dialogScrollTimer);
  dialogScrollTimer = setTimeout(() => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (!dialogLoadingMore.value && !dialogIsFinished.value) {
        dialogLoadData(dialogCurrentPage.value + 1, dialogSearchKeyword.value);
      }
    }
  }, 200);
};

// 主选择器搜索处理
const handleSearch = (keyword) => {
  searchKeyword.value = keyword;
  currentPage.value = 1;
  isFinished.value = false;
  loadData(1, keyword);
};

// 弹框选择器搜索处理
const dialogHandleSearch = (keyword) => {
  dialogSearchKeyword.value = keyword;
  dialogCurrentPage.value = 1;
  dialogIsFinished.value = false;
  dialogLoadData(1, keyword);
};

// 表单提交处理
const submitForm = () => {
  console.log('表单提交:', form.value);
  dialogVisible.value = false;
};

// 组件卸载时清理事件监听
onBeforeUnmount(() => {
  if (dropdownElement) {
    dropdownElement.removeEventListener('scroll', handleScroll);
  }
  if (dialogDropdownElement) {
    dialogDropdownElement.removeEventListener('scroll', dialogHandleScroll);
  }
});

// 初始加载数据
onMounted(() => {
  loadData();
});

// 模拟API请求函数
// 添加dialog参数区分主选择器和弹框选择器
const mockApi = (page, size, keyword = '', isDialog = false) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const prefix = isDialog ? '弹框-' : '';
      const data = Array.from({ length: size }, (_, i) => {
        const id = (page - 1) * size + i + 1;
        return {
          value: id,
          label: `${keyword ? keyword + ' ' : ''}${prefix}选项 ${id}`,
        };
      });

      // 模拟总数
      const total = isDialog ? 80 : 100;

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

/* 为弹框添加顶部间距 */
.el-dialog {
  margin-top: 5vh !important;
}
</style>
