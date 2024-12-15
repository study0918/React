<template>
  <div class="p-16px">
    <el-card class="bg-white overflow-hidden mb-16px" style="width: 100%">
      <div>
        <SearchForm @search="search" :initKv="initKv" />
      </div>
    </el-card>
    <div
      class="h-900px w-full bg-white overflow-hidden p-15px pb-0"
      v-if="requestFinish"
    >
      <Chart
        class="h-full w-full bg-white"
        :option="chartOption"
        ref="graphRef"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import * as AnaApi from '@/api/statisticalAnalysis';
import SearchForm from './SearchForm.vue';

const requestFinish = ref(false);
const graphRef = ref(null);

function buildPaths(relationships) {
  const nodes = new Map();

  // Create a map of nodes with children
  relationships.forEach(({ source, target }) => {
    if (!nodes.has(source)) {
      nodes.set(source, { name: source, children: [] });
    }
    if (!nodes.has(target)) {
      nodes.set(target, { name: target, children: [] });
    }

    // Find the source and target nodes
    const sourceNode = nodes.get(source);
    const targetNode = nodes.get(target);

    // Add target node as a child of source node
    sourceNode.children.push(targetNode);
  });

  // Function to find the root nodes
  const findRoots = () => {
    const allChildren = new Set();
    nodes.forEach((node) => {
      node.children.forEach((child) => allChildren.add(child.name));
    });

    return [...nodes.keys()]
      .filter((name) => !allChildren.has(name))
      .map((name) => nodes.get(name));
  };

  // Function to find all paths from the root to leaf nodes
  const findPaths = (node, path, paths) => {
    path.push(node.name);
    if (node.children.length === 0) {
      paths.push([...path]);
    } else {
      node.children.forEach((child) => findPaths(child, path, paths));
    }
    path.pop();
  };

  const roots = findRoots();
  const paths = [];

  roots.forEach((root) => findPaths(root, [], paths));

  return paths;
}

function drawCloud({ series, links, categories, title, showText }) {
  series.forEach((ele, index) => {
    ele.symbolSize = ele.symbolSize * 2;
    ele.label = {
      show: showText ? true : ele.category < 3,
    };
    // 1. 确定每个节点有多少个分支---------确定有多少条分支
    // 2. 设置series的每一项 itemStyle.opacity=1-------------默认节点全部高亮
    // 3. 设置links的每一项 lineStyle.opacity=0.5 --------------默认线也高亮
    ele.itemStyle = {
      opacity: 1,
    };
    ele.sourceCount = 0;
    links.forEach((item) => {
      if (item.source == ele.id) {
        ele.sourceCount++;
      }
      item.lineStyle = {
        opacity: '0.5',
      };
    });
  });

  // 4.创建一个多维数组，接收根据links 获取到从根节点到叶子节点的所有链路的集合
  let manyItemArray = [];

  const otherLink = JSON.parse(JSON.stringify(links));

  manyItemArray = buildPaths(otherLink);

  // 5. 循环遍历链路集合的多维数组的同事遍历series，series中的某一项数据匹配到第几条链路，就往这一项中line中添加上该链路的index+1
  for (let index = 0; index < manyItemArray.length; index++) {
    const element = manyItemArray[index];
    for (const item of series) {
      if (element.includes(item['id'])) {
        if (item['line']) {
          item['line'].push(index + 1);
        } else {
          item.line = [index + 1];
        }
      }
    }
  }

  let option = {
    color: [
      '#63a3ff',
      '#3396c1',
      '#96bd5c',
      '#9C27B0',
      '#dc8640',
      '#ff592d',
      '#63a3ff',
      '#3396c1',
    ],
    backgroundColor: '#FFFFFF',
    grid: {
      top: '60%', // 设置grid组件的距离容器顶部的距离
      left: '3%', // 设置grid组件的距离容器左边的距离
      right: '4%', // 设置grid组件的距离容器右边的距离
      bottom: '0', // 设置grid组件的距离容器底部的距离
    },
    title: {
      text: '知识图谱',
      x: 'center',
      y: '3%',
      top: 20,
      textStyle: {
        // color: config.titleColor,
        fontSize: 14,
      },
    },
    shape: 'circle',
    tooltip: {
      formatter: function (x) {
        if (x.data && x.data.category && x.data.chance != undefined) {
          return (
            categories[x.data.category].name +
            '：' +
            '<br/>' +
            x.data.name +
            '<br/>' +
            '概率：' +
            x.data.chance +
            '%'
          ); //设置提示框的内容和格式 节点和边都显示name属性
        } else if (x.data && x.data.category && x.data.name) {
          return (
            categories[x.data.category].name + '：' + '<br/>' + x.data.name
          );
        }
      },
    },
    legend: [
      {
        top: '0%',
        // show: false,
        // selectedMode: 'single',
        data: categories.map(function (a) {
          return a.name;
        }),
      },
    ],

    animationDuration: 0,
    animationEasingUpdate: 'quinticInOut',
    calculable: true,
    series: [
      {
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 1000, // 斥力大小，可以根据需要调整
          edgeLength: [50, 200], // 边的长度范围，可以根据需要调整
        },
        //具体数据
        data: series,
        edges: links,
        nodeScaleRatio: 0.6,
        categories: categories,
        roam: true,
        edgeSymbol: ['circle'],
        symbolKeepAspect: false,
        label: {
          position: 'right',
          formatter: '{b}',
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3,
        },
        emphasis: {
          itemStyle: {
            borderWidth: 3,
          },
          label: {
            show: true,
          },
          lineStyle: {
            width: 3,
          },
        },
      },
    ],
  };
  return option;
}

let chartOption = ref<any>({});
const getChartData = async (params) => {
  requestFinish.value = false;
  const res = await AnaApi.getKnowledgeGraphData({
    ...params,
  });
  requestFinish.value = true;
  chartOption.value = drawCloud({
    series: res.nodes,
    links: res.links,
    categories: res.categories,
    title: '知识图谱',
    showText: params.position ? true : false,
  });
  nextTick(() => {
    onChartInit(chartOption.value);
  });
};

const onChartInit = (res: any) => {
  //   6. 监听鼠标悬浮上节点的事件---------
  // 1、首先讲所有节点和连接线 变为透明
  // 设置series的每一项 itemStyle.opacity=0.1
  // 设置links的每一项 lineStyle.opacity=0.1
  // 2、如果当前节点的line 的长度是1 ，说明 当前节点只在一条链路中存在，循环遍历series，找到所有line中含有当前节点line的节点并点亮，点亮节点的同时找到links中target是当前点亮的节点的线，并点亮线。如果当前节点的line有多个，说明当前节点在多个链路中存在，循环遍历当前节点的line，循环遍历series，找到所有line中含有当前节点line的节点并点亮，点亮节点的同时找到links中target是当前点亮的节点的线，并点亮线。
  graphRef.value.myChart.on('mouseover', (params) => {
    const newOption = JSON.parse(JSON.stringify(res));

    let links = newOption.series[0].edges;

    let optionData = newOption.series[0].data;

    if (params.dataType === 'node') {
      optionData.forEach((node) => {
        node.itemStyle.opacity = 0.1;
      });

      links.forEach((item) => {
        item.lineStyle.opacity = 0.1;
      });

      if (params.data.line.length == 1) {
        optionData.forEach((node) => {
          if (
            node &&
            node['line'] &&
            node['line'].includes(params.data['line'][0])
          ) {
            node.itemStyle.opacity = 1;
            links.forEach((item2) => {
              if (item2.target === node.id) {
                item2.lineStyle.opacity = 0.5;
              }
            });
          }
        });
      } else {
        params.data.line.forEach((item) => {
          optionData.forEach((node) => {
            if (node && node['line'] && node['line'].includes(item)) {
              node.itemStyle.opacity = 1;
              links.forEach((item3) => {
                if (item3.target === node.id) {
                  item3.lineStyle.opacity = 0.5;
                }
              });
            }
          });
        });
      }
    }
    newOption.series[0].edges = links;
    console.log('newOption', newOption);

    graphRef.value.myChart.setOption(newOption);
    // chartOption.value = newOption;
  });

  //   7. 监听鼠标移出事件，恢复默认设置
  // 讲所有节点和连接线 变为高亮
  // 设置series的每一项 itemStyle.opacity=1
  // 设置links的每一项 lineStyle.opacity=0.5
  graphRef.value.myChart.on('mouseout', (params) => {
    const newOption = JSON.parse(JSON.stringify(res));
    let optionData = newOption.series[0].data;
    let links = newOption.series[0].edges;
    optionData.forEach((node) => {
      node.itemStyle.opacity = 1;
    });
    links.forEach((item) => {
      item.lineStyle.opacity = 0.5;
    });
    graphRef.value.myChart.setOption(newOption);
    // chartOption.value = newOption;
  });
};
const initKv = ref([]) as any;

const search = async (searchParams?: any) => {
  if (searchParams && searchParams.process && searchParams.equipmentType) {
    getChartData({
      process: searchParams.process,
      firstLevelComponent: searchParams.firstLevelPosition,
      secondLevelComponent: searchParams.secondLevelPosition,
      position: searchParams.childProcess,
      equipType: searchParams.equipmentType,
    });
  }
};

const InitForm = async () => {
  // try {
  // 获取所有kv的process、equipment、childProcess、firstLevelPosition
  const allKv = await AnaApi.getAllLevelKv();
  initKv.value = allKv;
};

onMounted(async () => {
  InitForm();
});
</script>

<style lang="less" scoped>
:deep(.el-card__body) {
  padding: 15px 20px 0px 20px !important;
}
</style>
