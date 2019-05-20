import { lotteryList } from "../api";

const Game = {
  state: {
    lottery: [],
    chess: []
  },
  getters: {
    lottery: state => {
      return state.lottery;
    },
    chess: state => {
      return state.chess;
    }
  },
  mutations: {
    SET_LOTTERY: (state, payload) => {
      state.lottery = payload;
    }
  },
  actions: {
    getLottery(context) {
      lotteryList().then(res => {
        if (res.status) {
          let lottery = this.sortObjectAscByKey();
          context.commit("SET_LOTTERY", res.data);
        }
      });
    }
  }
};

export default Game;
