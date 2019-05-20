import { fetch } from "@/axios/index";

/* 新游戏大厅 √ */
export function newAllGame() {
  return fetch({
    url: "/index/hallNew",
    method: "get",
    loading: true
  });
}
/* 第三方游戏大厅 √ */
export function thirdHall(query) {
  return fetch({
    url: "/game/thirdHall",
    method: "get",
    params: query,
    loading: true
  });
}
/* 彩票列表 */
export function lotteryList() {
  return fetch({
    url: "/lottery/index",
    method: "get",
    loading: true
  });
}

/* 彩票玩法 */
export function lotteryGroup(query) {
  return fetch({
    // url: "/game/lotteryGroup",
    url: "/lottery/group",
    method: "get",
    params: query,
    loading: true
  });
}

/* 彩票开奖 */
export function lotteryAward(query) {
  return fetch({
    url: "/lottery/award",
    method: "get",
    params: query
  });
}

/* 玩法说明 */
export function lotteryIntro(query) {
  return fetch({
    url: "/lottery/intro",
    method: "get",
    params: query,
    loading: true
  });
}

/* 随机号码 */
export function lotteryRandom(query) {
  return fetch({
    url: "/lottery/random",
    method: "get",
    params: query,
    loading: true
  });
}

/* 历史开奖 */
export function lotteryHistory(query) {
  return fetch({
    url: "/lottery/history",
    method: "get",
    params: query,
    loading: true
  });
}

/* 购买彩票 */
export function lotteryBuy(query) {
  return fetch({
    url: "/lottery/buy",
    method: "post",
    data: query,
    loading: true
  });
}

/* 追号 */
export function lotteryFuture(query) {
  return fetch({
    url: "/lottery/future",
    method: "get",
    params: query,
    loading: true
  });
}

/*KY棋牌进入游戏*/
export function chessEnter(query) {
  return fetch({
    url: "/chess/enter",
    method: "get",
    params: query
    // loading: true
  });
}

export function thirdEnter(query) {
  return fetch({
    url: "/game/thirdEnter",
    method: "get",
    params: query
    // loading: true
  });
}

/* 六合彩生肖号码 */
export function sixZodiacNumber(query) {
  return fetch({
    url: "/lottery/sixZodiacNumber",
    method: "get",
    params: query
  });
}

/*系统返点*/
export function sysFandian(query) {
  return fetch({
    url: "/system/sysFandian",
    method: "get",
    params: query
  });
}

// 撤销投注
export function lotteryCancel(query) {
  return fetch({
    url: "/lottery/cancel",
    method: "post",
    data: query
  });
}
/* 单位模式 */
export function sysUnit() {
  return fetch({
    url: "/system/sysUnit",
    method: "get"
  });
}
