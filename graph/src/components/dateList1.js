// 在如下数据中， Cyc_TpCd为 '02'
// 代表季， Cyc_TpCd为 '04'
// 代表旬， AdjAmt_Tm_Itrv_Dsc字段前四个代表年， 第五位代表季， 第六位代表旬， 第六位不存在不处理，
// 根据oriList生成transDateList， 语言用JavaScript


export const oriList = [{
  "second_Grp": [{
    "AdjAmt_Tm_Itrv_Dsc": '20241',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202411',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202412',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202413',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202414',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202415',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202416',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202417',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202418',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202419',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '20242',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202421',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }],
  "third_Grp": [{
    "AdjAmt_Tm_Itrv_Dsc": '20252',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202521',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202522',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202523',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202524',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202525',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202526',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202527',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202528',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202529',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": 1
  }]
}]

export const transDateList = [{
  "year": "2024",
  quarterLists: [{
    quarter: 1,
    tendays: [{
      decadeNum: '1',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '2',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '3',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '4',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '5',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '6',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '7',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '8',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '9',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }]
  }]
}, {
  year: '2025',
  quarterLists: [{
    quarter: 2,
    tendays: [{
      decadeNum: '1',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '2',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '3',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '4',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '5',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '6',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '7',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '8',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '9',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }]
  }],
}]
// export const transDateList1 = [{
//     "year": "2024",
//     quarterLists: [{
//       quarter: 1
//     }],
//     tenday: [{
//       quarter: 1,
//       tendays: [{
//         decadeNum: '1',
//         Core_Tp_Ind: '0',
//         Cyc_TpCd: '04'
//       }, {
//         decadeNum: '2',
//         Core_Tp_Ind: '0',
//         Cyc_TpCd: '04'
//       }, {
//         decadeNum: '3',
//         Core_Tp_Ind: '0',
//         Cyc_TpCd: '04'
//       }, {
//         decadeNum: '4',
//         Core_Tp_Ind: '0',
//         Cyc_TpCd: '04'
//       }, {
//         decadeNum: '5',
//         Core_Tp_Ind: '0',
//         Cyc_TpCd: '04'
//       }, {
//         decadeNum: '6',
//         Core_Tp_Ind: '0',
//         Cyc_TpCd: '04'
//       }, {
//         decadeNum: '7',
//         Core_Tp_Ind: '0',
//         Cyc_TpCd: '04'
//       }, {
//         decadeNum: '8',
//         Core_Tp_Ind: '0',
//         Cyc_TpCd: '04'
//       }, {
//         decadeNum: '9',
//         Core_Tp_Ind: '0',
//         Cyc_TpCd: '04'
//       }]
//     }]
//   },
//   {
//     year: '2025',
//     quarterLists: [{
//       quarter: 2
//     }],
//     tenday: [{
//       quarter: 2,
//       tendays: [{
//         decadeNum: '1',
//         Core_Tp_Ind: '0',
//         Cyc_TpCd: '04'
//       }, {
//         decadeNum: '2',
//         Core_Tp_Ind: '0',
//         Cyc_TpCd: '04'
//       }, {
//         decadeNum: '3',
//         Core_Tp_Ind: '0',
//         Cyc_TpCd: '04'
//       }, {
//         decadeNum: '4',
//         Core_Tp_Ind: '0',
//         Cyc_TpCd: '04'
//       }, {
//         decadeNum: '5',
//         Core_Tp_Ind: '0',
//         Cyc_TpCd: '04'
//       }, {
//         decadeNum: '6',
//         Core_Tp_Ind: '0',
//         Cyc_TpCd: '04'
//       }, {
//         decadeNum: '7',
//         Core_Tp_Ind: '0',
//         Cyc_TpCd: '04'
//       }, {
//         decadeNum: '8',
//         Core_Tp_Ind: '0',
//         Cyc_TpCd: '04'
//       }, {
//         decadeNum: '9',
//         Core_Tp_Ind: '0',
//         Cyc_TpCd: '04'
//       }]
//     }]
//   }
// ]