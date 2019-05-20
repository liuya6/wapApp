const Hall = () => import(/* webpackChunkName:'first' */ "../views/Hall");
const Bet = () => import(/* webpackChunkName:'first' */ "../views/Bet");
const ConfirmPurchase = () => import("../views/ConfirmPurchase");
const ChasingCode = () => import("../views/ChasingCode");
const Cart = () => import("../views/Cart");
const BetRecord = () => import("../views/BetRecord");
const GameDescription = () => import("../views/GameDescription");
const GameTrend = () => import("../views/GameTrend");
const BetHistory = () => import("../views/BetHistory");
const KYchess = () => import("../views/KYchess");
const ElectronicGames = () => import("../views/ElectronicGames");

export default [
  {
    path: "/hall",
    name: "hall",
    meta: {
      keepAlive: true, // 缓存视图
      DocumentTitle: "游戏大厅"
    },
    component: Hall
  },
  {
    path: "/hall/electronicgames/:enName",
    name: "electronicgames",
    meta: {
      keepAlive: true, // 缓存视图
      DocumentTitle: "游戏大厅"
    },
    component: ElectronicGames
  },
  {
    path: "/bet/:id/:classify/confirm",
    name: "confirmpurchase",
    component: ConfirmPurchase
  },
  {
    path: "/bet/:id/:classify/chasing",
    name: "chasingcode",
    component: ChasingCode
  },
  {
    path: "/bet/:id/cart",
    name: "cart",
    component: Cart
  },
  {
    path: "/bet/:id/record",
    name: "betrecord",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: true // 允许测试账号
    },
    component: BetRecord
  },
  {
    path: "/bet/:id/intro",
    name: "gamedescription",
    component: GameDescription
  },
  {
    path: "/bet/:id/trend/:classify",
    name: "gametrend",
    component: GameTrend
  },
  {
    path: "/bet/history/:id/:modeName",
    name: "bethistory",
    component: BetHistory
  },
  {
    path: "/bet/:id/:classify",
    name: "bet",
    component: Bet
  },
  {
    path: "/hall/kychess",
    name: "kychess",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: false // 允许测试账号
    },
    component: KYchess
  },
  {
    path: "/hall/thirdGame",
    name: "thirdGame",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: false // 允许测试账号
    },
    component: KYchess
  }
];
