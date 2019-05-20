import { initialHome } from "../api";

const Home = {
  state: {
    initHome: "",
    isOpen: "",
    isImg: "",
    announcementFlag: 0
  },
  getters: {
    initHome: state => {
      return state.initHome;
    },
    isOpen: state => {
      return state.isOpen;
    },
    isImg: state => {
      return state.isImg;
    },
    announcementFlag: state => {
      return state.announcementFlag;
    }
  },
  mutations: {
    INITIAL_HOME: (state, payload) => {
      state.initHome = payload;
      state.isOpen = payload.dialog.isOpen;
      state.isImg = payload.dialog.isImg;
    },
    ANNOUNCEMENT_FLAG: (state, payload) => {
      state.announcementFlag = payload;
    }
  },
  actions: {
    initialHome({ commit }) {
      initialHome().then(res => {
        commit("INITIAL_HOME", res.data);
        if (!sessionStorage.announcementFlag) {
          commit("ANNOUNCEMENT_FLAG", res.data.dialog.isOpen);
        } else {
          commit("ANNOUNCEMENT_FLAG", 0);
        }
      });
    }
  }
};

export default Home;
