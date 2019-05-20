<template>
  <div class="body" v-title="'消息内容'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      个人设置
    </div>
    <div class="content">
      <div class="userImg">
        头像
        <img src="../assets/img/cs.png" alt />
      </div>
      <ul class="navItem">
        <li>
          用户名
          <span>BEROY</span>
        </li>
        <li>
          推荐码
          <span>1111</span>
        </li>
        <li>
          等级
          <span>V1</span>
        </li>
      </ul>
      <ul class="navItem">
        <li>
          银行卡绑定
          <i class="iconfont">&#xe669;</i>
          <div>
            <span>
              已绑定
              <span>1</span>
              个
            </span>
          </div>
        </li>
        <li>
          提现密码
          <i class="iconfont">&#xe669;</i>
        </li>
        <li>
          登录密码
          <i class="iconfont">&#xe669;</i>
        </li>
        <li>
          绑定手机
          <i class="iconfont">&#xe669;</i>
          <span>1433413362</span>
        </li>
        <li>
          绑定邮箱
          <i class="iconfont">&#xe669;</i>
          <span>120@qq.com</span>
        </li>
      </ul>
      <ul class="navItem">
        <li>
          注销
          <i class="iconfont">&#xe669;</i>
        </li>
      </ul>
    </div>
    <my-Foot></my-Foot>
  </div>
</template>

<script>
export default {
  name: "usersetting",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.body {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .top {
    height: 100px;
    background-color: #605aa2;
    color: white;
    line-height: 100px;
    overflow: hidden;
    text-align: center;
    font-size: 38px;

    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
    }
  }

  .content {
    overflow: hidden;
    .userImg {
      height: 200px;
      text-align: left;
      font-size: 30px;
      line-height: 200px;
      padding-left: 30px;
      background: #fff;
      border: 1px solid #f5f5f5;
      img {
        width: 150px;
        height: 150px;
        border-radius: 15px;
        margin: 25px 35px;
        float: right;
      }
    }
    .navItem {
      overflow: hidden;
      background: #fff;
      margin-bottom: 10px;
      li {
        height: 80px;
        line-height: 80px;
        text-align: left;
        font-size: 35px;
        padding-left: 30px;
        padding-right: 35px;
        border-bottom: 1px solid #f5f5f5;
        div {
          float: right;
          font-size: 30px;
          margin-right: 20px;
        }
        > span {
          float: right;
          font-size: 25px;
          margin-right: 20px;
        }
        i {
          float: right;
        }
      }
    }
  }
}
</style>
