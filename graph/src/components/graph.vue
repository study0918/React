<template>
  <div id="main"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { GraphChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { links } from './links';
import { nodes } from './nodes';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  GraphChart,
  LabelLayout,
]);

export default {
  name: 'graph-echart',
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chartDom = document.getElementById('main');
      const myChart = echarts.init(chartDom);
      let option;

      option = {
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name;
          },
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            data: nodes,
            links: links,
            label: {
              show: true,
              position: 'inside',
              formatter: function (data) {
                return data.name.slice(0, 4);
              },
            },
            roam: true,
            itemStyle: {
              color: function (node) {
                return node.data.color;
              },
              emphasis: {
                borderWidth: 4,
                shadowBlur: 15,
                borderColor: '#fff',
              },
            },
            symbolSize: function (param) {
              if (param === 1) {
                return 100;
              } else if (param === 2) {
                return 80;
              } else {
                return 60;
              }
            },
            force: {
              repulsion: 2000,
            },
            lineStyle: {
              width: 1,
              color: '#a0ccfb',
            },
            emphasis: {
              focus: 'adjacency',
              lineStyle: {
                width: 10,
              },
            },
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
