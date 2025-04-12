// 在如下数据中， Cyc_TpCd为 '04'代表季， Cyc_TpCd为 '02'代表旬
// AdjAmt_Tm_Itrv_Dsc字段前四个代表年， 第五位代表季， 第六位代表季中的旬, Core_Tp_Ind为1代表该日期存在数据， 0 代表该日期不存在数据
// 现有数据oriList， 需要将其转换为transDateList， 其中year代表年来自AdjAmt_Tm_Itrv_Dsc中的前4个字段， quarter代表季度来自AdjAmt_Tm_Itrv_Dsc中的滴5个字段， tendays是季度下面的旬， 来自AdjAmt_Tm_Itrv_Dsc中的第6个字段
// Core_Tp_Ind取自年度下， 某个季度， 某一旬的Core_Tp_Ind字段， Cyc_TpCd取自从年度下， 某个季度， 某一旬的Cyc_TpCd字段， Core_Tp_Ind和Cyc_TpCd都不是写死的
// transDateList的结构如下： 不要用map， set， flatmap
// 给出代码


export const oriList = [{
  "second_Grp": [{
    "AdjAmt_Tm_Itrv_Dsc": '20241',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202411',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202412',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '0'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202413',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202414',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202415',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202416',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202417',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202418',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202419',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '20242',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202421',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '1'
  }],
  "third_Grp": [{
    "AdjAmt_Tm_Itrv_Dsc": '20252',
    "Cyc_TpCd": '04',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202521',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202522',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202523',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202524',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202525',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202526',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202527',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202528',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '1'
  }, {
    "AdjAmt_Tm_Itrv_Dsc": '202529',
    "Cyc_TpCd": '02',
    "Core_Tp_Ind": '1'
  }]
}]

export const transDateList = [{
  "year": "2024",
  quarterLists: [{
    quarter: "1",
    tendays: [{
      decadeNum: '1',
      Core_Tp_Ind: '1',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '2',
      Core_Tp_Ind: '0',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '3',
      Core_Tp_Ind: '1',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '4',
      Core_Tp_Ind: '1',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '5',
      Core_Tp_Ind: '1',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '6',
      Core_Tp_Ind: '1',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '7',
      Core_Tp_Ind: '1',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '8',
      Core_Tp_Ind: '1',
      Cyc_TpCd: '04'
    }, {
      decadeNum: '9',
      Core_Tp_Ind: '1',
      Cyc_TpCd: '04'
    }]
  }, {
    quarter: '2',
    tendays: [{
      "AdjAmt_Tm_Itrv_Dsc": '202421',
      "Cyc_TpCd": '02',
      "Core_Tp_Ind": '1'
    }]
  }]
}, {
  year: '2025',
  quarterLists: [{
    quarter: "2",
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