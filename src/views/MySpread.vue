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

    span a {
      color: white;
      font-weight: normal;
      position: absolute;
      right: 25px;
    }
  }

  .content {
    flex: 1;
    overflow-y: scroll;

    .cash-text,
    .cash-txt,
    .cash-list {
      background: #ffffff;
      border: 1px solid #dddddd;
    }

    .cash-txt {
      border: 0;
    }

    .cash-text ul {
      margin: 0 10px;
    }

    .cash-text ul li,
    .cash-list ul li {
      border-bottom: 1px solid #dddddd;
      height: 80px;
      line-height: 80px;
      font-size: 34px;
    }

    .cash-text:nth-child(2) {
      border-left-width: 0;
      border-right-width: 0;
    }

    .cash-text ul li:last-child,
    .cash-list ul li:last-child {
      border-bottom: 0;
    }

    .cash-text ul li .text-left {
      float: left;
    }

    .ps {
      color: red;
      font-size: 80%;
      float: left;
    }

    .info {
      padding: 20px;
      line-height: 56px;
      font-size: 28px;
      text-align: left;
    }

    .cash-txt h3 {
      font-size: 34px;
      text-align: left;
      text-indent: 20px;
      margin-top: 20px;
    }

    .cash-txt ul {
      overflow: hidden;
    }

    .cash-txt ul li {
      float: left;
      width: 33.33%;
      text-indent: 20px;
      text-align: left;
      font-size: 32px;
      padding: 10px 0;
      color: #999999;
      white-space: nowrap;
    }
  }
}
</style>
<template>
  <div class="body" v-title="'我的推荐'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      我的推荐
      <!--<span><router-link to="/user/myspreadlist">收益记录</router-link></span>-->
    </div>
    <div class="content">
      <div class="sub_ScorllCont">
        <div class="cash-text" style="border:0">
          <ul>
            <li>
              <span class="text-left">我的推荐ID：{{ userInfo.uid }}</span>
              <span class="ps">
                &nbsp;&nbsp;(让您的好友在注册时填写
                <!--您的推荐ID-->
                )
              </span>
            </li>
          </ul>
        </div>
        <div class="cash-text">
          <ul>
            <li>
              <span class="text-left">
                <span class="text-left">本月推荐收益：</span>
                <span style="color:red">{{ mySpread }}</span>
              </span>
            </li>
          </ul>
          <div class="info">
            说明：每天的7点更新收益，如3号7点，会计算2号0点-24点之间所有数据，然后增加您的收益。您的收益=推荐会员的有效投注额度总和
            ÷ 100 ×0.1(转换率),小数部份四舍五入! &nbsp;&nbsp;
            <span style="color:red;">(风险账号不参与收益计算)</span>
          </div>
        </div>
        <div class="cash-txt">
          <h3>
            我的推荐会员(共计
            <span>{{ memberCount }}</span
            >位)：
          </h3>
          <ul>
            <li v-for="(item, i) in memberList" :key="i">
              <span>{{ item.username }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { spread } from "../api";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      memberCount: 0,
      memberList: [],
      mySpread: 0
    };
  },
  computed: {
    ...mapGetters([
      /* user.js */
      "userInfo"
    ])
  },
  created() {
    this.getSpread();
  },
  methods: {
    getSpread() {
      spread().then(res => {
        this.memberCount = res.data.num;
        this.memberList = res.data.child;
        this.mySpread = res.data.money;
      });
    }
  }
};
</script>
