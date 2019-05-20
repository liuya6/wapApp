const Recording = () =>
  import(/* webpackChunkName:'first' */ "../views/Record");
const ChessDetails = () => import("../views/ChessDetails");
const LotteryDetails = () => import("../views/LotteryDetails");

export default [
  {
    path: "/record",
    name: "record",
    meta: {
      keepAlive: true,
      requiresAuth: true, // 登录验证
      allowedTest: true, // 允许测试账号
      DocumentTitle: "游戏记录"
    },
    component: Recording
  },
  {
    path: "/record/chessdetails",
    name: "chessdetails",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: true // 允许测试账号
    },
    component: ChessDetails
  },
  {
    path: "/record/lotterydetails/:classify",
    name: "lotterydetails",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: true // 允许测试账号
    },
    component: LotteryDetails
  }
];
