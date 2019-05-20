const Lottery = {
  state: {
    lotteryData: {},
    groupData: {},
    playData: {},
    awardData: {}
  },
  getters: {
    lotteryData: state => {
      return state.lotteryData;
    },
    groupData: state => {
      return state.groupData;
    },
    playData: state => {
      return state.playData;
    },
    optionsHash: (state, getters) => {
      return getters.playData.options;
    },
    awardData: state => {
      return state.awardData;
    },
    awardNext: (state, getters) => {
      return getters.awardData.next;
    }
  },
  mutations: {
    SET_LOTTERY_DATA: (state, payload) => {
      state.lotteryData = payload;
    },
    SET_GROUP_DATA: (state, payload) => {
      state.groupData = payload;
    },
    SET_PLAY_DATA: (state, payload) => {
      state.playData = payload;
    },
    SET_AWARD_DATA: (state, payload) => {
      state.awardData = payload;
    },
    SET_AWARD_NEXT: (state, payload) => {
      state.awardNext = payload;
    },
    SET_GROUP_DATA_ID: (state, payload) => {
      state.groupData.id = payload;
    },
    SET_PLAY_DATA_ID: (state, payload) => {
      state.playData.id = payload;
    }
  },
  actions: {
    setLotteryData: (context, payload) => {
      context.commit("SET_LOTTERY_DATA", payload);
    },
    setGroupData: (context, payload) => {
      context.commit("SET_GROUP_DATA", payload);
    },
    setPlayData: (context, payload) => {
      context.commit("SET_PLAY_DATA", payload);
    },
    setAwardData: (context, payload) => {
      context.commit("SET_AWARD_DATA", payload);
    },
    setAwardNext: (context, payload) => {
      context.commit("SET_AWARD_NEXT", payload);
    }
  }
};

export default Lottery;
