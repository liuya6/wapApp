import { fetch } from "@/axios/index";

/* 首页合并数据 √ */
export function initialHome() {
  return fetch({
    url: "/index/home",
    method: "get",
    loading: true
  });
}
/*首页合并数据 √ */
export function initHome() {
  return fetch({
    url: "/index/initHome",
    method: "get",
    loading: true
  });
}

/* 首页合并数据 √ */
export function initGame() {
  return fetch({
    url: "/index/initGame",
    method: "get"
  });
}

/* 活动列表 */
export function activity(query) {
  return fetch({
    // url: "/articles/activity",
    url: "/activity/index",
    method: "get",
    params: query,
    loading: true
  });
}
/* 活动申请 √ */
export function appllyActivity(query) {
  return fetch({
    // url: "/game",
    url: "/activity/apply",
    method: "post",
    data: query,
    loading: true
  });
}

/* 活动详情 */
export function activityDetail(query) {
  return fetch({
    url: "/activity/detail",
    method: "get",
    params: query,
    loading: true
  });
}

/* 活动申请记录 */
export function activityApplyList(query) {
  return fetch({
    url: "/activity/applyList",
    method: "post",
    data: query,
    loading: true
  });
}
/* 活动申请记录详情 */
export function getActivityDetail(query) {
  return fetch({
    url: "/activity/applyDetail",
    method: "get",
    params: query,
    loading: true
  });
}
/* 系统设置 */
export function oneSetting(query) {
  return fetch({
    url: "/system/oneSetting",
    method: "get",
    params: query
    // loading: true
  });
}

/* 系统设置 */
export function allSetting(query) {
  return fetch({
    url: "/system/settings",
    method: "get",
    params: query
  });
}

export function cashConfigs(query) {
  return fetch({
    url: "/system/cashConfigs",
    method: "get",
    params: query
  });
}

/**红包页面 */
export function redPacket() {
  return fetch({
    url: "/activity/redPacket",
    method: "get"
  });
}
/**点击红包请求 */
export function grabRedPacket(query) {
  return fetch({
    url: "/activity/grabRedPacket",
    method: "post",
    data: query
  });
}
