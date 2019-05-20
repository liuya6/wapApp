<template>
  <div class="body" v-title="'用户中心'">
    <div class="content">
      <div class="top shenLan">
        <div>
          <span>
            <router-link to="/user/service">
              <i class="iconfont">&#xe616;</i>
              在线客服
            </router-link>
          </span>
          <span>
            <router-link to="/user/accountdetails">
              <i class="iconfont">&#xe618;</i>
              账目明细
            </router-link>
          </span>
        </div>
        <div></div>
        <div>
          <span>{{ userInfo ? userInfo.coin : 0 }}</span>
          余额（元）
        </div>
        <div>
          <span class="qianLan" @click="goUsertransform">
            <i class="iconfont">&#xe685;</i>
            额度转换
          </span>
          <span class="qianLan" @click="goRecharge">
            <i class="iconfont">&#xe619;</i>
            立即充值
          </span>
          <span class="qianLan" @click="goWithdraw">
            <i class="iconfont">&#xe61a;</i>
            立即提现
          </span>
        </div>
      </div>
      <div class="user-content" v-if="userInfo.username">
        <ul>
          <li class="title">账户信息</li>
          <li>
            <span>会员账号</span>
            <span>{{ userInfo.username || "" }}</span>
          </li>
          <li v-show="tjShowFlag == '1'">
            <router-link to="/user/myspread">
              <span>推荐码</span>
              <span>{{ userInfo.uid || "无" }}</span>
              <i class="iconfont">&#xe669;</i>
            </router-link>
          </li>
          <li @click="goMember" v-if="VipShow">
            <span>会员中心</span>
            <span>{{ userInfo.LevelName || "0级" }}</span>
            <i class="iconfont">&#xe669;</i>
          </li>
          <li @click="goAgent" v-show="allConfig.isWapAgent == '1'">
            <span>代理中心</span>
            <span>点击进入</span>
            <i class="iconfont">&#xe669;</i>
          </li>
          <!--<li class="title">安全中心</li>-->
          <li @click="boundBank">
            <span>银行账户</span>
            <span v-if="userInfo.bankNum" style="color: #4cd607"
              >已绑定{{ userInfo.bankNum }}张</span
            >
            <i class="iconfont">&#xe669;</i>
          </li>
          <li v-if="userInfo.coinPassword">
            <router-link to="/user/withdrawpwd">
              <span>提现密码</span>
              <i class="iconfont">&#xe669;</i>
            </router-link>
          </li>
          <li @click="goLoginPwd">
            <div>
              <span>登录密码</span>
              <i class="iconfont">&#xe669;</i>
            </div>
          </li>
          <li>
            <span>手机号码</span>
            <span style="color: #4cd607">{{ mobile }}</span>
          </li>
          <li class="title">系统信息</li>
          <li>
            <router-link to="/user/mymsg">
              <span>我的消息</span>
              <span class="msg" v-show="userInfo.unread">
                {{ userInfo.unread }}
              </span>
              <i class="iconfont">&#xe669;</i>
            </router-link>
          </li>
          <li>
            <router-link to="/user/announcementlist">
              <span>公告列表</span>
              <i class="iconfont">&#xe669;</i>
            </router-link>
          </li>
          <li>
            <router-link to="/user/aboutus">
              <span>关于我们</span>
              <i class="iconfont">&#xe669;</i>
            </router-link>
          </li>
          <li @click="LoginOut">
            <span>退出账号</span>
            <i class="iconfont">&#xe669;</i>
          </li>
        </ul>
      </div>
    </div>
    <my-Foot class="foot"></my-Foot>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { loginOut, person, oneSetting } from "../api";
import { MessageBox, Toast } from "mint-ui";
export default {
  name: "user",
  data() {
    return {
      VipShow: true
    };
  },
  created() {
    this.PersonDetail();
    if (
      this.userInfo.parentId == 312 ||
      this.allConfig.isWapUserLevel !== "1"
    ) {
      this.VipShow = false;
    } else {
      this.VipShow = true;
    }
  },
  computed: {
    ...mapGetters(["userInfo", "allConfig", "tjShowFlag"]),
    mobile() {
      if (this.userInfo.mobile) {
        var left = this.userInfo.mobile.substring(0, 3);
        var middle = this.userInfo.mobile.substring(3, 7);
        var right = this.userInfo.mobile.substring(7);
        return left + " " + middle + " " + right;
      }
      return "";
    }
  },
  methods: {
    ...mapMutations(["CLEAR_USER_INFO", "SET_USER_INFO"]),
    LoginOut() {
      MessageBox.confirm("确定退出账号?")
        .then(action => {
          if (action) {
            loginOut().then(res => {
              Toast(res.data);
            });
            this.CLEAR_USER_INFO();
            this.$router.replace({
              name: "login",
              query: {
                redirect: "/home"
              }
            });
          }
        })
        .catch(err => {
          //点了取消进入这里
          console.log(err);
        });
    },
    PersonDetail() {
      person().then(res => {
        try {
          if (res.status) {
            this.SET_USER_INFO(res.data);
          } else {
            this.SET_USER_INFO(null);
          }
        } catch (err) {
          console.log(err, "【PersonDetail-catch】");
        }
      });
    },
    boundBank() {
      if (this.userInfo.parentId === 312) {
        return Toast("试玩用户不可绑定银行卡");
      }
      if (this.userInfo.bankNum) {
        this.$router.push({
          name: "bankcardlist"
        });
      } else {
        this.$router.push({
          name: "boundbank"
        });
      }
    },
    goRecharge() {
      if (this.userInfo.parentId === 312) {
        return Toast("试玩用户不可充值");
      }
      this.$router.push({
        name: "recharge"
      });
    },
    goWithdraw() {
      if (this.userInfo.parentId === 312) {
        return Toast("试玩用户不可提现");
      }
      if (this.userInfo.bankNum) {
        this.$router.push({
          name: "withdraw"
        });
      } else {
        this.$router.push({
          name: "boundbank"
        });
      }
    },
    goLoginPwd() {
      if (this.userInfo.parentId === 312) {
        return Toast("试玩用户不可修改登录密码");
      }
      this.$router.push({
        name: "loginpwd"
      });
    },
    goUsertransform() {
      if (this.userInfo.parentId === 312) {
        return Toast("试玩用户不可额度转换");
      }
      this.$router.push({
        name: "usertransfrom"
      });
    },
    goMember() {
      if (this.userInfo.parentId === 312) {
        return Toast("试玩用户无法进入会员中心页面");
      }
      this.$router.push({ name: "member" });
    },
    goAgent() {
      window.location.href = this.allConfig.agencyUrl;
    }
  }
  // beforeRouteEnter(to, from, next) {
  //   console.log(from)
  //   if (from.fullPath.indexOf("user")>0) {
  //     return next(vm => {
  //       vm.$el.className = "body animated slideInLeft";
  //     });
  //   }
  //   next();
  // },
  // beforeRouteLeave(to, from, next) {
  //   this.$el.className = "body";
  //   return next();
  // }
};
</script>

<style scoped lang="less">
.body {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .content {
    flex: 1;
    overflow-y: scroll;
    .top {
      background-color: #605aa2;
      padding-top: 43px;

      a {
        color: white;
      }

      div:first-child {
        overflow: hidden;

        span {
          font-size: 28px;

          i {
            font-size: 32px;
          }
        }

        span:first-child {
          float: left;
          margin-left: 25px;
        }

        span:last-child {
          float: right;
          margin-right: 25px;
        }
      }

      div:nth-child(2) {
        font-size: 25px;
        margin-top: 45px;

        span {
          font-size: 30px;
          color: white;
        }

        i {
          display: inline-block;
          width: 30px;
          height: 30px;
          vertical-align: bottom;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      div:nth-child(3) {
        text-align: center;
        color: #fff;
        margin: 15px 0 55px 0;

        span {
          font-size: 55px;
          color: white;
          margin-left: 30px;
        }
      }

      div:nth-child(4) {
        display: flex;
        flex-direction: row;
        overflow: hidden;
        span {
          flex: 1;
          display: block;
          float: left;
          line-height: 88px;
          font-size: 27px;
          background-color: #837ebe;
          text-align: center;
          color: white;
          border-right: 1px solid #dc001a; /*no*/
          box-sizing: border-box;
          i {
            font-size: 33px;
            margin-right: 6px;
            font-weight: normal;
          }
        }

        span:last-child {
          border-right: 0;
        }
      }
    }

    .user-content {
      background-color: #f6f6f6;
      padding-bottom: 50px;
      ul {
        li {
          border-bottom: 1px solid #dfdbd8;
          overflow: hidden;
          background-color: #fff;
          padding-left: 22px;

          div {
            overflow: hidden;
          }

          a {
            display: block;
            overflow: hidden;
            position: relative;
            color: #2c3e50;
          }

          span {
            line-height: 109px;
            float: left;
            font-size: 28px;
          }

          span:nth-child(1) {
            display: inline-block;
            width: 180px;
            text-align: left;
          }

          span:nth-child(2) {
            display: inline-block;
            width: 300px;
            text-align: right;
            margin-left: 180px;
            color: #989898;
          }
          span.msg {
            position: absolute;
            top: 31%;
            right: 100px;
            display: block;
            width: 50px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background-color: red;
            color: #fff;
            border-radius: 10px;
            overflow: hidden;
          }
          i {
            float: right;
            margin-right: 20px;
            line-height: 109px;
            font-size: 30px;
          }
        }

        .title {
          background-color: #f6f6f6;
          padding-top: 16px;
          line-height: 44px;
          text-align: left;
          font-size: 26px;
          color: #9a9a9a;
        }
      }
    }
  }
  .foot {
    position: static;
  }
}
</style>
