<template>
  <div>
    <el-button @click="transFer" type="primary">转换</el-button>
  </div>
</template>
<script setup>
import { oriList } from './dateList';
// import { ref, onMounted, nextTick } from 'vue';
const transFer = () => {
  const yearMap = {};

  // 遍历所有条目，收集年、季、旬的信息
  oriList.forEach((group) => {
    ['second_Grp', 'third_Grp'].forEach((grpKey) => {
      if (group[grpKey]) {
        group[grpKey].forEach((item) => {
          const dsc = item.AdjAmt_Tm_Itrv_Dsc;
          const year = dsc.slice(0, 4);
          const quarter = dsc.charAt(4);
          const tenday = dsc.length >= 6 ? dsc.charAt(5) : null;

          // 仅处理包含旬的条目（长度>=6）
          if (tenday) {
            if (!yearMap[year]) yearMap[year] = {};
            if (!yearMap[year][quarter]) yearMap[year][quarter] = {};

            // 记录旬信息
            yearMap[year][quarter][tenday] = {
              Core_Tp_Ind: item.Core_Tp_Ind.toString(), // 转换为字符串以匹配示例
              Cyc_TpCd: item.Cyc_TpCd,
            };
          }
        });
      }
    });
  });

  // 构建 transDateList
  const transDateList = [];
  const years = Object.keys(yearMap).sort();

  for (const year of years) {
    const yearEntry = {
      year: year,
      quarterLists: [],
    };

    const quarters = Object.keys(yearMap[year]).sort();
    for (const quarter of quarters) {
      const quarterEntry = {
        quarter: parseInt(quarter),
        tendays: [],
      };

      // 生成1-9旬，填充存在的条目
      for (let i = 1; i <= 9; i++) {
        const tenday = i.toString();
        const data = yearMap[year][quarter][tenday];
        quarterEntry.tendays.push({
          decadeNum: tenday,
          Core_Tp_Ind: data ? data.Core_Tp_Ind : '0', // 存在则取原值，否则默认0
          Cyc_TpCd: data ? data.Cyc_TpCd : '04', // 存在则取原值，否则默认04
        });
      }

      yearEntry.quarterLists.push(quarterEntry);
    }

    transDateList.push(yearEntry);
  }
  console.log('transDateList', transDateList);
  return transDateList;
};
</script>
