<template>
  <div id="container" style="height: 600px"></div>
</template>
<script setup>
import { onMounted } from 'vue';
import { Graph } from '@antv/x6';
import Hierarchy from '@antv/hierarchy';
import '@antv/x6-vue-shape';
onMounted(() => {
  init();
});

const init = () => {
  // 中心主题或者分支主题
  Graph.registerNode(
    'topic',
    {
      inherit: 'rect',
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'image',
          selector: 'img',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          rx: 6,
          ry: 6,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
          strokeWidth: 1,
        },
        img: {
          ref: 'body',
          refX: '100%',
          refY: '50%',
          refY2: -8,
          width: 16,
          height: 16,
          'xlink:href':
            'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SYCuQ6HHs5cAAAAAAAAAAAAAARQnAQ',
          event: 'add:topic',
          class: 'topic-image',
        },
        label: {
          fontSize: 14,
          fill: '#262626',
        },
      },
    },
    true,
  );

  Graph.registerNode(
    'topic-child',
    {
      inherit: 'rect',
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
        {
          tagName: 'path',
          selector: 'line',
        },
      ],
      attrs: {
        body: {
          fill: '#ffffff',
          strokeWidth: 0,
          stroke: '#5F95FF',
        },
        label: {
          fontSize: 14,
          fill: '#262626',
          textVerticalAnchor: 'bottom',
        },
        line: {
          stroke: '#5F95FF',
          strokeWidth: 2,
          d: 'M 0 15 L 60 15',
        },
      },
    },
    true,
  ); // 连接器
  Graph.registerConnector(
    'mindmap',
    (sourcePoint, targetPoint) => {
      const midX = sourcePoint.x + 10;
      const midY = sourcePoint.y;
      const ctrX = (targetPoint.x - midX) / 5 + midX;
      const ctrY = targetPoint.y;
      const pathData = `
     M ${sourcePoint.x} ${sourcePoint.y}
     L ${midX} ${midY}
     Q ${ctrX} ${ctrY} ${targetPoint.x} ${targetPoint.y}
    `;
      return pathData;
    },
    true,
  );
  Graph.registerEdge(
    'mindmap-edge',
    {
      inherit: 'edge',
      connector: {
        name: 'mindmap',
      },
      attrs: {
        line: {
          targetMarker: '',
          stroke: '#A2B1C3',
          strokeWidth: 2,
        },
      },
      zIndex: 0,
    },
    true,
  );
  const data = {
    id: '1',
    type: 'topic',
    label: '添加',
    width: 160,
    height: 50,
    children: [
      {
        id: '1-1',
        type: 'topic-branch',
        label: '条件',
        width: 100,
        height: 40,
        children: [
          {
            id: '1-1-1',
            type: 'topic-child',
            label: '条件描述1',
            width: 550,
            height: 40,
          },
          {
            id: '1-1-2',
            type: 'topic-child',
            label: '条件描述2',
            width: 550,
            height: 40,
          },
        ],
      },
      {
        id: '1-2',
        type: 'topic-branch',
        label: '条件2',
        width: 100,
        height: 40,
      },
    ],
  };
  const graph = new Graph({
    container: document.getElementById('container'),
    connecting: {
      connectionPoint: 'anchor',
    },
    selecting: {
      enabled: true,
    },
    keyboard: {
      enabled: true,
    },
  });
  const render = () => {
    const result = Hierarchy.mindmap(data, {
      direction: 'H',
      getHeight(d) {
        return d.height;
      },
      getWidth(d) {
        return d.width;
      },
      getHGap() {
        return 40;
      },
      getVGap() {
        return 20;
      },
      getSide: () => {
        return 'right';
      },
    });
    const cells = [];
    const traverse = (hierarchyItem) => {
      if (hierarchyItem) {
        const { data, children } = hierarchyItem;
        cells.push(
          graph.createNode({
            id: data.id,
            shape: data.type === 'topic-child' ? 'vue-shape' : 'topic', //这里我做了改造，让子节点使用我的组件
            x: hierarchyItem.x,
            y: hierarchyItem.y,
            width: data.width,
            height: data.height,
            label: data.label,
            type: data.type,
            // component: 'condition',
          }),
        );
        if (children) {
          children.forEach((item) => {
            const { id, data } = item;
            cells.push(
              graph.createEdge({
                shape: 'mindmap-edge',
                source: {
                  cell: hierarchyItem.id,
                  anchor:
                    data.type === 'topic-child'
                      ? {
                          name: 'right',
                          args: {
                            dx: -16,
                          },
                        }
                      : {
                          name: 'center',
                          args: {
                            dx: '25%',
                          },
                        },
                },
                target: {
                  cell: id,
                  anchor: {
                    name: 'left',
                  },
                },
              }),
            );
            traverse(item);
          });
        }
      }
    };
    traverse(result);
    graph.resetCells(cells);
    graph.centerContent();
  };
  render();
};
</script>
