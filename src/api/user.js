import { fetch } from "@/axios/index";

/* 注册字段 √ */
export function registerField() {
  return fetch({
    url: "/auth/registerBefore",
    method: "get",
    loading: true
  });
}

/* 银行卡 */
export function bankCard() {
  return fetch({
    url: "/member/bindingBefore",
    method: "get",
    loading: true
  });
}

/* 注册 */
export function register(query) {
  return fetch({
    url: "/auth/register",
    method: "post",
    data: query,
    loading: true
  });
}

/* 检查登录状态 */
export function isLogin() {
  return fetch({
    url: "/auth/checkLogin",
    method: "get"
  });
}

/* 登录 */
export function goLogin(query) {
  return fetch({
    url: "/auth/login",
    method: "post",
    data: query,
    loading: true
  });
}

/* 退出账号 */
export function loginOut() {
  return fetch({
    url: "/auth/logout",
    method: "get"
  });
}

/* 个人中心 */
export function person() {
  return fetch({
    url: "/index/member",
    method: "get",
    loading: true
  });
}

/* 绑定银行卡 */
export function bindingBank(query) {
  return fetch({
    url: "/member/binding",
    method: "post",
    data: query,
    loading: true
  });
}

/* 试玩账号 */
export function Play() {
  return fetch({
    url: "/auth/registerFree",
    method: "post",
    loading: true
  });
}

/* 修改提现密码 */
export function changeWithdrawPwd(query) {
  return fetch({
    url: "/member/resetCoinPassword",
    method: "post",
    data: query
  });
}

/* 修改登录密码 */
export function changeUserPwd(query) {
  return fetch({
    url: "/member/resetPassword",
    method: "post",
    data: query
  });
}

/* 我的银行卡 */
export function myBankCard() {
  return fetch({
    url: "/member/bank",
    method: "get",
    loading: true
  });
}

/* 提现金额 */
export function withdrawMoney(query) {
  return fetch({
    url: "/cash/withdraw",
    method: "post",
    data: query,
    loading: true
  });
}

/* 充值准备 */
export function rechargeBefore() {
  return fetch({
    url: "/cash/rechargeBefore",
    method: "get",
    loading: true
  });
}

/* 彩票记录准备 */
export function lotteryRecordStart() {
  return fetch({
    url: "/lottery/recent",
    method: "get",
    params: { pageSize: 5 }
  });
}

/* 彩票记录 */
export function lotteryRecord(query) {
  return fetch({
    url: "/lottery/record",
    method: "get",
    params: query,
    loading: true
  });
}

/* 棋牌记录 */
export function gameRecord(query) {
  return fetch({
    url: "/chess/record",
    method: "get",
    params: query,
    loading: true
  });
}

/* 彩票详情 */
export function lotteryDetail(query) {
  return fetch({
    url: "/lottery/recordDetail",
    method: "get",
    params: query,
    loading: true
  });
}

/* 棋牌详情 */
export function gameDetail(query) {
  return fetch({
    url: "/chess/recordDetail",
    method: "get",
    params: query,
    loading: true
  });
}

/* 公告列表 */
export function announcement() {
  return fetch({
    url: "/member/notice",
    method: "get",
    loading: true
  });
}

/* 关于我们 */
export function aboutUs() {
  return fetch({
    url: "/member/about",
    method: "get",
    loading: true
  });
}

/* 充值记录 */
export function rechargeRecord(query) {
  return fetch({
    url: "/cash/rechargeRecord",
    method: "get",
    params: query,
    loading: true
  });
}

/* 提现记录 */
export function withdrawalsRecord(query) {
  return fetch({
    url: "/cash/withdrawRecord",
    method: "get",
    params: query,
    loading: true
  });
}

/* 账目明细 */
export function accountDetails(query) {
  return fetch({
    url: "/cash/account",
    method: "get",
    params: query,
    loading: true
  });
}

/* 三方跳转 */
export function thirdParty(query) {
  return fetch({
    url: "/cash/rechargeJump",
    method: "post",
    data: query,
    loading: true
  });
}

/* 充值申请 */
export function rechargeApply(query) {
  return fetch({
    url: "/cash/rechargeApply",
    method: "post",
    data: query,
    loading: true
  });
}

/* 充值申请完后提交 */
export function rechargeSubmit(query) {
  return fetch({
    url: "/cash/rechargeSubmit",
    method: "post",
    data: query,
    loading: true
  });
}

/* 消息列表 */
export function msgList(query) {
  return fetch({
    url: "/member/message",
    method: "get",
    params: query,
    loading: true
  });
}

/* 消息详情 */
export function msgDetail(query) {
  return fetch({
    url: "/member/messageDetail",
    method: "get",
    params: query,
    loading: true
  });
}

/* 在线客服 */
export function service() {
  return fetch({
    url: "/system/service",
    method: "get",
    loading: true
  });
}

/* 额度转换列表 */
export function thirdMoney(query) {
  return fetch({
    // url: "/chess/getThirdConvertList",
    url: "/game/thirdMoney",
    method: "POST",
    data: query
  });
}

export function thirdGameList() {
  return fetch({
    // url: "/chess/getThirdConvertList",
    url: "/game/thirdGameList",
    method: "get",
    loading: true
  });
}
/* 额度转换列表 */
export function getThirdConvertList() {
  return fetch({
    // url: "/chess/getThirdConvertList",
    url: "/game/thirdAllMoney",
    method: "get",
    loading: true
  });
}
/* 会员中心*/
export function getMember() {
  return fetch({
    url: "/member/memberLevel",
    method: "get",
    loading: true
  });
}
/* 归户 */
export function exchangeAllToLottery() {
  return fetch({
    // url: "/chess/exchangeAllToLottery",
    url: "/game/exchangeAllToLottery",
    method: "get",
    loading: true
  });
}

/* 额度转换 */
export function exchangeMoney(query) {
  return fetch({
    // url: "/chess/exchangeMoney",
    url: "/game/exchangeMoney",
    method: "post",
    data: query,
    loading: true
  });
}
/* 游戏记录Title */
export function recordTitle() {
  return fetch({
    url: "/game/recordTitle",
    method: "get",
    loading: true
  });
}
/* 电子游戏记录 */
export function thirdRecord(query) {
  return fetch({
    url: "/game/thirdRecord",
    method: "post",
    data: query,
    loading: true
  });
}
/*消息实时通知*/
export function getMessage() {
  return fetch({
    url: "member/getMessage",
    method: "get"
  });
}

/*消息实时通知*/
export function spread() {
  return fetch({
    url: "member/spread",
    method: "get"
  });
}
/*消息实时通知*/
export function spreadList() {
  return fetch({
    url: "member/spreadList",
    method: "get"
  });
}
/*长龙列表*/
export function changLongList() {
  return fetch({
    url: "/lottery/changLong",
    method: "get"
  });
}
