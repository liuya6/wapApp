import { isLogin, rechargeApply } from "../api";
import router from "../router/index";

const User = {
  state: {
    userInfo: null, //用户数据
    order: "", //充值订单数据
    deposits: "", //充值金额
    TransferMethod: "" //转账方式
  },
  getters: {
    userInfo: state => {
      return state.userInfo;
    },
    order: state => {
      return state.order;
    },
    deposits: state => {
      return state.deposits;
    },
    TransferMethod: state => {
      return state.TransferMethod;
    }
  },
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = payload;
    },
    CLEAR_USER_INFO(state) {
      state.userInfo = null;
    },
    ORDERS(state, payload) {
      state.order = payload;
    },
    DEPOSITS(state, payload) {
      state.deposits = payload;
    },
    TRANSFER_METHOD(state, payload) {
      state.TransferMethod = payload;
    }
  },
  actions: {
    checkedLogin(context) {
      isLogin().then(res => {
        try {
          if (res.status) {
            context.commit("SET_USER_INFO", res.data);
          } else {
            context.commit("SET_USER_INFO", null);
          }
        } catch (err) {
          console.log(err, "【checkedLogin-catch】");
        }
      });
    },
    SubmitOrders({ commit }, { payWay, id }) {
      rechargeApply({ methodId: id }).then(res => {
        try {
          commit("ORDERS", res.data);
          switch (payWay) {
            case 1:
              router.push({ name: "paying", query: { id: id } });
              break;
            case 2:
              router.push({ name: "scancodePaying", query: { id: id } });
              break;
            case 3:
              router.push({ name: "bankpaying", query: { id: id } });
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  }
};

export default User;
