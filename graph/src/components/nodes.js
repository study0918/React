let nodes = [{
    Lvl3_Node_Grp: [{
        Cfg_Itm_Num: "二级节点1-1",
        Lvl3_Node_Grp: [{
          Node_ID: "ABI2024120600012016",
          Cfg_Itm_Num: "三级节点1-1-1"
        }, {
          Node_ID: "ABI2024120600012017",
          Cfg_Itm_Num: "三级节点1-1-2"
        }, {
          Node_ID: "ABI2024120600012018",
          Cfg_Itm_Num: "三级节点1-1-3"
        }],
        Node_ID: "ABI2024120600012015"
      },
      {
        Cfg_Itm_Num: "二级节点1-2",
        Lvl3_Node_Grp: [{
          Node_ID: "ABI2024120600012020",
          Cfg_Itm_Num: "三级节点1-2-1"
        }, {
          Node_ID: "ABI2024120600012021",
          Cfg_Itm_Num: "三级节点1-2-2"
        }, {
          Node_ID: "ABI2024120600012022",
          Cfg_Itm_Num: "三级节点1-2-3"
        }],
        Node_ID: "ABI2024120600012019"
      },
      {
        Cfg_Itm_Num: "二级节点1-3",
        Lvl3_Node_Grp: [{
          Node_ID: "ABI2024120600012024",
          Cfg_Itm_Num: "三级节点1-3-1"
        }, {
          Node_ID: "ABI2024120600012025",
          Cfg_Itm_Num: "三级节点1-3-2"
        }, {
          Node_ID: "ABI2024120600012026",
          Cfg_Itm_Num: "三级节点1-3-3"
        }],
        Node_ID: "ABI2024120600012023"
      }
    ],
    Node_ID: "ABI2024120600012014",
    category: 0,
    color: "#5d66eb",
    label: {
      textStyle: {
        color: '#fff',
        fontSize: "16px"
      }
    },
    name: '20241202-15:39',
    value: 1,
    x: 100,
    y: 650
  },

  {
    Lvl3_Node_Grp: [{
        Node_ID: "ABI2024120600012016",
        Cfg_Itm_Num: "三级节点1-1-1"
      }, {
        Node_ID: "ABI2024120600012017",
        Cfg_Itm_Num: "三级节点1-1-2"
      }, {
        Node_ID: "ABI2024120600012018",
        Cfg_Itm_Num: "三级节点1-1-3"
      }

    ],
    Node_ID: "ABI2024120600012015",
    category: 1,
    color: "#8cdafa",
    label: {
      textStyle: {
        color: "#494747",
        fontSize: "14px"
      }
    },
    name: "二级节点1-1",
    value: 2,
    x: 100,
    y: 150
  },

  {
    Node_ID: "ABI2024120600012016",
    category: 2,
    color: "#5470c6",
    label: {
      textStyle: {
        color: "#494747",
        fontSize: "12px"
      }
    },
    name: "三级节点1-1-1",
    parent: {
      Cfg_Itm_Num: "二级节点1-1",
      Lvl3_Node_Grp: [{
        Node_ID: "ABI2024120600012016",
        Cfg_Itm_Num: "三级节点1-1-1"
      }, {
        Node_ID: "ABI2024120600012017",
        Cfg_Itm_Num: "三级节点1-1-2"
      }, {
        Node_ID: "ABI2024120600012018",
        Cfg_Itm_Num: "三级节点1-1-3"
      }],
      Node_ID: "ABI2024120600012015"
    },
    value: 3,
    x: 100,
    y: 0
  },

  {
    Node_ID: "ABI2024120600012017",
    category: 2,
    color: "#5470c6",
    label: {
      textStyle: {
        color: "#494747",
        fontSize: "12px"
      }
    },
    name: "三级节点1-1-2",
    parent: {
      Cfg_Itm_Num: "二级节点1-1",
      Lvl3_Node_Grp: [{
        Node_ID: "ABI2024120600012016",
        Cfg_Itm_Num: "三级节点1-1-1"
      }, {
        Node_ID: "ABI2024120600012017",
        Cfg_Itm_Num: "三级节点1-1-2"
      }, {
        Node_ID: "ABI2024120600012018",
        Cfg_Itm_Num: "三级节点1-1-3"
      }],
      Node_ID: "ABI2024120600012015"
    },
    value: 3,
    x: 180,
    y: 80
  },

  {
    Node_ID: "ABI2024120600012018",
    category: 2,
    color: '#5470c6',
    label: {
      textStyle: {
        color: "#494747",
        fontSize: '12px'
      }
    },
    name: "三级节点1-1-3",
    parent: {
      Cfg_Itm_Num: "二级节点1-1",
      Lvl3_Node_Grp: [{
        Node_ID: "ABI2024120600012016",
        Cfg_Itm_Num: "三级节点1-1-1"
      }, {
        Node_ID: "ABI2024120600012017",
        Cfg_Itm_Num: "三级节点1-1-2"
      }, {
        Node_ID: "ABI2024120600012018",
        Cfg_Itm_Num: "三级节点1-1-3"
      }],
      Node_ID: "ABI2024120600012015"
    },
    value: 3,
    x: 260,
    y: 160
  },

  {
    Lvl3_Node_Grp: [{
      Node_ID: "ABI2024120600012020",
      Cfg_Itm_Num: "三级节点1-2-1"
    }, {
      Node_ID: "ABI2024120600012021",
      Cfg_Itm_Num: "三级节点1-2-2"
    }, {
      Node_ID: "ABI2024120600012022",
      Cfg_Itm_Num: "三级节点1-2-3"
    }],
    Node_ID: "ABI2024120600012019",
    category: 1,
    color: "#8cdafa",
    label: {
      textStyle: {
        color: "#494747",
        fontSize: "14px"
      }
    },
    name: "二级节点1-2",
    value: 2,
    x: 325,
    y: 400
  },

  {
    Node_ID: "ABI2024120600012020",
    category: 2,
    color: "#5470c6",
    label: {
      textStyle: {
        color: "#494747",
        fontSize: "12px"
      }
    },
    name: "三级节点1-2-1",
    parent: {
      Cfg_Itm_Num: "二级节点1-2",
      Lvl3_Node_Grp: [{
        Node_ID: "ABI2024120600012020",
        Cfg_Itm_Num: "三级节点1-2-1"
      }, {
        Node_ID: "ABI2024120600012021",
        Cfg_Itm_Num: "三级节点1-2-2"
      }, {
        Node_ID: "ABI2024120600012022",
        Cfg_Itm_Num: "三级节点1-2-3"
      }],
      Node_ID: "ABI2024120600012019"
    },
    value: 3,
    x: 325,
    y: 240
  },

  {
    Node_ID: "ABI2024120600012021",
    category: 2,
    color: "#5470c6",
    label: {
      textStyle: {
        color: "#494747",
        fontSize: '12px'
      }
    },
    name: "三级节点1-2-2",
    parent: {
      Cfg_Itm_Num: "二级节点1-2",
      Lvl3_Node_Grp: [{
        Node_ID: "ABI2024120600012020",
        Cfg_Itm_Num: "三级节点1-2-1"
      }, {
        Node_ID: "ABI2024120600012021",
        Cfg_Itm_Num: "三级节点1-2-2"
      }, {
        Node_ID: "ABI2024120600012022",
        Cfg_Itm_Num: "三级节点1-2-3"
      }],
      Node_ID: "ABI2024120600012019"
    },
    value: 3,
    x: 405,
    y: 320
  },


  {
    Node_ID: "ABI2024120600012022",
    category: 2,
    color: "#5470c6",
    label: {
      textStyle: {
        color: '#494747',
        fontSize: "12px"
      }
    },
    name: "三级节点1-2-3",
    parent: {
      Cfg_Itm_Num: "二级节点1-2",
      Lvl3_Node_Grp: [{
        Node_ID: "ABI2024120600012020",
        Cfg_Itm_Num: "三级节点1-2-1"
      }, {
        Node_ID: "ABI2024120600012021",
        Cfg_Itm_Num: "三级节点1-2-2"
      }, {
        Node_ID: "ABI2024120600012022",
        Cfg_Itm_Num: "三级节点1-2-3"
      }],
      Node_ID: "ABI2024120600012019"
    },
    value: 3,
    x: 485,
    y: 400
  },


  {
    Lvl3_Node_Grp: [{
      Node_ID: "ABI2024120600012024",
      Cfg_Itm_Num: "三级节点1-3-1"
    }, {
      Node_ID: "ABI2024120600012025",
      Cfg_Itm_Num: "三级节点1-3-2"
    }, {
      Node_ID: "ABI2024120600012026",
      Cfg_Itm_Num: "三级节点1-3-3"
    }],
    Node_ID: "ABI2024120600012023",
    category: 1,
    color: "#8cdafa",
    label: {
      textStyle: {
        color: "#494747",
        fontSize: "14px"
      }
    },
    name: "二级节点1-3",
    value: 2,
    x: 550,
    y: 650
  },


  {
    Node_ID: "ABI2024120600012024",
    category: 2,
    color: "#5470c6",
    label: {
      textStyle: {
        color: "#494747",
        fontSize: "12px"
      }
    },
    name: "三级节点1-3-1",
    parent: {
      Cfg_Itm_Num: "二级节点1-3",
      Lvl3_Node_Grp: [{
        Node_ID: "ABI2024120600012024",
        Cfg_Itm_Num: "三级节点1-3-1"
      }, {
        Node_ID: "ABI2024120600012025",
        Cfg_Itm_Num: "三级节点1-3-2"
      }, {
        Node_ID: "ABI2024120600012026",
        Cfg_Itm_Num: "三级节点1-3-3"
      }],
      Node_ID: "ABI2024120600012023"
    },
    value: 3,
    x: 550,
    y: 490
  },


  {
    Node_ID: "ABI2024120600012025",
    category: 2,
    color: "#5470c6",
    label: {
      textStyle: {
        color: "#494747",
        fontSize: "12px"
      }
    },
    name: "三级节点1-3-2",
    parent: {
      Cfg_Itm_Num: "二级节点1-3",
      Lvl3_Node_Grp: [{
        Node_ID: "ABI2024120600012024",
        Cfg_Itm_Num: "三级节点1-3-1"
      }, {
        Node_ID: "ABI2024120600012025",
        Cfg_Itm_Num: "三级节点1-3-2"
      }, {
        Node_ID: "ABI2024120600012026",
        Cfg_Itm_Num: "三级节点1-3-3"
      }],
      Node_ID: "ABI2024120600012023"
    },
    value: 3,
    x: 630,
    y: 570
  },

  {
    Node_ID: "ABI2024120600012026",
    category: 2,
    color: "#5470c6",
    label: {
      textStyle: {
        color: "#494747",
        fontSize: "12px"
      }
    },
    name: "三级节点1-3-3",
    parent: {
      Cfg_Itm_Num: "二级节点1-3",
      Lvl3_Node_Grp: [{
        Node_ID: "ABI2024120600012024",
        Cfg_Itm_Num: "三级节点1-3-1"
      }, {
        Node_ID: "ABI2024120600012025",
        Cfg_Itm_Num: "三级节点1-3-2"
      }, {
        Node_ID: "ABI2024120600012026",
        Cfg_Itm_Num: "三级节点1-3-3"
      }],
      Node_ID: "ABI2024120600012023"
    },
    value: 3,
    x: 710,
    y: 650
  }
]

export {
  nodes
}