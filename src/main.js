import "@babel/polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import "./style/index.less";
// import "./registerServiceWorker";

import "mint-ui/lib/style.css";
import {
  Swipe,
  SwipeItem,
  Toast,
  Lazyload,
  TabContainer,
  TabContainerItem,
  Spinner,
  Progress,
  Range,
  MessageBox,
  Indicator,
  Loadmore,
  Popup,
  Picker,
  Navbar,
  TabItem,
  InfiniteScroll
} from "mint-ui";

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Progress.name, Progress);
Vue.component(Spinner.name, Spinner);
Vue.component(Range.name, Range);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.use(Lazyload);
Vue.use(InfiniteScroll);

import VueClipboard from "vue-clipboard2"; //银行卡复制模块
Vue.use(VueClipboard);

import Foot from "@/components/common/Footer.vue";
import ImgLoading from "@/components/common/ImgLoading.vue";
import Timer from "@/components/common/Timer.vue";
Vue.component("my-Foot", Foot);
Vue.component("my-img", ImgLoading);
Vue.component("my-timer", Timer);

import VueCookies from "vue-cookies";

Vue.use(VueCookies);

import BetFunc from "./common/betFunc";

Vue.use(BetFunc);

Vue.prototype.back = function() {
  //全局返回
  if (window.history.length < 3) {
    return router.push({ name: "home" });
  }
  router.go(-1);
};

Vue.prototype.$_eval = function(fn) {
  return new Function("return " + fn)();
};

Vue.prototype.imgUrl = function(url, type = "") {
  //图片地址获取
  if (type === "Lottery") {
    // 带有图片格式
    return `/images${url}`;
    // return require("./assets/images" + url);
  } else if (type === "lottery") {
    return `/images/lottery/${url}.png`;
    // return require("./assets/images/lottery/" + url + ".png");
  } else {
    return `${url}`;
    // return require("./assets" + url);
  }
};
Vue.prototype.playGame = function(
  typeKey,
  link,
  id,
  title,
  classify = 0,
  enName,
  isHall
) {
  if (typeKey === "Lottery") {
    this.$router.push({
      name: "bet",
      params: { id: id, classify: classify },
      query: { title: title }
    });
    this.$store.dispatch("clearCartCode");
  } else {
    if (isHall) {
      return this.$router.push({
        name: "electronicgames",
        params: { enName }
      });
    }
    if (!link) {
      return Toast("敬请期待");
    }
    return this.winOpen(link);
    // return window.location = link;
    // if (typeKey === "SX") {
    //   typeKey = enName;
    // }
    // this.$router.push({ name: "thirdGame", params: { type: typeKey, id: id } });
  }
};
Vue.prototype.bankImg = function(url) {
  //银行卡图片
  return `/images/${url}`;
  // return require("./assets/" + url);
};
Vue.prototype.bankNum = function(card) {
  return card
    .replace(/\s/g, "")
    .replace(/(\d{4})\d+(\d{4})$/, "$1 **** **** $2");
};
Vue.directive("focus", {
  //全局input聚焦
  inserted: function(el) {
    el.focus();
  }
});
Vue.prototype.timestampToString = function(timestamp = +new Date()) {
  //解析时间戳
  if (timestamp) {
    let time = new Date(timestamp * 1000);
    let y = time.getFullYear();
    let M = time.getMonth() + 1;
    let d = time.getDate();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    M = M < 10 ? "0" + M : M;
    d = d < 10 ? "0" + d : d;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
  } else {
    return "";
  }
};
Vue.prototype.times = function() {
  this.$store.commit("CHANGE_ISRUN", 1);
  clearInterval(this.setTimer);
  let that = this;
  if (!!this.awardData.next.actionTime && !!this.awardData.nowTime) {
    var time = this.awardData.next.actionTime - this.awardData.nowTime;
  }
  if (time > 0) {
    this.setTimer = setInterval(function() {
      time--;
      if (time / 60 > 60) {
        var house =
          parseInt(time / 60 / 60) >= 10
            ? parseInt(time / 60 / 60)
            : "0" + parseInt(time / 60 / 60);
        var mins =
          parseInt((time / 60) % 60) >= 10
            ? parseInt((time / 60) % 60)
            : "0" + parseInt((time / 60) % 60);
      }
      let min =
        parseInt(time / 60) >= 10
          ? parseInt(time / 60)
          : "0" + parseInt(time / 60);
      let sec = time % 60 >= 10 ? time % 60 : "0" + (time % 60);
      if (house) {
        that.time = house + ":" + mins + ":" + sec;
        return;
      } else {
        that.time = "00:" + min + ":" + sec;
      }
      if (time <= that.lotteryData.data_ftime) {
        if (that.$store.getters.isRun) {
          that.$emit("timeOver", time);
          that.$store.commit("CHANGE_ISRUN", 0);
        }
        if (time <= 0) {
          that.time = "00:00:00";
        }
      }
    }, 1000);
  }
};
Vue.prototype.winOpen = function(url, width, height, left, top, name) {
  if (!this.$store.getters.userInfo) {
    return router.push({
      name: "login",
      query: { redirect: router.currentRoute.fullPath }
    });
  }
  var temp =
    "menubar=no,toolbar=no,directories=no,scrollbars=yes,resizable=no,location=no";
  if (parseInt(width) > 0) {
    temp += ",width=" + width;
  } else {
    width = window.screen.availWidth;
  }
  if (parseInt(height) > 0) {
    temp += ",height=" + height;
  } else {
    height = window.screen.availHeight;
  }
  if (parseInt(left) > 0) {
    temp += ",left=" + left;
  } else {
    temp +=
      ",left=" + Math.round((window.screen.availWidth - parseInt(width)) / 2);
  }
  if (parseInt(top) > 0) {
    temp += ",top=" + top;
  } else {
    temp +=
      ",top=" + Math.round((window.screen.availHeight - parseInt(height)) / 2);
  }
  if (typeof name == "undefined") {
    name = "";
  }
  window.open(url, name, temp);
};

// Vue.prototype.setFontSize = function() {
//   var $dom = document.documentElement;
//   // 基础字体大小
//   var baseFontSize = 36;
//   // 计算出放大后的字体
//   var scaledFontSize = parseInt(
//     window.getComputedStyle($dom, null).getPropertyValue("font-size"),
//     10
//   );
//   // document.body.removeChild($dom);
//   // 计算原字体和放大后字体的比例
//   var scaleFactor = baseFontSize / scaledFontSize;
//
//   // 取html元素的字体大小
//   // 注意，这个大小也经过缩放了
//   // 所以下方计算的时候 *scaledFontSize是原来的html字体大小
//   // 再次 *scaledFontSize才是我们要设置的大小
//   var originRootFontSize = parseInt(
//     window.getComputedStyle($dom, null).getPropertyValue("font-size"),
//     10
//   );
//   // $dom.style.fontSize = originRootFontSize * scaleFactor * scaleFactor + 'px';
//   var targetFontSize = parseInt(
//     originRootFontSize * scaleFactor * scaleFactor,
//     10
//   );
//   $dom.style = "font-size: " + targetFontSize + "px !important";
//   alert("1111111111111")
//   console.log(
//     `scaledFontSize=${scaledFontSize}`,
//     `scaleFactor=${scaleFactor}`,
//     `originRootFontSize=${originRootFontSize}`,
//     `targetFontSize=${targetFontSize}`,
//     "font-size222222222"
//   );
//   // confirm(`scaledFontSize=${scaledFontSize},scaleFactor=${scaleFactor}, originRootFontSize=${originRootFontSize}, targetFontSize=${targetFontSize}`);
// };

Vue.directive("title", {
  // 指令的定义
  inserted: function(el, binding) {
    if (!router.currentRoute.meta.keepAlive) {
      let titles = router.app.$options.store.getters.webName;
      if (binding.value !== "") {
        titles = binding.value + " - " + titles;
      }
      document.title = titles;
    }
  },
  update: function(el, binding) {
    let routerName = router.history.current.name;
    if (routerName === "bet" || router.currentRoute.meta.keepAlive) {
      let titles = router.app.$options.store.getters.webName;
      let bindingVal = router.currentRoute.meta.DocumentTitle;
      if (routerName === "bet") {
        bindingVal = binding.value;
      }
      titles = bindingVal + " - " + titles;
      document.title = titles;
    }
  }
});

Vue.prototype.playAudio = () => {
  let Audios = document.getElementById("eventAudio");
  Audios.play();
};
Vue.prototype.pauseAudio = () => {
  let Audios = document.getElementById("eventAudio");
  Audios.pause();
};

Vue.filter("timeGO", function(timeVal) {
  if (timeVal > 0) {
    let house =
      parseInt(timeVal / 60 / 60) >= 10
        ? parseInt(timeVal / 60 / 60)
        : "0" + parseInt(timeVal / 60 / 60);
    let mins =
      parseInt((timeVal / 60) % 60) >= 10
        ? parseInt((timeVal / 60) % 60)
        : "0" + parseInt((timeVal / 60) % 60);
    let sec = timeVal % 60 >= 10 ? timeVal % 60 : "0" + (timeVal % 60);
    return house + ":" + mins + ":" + sec;
  } else {
    return "开奖中...";
  }
});
import "lib-flexible/flexible.js"; // 移动端自适应

Vue.config.productionTip = false;
console.log("入口文件");
new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // this.setFontSize();
  },
  mounted() {
    // document.dispatchEvent(new Event("render-event"));
  },
  updated() {
    // this.setFontSize();
  }
}).$mount("#app");
