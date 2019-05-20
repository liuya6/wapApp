/* 当前投注 */
import { sysFandian, sysUnit } from "../api";

const Bet = {
  state: {
    doubling: 2, // 倍数
    unit: 1, // 单位，元-1 角-0.1 分-0.01
    price: 0, // 单价
    count: 0, // 注数
    amount: 0, // 总价
    bonus: 0, // 单注中奖金额
    rebates: 0, // 返点
    sysRebates: 0, // 系统返点
    unitRebates: 0, // 单位模式返点
    // oddsModel: 0, // 赔率模式，0-单赔率，1-选项多赔率，2-玩法多赔率
    odds: 0, // 赔率
    showOdds: "", // 赔率显示，为适配多赔率
    code: "", // 号码，拼接后的字符串，空格( ) 逗号(,)竖线(|)
    codeSelected: [], // 已选号码
    config: {}, // 投注配置
    oldCodeList: []
  },
  getters: {
    doubling: state => {
      return state.doubling;
    },
    unit: state => {
      return state.unit;
    },
    price: (state, getters) => {
      // 单位 * 倍数
      return getters.unit * getters.doubling;
    },
    count: state => {
      return state.count;
    },
    amount: (state, { price, count }) => {
      return (price * count).toFixed(3);
      // return Math.round(getters.price * getters.count * 1000) / 1000;
    },
    sixAmount: state => {
      return state.amount;
    },
    bonus: (state, { price, odds }) => {
      return (price * odds).toFixed(3);
      // return Math.round(getters.price * getters.odds * 1000) / 1000;
    },
    rebates: state => {
      return state.rebates;
    },
    sysRebates: state => {
      return state.sysRebates;
    },
    unitRebates: state => {
      return state.unitRebates;
    },
    odds: state => {
      return Math.round(state.odds * 1000) / 1000;
      // return state.odds.toFixed(3);
    },
    showOdds: state => {
      return state.showOdds;
    },
    code: state => {
      return state.code;
    },
    codeSelected: state => {
      return state.codeSelected;
    },
    config: state => {
      return state.config;
    },
    oldCodeList: state => {
      return state.oldCodeList;
    }
  },
  mutations: {
    // 同步操作
    SET_SIXAMOUNT: (state, payload) => {
      state.amount = payload;
    },
    SET_DOUBLING: (state, payload) => {
      state.doubling = payload;
    },
    ADD_DOUBLING: (state, payload) => {
      state.doubling += payload;
    },
    SET_UNIT: (state, payload) => {
      state.unit = payload;
    },
    SET_PRICE: (state, payload) => {
      state.price = payload;
    },
    SET_COUNT: (state, payload) => {
      state.count = payload;
    },
    SET_REBATES: (state, payload) => {
      state.rebates = payload;
    },
    SET_SYS_REBATES: (state, payload) => {
      state.sysRebates = payload;
    },
    SET_UNIT_REBATES: (state, payload) => {
      state.unitRebates = payload;
    },
    SET_ODDS: (state, payload) => {
      state.odds = payload;
    },
    SET_SHOW_ODDS: (state, payload) => {
      state.showOdds = payload;
    },
    SET_CODE: (state, payload) => {
      state.code = payload;
    },
    SET_CODE_SELECTED: (state, payload) => {
      state.codeSelected[payload.index] = payload.value;
      console.log(state.codeSelected, 55555555555555);
      // state.codeSelected = payload;
    },
    CLEAR_CODE_SELECTED: state => {
      state.codeSelected = [];
    },
    MODIFY_CODE_SELECTED: (state, payload) => {
      state.codeSelected[payload.index] = payload.value;
    },
    SET_CONFIG: (state, payload) => {
      state.config = payload;
    },
    OLD_CODE_LIST: (state, payload) => {
      state.oldCodeList = payload;
    },
    CLEAR_OLD_CODE: (state, payload) => {
      state.oldCodeList = payload;
    }
  },
  actions: {
    // 异步操作，可调用api
    setSixAmount({ commit }, payload) {
      commit("SET_SIXAMOUNT", parseInt(payload));
    },
    setDoubling(context, payload) {
      context.commit("SET_DOUBLING", parseInt(payload));
    },
    addDoubling(context, payload) {
      context.commit("ADD_DOUBLING", parseInt(payload));
    },
    setUnit(context, payload) {
      context.commit("SET_UNIT", payload);
    },
    setPrice(context, payload) {
      context.commit("SET_PRICE", payload);
    },
    setCount(context, payload) {
      context.commit("SET_COUNT", payload);
    },
    setRebates(context, payload) {
      context.commit("SET_REBATES", payload);
      context.dispatch("getOdds");
    },
    setSysRebates(context) {
      sysFandian().then(res => {
        if (res.status) {
          context.commit("SET_SYS_REBATES", parseInt(res.data));
        } else {
          context.commit("SET_SYS_REBATES", 1);
        }
      });
    },
    setUnitRebates(context, payload) {
      context.commit("SET_UNIT_REBATES", payload);
    },
    setOdds(context, payload) {
      context.commit("SET_ODDS", payload);
    },
    getOdds(context, payload) {
      let odds = 0;
      let showOdds = "";
      let oddsArr = [];
      let oddsModel = context.rootGetters.playData.isSetOption;
      let userFandian = context.rootGetters.userInfo
        ? parseFloat(context.rootGetters.userInfo.fanDian)
        : 0;
      // let systemFandian = parseFloat(payload.fanDianMax) || 1;
      let systemFandian = context.getters.sysRebates || 1;
      console.log(
        "vuex-getOdds",
        payload,
        oddsModel,
        userFandian,
        systemFandian
      );
      let myFanDian = userFandian || systemFandian;
      let pl, minPl;
      let curPl = [];
      let rebates = context.rootGetters.rebates;
      let modeFanDian = context.rootGetters.unitRebates; // unit返点
      let delimiter = context.rootGetters.config.delimiter || "";
      let codeSelected;
      let playOptionHash = context.rootGetters.playData.options;
      let bonusProp;
      let bonusPropBase;
      let codeSelectedChild;
      switch (oddsModel) {
        case 0: // 多赔率模式，0-单赔率，1-选项多赔率，2-玩法多赔率
          pl = context.rootGetters.playData.bonusProp;
          minPl = context.rootGetters.playData.bonusPropBase;
          odds /* (pl - ((pl - minPl) * rebates) / myFanDian).toFixed(3);*/ =
            Math.round((pl - ((pl - minPl) * rebates) / myFanDian) * 1000) /
            1000;
          showOdds = odds;
          console.log(
            "vuex-getOdds-0-end",
            odds,
            rebates,
            pl,
            minPl,
            myFanDian
          );
          break;
        case 1: // 1-选项多赔率
          codeSelected = context.getters.code
            ? context.getters.code.split(",")
            : [];
          console.log("vuex-getOdds-1", codeSelected, playOptionHash);
          pl = [];
          minPl = [];
          curPl = [];
          if (codeSelected.length > 0) {
            for (let i in codeSelected) {
              if (codeSelected[i] === "-") {
                continue;
              }
              codeSelectedChild = codeSelected[i].split(delimiter);
              for (let j in codeSelectedChild) {
                bonusProp = playOptionHash[codeSelectedChild[j]].bonusProp;
                bonusPropBase =
                  playOptionHash[codeSelectedChild[j]].bonusPropBase;
                pl.push(bonusProp);
                minPl.push(bonusPropBase);
                curPl.push(
                  bonusProp -
                    ((bonusProp - bonusPropBase) * rebates) / myFanDian
                );
              }
            }
          }
          odds = Math.round(Math.max.apply(null, curPl) * 1000) / 1000; // 取组合赔率最大值
          curPl.forEach(v => {
            if (oddsArr.indexOf(v) < 0) {
              // 不存在
              oddsArr.push(v);
            }
          });
          showOdds = oddsArr.join(" | ");
          console.log("vuex-getOdds-1-end", curPl, odds);
          break;
        case 2: // 2-玩法多赔率
          codeSelected = context.getters.code
            ? context.getters.code.split(",")
            : [];
          console.log(
            "vuex-getOdds-2",
            codeSelected,
            playOptionHash,
            context.rootGetters.groupData
          );
          if (
            context.rootGetters.groupData.id == 3 ||
            context.rootGetters.groupData.id == 140
          ) {
            for (let i in playOptionHash) {
              bonusProp = playOptionHash[i].bonusProp;
              bonusPropBase = playOptionHash[i].bonusPropBase;
              curPl.push(
                bonusProp - ((bonusProp - bonusPropBase) * rebates) / myFanDian
              );
            }
            console.log("vuex-getOdds-2-if", curPl);
          } else {
            let childName;
            if (codeSelected.length > 0) {
              for (let i in codeSelected) {
                if (codeSelected[i] === "-") {
                  continue;
                }
                codeSelectedChild = codeSelected[i].split(delimiter);
                console.log("vuex-getOdds-2-if-else", codeSelectedChild);
                childName = "组" + codeSelectedChild.length;
                bonusProp = playOptionHash[childName].bonusProp;
                bonusPropBase = playOptionHash[childName].bonusPropBase;
                curPl.push(
                  bonusProp -
                    ((bonusProp - bonusPropBase) * rebates) / myFanDian
                );
              }
            }
          }
          console.log("vuex-getOdds-2-end", curPl, odds);
          odds = Math.round(Math.max.apply(null, curPl) * 1000) / 1000; // 取组合赔率最大值
          curPl.forEach(v => {
            if (oddsArr.indexOf(v) < 0) {
              // 不存在
              oddsArr.push(v);
            }
          });
          showOdds = oddsArr.join(" | ");
          break;
      }
      context.dispatch("setOdds", odds);
      console.log(oddsModel, showOdds, 667676);
      context.commit("SET_SHOW_ODDS", showOdds);
    },
    setCode(context, payload) {
      console.log("vuex-setCode ", payload);
      context.commit("SET_CODE", payload);
    },
    setCodeSelected(context, payload) {
      context.commit("SET_CODE_SELECTED", payload);
    },
    setConfig(context, payload) {
      console.log(payload, "config=====================================");
      context.commit("SET_CONFIG", payload);
    },
    // clearCodeSelected(context) {
    //   context.commit("SET_CODE_SELECTED", []);
    //   context.commit("SET_CODE", "");
    // },
    clearBetCode(context) {
      context.commit("SET_DOUBLING", 2);
      context.commit("SET_UNIT", 1);
      context.commit("SET_COUNT", 0);
      context.commit("SET_REBATES", 0);
      context.commit("SET_ODDS", 0);
      context.commit("SET_CODE", "");
      // context.commit("CLEAR_CODE_SELECTED");
      // context.commit("CLEAR_OLD_CODE", []);
    },
    clearRebates(context) {
      context.commit("SET_REBATES", 0);
    }
  }
};

export default Bet;
