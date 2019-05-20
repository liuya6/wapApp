/* 投注方法 */
/* 不要使用 => 箭头函数，因为箭头函数是和父级上下文绑定在一起的，this 不会是如你所预期的 Vue 实例  */
/* $set方法改变数据的同时，会刷新DOM */
/* ⚠ this.指向的属性/方法，需要在其组件中调用才能获取，
即：A组件无titleList属性，在A中调用initSelected()无法通过this.titleList获取，
 需要在titleList所在组件中调用initSelected() */
export default {
  install(Vue, options) {
    /* ======选号====== */
    /* 设置每列数量 */
    Vue.prototype.setColumn = function(list, type = "number") {
      if (typeof list === "object") {
        list = Object.keys(list);
      }
      let len = list.length;
      let row;
      let col;
      row = Math.ceil(len / 5);
      col = Math.ceil(len / row);
      return col;
    };
    /* 初始化选号 */
    Vue.prototype.initSelected = function() {
      this.$store.dispatch("clearBetCode");
      this.$store.dispatch("setConfig", this.config);
      if (this.titleList.length) {
        for (let i in this.titleList) {
          // this.$store.dispatch("setCodeSelected", { index: i, value: [] });
          this.$set(this.codeSelected, i, []);
          if (this.hasOperator) {
            this.$set(this.operatorSelected, i, "");
          }
        }
      } else {
        let groupId = this.$store.getters.groupData.id;
        let playId = this.$store.getters.playData.id;
        if (playId == 345 || groupId == 139 || groupId == 140) {
          this.$set(this.codeSelected, 0, []);
        } else {
          this.codeSelected = [];
        }
      }
      console.log(
        this.config,
        this.titleList,
        this.codeSelected,
        "【initSelected】"
      );
    };
    /* 随机号码转模板选中 */
    Vue.prototype.randomCode2Selected = function(codeStr, titleList) {
      let tempArr = codeStr.split(",");
      if (titleList.length) {
        // 普通
        for (let i in tempArr) {
          if (tempArr[i] !== "-") {
            this.$set(this.codeSelected, i, [tempArr[i]]);
          } else {
            this.$set(this.codeSelected, i, []);
          }
        }
      } else {
        // 六合彩
        this.codeSelected = tempArr;
      }
    };
    /* 选择操作，清、单、双、大、小、全 */
    Vue.prototype.pickOperator = function(index, item) {
      this.$set(this.operatorSelected, index, item);
      this.autoSetCodeSelected(index, item);
      if (item === "none") {
        this.$set(this.operatorSelected, index, "");
      }
    };
    /* 选择号码 */
    Vue.prototype.pickCode = function(index, item, autoSet = false) {
      let _newValue = [...this.codeSelected[index]];
      let _i = _newValue.indexOf(item); // 判断是否已选中
      if (_i >= 0) {
        _newValue.splice(_i, 1);
      } else {
        _newValue.push(item);
      }
      // 号码唯一
      if (this.config.unique) {
        let len = this.codeSelected.length;
        for (let i = 0; i < len; i++) {
          if (i === index) {
            continue;
          } else {
            let _j = this.codeSelected[i].indexOf(item);
            if (_j >= 0) {
              let tempCodeSelected = [...this.codeSelected[i]];
              tempCodeSelected.splice(_j, 1);
              this.$set(this.codeSelected, i, tempCodeSelected);
              // this.$store.dispatch("setCodeSelected", {
              //   index: i,
              //   value: tempCodeSelected
              // });
            }
          }
        }
      }
      // 限制号码个数
      if (this.config.limit.length) {
        if (
          this.config.limit[index] > 0 &&
          _newValue.length > this.config.limit[index]
        ) {
          _newValue.splice(this.config.limit[index] - 1, 1);
        }
      }
      this.$set(this.codeSelected, index, _newValue);
      console.log(index, item, _newValue, "【pickCode】");
      if (autoSet) {
        this.autoSetOperatorSelected(index, _newValue);
      }
    };
    /* 选择六合彩号码 */
    Vue.prototype.pickSixCode = function(item) {
      let _index = this.codeSelected.indexOf(item); // 判断是否已选中
      if (_index >= 0) {
        this.codeSelected.splice(_index, 1);
      } else {
        this.codeSelected.push(item);
      }
    };
    /* 自动选择操作 */
    Vue.prototype.autoSetOperatorSelected = function(index, _newValue) {
      let codeList = [...this.codeList];
      let _codeActionList = {
        // none: [],
        even: [],
        odd: [],
        small: [],
        large: [],
        all: codeList
      };
      for (let i in codeList) {
        if (codeList[i] % 2 === 0) {
          _codeActionList["even"].push(codeList[i]);
        }
        if (codeList[i] % 2 === 1) {
          _codeActionList["odd"].push(codeList[i]);
        }
        if (codeList[i] < codeList.length / 2) {
          _codeActionList["small"].push(codeList[i]);
        }
        if (codeList[i] >= codeList.length / 2) {
          _codeActionList["large"].push(codeList[i]);
        }
      }
      let _newValueString = [..._newValue].sort().toString();
      for (let i in _codeActionList) {
        let _codeString = [..._codeActionList[i]].sort().toString();
        if (_newValueString === _codeString) {
          return this.$set(this.operatorSelected, index, i);
        }
      }
      return this.$set(this.operatorSelected, index, "");
    };
    /* 自动改变号码状态 */
    Vue.prototype.autoSetCodeSelected = function(index, item) {
      let codeList = [...this.codeList];
      // 号码唯一
      if (this.config.unique) {
        for (let i = 0; i < this.codeSelected.length; i++) {
          if (i === index) {
            continue;
          } else {
            for (let j = 0; j < this.codeSelected[i].length; j++) {
              let _j = codeList.indexOf(this.codeSelected[i][j]);
              if (_j >= 0) {
                codeList.splice(_j, 1);
              }
            }
          }
        }
      }
      let _codeValue = [];
      switch (item) {
        case "none": // 清
          _codeValue = [];
          break;
        case "even": // 双
          for (let i in codeList) {
            if (codeList[i] % 2 === 0) {
              _codeValue.push(codeList[i]);
            }
          }
          break;
        case "odd": // 单
          for (let i in codeList) {
            if (codeList[i] % 2 === 1) {
              _codeValue.push(codeList[i]);
            }
          }
          break;
        case "small": // 小
          for (let i in codeList) {
            if (
              codeList[i] < this.codeList[parseInt(this.codeList.length / 2)]
            ) {
              _codeValue.push(codeList[i]);
            }
          }
          break;
        case "large": // 大
          for (let i in codeList) {
            if (
              codeList[i] >= this.codeList[parseInt(this.codeList.length / 2)]
            ) {
              _codeValue.push(codeList[i]);
            }
          }
          break;
        case "all": // 全
          _codeValue = [...codeList];
          break;
      }
      this.$set(this.codeSelected, index, _codeValue);
    };
    /* ======购买====== */
    /* 添加号码 - 单注多号 */
    Vue.prototype.addBetCode = function() {
      if (this.$store.getters.oldCodeList) {
        this.$store.commit("CLEAR_OLD_CODE", []);
      }
      let codeStr = this.arr2Str(this.codeSelected, this.config.delimiter);
      this.$store.dispatch("setCode", codeStr);
      this.$store.commit("OLD_CODE_LIST", this.codeSelected);
      console.log(this.codeSelected, this.config.delimiter, "【addBetCode】");
    };
    /* 添加六合彩号码 - 单注单号 */
    Vue.prototype.addBetSixCode = function() {
      if (this.$store.getters.oldCodeList) {
        this.$store.commit("CLEAR_OLD_CODE", []);
      }
      let codeStr = this.sortArray(this.codeSelected).join(",");
      this.$store.dispatch("setCode", codeStr);
      this.$store.commit("OLD_CODE_LIST", this.codeSelected);
      console.log(
        this.codeSelected,
        this.config.delimiter,
        "【addBetSixCode】"
      );
    };
    /* todo: 直接购买，bet,oddsModel */
    Vue.prototype.buyBetCode = function() {
      let code = [];
      let oddsModel = this.$store.getters.playData.isSetOption;
      code.push({
        actionData: this.$store.getters.code,
        actionNum: this.$store.getters.count,
        beiShu: this.$store.getters.doubling,
        bonusProp: this.$store.getters.odds,
        fanDian: this.$store.getters.rebates,
        mode: this.$store.getters.unit,
        orderId: new Date() - 2147486647 * 623,
        type: this.$store.getters.lotteryData.id,
        playedGroup: this.$store.getters.groupData.id,
        playedId: this.$store.getters.playData.id,
        weiShu: 0
      });
      return code;
    };
    /* 直接购买，six */
    Vue.prototype.buyBetSixCode = function(sixCode) {
      console.log(sixCode, "betFunc+++++++++++++++++++");
      let code = [];
      let oddsModel = this.$store.getters.playData.isSetOption;
      let optionsHash = this.$store.getters.playData.options;
      let baseData = {
        actionNum: 1, // 注数

        mode: this.$store.getters.unit, // 单位
        orderId: new Date() - 2147486647 * 623,
        type: this.$store.getters.lotteryData.id,
        playedGroup: this.$store.getters.groupData.id,
        playedId: this.$store.getters.playData.id
      };
      let bonusProp;
      // for (let i = 0; i < codeItem.length; i++) {
      //   // 赔率模式，0-单赔率，1-选项多赔率，2-玩法多赔率
      //   if (oddsModel == 1) {
      //     bonusProp = optionsHash[codeItem[i]].bonusProp;
      //   } else if (oddsModel == 2) {
      //     // todo:2-lhc-玩法多赔率
      //   } else {
      //     bonusProp = this.$store.getters.odds;
      //   }
      //   code.push({
      //     actionData: codeItem[i],
      //     bonusProp: bonusProp,
      //     fanDian: this.$store.getters.rebates,
      //     ...baseData
      //   });
      // }
      for (let i in sixCode) {
        if (oddsModel == 1) {
          bonusProp = optionsHash[i].bonusProp;
        } else if (oddsModel == 2) {
          // todo:2-lhc-玩法多赔率
          bonusProp = 0;
        } else {
          bonusProp = this.$store.getters.odds;
        }
        code.push({
          actionData: i,
          beiShu: sixCode[i], // 倍数
          bonusProp: bonusProp,
          fanDian: this.$store.getters.rebates,
          ...baseData
        });
      }
      return code.sort((a, b) => {
        return a.actionData - b.actionData;
      });
    };
    /* 追号数据拼接 */
    Vue.prototype.followDataSplice = function(chasingList) {
      let followList = chasingList.filter(item => {
        return item.selected;
      });
      let list = [];
      for (let i in followList) {
        let tempData = [];
        tempData.push(followList[i].actionNo);
        tempData.push(
          parseInt(followList[i].doubling * this.$store.getters.doubling)
        );
        tempData.push(this.timestampToString(followList[i].actionTime));
        list[i] = tempData.join("|");
      }
      console.log(followList, list, "【followDataSplice】");
      return list.join(";");
    };
    /* todo: 购物车购买 */
    Vue.prototype.betCode2cartCode = function() {
      return {
        code: this.$store.getters.code, // 号码
        unit: this.$store.getters.unit, // 模式，元-1 角-0.1 分-0.01
        doubling: this.$store.getters.doubling, // 单价
        price: this.$store.getters.price, // 单价
        count: this.$store.getters.count, // 注数
        amount: this.$store.getters.amount, // 总价
        rebates: this.$store.getters.rebates, // 返点
        odds: this.$store.getters.odds, // 赔率
        orderId: new Date() - 2147486647 * 623,
        selected: true, // 已选
        expired: false, // 是否过期,unused
        playedGroup: this.$store.getters.groupData.id,
        playedId: this.$store.getters.playData.id,
        type: this.$store.getters.lotteryData.id,
        groupPlayName:
          this.$store.getters.lotteryData.classify === 9
            ? this.$store.getters.lotteryData.title +
              "-" +
              this.$store.getters.playData.name
            : this.$store.getters.lotteryData.title +
              "-" +
              this.$store.getters.groupData.groupName +
              "-" +
              this.$store.getters.playData.name
      };
    };
    /* 购物车号码 - 单注号码转换 */
    Vue.prototype.cartCodeSplice = function() {
      return {
        code: this.$store.getters.code, // 号码
        unit: this.$store.getters.unit, // 模式，元-1 角-0.1 分-0.01
        doubling: this.$store.getters.doubling, // 单价
        price: this.$store.getters.price, // 单价
        count: this.$store.getters.count, // 注数
        amount: this.$store.getters.amount, // 总价
        rebates: this.$store.getters.rebates, // 返点
        odds: this.$store.getters.odds, // 赔率
        orderId: new Date() - 2147486647 * 623,
        groupPlayName:
          this.$store.getters.lotteryData.title +
          "-" +
          this.$store.getters.groupData.groupName +
          "-" +
          this.$store.getters.playData.name
      };
    };

    /* 投注号码拼接 */
    Vue.prototype.betCodeSplice = function() {
      let codeStr = this.arr2Str(this.codeSelected, this.config.delimiter);
      this.$store.dispatch("setCode", codeStr);
    };

    /* todo: 追号购买 */
    Vue.prototype.buyChasingCode = function() {};
    /* todo:  */
    Vue.prototype.betAddCart = function() {};
    /* 购买号码拼接 - 号码列表转换 */
    Vue.prototype.buyCodeSplice = function() {
      let len = this.$store.getters.cartCode.length;
      let cartCodeList = this.$store.getters.cartCode;
      let code = [];
      for (let i = 0; i < len; i++) {
        if (cartCodeList[i].selected) {
          code.push({
            actionData: cartCodeList[i].code,
            actionNum: cartCodeList[i].count, // 注数
            beiShu: cartCodeList[i].doubling, // 单注单价、非总价
            bonusProp: cartCodeList[i].odds,
            fanDian: cartCodeList[i].rebates,
            mode: cartCodeList[i].unit,
            orderId: cartCodeList[i].orderId,
            type: cartCodeList[i].type,
            playedGroup: cartCodeList[i].playedGroup,
            playedId: cartCodeList[i].playedId,
            weiShu: 0
          });
        }
      }
      return code;
    };
    /* 购买六合彩号码拼接 - 单注 */
    Vue.prototype.cartSixCodeSplice = function() {
      return {
        code: this.$store.getters.code, // 号码
        doubling: this.$store.getters.doubling, // 倍数
        unit: this.$store.getters.unit, // 模式，元-1 角-0.1 分-0.01
        price: this.$store.getters.price, // 单价
        count: this.$store.getters.count, // 注数
        amount: this.$store.getters.amount, // 总价
        rebates: this.$store.getters.rebates, // 返点
        odds: this.$store.getters.odds, // 赔率
        orderId: new Date() - 2147486647 * 623,
        groupPlayName:
          this.$store.getters.groupData.groupName +
          "-" +
          this.$store.getters.playData.name
      };
    };
    /* 购买六合彩号码拼接 */
    Vue.prototype.buySixCodeSplice = function() {
      let len = this.$store.getters.cartCode.length;
      let cartCodeList = this.$store.getters.cartCode;
      let code = [];
      for (let i = 0; i < len; i++) {
        code.push({
          actionAmount:
            cartCodeList[i].unit *
            cartCodeList[i].doubling *
            cartCodeList[i].count, // 单注总价
          actionData: cartCodeList[i].code, // 单注号码
          actionName: cartCodeList[i].name, // 六合彩标识
          actionNum: cartCodeList[i].count, // 注数
          beiShu: cartCodeList[i].doubling, // 单价
          bonusProp: cartCodeList[i].odds, // 赔率
          fanDian: cartCodeList[i].rebates, // 返点
          mode: cartCodeList[i].unit, // 价格单位
          orderId: cartCodeList[i].orderId, // 订单号
          playedId: this.$store.getters.playData.id // 玩法ID
        });
      }
      return code;
    };

    /* ======排序====== */
    /* 数组正序排列 */
    Vue.prototype.sortArray = function(arr, order = "asc") {
      if (!arr.length) return;
      return arr.sort((a, b) => {
        if (order === "asc") {
          return a - b;
        } else {
          return b - a;
        }
        // return parseInt(a) - parseInt(b);
        // return a.localeCompare(b)
      });
    };
    /* 数组根据字段排序 */
    Vue.prototype.sortArrayByColumn = function(arr, column, order = "asc") {
      if (!arr.length) return;
      return arr.sort((a, b) => {
        if (order === "asc") {
          return a[column] - b[column];
        } else {
          return b[column] - a[column];
        }
        // return a.localeCompare(b)
      });
    };
    /* 对象根据key值正序排列 */
    Vue.prototype.sortObjectByKey = function(obj, order = "asc") {
      if (!obj) return;
      let temp = Object.keys(obj).sort((a, b) => {
        if (order === "asc") {
          return a - b;
        } else {
          return b - a;
        }
      });
      let arr = [];
      for (let i = 0; i < temp.length; i++) {
        arr[i] = {
          ...obj[temp[i]],
          name: temp[i]
        };
      }
      return arr;
    };
    /* 对象根据value值正序排列 */
    Vue.prototype.sortObjectByColumn = function(obj, column, order = "asc") {
      if (!obj) return;
      let temp = Object.keys(obj).sort((a, b) => {
        if (order === "asc") {
          return obj[a][column] - obj[b][column];
        } else {
          return obj[b][column] - obj[a][column];
        }
      });
      let arr = [];
      for (let i = 0; i < temp.length; i++) {
        arr[i] = {
          ...obj[temp[i]],
          name: temp[i]
        };
      }
      return arr;
    };
    /**
     * 数组转字符串
     * @param arr 二维数组
     * @param delimiter 分隔符
     * @returns {string}
     */
    Vue.prototype.arr2Str = function(arr, delimiter) {
      let codeArr = [];
      for (let i in arr) {
        if (arr[i].length > 0) {
          codeArr[i] = this.sortArray(arr[i]).join(delimiter);
        } else {
          codeArr[i] = "-";
        }
      }
      return codeArr.join(",");
    };
    /**
     * 组合函数 C(m, n)
     * @param m
     * @param n
     * @returns {number}
     */
    Vue.prototype.mathCombination = function(m, n) {
      return Math.floor(factorial(m, n) / factorial(n, n));
    };
    /**
     * 排列函数 A(m, n)
     * @param m
     * @param n
     * @returns {number}
     */
    Vue.prototype.mathArray = function(m, n) {
      return factorial(m, n);
    };
    /**
     * 笛卡尔积
     * @param array
     * @returns {*}
     */
    Vue.prototype.mathDescartes = function(selectCode) {
      return DescartesAlgorithm(...selectCode);
    };
    /**
     * 判断数组内是否重复数据
     * @param arr
     * @returns {*}
     */
    Vue.prototype.isRepeat = function(arr) {
      let hash = {};
      for (let i in arr) {
        if (hash[arr[i]]) {
          return true;
        }
        hash[arr[i]] = true;
      }
      return false;
    };
    Vue.prototype.getCookie = function(cName) {
      let tempArr = document.cookie.split("; ");
      let cookieArr = {};
      let temp = [];
      for (let i = 0; i < tempArr.length; i++) {
        temp = tempArr[i].split("=");
        cookieArr[temp[0]] = temp[1];
      }
      return cookieArr[cName] || "";
    };
    Vue.prototype.setCookie = function(
      name,
      value,
      expireDays = 7,
      path = "/",
      domain = document.domain
    ) {
      let expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + expireDays);
      let str = "";
      str += name + "=" + value + "; expires=" + expireDate.toGMTString();
      str += "; path=" + path;
      str += "; domain=" + domain;
      document.cookie = str;
    };
    Vue.prototype.oldCodeList = function() {
      console.log(this.$store.getters.code, "选中的号码");
    };
  }
};

/* 笛卡尔乘积 */
function DescartesAlgorithm() {
  let i;
  let j;
  let a = [];
  let b = [];
  let c = [];
  if (arguments.length === 1) {
    if (!Array.isArray(arguments[0])) {
      return [arguments[0]];
    } else {
      return arguments[0];
    }
  }
  if (arguments.length > 2) {
    for (i = 0; i < arguments.length - 1; i++) {
      a[i] = arguments[i];
    }
    b = arguments[i];
    return DescartesAlgorithm(DescartesAlgorithm.apply(null, a), b);
  }
  if (Array.isArray(arguments[0])) {
    a = arguments[0];
  } else {
    a = [arguments[0]];
  }
  if (Array.isArray(arguments[1])) {
    b = arguments[1];
  } else {
    b = [arguments[1]];
  }
  for (i = 0; i < a.length; i++) {
    for (j = 0; j < b.length; j++) {
      if (Array.isArray(a[i])) {
        c.push(a[i].concat(b[j]));
      } else {
        c.push([a[i], b[j]]);
      }
    }
  }
  return c;
}

/**
 * 阶乘函数
 * @param m 阶乘基数
 * @param n 相乘个数
 * @returns {number}
 */
function factorial(m, n) {
  let num = 1;
  let count = 0;
  for (let i = m; i > 0; i--) {
    if (count === n) {
      // 当循环次数等于指定的相乘个数时，即跳出for循环
      break;
    }
    num = num * i;
    count++;
  }
  return num;
}
