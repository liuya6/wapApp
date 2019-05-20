/* 购物车 */

const Cart = {
  state: {
    /* 购物车 */
    cartCode: [], // 投注号码
    cartExpired: [] // 过期号码
    // cartCount: 0, // 投注
    // cartAmount: 0, // 投注金额
  },
  getters: {
    cartCode: state => {
      return state.cartCode;
    },
    cartExpired: state => {
      return state.cartExpired;
    },
    cartCount: (state, getters) => {
      let _count = 0;
      for (let i = 0; i < getters.cartCode.length; i++) {
        _count++;
      }
      return _count;
    },
    cartAmount: (state, getters) => {
      let _amount = 0;
      for (let i = 0; i < getters.cartCode.length; i++) {
        if (getters.cartCode[i].selected) {
          _amount +=
            Math.round(
              getters.cartCode[i].unit *
                getters.cartCode[i].doubling *
                getters.cartCode[i].count *
                1000
            ) / 1000;
        }
      }
      return _amount;
    }
  },
  mutations: {
    // 同步操作
    SET_CART_CODE: (state, payload) => {
      state.cartCode = payload;
    },
    ADD_CART_CODE: (state, payload) => {
      state.cartCode.push(payload);
    },
    DELETE_CART_CODE: (state, payload) => {
      state.cartCode.splice(payload, 1);
    },
    SET_CART_EXPIRED: (state, payload) => {
      state.cartExpired = payload;
    },
    ADD_CART_EXPIRED: (state, payload) => {
      state.cartExpired.push(payload);
    },
    DELETE_CART_EXPIRED: (state, payload) => {
      state.cartExpired.splice(payload, 1);
    },
    MODIFY_CART_ITEM: (state, payload) => {
      let index = payload.index;
      let newValue = payload.newValue;
      for (let i in newValue) {
        state.cartCode[index][i] = newValue[i];
      }
    },
    MODIFY_CART_LIST: (state, payload) => {
      for (let i in state.cartCode) {
        for (let j in payload) {
          state.cartCode[i][j] = payload[j];
        }
      }
    }
  },
  actions: {
    setCartCode(context, payload) {
      context.commit("SET_CART_CODE", payload);
    },
    addCartCode(context, payload) {
      context.commit("ADD_CART_CODE", payload);
    },
    deleteCartCode(context, payload) {
      context.commit("DELETE_CART_CODE", payload);
    },
    setCartExpired(context, payload) {
      context.commit("SET_CART_EXPIRED", payload);
    },
    addCartExpired(context, payload) {
      context.commit("ADD_CART_EXPIRED", payload);
    },
    deleteCartExpired(context, payload) {
      context.commit("DELETE_CART_EXPIRED", payload);
    },
    modifyCartItem(context, payload) {
      context.commit("MODIFY_CART_ITEM", payload);
    },
    modifyCartList(context, payload) {
      context.commit("MODIFY_CART_LIST", payload);
    },
    clearCartCode(context) {
      context.commit("SET_CART_CODE", []);
      context.commit("SET_CART_EXPIRED", []);
    }
  }
};

export default Cart;
