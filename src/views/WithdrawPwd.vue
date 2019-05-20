<style scoped lang="less">
.body {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top {
    height: 100px;
    line-height: 100px;
    font-size: 37px;
    color: white;
    background-color: #605aa2;
    position: relative;

    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
    }

    span {
      color: white;
      font-weight: normal;
      position: absolute;
      right: 25px;
      font-size: 30px;
    }
  }

  .content {
    background-color: #f6f6f6;
    flex: 1;
    overflow-y: scroll;

    dl {
      dt {
        line-height: 109px;
        font-size: 32px;
        margin: 66px 0 33px 0;
        border-top: 1px solid #e0dcd9;
        border-bottom: 1px solid #e0dcd9;
        background-color: #ffffff;
        text-align: left;
        padding-left: 23px;
      }

      dd {
        line-height: 109px;
        font-size: 32px;
        background-color: #ffffff;
        text-align: left;
        padding-left: 23px;
        border-bottom: 1px solid #e0dcd9;
      }

      dd:nth-child(2) {
        border-top: 1px solid #e0dcd9;
      }

      span {
        margin-right: 50px;
        color: #454545;
      }

      input {
        font-size: 30px;
        width: 500px;
        border: 0;
      }
    }
    p {
      margin-top: 135px;
      font-size: 25px;
      color: #666666;
      letter-spacing: 2px;
      span {
        a {
          color: #1c58f6;
        }
      }
    }
  }
}
</style>
<template>
  <div class="body" v-title="'设置提现密码'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      设置提现密码
      <span class="iconfont" @click="changePwd">完成</span>
    </div>
    <div class="content">
      <dl>
        <dt>
          <span>旧提现密码</span>
          <input
            type="password"
            placeholder="请输入6位数字密码"
            v-model="user.oldPassword"
          />
        </dt>
        <dd>
          <span>新提现密码</span>
          <input
            type="password"
            placeholder="请输入6位数字密码"
            v-model="user.newPassword"
          />
        </dd>
        <dd>
          <span>确认新密码</span>
          <input
            type="password"
            placeholder="再次输入新密码"
            v-model="user.newPassword_confirm"
          />
        </dd>
      </dl>
      <p>
        如忘记密码，请
        <span>
          <router-link to="/user/service">咨询客服</router-link>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { changeWithdrawPwd } from "../api/index";
import { Toast } from "mint-ui";
export default {
  name: "WithdrawPwd",
  data() {
    return {
      user: {
        oldPassword: "",
        newPassword: "",
        newPassword_confirm: ""
      }
    };
  },
  methods: {
    changePwd() {
      if (!this.user.oldPassword) {
        return Toast("请输入旧密码");
      }
      if (!this.user.newPassword || !this.user.newPassword_confirm) {
        return Toast("请输入新密码");
      } else {
        if (this.user.newPassword != this.user.newPassword_confirm) {
          return Toast("两次输入密码不同");
        }
      }
      changeWithdrawPwd(this.user).then(res => {
        Toast(res.msg);
        if (res.status) {
          this.$router.go(-1);
        }
      });
    }
  }
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$el.className = "body animated slideInRight";
  //   });
  // }
};
</script>
