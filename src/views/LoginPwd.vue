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
        background-color: #fff;
        text-align: left;
        padding-left: 23px;
      }
      dd {
        line-height: 109px;
        font-size: 32px;
        background-color: #fff;
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
    div {
      padding: 28px 28px 0 28px;
      text-align: left;
      font-size: 26px;
    }
    p {
      margin-top: 160px;
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
  <div class="body" v-title="'设置登录密码'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      设置登录密码
      <span class="iconfont" @click="changePwd">完成</span>
    </div>
    <div class="content">
      <dl>
        <dt>
          <span>旧登录密码</span>
          <input
            type="password"
            placeholder="点击输入"
            v-model="user.oldPassword"
          />
        </dt>
        <dd>
          <span>新登录密码</span>
          <input
            type="password"
            placeholder="点击输入"
            v-model="user.newPassword"
          />
        </dd>
        <dd>
          <span>确认新密码</span>
          <input
            type="password"
            placeholder="点击输入"
            v-model="user.newPassword_confirm"
          />
        </dd>
      </dl>
      <div>
        *注意：（1）不能包含空格，（2）8-16个字符，（3）必须包含字母和数字
      </div>
      <p>
        如忘记密码，请<span
          ><router-link to="/user/service">咨询客服</router-link></span
        >
      </p>
    </div>
  </div>
</template>

<script>
import { changeUserPwd } from "../api/index";
import { Toast } from "mint-ui";
export default {
  name: "LoginPwd",
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
        if (
          !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{8,16}$/.test(
            this.user.newPassword
          )
        ) {
          return Toast("请按要求填写密码（8-16个包含字母和数字的组合）");
        }
        if (this.user.newPassword != this.user.newPassword_confirm) {
          return Toast("两次输入密码不同");
        }
      }
      changeUserPwd(this.user).then(res => {
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
