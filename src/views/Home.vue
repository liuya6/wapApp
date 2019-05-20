<template>
  <div class="body" v-title="'首页'">
    <template v-if="initHomeData.dialog && initHomeData.dialog.isOpen === '1'">
      <template v-if="initHomeData.dialog.isImg">
        <div class="dialogImg" v-show="announcementFlag">
          <div class="ad" v-html="initHomeData.dialog.content"></div>
          <i @click="shadowHide"></i>
        </div>
      </template>
      <template v-else>
        <div class="shadow" v-show="announcementFlag">
          <div class="ad">
            <div class="ad_header">
              <div class="left_img"></div>
              <div class="right_img"></div>
              <img src="../assets/img/da_2.png" alt="" />
            </div>
            <div class="adContent">
              <div
                class="ad_content"
                v-html="initHomeData.dialog.content"
              ></div>
            </div>
            <div class="know" @click="shadowHide">知道了</div>
          </div>
        </div>
      </template>
    </template>
    <div class="top">
      <div class="logo" ref="wapLogo" v-show="logoBackground">
        <img :src="logoBackground" alt="LOGO" />
      </div>
      <a class="right" :href="skip" v-if="showDownloadFlag">下载APP</a>
    </div>
    <div class="content">
      <div class="banner">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item, i) in initHomeData.banner" :key="i">
            <my-img :src="item.img"></my-img>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="gonggao" @click="$router.push({ name: 'announcementlist' })">
        <div class="laba iconfont">&#xe625;</div>
        <div class="text-box">
          <div class="text">
            <span v-for="(item, i) in initHomeData.notice" :key="i">{{
              item.content
            }}</span>
          </div>
        </div>
      </div>
      <div class="changwan">
        <div class="TAB">
          <!--          <div>-->
          <!--            <router-link to="/changlong">-->
          <!--              <i class="iconfont">&#xe6c8;</i>-->
          <!--              <span>长龙助手</span>-->
          <!--            </router-link>-->
          <!--          </div>-->
          <div>
            <router-link to="/user/accountdetails">
              <i class="iconfont">&#xe618;</i>
              <span>账户明细</span>
            </router-link>
          </div>
          <div>
            <router-link to="/activity">
              <i class="iconfont">&#xe602;</i>
              <span>优惠活动</span>
            </router-link>
          </div>
          <div>
            <router-link to="/user/service">
              <i class="iconfont">&#xe616;</i>
              <span>在线客服</span>
            </router-link>
          </div>
        </div>
        <div class="balance">
          <dl>
            <dd v-for="(item, i) in initHomeData.gallery" :key="i">
              <div @click="goHall(item.typeKey)">
                <i>
                  <img :src="imgUrl(item.img)" alt="" />
                </i>
                <p>{{ item.name }}</p>
              </div>
            </dd>
          </dl>
        </div>
        <div class="changwan_game">
          <ul>
            <li>
              <h3>常玩游戏</h3>
              <div
                v-for="(item, i) in initGameData.often"
                :key="i"
                @click="
                  playGame('Lottery', '', item.id, item.title, item.classify)
                "
              >
                <i>
                  <img :src="imgUrl(item.img)" :alt="item.name" />
                </i>
                <p>{{ item.title }}</p>
              </div>
            </li>
            <li>
              <h3>相似游戏</h3>
              <div
                v-for="(item, i) in initGameData.similar"
                :key="i"
                @click="
                  playGame('Lottery', '', item.id, item.title, item.classify)
                "
              >
                <i>
                  <img :src="imgUrl(item.img)" :alt="item.name" />
                </i>
                <p>{{ item.title }}</p>
              </div>
            </li>
          </ul>
          <div class="xuanzhuan">
            <dl class="text_content">
              <dd v-for="(item, i) in initGameData.rollText" :key="'j' + i">
                {{ item }}
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="tuijian">
        <h3>推荐游戏</h3>
        <ul class="gameList">
          <li
            v-for="(item, i) in initHomeData.recommend"
            :key="i"
            @click="playGame('Lottery', '', item.id, item.title, item.classify)"
          >
            <i>
              <img :src="imgUrl(item.img)" :alt="item.name" />
            </i>
            <div>
              <p>{{ item.title }}</p>
              <span>{{ item.description }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="fenge"></div>
      <div class="ranking">
        <h3>中奖排行</h3>
        <div>
          <ul class="ranking-content">
            <li v-for="(item, i) in initHomeData.bonus" :key="i">
              <span>{{ item.username }}</span>
              <span>
                喜中
                <b style="color: #ff1414">{{ item.bonus }}</b
                >元
              </span>
              <span>{{ item.title }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="fenge" style="border-bottom: none"></div>
    </div>
    <div class="download" v-show="showDownloadFlag">
      <p>
        <span class="cha" @click="DownloadHide">
          <i class="iconfont">&#xe680;</i>
        </span>
        <img
          v-show="logoIco"
          :src="logoIco"
          :alt="
            initHomeData.siteConfig ? initHomeData.siteConfig.webName : '彩票'
          "
        />
        <span
          >下载{{
            initHomeData.siteConfig ? initHomeData.siteConfig.webName : "彩票"
          }}APP,随时随地玩</span
        >
        <span class="shenLan">
          <a :href="skip">立即下载</a>
        </span>
      </p>
    </div>
    <div class="red-bag-float" v-show="RedShow && !isTourist">
      <router-link :to="{ name: 'redpacket' }">
        <img src="../assets/img/rt-ad-m.png" />
      </router-link>
      <div v-on:click="hideRedBag"></div>
    </div>
    <div class="userCoin" v-if="userInfo">
      <div class="coin">
        <div>
          {{ userInfo ? parseInt(userInfo.coin) : 0 }}.
          <span>{{ userInfo ? coinNum(userInfo.coin) : 0 }}</span>
          元
        </div>
      </div>
      <a @click="reCharge">充</a>
    </div>
    <my-Foot></my-Foot>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { announcement, onTurn, ranking } from "../common/common.js";
import { initHome, initGame } from "../api";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "home",
  data() {
    return {
      logoBackground: "",
      logoIco: "",
      redPacketUrl: "/api/activity/redPacket",
      // 下载跳转链接
      skip: "/api/common/appapi/appDownload",
      jumpOld: "/api/auth/sLogin",
      showDownloadFlag: false,
      announcementFlag: false,
      loginRefreshFlag: false, // 登录后刷新
      RedShow: false,
      jumpOldFlag: false,
      initHomeData: {
        banner: null,
        dialog: null,
        notice: null,
        bonus: null,
        gallery: null,
        recommend: null,
        redPacket: null,
        siteConfig: null
      },
      initGameData: {
        often: null,
        similar: null,
        rollText: null
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo", "isOpen", "isImg"]),
    isTourist() {
      if (this.userInfo) {
        return this.userInfo.parentId == 312;
      }
      return false;
    }
  },
  watch: {},
  created() {
    this.loginRefreshFlag = false;
    this.init();
    this.game();
    if (!sessionStorage.announcementFlag) {
      this.announcementFlag = true;
    }
    sessionStorage.firstTime = 1;
  },
  activated() {
    if (!this.loginRefreshFlag && this.userInfo) {
      this.loginRefreshFlag = true;
    }
    if (Number(sessionStorage.firstTime)) {
      sessionStorage.firstTime = 0;
    } else {
      this.checkedLogin();
      this.game();
    }
  },
  methods: {
    ...mapActions(["checkedLogin"]),
    ...mapMutations(["ANNOUNCEMENT_FLAG"]),
    coinNum(num) {
      let coin = String(num).split(".");
      if (coin[1]) {
        return coin[1];
      } else {
        return "000";
      }
    },
    init() {
      initHome().then(res => {
        if (res.status) {
          this.initHomeData = res.data;
          if (
            !this.initHomeData.siteConfig.isOpenFromApp &&
            !sessionStorage.showDownloadFlag
          ) {
            this.showDownloadFlag = true;
          } else {
            this.showDownloadFlag = false;
          }
          this.RedShow = this.initHomeData.redPacket.isOpen;
          if (this.initHomeData.siteConfig.wapLogo) {
            this.logoBackground = this.initHomeData.siteConfig.wapLogo;
          } else {
            this.logoBackground = require("../assets/img/home-logo.png");
          }
          if (this.initHomeData.siteConfig.icoLogo) {
            this.logoIco = this.initHomeData.siteConfig.icoLogo;
          } else {
            this.logoIco = require("../assets/img/downloadLogo.png");
          }
          if (this.initHomeData.siteConfig.wapUrlOld) {
            this.jumpOldFlag = true;
          }
          announcement(".text", 1, 20);
          ranking(".ranking-content", 1, 50);
        }
      });
    },
    game() {
      initGame().then(res => {
        if (res.status) {
          this.initGameData = res.data;
          onTurn(".text_content", 2000);
        }
      });
    },
    DownloadHide() {
      this.showDownloadFlag = false;
      sessionStorage.showDownloadFlag = 1; // 存在sessionStorage中数据会变为string，true/false都是字符串
    },
    shadowHide() {
      this.announcementFlag = false;
      sessionStorage.announcementFlag = false;
    },
    reCharge() {
      if (this.userInfo.parentId === 312) {
        return Toast("试玩用户不可充值");
      }
      this.$router.push({
        name: "recharge"
      });
    },
    hideRedBag() {
      this.RedShow = false;
    },
    goHall(key) {
      console.log(key);
      if (key === "KaiYuan" || key === "LeYou") {
        key = "QP";
      }
      if (key === "CQ9" || key === "MG" || key === "JDB") {
        key = "DZ";
      }
      if (key === "OG" || key === "AG") {
        key = "SX";
      }
      this.$router.push({ name: "hall", query: { typeKey: key } });
    }
  }
};
</script>

<style scoped lang="less">
body,
html {
  width: 100%;
  height: 100%;

  .body {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .shadow {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 99;

    .ad {
      width: 652px;
      height: 814px;
      background-color: #ffffff;
      border-radius: 20px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;

      .ad_header {
        width: 100%;
        height: 180px;
        background: url("../assets/img/da_1.jpg") no-repeat 0 0;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        border-radius: 20px 20px 0 0;
        text-align: left;
        position: relative;

        img {
          width: 312px;
          height: 74px;
          margin-top: 54px;
          margin-left: 100px;
        }

        .left_img {
          width: 119px;
          height: 158px;
          position: absolute;
          bottom: 0;
          left: -25px;
          background: url("../assets/img/da_4.png") no-repeat 0 0;
          -webkit-background-size: 100px 50px;
          background-size: 100% 100%;
        }

        .right_img {
          width: 269px;
          height: 256px;
          position: absolute;
          bottom: -10px;
          right: -45px;
          background: url("../assets/img/da_3.png") no-repeat 0 0;
          -webkit-background-size: 100% 100%;
          background-size: 100% 100%;
        }
      }

      .adContent {
        height: 450px;
        overflow-y: scroll;
        padding-top: 44px;
        .ad_content {
          text-align: left;
          padding: 0 60px;
          overflow: hidden;
          font-size: 28px;
          color: #444444;
        }
      }

      /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
      .adContent::-webkit-scrollbar {
        width: 12px;
      }

      /*定义滚动条轨道 内阴影+圆角*/
      .adContent::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        background-color: #f5f5f5;
      }

      /*定义滑块 内阴影+圆角*/
      .adContent::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
        background-color: rgba(0, 0, 0, 0.1);
      }

      .know {
        position: absolute;
        bottom: 20px;
        left: 26px;
        width: 595px;
        height: 85px;
        display: block;
        text-align: center;
        color: #fffff3;
        margin: auto;
        border-radius: 85px;
        background: linear-gradient(#ff7550, #ff334e);
        font-size: 31px;
        line-height: 85px;
        z-index: 100;
      }
    }
  }
}

.download {
  width: 100%;
  height: 88px;
  line-height: 88px;
  font-size: 26px;
  color: #ffffff;
  position: fixed;
  left: 0;
  bottom: 100px;
  background: rgba(0, 0, 0, 0.8);
  p {
    overflow: hidden;
  }

  .cha {
    display: block;
    width: 72px;
    height: 88px;
    float: left;

    i {
      font-size: 32px;
    }
  }

  img {
    width: 60px;
    height: 60px;
    float: left;
    margin-right: 12px;
    margin-top: 15px;
  }

  span {
    display: block;
    font-size: 26px;
    height: 88px;
    line-height: 88px;
    float: left;
  }

  span:last-child {
    width: 190px;
    float: right;
    background: rgba(86, 83, 140, 0.8);

    a {
      display: block;
      width: 100%;
      color: #ffffff;
      height: 100%;
    }
  }
}

.top {
  height: 80px;
  overflow: hidden;
  background-color: #f9f9f9;
  /*position: fixed;*/
  /*top: 0;*/
  /*width: 100%;*/
  /*z-index: 1;*/

  .logo {
    float: left;
    width: 226px;
    height: 70px;
    margin-top: 10px;
    margin-left: 20px;
    /*background: url("../assets/img/home-logo.png") no-repeat;*/
    -webkit-background-size: 100%;
    background-size: 100%;
  }

  .right {
    float: right;
    font-size: 25px;
    height: 80px;
    line-height: 80px;
    padding-right: 22px;
    color: #999999;
  }
}

.content {
  /*padding-top: 80px;*/
  /*padding-bottom: 100px;*/
  flex: 1;
  overflow-y: scroll;
  position: relative;
}

.gonggao {
  width: 100%;
  height: 47px;
  line-height: 47px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;

  .laba {
    width: 46px;
    height: 46px;
    float: left;
    color: white;
    margin: 0 10px;
    font-size: 33px;
  }

  .text-box {
    position: relative;
    overflow: hidden;
    width: 90%;
    height: 47px;

    .text {
      color: white;
      line-height: 54px;
      white-space: nowrap;
      position: absolute;
      top: 0;
      left: 100%;
      overflow: hidden;

      span {
        line-height: 30px;
        font-size: 26px;
      }
    }
  }
}
/*抢红包*/
.red-bag-float {
  position: fixed;
  height: 250px;
  width: 200px;
  right: 0;
  top: 50%;
}
.red-bag-float > div {
  width: 200px;
  height: 60px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
}
.changwan {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-bottom: 18px;
  border-bottom: 1px solid #dcd8d5;
  .TAB {
    overflow: hidden;
    div {
      height: 75px;
      line-height: 75px;
      float: left;
      width: 33.3%; // 3等分
      box-sizing: border-box;
      background-color: #fff;
      border-right: 1px solid #ebebeb;
      font-size: 0;
      &:nth-child(1) {
        i {
          font-size: 28px;
        }
      }
      &:nth-child(2) {
        i {
          font-size: 34px;
        }
      }
      a {
        display: block;
        color: #666;
        height: 75px;
        line-height: 75px;
        overflow: hidden;
      }
      i {
        font-size: 35px;
        margin-right: 10px;
        display: inline-block;
        vertical-align: middle;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        font-size: 28px;
        line-height: 75px;
        margin-top: 8px;
      }
    }
    div:last-child {
      border-right: 0;
    }
  }
  .balance {
    background-color: #ffffff;
    border-top: 1px solid #f0f0f0; /*no*/
    border-bottom: 1px solid #f0f0f0; /*no*/
    margin: 0 auto 17px;
    dl {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: scroll;
      padding: 5px 0;
      dd {
        margin-left: 44px;
        i {
          display: block;
          width: 100px;
          height: 80px;
          line-height: 80px;
          overflow: hidden;
          margin-right: 0 !important;
          text-align: center;
          img {
            display: inline-block;
            vertical-align: middle;
          }
        }
        p {
          white-space: nowrap;
          font-size: 25px;
          margin-top: 10px;
          color: #666;
        }
      }
      dd:last-child {
        padding-right: 44px;
      }
    }
  }
}

.changwan_game {
  width: 95%;
  margin: auto;
  background: #f2f6ff;
  overflow: hidden;
  ul {
    overflow: hidden;
    background: #fff;
    border-bottom: 1px solid #ebebeb;
    border-radius: 15px;
    li:nth-child(1) {
      border-right: 1px solid #ebebeb; /*no*/
    }

    li {
      float: left;
      width: 49.5%;

      h3 {
        color: #5b5b5b;
        line-height: 60px;
      }

      div {
        width: 50%;
        float: left;

        i {
          display: inline-block;
          width: 105px;
          height: 105px;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }

        p {
          color: #666666;
          text-align: center;
          line-height: 54px;
        }
      }
    }
  }

  .xuanzhuan {
    /*no*/
    height: 57px;
    overflow: hidden;
    line-height: 57px;
    border-radius: 57px;
    background: #ff102d;
    color: #fff;
    position: relative;
    margin-top: 12px;
    dl {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      text-align: center;
      dd {
        height: 57px;
      }
    }
  }
}

.tuijian {
  h3 {
    line-height: 60px;
    font-size: 28px;
    padding-left: 46px;
    text-align: left;
    border-bottom: 1px solid #ebebeb;
  }

  ul {
    overflow: hidden;

    li {
      float: left;
      width: 49.8%;
      border-right: 1px solid #ebebeb; /*no*/
      border-bottom: 1px solid #ebebeb; /*no*/

      i {
        display: block;
        float: left;
        width: 101px;
        height: 101px;
        margin: 25px 18px 22px 49px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      div {
        padding-top: 30px;
        overflow: hidden;

        p {
          line-height: 50px;
          font-size: 28px;
          overflow: hidden;
          text-align: left;
          color: #444;
        }

        span {
          line-height: 49px;
          display: block;
          overflow: hidden;
          font-size: 22px;
          color: #898989;
          text-align: left;
        }
      }
    }

    li:nth-of-type(2n) {
      border-right: 0;
    }
  }
}

.fenge {
  height: 18px;
  border-bottom: 1px solid #dcd8d7;
  background-color: #f6f6f6;
}

.ranking {
  h3 {
    line-height: 60px;
    font-size: 28px;
    padding-left: 46px;
    text-align: left;
    border-bottom: 1px solid #ebebeb;
  }

  div {
    position: relative;
    border-bottom: 1px solid #dcd8d5;
    height: 290px;
    overflow: hidden;

    ul {
      position: absolute;
      top: 0;
      left: 0;

      li {
        line-height: 55px;
        text-align: left;
        padding-left: 51px;
        font-size: 27px;

        span {
          color: #444;
        }

        span:nth-child(1) {
          display: inline-block;
          vertical-align: middle;
          width: 89px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #666;
        }

        span:nth-child(2) {
          display: inline-block;
          width: 366px;
          text-align: center;
          vertical-align: middle;
          color: #666;

          b {
            font-weight: normal;
          }
        }

        span:nth-child(3) {
          display: inline-block;
          vertical-align: middle;
          width: 244px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
.dialogImg {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  .ad {
    width: 90%;
    margin: 280px auto;
    position: relative;
  }
  i {
    position: absolute;
    top: 285px;
    right: 45px;
    width: 50px;
    height: 50px;
  }
}

.mint-swipe,
.mint-swipe-items-wrap,
.mint-swipe-items-wrap div {
  width: 100%;
  height: 286px !important;

  img {
    width: 100%;
    height: 100%;
  }
}

.userCoin {
  position: fixed;
  bottom: 200px;
  right: 20px;
  height: 80px;
  line-height: 80px;
  border-radius: 80px;
  background-color: rgba(0, 0, 0, 0.5);
  span {
    color: black;
  }
  .coin {
    float: left;
    color: white;
    font-size: 30px;
    padding: 0 20px;
    span {
      font-size: 23px;
      color: white;
    }
  }
  a {
    display: inline-block;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    text-align: center;
    line-height: 70px;
    float: right;
    font-size: 30px;
    margin-top: 5px;
    margin-right: 5px;
  }
}
.redPacket {
  position: fixed;
  bottom: 240px;
  left: 20px;
  height: 140px;
  width: 140px;
  border-radius: 80px;
  a {
    display: block;
  }
}
.footer {
  position: static;
}
</style>
