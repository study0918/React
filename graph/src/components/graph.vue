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
                // return data.name.slice(0, 4);
                return data.name;
              },
            },
            roam: true,
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
              itemStyle: {
                color: function (node) {
                  return node.data.color;
                },
                borderWidth: 4,
                shadowBlur: 15,
                borderColor: '#fff',
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);

      // 所有高亮的节点
      let currentDataIndex = [];
      myChart.on('click', function (params) {
        console.log('params', params);
        let data = myChart.getModel().getSeriesByIndex(0).getData();
        console.log('data', data);
        // 当前被点击的node也需要高亮
        // 需要判断是否被重复点击
        if (!currentDataIndex.includes(params.dataIndex)) {
          currentDataIndex.push(params.dataIndex);
        }
        // 根据当前点击的节点找到target
        links.forEach((link) => {
          if (link.source === params.name) {
            nodes.forEach((node, idx) => {
              if (node.name === link.target) {
                // 判断是否已经被添加了
                if (!currentDataIndex.includes(idx)) {
                  currentDataIndex.push(idx);
                }
              }
            });
          }
        });
        // 高亮相关节点连线
        myChart.dispatchAction({
          type: 'highlight',
          dataIndex: currentDataIndex,
        });
        console.log('currentDataIndex', currentDataIndex);
      });
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
