import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import User from "./user";
import Bet from "./bet";
import Cart from "./cart";
import Lottery from "./lottery";
import Home from "./home";
import Hall from "./hall";
import System from "./system";
import NewHall from "./newHall";

const handleStore = store => {
  let storage = window.sessionStorage;
  if (!storage) {
    return console.warn("当前浏览器不支持sessionStorage!");
  }
  /* 初始化store */
  if (sessionStorage.store) {
    let state = JSON.parse(sessionStorage.store);
    store.replaceState(state);
  }
  /* 在每个 action 完成后调用 */
  // store.subscribeAction((action, state) => {
  //   console.log(state)
  //   console.log('vuex-subscribeAction=>', action.type, action.payload)
  // })

  /* 在每个 mutation 完成后调用 */
  store.subscribe((mutation, state) => {
    // console.log(state)
    // console.log('vuex-mutation=>', mutation.type, mutation.payload)
    sessionStorage.setItem("store", JSON.stringify(state));
  });
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    User,
    Bet,
    Lottery,
    System,
    Cart,
    Home,
    Hall,
    NewHall
  },
  plugins: [handleStore]
});
