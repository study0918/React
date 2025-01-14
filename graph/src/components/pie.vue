<template>
  <div id="main"></div>
</template>

<script>
import * as echarts from 'echarts';
let colorList = [
  '#07d8a8',
  '#05aad3',
  '#0011da',
  '#1e30ff',
  '#6571fc',
  '#fda436',
  '#fed816',
];
export default {
  name: 'pie-echart',
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chartDom = document.getElementById('main');
      const myChart = echarts.init(chartDom);
      let option;

      option = {
        title: {
          text: 'pieChart',
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: 20,
          },
        },
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['24%', '45%'],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 15,
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              show: true,
              position: 'outside',
              formatter: '{a|{b}：{d}%}\n{hr|}',
              rich: {
                hr: {
                  backgroundColor: 't',
                  borderRadius: 3,
                  width: 3,
                  height: 3,
                  padding: [3, 3, 0, -12],
                },
                a: {
                  padding: [-30, 15, -20, 15],
                },
              },
            },
            labelLine: {
              normal: {
                length: 20,
                length2: 30,
                lineStyle: {
                  width: 1,
                },
              },
            },
            data: [
              {
                name: '一月',
                value: 1.45,
              },
              {
                name: '二月',
                value: 2.93,
              },
              {
                name: '三月',
                value: 3.15,
              },
              {
                name: '四月',
                value: 4.78,
              },
              {
                name: '五月',
                value: 5.93,
              },
              {
                name: '六月',
                value: 5.73,
              },
            ],
          },
        ],
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
