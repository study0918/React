<template>
  <div>
    <el-select v-model="data" multiple popper-class="select-popover-class">
      <el-checkbox
        :value="selectAll"
        :indeterminate="indeterminate"
        @change="selectAllHandle"
      >
        全选
      </el-checkbox>
      <el-option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      >
        <el-checkbox
          :value="data.includes(item.value)"
          :label="item.label"
        ></el-checkbox>
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      options: [
        {
          label: '选项1',
          value: 1,
        },
        {
          label: '选项2',
          value: 2,
        },
        {
          label: '选项3',
          value: 3,
        },
      ],
    };
  },
  computed: {
    selectAll() {
      if (this.data.length) {
        return this.data.length === this.options.length;
      }
      return false;
    },
    indeterminate() {
      if (this.data.length) {
        return this.data.length !== this.options.length;
      }
      return false;
    },
  },
  methods: {
    selectAllHandle(bool) {
      this.data = bool ? this.options.map((v) => v.value) : [];
    },
  },
};
</script>
