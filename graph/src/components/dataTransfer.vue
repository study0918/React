<template>
  <div>
    <el-button @click="transFer" type="primary">转换</el-button>
  </div>
</template>
<script setup>
import { oriList } from './dateList.js';
// import { ref, onMounted, nextTick } from 'vue';
const transFer = () => {
  const transDateList = [];
  for (const item of oriList) {
    // 处理 second_Grp 和 third_Grp
    for (const key in item) {
      const grpList = item[key];
      for (const entry of grpList) {
        const adjAmtDesc = entry.AdjAmt_Tm_Itrv_Dsc;
        const cycTpCd = entry.Cyc_TpCd;
        const coreTpInd = entry.Core_Tp_Ind;

        // 提取年份、季度和旬
        const year = adjAmtDesc.substring(0, 4);
        const quarter = adjAmtDesc.length > 4 ? adjAmtDesc.charAt(4) : null;
        const tendays = adjAmtDesc.length > 5 ? adjAmtDesc.charAt(5) : null;

        // 如果是旬数据（Cyc_TpCd 为 '04'），则不需要处理
        if (cycTpCd === '04') {
          continue;
        }

        // 检查年份是否已存在
        let yearEntry = null;
        for (let i = 0; i < transDateList.length; i++) {
          if (transDateList[i].year === year) {
            yearEntry = transDateList[i];
            break;
          }
        }
        if (!yearEntry) {
          yearEntry = { year, quarterLists: [] };
          transDateList.push(yearEntry);
        }

        // 检查季度是否已存在
        let quarterEntry = null;
        for (let i = 0; i < yearEntry.quarterLists.length; i++) {
          if (yearEntry.quarterLists[i].quarter === quarter) {
            quarterEntry = yearEntry.quarterLists[i];
            break;
          }
        }
        if (!quarterEntry) {
          quarterEntry = { quarter, tendays: [] };
          yearEntry.quarterLists.push(quarterEntry);
        }

        // 添加旬数据
        const decadeNum = tendays;
        const decadeEntry = {
          decadeNum,
          Core_Tp_Ind: coreTpInd.toString(),
          Cyc_TpCd: cycTpCd,
        };
        quarterEntry.tendays.push(decadeEntry);
      }
    }
  }
  console.log('transDateList', transDateList);
  return transDateList;
};
</script>
