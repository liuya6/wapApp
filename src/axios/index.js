import axios from "axios";
import Vue from "vue";
import router from "../router/index";
import { Indicator, Toast, MessageBox } from "mint-ui";
import { Base64 } from "js-base64";
import md5 from "md5";
Vue.use(router);

axios.defaults.retry = 5; // 重新请求次数
axios.defaults.retryDelay = 5000; // 重新请求间隔
axios.defaults.timeout = 30000; // 超时时间
axios.defaults.loading = false; // 是否显示loading图
axios.defaults.withCredentials = true; // 跨域请求时是否需要使用凭证
// request拦截器
axios.interceptors.request.use(
  config => {
    // 根据配置显示loading页面
    if (config.loading) {
      Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
    }
    return config;
  },
  error => {
    console.log("===axios.request.[error]===", error.message);
    return Promise.reject(error);
  }
);

// http响应拦截器
axios.interceptors.response.use(
  response => {
    Indicator.close();
    let responseJson = response.data;
    let currentVersion = sessionStorage.version;
    let apiVersion = responseJson.version;
    if (apiVersion && apiVersion !== currentVersion) {
      sessionStorage.version = apiVersion;
      if (currentVersion) {
        window.location.reload();
      }
    }

    /* 未签名 1000 */
    if (responseJson.code === 1000) {
      return Toast({
        message: "请求签名错误",
        position: "middle",
        duration: 2000
      });
    }
    /* 未登录跳转代码1001 */
    if (responseJson.code === 1001 || responseJson.code === 101) {
      // 跳转登录页面
      let url = "/login";
      Toast({
        message: "用户未登录或登录超时",
        position: "middle",
        duration: 2000
      });
      console.log(
        router.currentRoute.name,
        router.currentRoute,
        "【http响应拦截器】"
      );
      router.push({
        path: url,
        query: { redirect: router.currentRoute.fullPath }
      });
      // return router.replace(url + "?last=" + router.currentRoute.fullPath);
    }
    /* must需要返回response，否则封装的函数无法得到返回值 */
    return responseJson;
  },
  error => {
    return Promise.reject(error);

    // todo:页面跳转，中断请求
    // let config = error.config;
    // config.baseURL = "";
    // if (!config || !config.retry) return Promise.reject(error);
    // config.__retryCount = config.__retryCount || 0;
    // if (config.__retryCount >= config.retry) {
    //   MessageBox.alert("网络请求错误,请刷新页面").then(action => {
    //     return window.location.reload();
    //   });
    //   return Promise.reject(error);
    // }
    // config.__retryCount += 1;
    // let backOff = new Promise(function(resolve) {
    //   setTimeout(function() {
    //     resolve();
    //   }, config.retryDelay || 1);
    // });
    // return backOff.then(function() {
    //   return axios(config);
    // });
  }
);

// 统一请教模版
export function fetch(config) {
  let data = {};
  let params = {};
  config.method = config.method.toUpperCase();
  switch (config.method) {
    case "GET":
      params = config.params || {};
      if (process.env.VUE_APP_SIGN_SWITCH) {
        params = generateSign(params);
      }
      break;
    case "POST":
      data = config.data || {};
      if (process.env.VUE_APP_SIGN_SWITCH) {
        data = generateSign(data);
      }
      break;
  }
  return axios({
    loading: config.loading || false,
    method: config.method, // 请求方法get,post,put,delete
    url: config.url, // 请求地址
    params: params, // get请求数据
    data: data, // post请求数据
    baseURL: "/api", // api的base_url
    headers: {
      // 即将被发送的自定义请求头
      accept: "application/json"
    }
  }).catch(error => {
    return error.message;
  });
}

/**
 * 签名
 * @param params
 * @returns {{[p: string]: *}}
 */
function generateSign(params) {
  let appName = process.env.VUE_APP_NAME;
  let appKey = process.env.VUE_APP_KEY;
  let timestamp = Math.floor(new Date().getTime() / 1000);
  let str = handleParams(params);
  let sign = Base64.encode(md5(appName + appKey + timestamp + str));
  let obj = {
    ...params,
    appName,
    timestamp,
    sign
  };
  return obj;
}

/**
 * 排序后拼接成字符串
 * @param obj
 * @returns {string}
 */
function handleParams(obj) {
  let str = "";
  let arr = Object.keys(obj).sort((a, b) => {
    return a.localeCompare(b);
  });
  for (let i in arr) {
    str += arr[i] + obj[arr[i]];
  }
  return str;
}
