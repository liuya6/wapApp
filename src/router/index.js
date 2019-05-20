import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Homes from "./home";
import Halls from "./hall";
import Record from "./record";
import User from "./user";
import Toast from "mint-ui/packages/toast/src/toast";

const Activity = () =>
  import(/* webpackChunkName:'first' */ "../views/ActivityNEW");
const ApplyActivityList = () => import("../views/ApplyActivityList");
const ApplyActivityDetail = () => import("../views/ApplyActivityDetail");
const router = new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    ...Homes,
    ...Halls,
    ...Record,
    ...User,
    {
      path: "/activity",
      name: "activity",
      meta: {
        keepAlive: true, // 缓存视图
        DocumentTitle: "优惠大厅"
      },
      component: Activity
    },
    // 用户活动申请记录
    {
      path: "/activity/applyactivitylist",
      name: "applyactivitylist",
      meta: {
        keepAlive: false // 缓存视图
      },
      component: ApplyActivityList
    },
    // 用户活动申请详情
    {
      path: "/activity/activitydetail/:id",
      name: "activitydetail",
      meta: {
        keepAlive: false // 缓存视图
      },
      component: ApplyActivityDetail
    },
    {
      path: "/",
      redirect: "/home"
    }
  ]
});

router.beforeEach((to, from, next) => {
  let userInfo = router.app.$options.store.getters.userInfo;
  // console.log(to.meta, userInfo, 11111)
  if (to.meta.denyAuth) {
    // console.log(222222222)
    if (userInfo) {
      return next({
        name: "user"
        // query: { redirect: to.fullPath }
      });
    }
  }
  if (to.meta.requiresAuth) {
    if (!userInfo) {
      // 登录验证
      // 将跳转的路由path作为参数，登录成功后跳转到该路由
      // next = push
      console.log(to.fullPath);
      return next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
    if (!to.meta.allowedTest && userInfo.parentId == 312) {
      // 试玩账号验证
      Toast("试玩账号无法进入");
      return next(false);
    }
  }
  return next();
});

export default router;
