<template>
  <div id="main"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'bar-echart',
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chartDom = document.getElementById('main');
      const myChart = echarts.init(chartDom);
      let option;
      const rawData = [
        [100, 302, 301, 334, 390, 330, 320],
        [320, 132, 101, 134, 90, 230, 210],
        [220, 182, 191, 234, 290, 330, 310],
        [150, 212, 201, 154, 190, 330, 410],
        [820, 832, 901, 934, 1290, 1330, 1320],
      ];
      const totalData = [];
      for (let i = 0; i < rawData[0].length; ++i) {
        let sum = 0;
        for (let j = 0; j < rawData.length; ++j) {
          sum += rawData[j][i];
        }
        totalData.push(sum);
      }
      console.log('totalData', totalData);
      const series = [
        'Direct',
        'Mail Ad',
        'Affiliate Ad',
        'Video Ad',
        'Search Engine',
      ].map((name, sid) => {
        return {
          name,
          type: 'bar',
          stack: 'total',
          barWidth: '60%',
          label: {
            show: true,
            formatter: (params) => {
              console.log('params', params, totalData[sid]);
              return ((params.value / totalData[sid]) * 100).toFixed(2) + '%';
            },
          },
          data: rawData[sid].map((d, did) => {
            console.log('d', d);
            return totalData[did] <= 0 ? 0 : d;
          }),
        };
      });
      option = {
        legend: {
          selectedMode: false,
        },
        grid: {
          left: 100,
          right: 100,
          top: 50,
          bottom: 50,
        },
        yAxis: {
          type: 'value',
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        series,
      };
      option && myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
#main {
  width: 100vw;
  height: 100vh;
}
</style>
