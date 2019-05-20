const Home = () => import(/* webpackChunkName:'first' */ "../views/Home.vue");
const RedPacket = () =>
  import(/* webpackChunkName:'first' */ "../views/RedPacket.vue");
const ChangLong = () =>
  import(/* webpackChunkName:'first' */ "../views/ChangLong.vue");
const ChangLongLegend = () =>
  import(/* webpackChunkName:'first' */ "../views/ChangLongLegend");
// const Skeleton = () => import("../views/Skeleton");
export default [
  {
    path: "/home",
    name: "home",
    meta: {
      keepAlive: true, // 缓存视图
      requiresAuth: false, // 登录验证
      allowedTest: false, // 允许测试账号
      DocumentTitle: "首页"
    },
    component: Home
  },
  {
    path: "/redpacket",
    name: "redpacket",
    meta: {
      keepAlive: false, // 缓存视图
      requiresAuth: true, // 登录验证
      allowedTest: false // 允许测试账号
    },
    component: RedPacket
  },
  {
    path: "/changlong",
    name: "changlong",
    meta: {
      requiresAuth: true, // 登录验证
      allowedTest: true // 允许测试账号
    },
    component: ChangLong
  },
  {
    path: "/changlonglegend",
    name: "changlonglegend",
    meta: {
      allowedTest: true // 允许测试账号
    },
    component: ChangLongLegend
  }
  // {
  //   path: "/Skeleton",
  //   name: "Skeleton",
  //   component: Skeleton
  // }
];
