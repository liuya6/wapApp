import { oneSetting, allSetting } from "../api";

const system = {
  state: {
    webName: "彩票",
    isRun: 1,
    allConfig: {},
    tjShowFlag: true,
    musicFlag: true
  },
  getters: {
    webName: state => {
      return state.webName;
    },
    isRun: state => {
      return state.isRun;
    },
    allConfig: state => {
      return state.allConfig;
    },
    tjShowFlag: state => {
      return state.tjShowFlag;
    },
    musicFlag: state => {
      return state.musicFlag;
    }
  },
  mutations: {
    SET_WEB_NAME: (state, payload) => {
      state.webName = payload;
    },
    CHANGE_ISRUN: (state, payload) => {
      state.isRun = payload;
    },
    SET_ALL_CONFIG: (state, payload) => {
      state.allConfig = payload;
    },
    SET_TJSHOW_Flag: (state, payload) => {
      state.tjShowFlag = payload;
    },
    CHANGE_MUSIC_FLAG: state => {
      console.log("musicFlag-------------", !state.musicFlag);
      state.musicFlag = !state.musicFlag;
    }
  },
  actions: {
    setWebName(context) {
      oneSetting({ name: "webName" }).then(res => {
        if (res.status) {
          context.commit("SET_WEB_NAME", res.data.value);
        }
      });
    },
    tjShow({ commit }) {
      oneSetting({ name: "enableTuijian" }).then(res => {
        if (res.status) {
          commit("SET_TJSHOW_Flag", res.data.value == "1");
        }
      });
    },
    getAllConfig(context) {
      allSetting().then(res => {
        if (res.status) {
          context.commit("SET_ALL_CONFIG", res.data);
        }
      });
    }
  }
};

export default system;
