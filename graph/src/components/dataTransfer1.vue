<template>
  <div>
    <el-button @click="transFer" type="primary">转换</el-button>
  </div>
</template>
<script setup>
import { oriList } from './dateList';
// import { ref, onMounted, nextTick } from 'vue';
const transFer = () => {
  const result = [];
  const yearData = {};

  // 遍历原始数据
  for (let i = 0; i < oriList.length; i++) {
    const group = oriList[i];
    // 合并两个分组
    const items = []
      .concat(group.second_Grp || [])
      .concat(group.third_Grp || []);

    for (let j = 0; j < items.length; j++) {
      const item = items[j];
      const code = item.AdjAmt_Tm_Itrv_Dsc;
      const year = code.substring(0, 4);
      const quarter = code[4];
      const xun = code.length > 5 ? code[5] : null;

      // 初始化年份结构
      if (!yearData[year]) {
        yearData[year] = {
          quarters: [],
          xuns: {},
        };
      }

      // 处理季度数据（02类型）
      if (item.Cyc_TpCd === '02') {
        let exists = false;
        for (let k = 0; k < yearData[year].quarters.length; k++) {
          if (yearData[year].quarters[k] === quarter) {
            exists = true;
            break;
          }
        }
        if (!exists) yearData[year].quarters.push(quarter);
      }

      // 处理旬数据（04类型且有第六位）
      if (item.Cyc_TpCd === '04' && xun) {
        if (!yearData[year].xuns[quarter]) {
          yearData[year].xuns[quarter] = [];
        }
        let exists = false;
        for (let k = 0; k < yearData[year].xuns[quarter].length; k++) {
          if (yearData[year].xuns[quarter][k] === xun) {
            exists = true;
            break;
          }
        }
        if (!exists) yearData[year].xuns[quarter].push(xun);
      }
    }
  }

  // 构建最终结构
  const years = Object.keys(yearData).sort();
  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    const data = yearData[year];
    const yearEntry = {
      year: year,
      quarterLists: [],
      tenday: [],
    };

    // 处理季度列表
    const sortedQuarters = data.quarters.sort();
    for (let j = 0; j < sortedQuarters.length; j++) {
      yearEntry.quarterLists.push({
        quarter: parseInt(sortedQuarters[j], 10),
      });
    }

    // 处理旬数据
    const quarters = Object.keys(data.xuns).sort();
    for (let j = 0; j < quarters.length; j++) {
      const q = quarters[j];
      const tendays = data.xuns[q].sort().map((t) => ({
        decadeNum: t,
        Core_Tp_Ind: '0',
        Cyc_TpCd: '04',
      }));
      yearEntry.tenday.push({
        quarter: parseInt(q, 10),
        tendays: tendays,
      });
    }

    result.push(yearEntry);
  }

  return result;
};
</script>
