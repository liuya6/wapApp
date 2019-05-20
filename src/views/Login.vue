<template>
  <div class="body" v-title="'登录'">
    <div class="top">
      <i class="iconfont" @click="back">&#xe629;</i>
      登录
    </div>
    <div class="content">
      <ul>
        <li class="username">
          <i class="iconfont">&#xe613;</i>
          <input
            type="text"
            placeholder="请输入账号"
            v-model="user.username"
            @keyup.enter="goLogin"
          />
        </li>
        <li>
          <i class="iconfont">&#xe626;</i>
          <input
            type="password"
            placeholder="请输入密码"
            v-model="user.password"
            @keyup.enter="goLogin"
          />
        </li>
        <li>
          <i class="iconfont">&#xe61c;</i>
          <input
            type="text"
            placeholder="请输入验证码"
            class="code"
            v-model="user.verifyCode"
            @keyup.enter="goLogin"
          />
        </li>
        <li>
          <img :src="codeImg" alt="code" @click="changeCodeImg" />
        </li>
      </ul>
      <div class="middle">
        <div>
          还没有账号？
          <router-link
            :to="{
              name: 'register',
              query: { redirect: this.$route.query.redirect }
            }"
            style="color:#ff8c3f"
            >立即注册</router-link
          >
        </div>
        <div>
          <span>记住密码</span>
          <input type="checkbox" name id="keep" v-model="keep" />
          <label for="keep"></label>
        </div>
      </div>
      <div class="login">
        <p class="shenLan" @click="goLogin">登录</p>
        <p @click="Play">试玩体验</p>
      </div>
      <div class="kefu" v-show="KeFuFlag">
        <router-link to="/user/service">
          <i class="iconfont">&#xe616;</i>
          <span>忘记密码？联系客服</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { goLogin, Play } from "../api/index";
import { Base64 } from "js-base64";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      codeImg: "",
      keep: false,
      fromUrl: this.$route.query.redirect || "/home",
      user: {
        verifyCode: "",
        username: "",
        password: ""
      },
      KeFuFlag: true,
      cliHeight: document.documentElement.clientHeight
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  watch: {
    cliHeight(newVal, oldVal) {
      if (newVal < oldVal) {
        this.KeFuFlag = false;
      } else {
        this.KeFuFlag = true;
      }
    }
  },
  created() {
    if (this.userInfo) {
      return this.$router.replace({ name: "user" });
    }
    this.codeImg = "/api/auth/captcha";
    this.user.username = this.$cookies.get("username")
      ? Base64.decode(this.$cookies.get("username"))
      : "";
    if (this.$cookies.get("password")) {
      this.keep = true;
      this.user.password = Base64.decode(this.$cookies.get("password"));
    }
  },
  mounted() {
    window.onresize = () => {
      this.cliHeight = document.documentElement.clientHeight;
    };
  },
  methods: {
    goBack() {
      let redirect = this.$route.query.redirect;
      console.log(this.$route.query.redirect, "111111111111");
      if (redirect) {
        return this.$router.replace(redirect);
      }
      if (this.myBank.length < 5 || this.$route.query.from) {
        this.$router.go(-1);
      } else {
        this.$router.push({ name: "user" });
      }
    },
    changeCodeImg() {
      this.user.verifyCode = "";
      this.codeImg = "/api/auth/captcha?" + Math.random();
    },
    goLogin() {
      /* 字段验证 */
      if (!this.user.username) {
        return Toast("用户名不能为空");
      }
      if (!this.user.password) {
        return Toast("密码不能为空");
      }
      if (!this.user.verifyCode) {
        return Toast("请输入验证码");
      }
      /* 设置cookie */
      this.$cookies.set("username", Base64.encode(this.user.username), "7d");
      if (this.keep) {
        this.$cookies.set("password", Base64.encode(this.user.password), "7d");
      } else {
        if (this.$cookies.get("password")) this.$cookies.remove("password");
      }
      /* 登录 */
      goLogin(this.user).then(res => {
        if (res.status) {
          console.log(res.data);
          this.$store.commit("SET_USER_INFO", res.data);
          this.$router.replace({
            path: this.fromUrl
          });
        } else {
          this.changeCodeImg();
          Toast(res.msg);
        }
      });
    },
    Play() {
      Play().then(res => {
        if (res.status) {
          this.$store.commit("SET_USER_INFO", res.data);
          Toast("试玩账号注册成功");
          if (this.fromUrl && this.fromUrl != "register") {
            this.$router.replace({
              path: this.fromUrl
            });
          } else {
            this.$router.push({
              name: "home"
            });
          }
        } else {
          Toast("试玩已关闭");
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.body {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.top {
  height: 81px;
  line-height: 81px;
  font-size: 37px;
  position: relative;
  color: #000;
  background: #fafafa;
  border-bottom: 1px solid #ebebeb;
  i {
    font-size: 50px;
    position: absolute;
    left: 20px;
  }
}

.content {
  background: #fafafa;
  flex: 1;
  overflow-y: scroll;

  ul {
    overflow: hidden;

    li {
      width: 669px;
      height: 100px;
      margin-left: 41px;
      margin-top: 51px;
      border-radius: 15px;
      line-height: 100px;
      position: relative;
      background: #fff;
      border: 1px solid #ebebeb;

      i {
        font-size: 45px;
        color: #666;
        float: left;
        margin-left: 30px;
      }

      input {
        background: none;
        outline: none;
        border: 0;
        color: #666;
        height: 44px;
        line-height: 44px;
        font-size: 30px;
        float: left;
        margin-top: 28px;
        margin-left: 23px;
        width: 550px;
      }

      input::-webkit-input-placeholder {
        color: #aab2bd;
      }
    }

    li:nth-child(3) {
      width: 465px;

      input {
        width: 360px;
      }

      float: left;
    }

    li:last-child {
      width: 193px;
      height: 100px;
      float: left;
      margin-left: 8px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.middle {
  margin-top: 50px;
  margin-left: 41px;
  text-align: left;
  font-size: 26px;
  overflow: hidden;
  color: #939393;

  div:first-child {
    float: left;
    a {
      color: #dc0019 !important;
    }
  }

  div:last-child {
    float: left;
    margin-left: 250px;
    line-height: 34px;

    input {
      display: none;
    }

    input + label {
      display: inline-block;
      vertical-align: top;
      width: 34px;
      height: 34px;
      text-align: center;
      line-height: 34px;
      background-color: #999999;
      border-radius: 8px;
      margin-left: 8px;
    }

    input:checked + label::before {
      content: "\2714";
      font-size: 28px;
      font-weight: bold;
      color: #fff;
    }
  }
}

.login {
  margin-top: 70px;

  p {
    width: 669px;
    height: 100px;
    line-height: 100px;
    font-size: 33px;
    margin-left: 40px;
    border-radius: 100px;
  }

  p:first-child {
    background-color: #ffffff;
    color: #fff;
  }

  p:last-child {
    margin-top: 46px;
    border: 2px solid #dc001a;
    color: #db001b;
  }
}

.kefu {
  position: absolute;
  bottom: 41px;
  left: 212px;
  width: 330px;
  text-align: center;
  font-size: 26px;

  a {
    color: #666666;
  }

  i {
    vertical-align: top;
    font-size: 45px;
    margin-right: 8px;
  }

  span {
    display: inline-block;
    line-height: 45px;
    vertical-align: bottom;
  }
}
</style>
