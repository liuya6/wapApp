import { newAllGame } from "../api";

const Hall = {
  state: {
    NewGameList: "",
    newAllGame: ""
  },
  getters: {
    newAllGame: state => {
      return state.newAllGame;
    }
  },
  mutations: {
    NEW_ALL_GAME: (state, payload) => {
      state.newAllGame = payload;
      state.NewGameList = payload;
    },
    CHANGE_GAMES: (state, payload) => {
      if (state.NewGameList[payload]) {
        state.newAllGame = [state.NewGameList[payload]];
      } else {
        state.newAllGame = state.NewGameList;
      }
    }
  },
  actions: {
    newAllGames({ commit }) {
      newAllGame().then(res => {
        commit("NEW_ALL_GAME", res.data);
      });
    }
  }
};

export default Hall;
