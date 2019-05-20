<template>
  <div class="body" v-title="lotteryData.title" :class="{ k3Bg: isK3 }">
    <div class="top" :class="isK3 ? 'k3Top' : 'shenLan'">
      <i class="iconfont back" @click="goBack">&#xe629;</i>
      <!--标题-->
      <div @click="gameShow">
        <span>{{ $route.query.title || "-" }}</span>
        <i class="iconfont">{{ gameSwitch ? "&#xe628;" : "&#xe620;" }}</i>
      </div>
      <!--右侧功能区-->
      <ul>
        <!--购物车-->
        <li v-show="!noCart">
          <router-link :to="{ name: 'cart', params: { id: lotteryData.id } }">
            <i class="iconfont car">&#xe61e;</i>
            <span v-if="cartCount">{{ cartCount }}</span>
          </router-link>
        </li>
        <!--助手-->
        <li>
          <i class="iconfont" @click="assistantShow">&#xe61f;</i>
          <dl v-if="assistantSwitch">
            <dt></dt>
            <dd v-for="(item, i) in assistantArr(assistantList)" :key="i">
              <router-link
                :to="{
                  name: item.urlName,
                  params: {
                    id: lotteryData.id,
                    classify: lotteryData.classify
                  },
                  query: {
                    title: lotteryData.title,
                    typeName: lotteryData.name,
                    modeType: modeType
                  }
                }"
              >
                <b class="iconfont" v-html="item.icon"></b>
                <span>{{ item.text }}</span>
              </router-link>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
    <!--多模式，包含官方传统的模式-->
    <div
      class="playMode qianLan"
      key="double-mode"
      v-if="lotteryData.isDoubleMode"
      :class="{ k3Common: isK3 }"
    >
      <!--模式-->
      <div @click="modeShow">
        <span>
          {{ modeTypeTitle }}
          <i class="iconfont">{{ modeSwitch ? "&#xe628;" : "&#xe620;" }}</i>
        </span>
      </div>
      <!--玩法-->
      <div @click="playShow">
        <span>
          {{ groupData.groupName }}-{{ playData.name }}
          <i class="iconfont">{{ playSwitch ? "&#xe628;" : "&#xe620;" }}</i>
        </span>
      </div>
    </div>
    <!--单模式，六合彩模式（没有官方传统-->
    <div
      class="playModeSix qianLan"
      v-else
      key="single-mode"
      @click="playShow"
      :class="{ k3Common: isK3 }"
    >
      <span v-if="isK3" key="isK3">
        {{ playData.k3Name || playData.name }}
        <i class="iconfont">{{ playSwitch ? "&#xe628;" : "&#xe620;" }}</i>
      </span>
      <span v-else key="noK3">
        {{ groupData.groupName }}-{{ playData.name }}
        <i class="iconfont">{{ playSwitch ? "&#xe628;" : "&#xe620;" }}</i>
      </span>
    </div>
    <div class="content" @click="closeAll" v-if="allGroupList[0]">
      <!--页面内通知-->
      <div class="msg">
        <p ref="msg">
          {{ msg }}
        </p>
      </div>
      <!--开奖模板-->
      <component
        :is="awardTemplates"
        :award-data="awardData"
        :lotteryData="lotteryData"
        @timeOver="timeOver"
      ></component>
      <!--投注模板-->
      <component
        :is="betTemplate"
        :lottery-data="lotteryData"
        :play-data="playData"
        ref="betTemplate"
      ></component>
    </div>
    <!--底部确认-->
    <div class="footer">
      <span
        @click="clearAllSelected"
        :style="{ backgroundColor: '#666', color: count ? '#fff' : '#a7a7a7' }"
        >全清空</span
      >
      <span
        class="random shenLan"
        :class="{ k3Common: isK3 }"
        v-show="!noCart"
        @click="handleRandom"
        style="background-color: #666;color: #fff"
        >随机</span
      >
      <span
        class="shenLan buy"
        @click="handleBet"
        :class="{ fendan: !buyFlag, buyBig: noCart, k3Common: isK3 }"
        >{{ buy }}</span
      >
      <div class="footerFixed" v-show="count" :class="{ NoUser: !userInfo }">
        <div class="left">
          <h3>共计{{ count }}注,总金额{{ amount }}元</h3>
          <p v-if="userInfo">余额：{{ userInfo.coin }} 元</p>
        </div>
        <template v-if="userInfo">
          <div class="right" v-show="Number(userInfo.coin) < Number(amount)">
            <router-link :to="{ name: 'recharge' }"
              >余额不足，去充值>></router-link
            >
          </div>
        </template>
      </div>
    </div>
    <!--所有彩种集-->
    <div :class="{ popupShow: gameSwitch }" class="popups">
      <!--彩种分类-->
      <ul>
        <li
          v-for="(item, i) in lotteryList"
          :key="i"
          @click="changeGameList(item.gameType)"
          :class="{ on: item.gameType == gameType }"
        >
          {{ item.gameTitle }}
        </li>
      </ul>
      <!--彩种分类列表-->
      <dl>
        <dd>
          <div
            v-for="(item, i) in gameDataList"
            :key="i"
            :class="{ [isK3 ? 'k3Btn' : 'onBtn']: item.id == typeId }"
            @click="choose(item.id, item.classify, item.title)"
          >
            {{ item.title }}
          </div>
        </dd>
      </dl>
    </div>

    <!--弹出框-模式-->
    <div class="popupMode" v-show="modeSwitch" @click="modeShow">
      <ul>
        <li
          v-for="(item, i) in modeTypeList"
          :key="i"
          @click="setModeType(item)"
          :class="{ onBtn: modeType == item.val }"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <!--弹出框-玩法-->
    <div class="popupPlay" v-show="playSwitch && !isK3" @click="closeAll">
      <ul>
        <li
          v-for="(item, i) in groupList"
          :key="i"
          @click="handleGroupData(item)"
          :class="{ onBtn: groupId == item.id }"
        >
          {{ item.groupName }}
        </li>
      </ul>
      <dl>
        <dt>
          <span>{{ groupData.groupName }}</span>
        </dt>
        <dd
          v-for="(item, i) in playList"
          :key="i"
          @click="handlePlayData(item)"
          :class="{ onBtn: playId == item.id }"
        >
          {{ item.name }}
        </dd>
      </dl>
    </div>
    <!--k3弹出框-->
    <div class="k3Play" v-show="playSwitch && isK3">
      <ul>
        <li
          v-for="(item, i) in k3List(groupList)"
          :key="i"
          :class="{ k3OnBtn: playId == item.id }"
          @click="handlePlayData(item)"
        >
          <p>{{ item.k3Name }}</p>
          <span>赔率{{ item.maxBonusProp }}倍</span>
          <div>
            <i
              v-for="(child, j) in item.imgList"
              :key="j"
              :class="{ jia: child === '+' }"
            >
              <img
                v-if="child !== '+'"
                :src="require('../assets/img/touzi/saizi_' + child + '.png')"
                alt=""
              />
              <span v-else>{{ child }}</span>
            </i>
          </div>
        </li>
      </ul>
    </div>
    <!--弹出框---封盘-->
    <div class="Seal" v-show="SealFlag">
      <ul v-if="Boolean(awardData.last)">
        <li>
          <h3>温馨提示</h3>
        </li>
        <li>
          <p>{{ periods }}期投注已结束</p>
        </li>
        <li>
          <p>是否清空选号</p>
        </li>
        <li>
          <span class="qianLan" @click="clearAllSelected">清空选号</span>
          <span class="shenLan" @click="SealFlag = false">继续选号</span>
        </li>
      </ul>
    </div>
    <!--封盘声音-->
  </div>
</template>

<script>
import {
  lotteryList,
  lotteryAward,
  lotteryGroup,
  lotteryRandom,
  getMessage
} from "../api";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { modeTypeList, assistantList } from "../common/data";
import { Toast } from "mint-ui";

const AwardNormal = () => import("@/components/award/AwardNormal");
const AwardSix = () => import("@/components/award/AwardSix");
const AwardPk10 = () => import("@/components/award/AwardPk10");
const AwardK3 = () => import("@/components/award/AwardK3");
const AwardXy28 = () => import("@/components/award/AwardXy28");
const AwardKl10 = () => import("@/components/award/AwardKl10");

const BetOfficial = () => import("./lotteryGame/BetOfficial");
const BetTradition = () => import("./lotteryGame/BetTradition");
const BetSix = () => import("./lotteryGame/BetSix");

export default {
  name: "Bet",
  components: {
    AwardNormal,
    AwardSix,
    AwardPk10,
    AwardK3,
    AwardXy28,
    AwardKl10,
    BetOfficial,
    BetTradition,
    BetSix
  },
  data() {
    return {
      /* 静态数据 */
      assistantList, // 助手列表
      modeTypeList, // 模式列表
      /* 显示/隐藏开关 */
      assistantSwitch: false, // 助手
      gameSwitch: false, // 彩种下拉
      modeSwitch: false, // 官方传统下拉框
      playSwitch: false, // 游戏玩法下拉框
      SealFlag: false, // 封单
      /* 索引ID */
      gameType: 1, // 游戏类型
      typeId: this.$route.params.id, // 彩种ID
      modeType: this.$route.query.modeType || 1, // 玩法模式
      /* 动态数据 */
      buy: "购买",
      buyFlag: true,
      lotteryList: [], // 彩种列表
      allGroupList: [], // 玩法列表，官方+传统，需过滤
      betTimer: null, //未开奖定时器
      timer: null, //封盘定时器
      awardTemplates: "",
      msg: "",
      msgTimer: null
    };
  },
  computed: {
    ...mapGetters([
      "userInfo",
      "lotteryData",
      "groupData",
      "playData",
      "awardData",
      "awardNext",
      "count",
      "amount",
      "cartCount",
      "isRun",
      "musicFlag",
      "oldCodeList"
    ]),
    gameDataList() {
      for (let i in this.lotteryList) {
        if (this.lotteryList[i].gameType == this.gameType) {
          console.log(this.lotteryList[i].gameData);
          return this.lotteryList[i].gameData;
        }
      }
      return [];
    },
    modeTypeTitle() {
      for (let i in this.modeTypeList) {
        if (this.modeTypeList[i].val == this.modeType) {
          return this.modeTypeList[i].title;
        }
      }
      return "-";
    },
    groupList() {
      return this.allGroupList.filter(item => {
        return this.modeType == item.modeType;
      });
    },
    playList() {
      for (let i in this.groupList) {
        if (this.groupList[i].id == this.groupId) {
          return this.groupList[i].play;
        }
      }
      return [];
    },
    groupId() {
      return this.groupData.id || 0;
    },
    playId() {
      return this.playData.id || 0;
    },

    betTemplate() {
      if (
        this.lotteryData.classify === 11 ||
        this.lotteryData.classify === 10
      ) {
        return "BetSix"; // 六合彩
      }
      if (this.modeType == 1) {
        return "BetTradition"; // modeType=1 传统
      } else {
        return "BetOfficial"; // modeType=0 官方
      }
    },
    isSix() {
      return this.lotteryData.classify == 10 || this.lotteryData.classify == 11;
    },
    isSpecial() {
      // 特殊
      let playId = this.playData.id;
      let groupId = this.groupData.id;
      return groupId == 139 || groupId == 140 || playId == 345;
    },
    noCart() {
      return (
        this.lotteryData.classify == 10 ||
        this.lotteryData.classify == 11 ||
        this.modeType == 1
      );
    },
    isK3() {
      return this.$route.params.classify == 9;
    },
    periods() {
      return this.awardData.last[0].actionNo;
    },
    num() {
      if (this.isK3) {
        return "50";
      } else {
        return "5";
      }
    }
  },
  watch: {
    $route(to, from) {
      if (to.params.id != from.params.id) {
        this.getLotteryAward();
        this.getLotteryGroup();
      }
    },
    /* 彩种分类重置到当前彩种所属分类 */
    gameSwitch(boolean) {
      if (boolean) {
        this.resetGameType();
      }
    },
    awardData(newVal) {
      if (newVal.last[0].data) {
        clearInterval(this.betTimer);
      } else {
        if (!this.betTimer) {
          this.betTimer = setInterval(() => {
            console.log("未开奖持续请求");
            this.getLotteryAward();
          }, 5000);
        }
      }
    },
    playList(newVal) {
      if (newVal.length < 2) {
        this.closeAll();
      }
    }
  },
  created() {
    /* step1:获取玩法列表 */
    this.getLotteryGroup();

    /* step2:获取开奖数据 */
    this.getLotteryAward();

    /* step3:获取彩种列表 */
    this.getLotteryList();

    /* step4:获取系统返点 */
    this.setSysRebates();

    this.checkedLogin({});

    this.awardTemplate();
    /*实时消息*/
    this.getMessages();

    console.log(
      this.oldCodeList,
      "oldcode==============================================="
    );
  },
  beforeDestroy() {
    clearInterval(this.betTimer);
    clearInterval(this.timer);
    clearInterval(this.msgTimer);
    this.betTimer = null;
    this.timer = null;
  },
  methods: {
    ...mapMutations([
      "SET_GROUP_DATA_ID",
      "SET_PLAY_DATA_ID",
      "CHANGE_ISRUN",
      "CLEAR_OLD_CODE"
    ]),
    ...mapActions([
      "checkedLogin",
      "setSysRebates",
      /* lottery */
      "setLotteryData",
      "setGroupData",
      "setPlayData",
      "setAwardData",
      "setSysRebates",
      /* bet */
      "clearBetCode",
      /* cart */
      "clearCartCode"
    ]),
    awardTemplate() {
      switch (Number(this.$route.params.classify)) {
        case 4:
          this.awardTemplates = "AwardKl10";
          break;
        case 6:
        case 12: // PK10
          this.awardTemplates = "AwardPk10";
          break;
        case 9: // 快3
          this.awardTemplates = "AwardK3";
          break;
        case 10: // 幸运28
          this.awardTemplates = "AwardXy28";
          break;
        case 11: // 六合彩
          this.awardTemplates = "AwardSix";
          break;
        default:
          this.awardTemplates = "AwardNormal";
          break;
      }
    },
    assistantArr(data) {
      //六合彩没走势图判断
      let Arr = [];
      for (let i = 0; i < data.length; i++) {
        if (this.lotteryData.classify === 11) {
          if (i != 1) {
            Arr.push(data[i]);
          }
        } else {
          Arr.push(data[i]);
        }
      }
      return Arr;
    },
    timeOver(time) {
      clearInterval(this.timer);
      if (this.count) {
        this.SealFlag = true;
      }
      if (time > 0) {
        if (this.musicFlag) {
          setTimeout(() => {
            this.playAudio();
          }, 0);
        }
        this.timer = setInterval(() => {
          time--;
          this.buy = "封单(" + time + "S)";
          this.buyFlag = false;
          if (time <= 0) {
            this.pauseAudio();
            this.getLotteryAward();
            clearInterval(this.timer);
            this.buy = "购买";
            this.buyFlag = true;
            this.SealFlag = false;
          }
        }, 1000);
      }
    },
    handleRandom() {
      let tplVm = this.$refs.betTemplate.$refs.childTemplate;
      lotteryRandom({ playId: this.playId }).then(res => {
        if (res.status) {
          tplVm.randomCode2Selected(res.data.actionData, tplVm.titleList);
        } else {
          Toast(res.msg);
        }
      });
    },
    handleBet() {
      if (!this.userInfo) {
        return this.$router.push({
          path: "/login",
          query: { redirect: this.$router.currentRoute.fullPath }
        });
      }
      if (!this.buyFlag) {
        return Toast({
          message: "封单",
          position: "middle"
        });
      }
      if (!this.count) {
        return Toast({
          message: "还未选号",
          position: "middle"
        });
      }
      if (this.playData.maxCount && this.count > this.playData.maxCount) {
        return Toast({
          message:
            `投注不符合规则! [` +
            this.playData.name +
            `] 玩法最高注数 [` +
            this.playData.maxCount +
            `注]`,
          position: "middle"
        });
      }
      let tplVm = this.$refs.betTemplate.$refs.childTemplate;
      if (this.isSix && !this.isSpecial) {
        tplVm.addBetSixCode();
      } else {
        tplVm.addBetCode();
      }
      console.log(
        this.oldCodeList,
        "12222222222222222222222222222222222222222222222222222"
      );
      this.pauseAudio();
      return this.$router.push({
        name: "confirmpurchase",
        params: { id: this.typeId, classify: this.$route.params.classify },
        query: { modeType: this.modeType }
      });
    },
    /* 清空全部选号 */
    clearAllSelected() {
      let tplVm = this.$refs.betTemplate.$refs.childTemplate;
      tplVm.initSelected();
      this.SealFlag = false;
    },
    /* 获取彩种列表 */
    getLotteryList() {
      lotteryList().then(res => {
        if (res.status) {
          this.lotteryList = res.data;
        }
      });
    },
    /* 开奖数据 */
    getLotteryAward() {
      lotteryAward({ typeId: this.$route.params.id, num: this.num }).then(
        res => {
          console.log(res, "开奖信息-----------------");
          if (res.status) {
            this.setAwardData(res.data);
          }
        }
      );
    },
    /* 玩法列表 */
    getLotteryGroup() {
      lotteryGroup({ typeId: this.typeId }).then(res => {
        if (res.status) {
          this.allGroupList = res.data.group;
          if (res.data.lottery.isDoubleMode) {
            this.modeType = 1;
            if (this.$route.query.modeType) {
              this.modeType = this.$route.query.modeType;
            }
          } else {
            this.modeType = 0;
          }
          this.setLotteryData(res.data.lottery);
          this.resetGameType();
          if (this.$route.query.groupId && this.$route.query.playId) {
            this.SET_GROUP_DATA_ID(this.$route.query.groupId);
            this.SET_PLAY_DATA_ID(this.$route.query.playId);
          } else {
            this.setGroupData(this.groupList[0]);
            this.setPlayData(this.playList[0]);
          }
        }
      });
    },
    //------------------------------------------------------------
    handleGroupData(obj, e) {
      console.log("玩法外层");
      this.clearAllSelected();
      this.CLEAR_OLD_CODE([]);
      e = window.event || e;
      e.stopPropagation();
      this.$router.replace({
        name: "bet",
        query: {
          modeType: this.$route.query.modeType,
          groupId: obj.id,
          playId: obj.play[0].id,
          title: this.$route.query.title
        }
      });
      this.setGroupData(obj);
      this.setPlayData(this.playList[0]);
    },
    handlePlayData(obj) {
      console.log("玩法内层");
      this.clearAllSelected();
      this.CLEAR_OLD_CODE([]);
      this.$router.replace({
        name: "bet",
        query: {
          modeType: this.$route.query.modeType,
          groupId: this.isK3 ? obj.groupId : this.$route.query.groupId,
          playId: obj.id,
          title: this.$route.query.title
        }
      });
      if (this.isK3) {
        this.setGroupData({ id: obj.groupId });
      }
      this.setPlayData(obj);
      this.playShow();
    },
    /* 重置gameType */
    resetGameType() {
      switch (this.lotteryData.classify) {
        case 1:
        case 5:
          this.gameType = 1;
          break;
        case 2:
          this.gameType = 2;
          break;
        case 6:
        case 12:
          this.gameType = 3;
          break;
        case 9:
          this.gameType = 4;
          break;
        case 11:
          this.gameType = 5;
          break;
        default:
          this.gameType = 6;
          break;
      }
    },
    /* 助手显示/隐藏 */
    assistantShow() {
      let isShow = this.assistantSwitch;
      this.closeAll();
      this.assistantSwitch = !isShow;
    },
    /* 彩种显示/隐藏 */
    gameShow() {
      let isShow = this.gameSwitch;
      this.closeAll();
      this.gameSwitch = !isShow;
    },
    /* 模式显示 */
    modeShow() {
      let isShow = this.modeSwitch;
      this.closeAll();
      this.modeSwitch = !isShow;
    },
    /* 玩法显示 */
    playShow() {
      let isShow = this.playSwitch;
      this.closeAll();
      this.playSwitch = !isShow;
    },
    /* 切换游戏分类列表 */
    changeGameList(gameType) {
      this.gameType = gameType;
    },
    /* 设置玩法模式 */
    setModeType(item) {
      this.CLEAR_OLD_CODE([]);
      this.$router.push({
        name: "bet",
        query: { modeType: item.val, title: this.$route.query.title }
      });
      this.modeType = item.val;
      this.setGroupData(this.groupList[0]);
      this.setPlayData(this.playList[0]);
    },
    choose(id, classify, title) {
      console.log(`切换游戏------------------${this.$route.query.title}`);
      this.pauseAudio();
      this.clearAllSelected();
      this.CLEAR_OLD_CODE([]);
      clearInterval(this.betTimer);
      clearInterval(this.timer);
      this.betTimer = null;
      this.timer = null;
      let that = this;
      this.$router.replace({
        name: "bet",
        params: { id: id, classify: classify },
        query: { title: title }
      });
      if (classify === 9) {
        lotteryAward({ typeId: id })
          .then(res => {
            if (res.status) {
              that.setAwardData(res.data);
              return 1;
            }
          })
          .then(res => {
            if (res) {
              that.awardTemplate();
            }
          });
      } else {
        this.awardTemplate();
      }
      this.clearCartCode();
      this.buy = "购买";
      this.buyFlag = true;
      this.typeId = id;
      this.gameSwitch = false;
      this.resetGameType();
    },
    closeAll(e) {
      e = window.event || e;
      e.stopPropagation();
      this.assistantSwitch = false; // 助手
      this.gameSwitch = false; // 彩种下拉
      this.modeSwitch = false; // 官方传统下拉框
      this.playSwitch = false; // 游戏玩法下拉框
    },

    k3List(list) {
      let titleList = [];
      let imgList = [];
      for (let i = 0; i < list.length; i++) {
        let listOne = list[i];
        let startTitle = listOne.groupName;
        let groupId = listOne.id;
        let childTitle = "";
        let bonusProp = "";
        let bonusPropArr = [];
        for (let j = 0; j < listOne.play.length; j++) {
          let child = listOne["play"][j];
          childTitle = child.name;
          bonusProp = child.bonusProp;
          if (startTitle == childTitle) {
            childTitle = "";
          } else {
            childTitle = "-" + childTitle;
          }
          if (child.options) {
            for (let i in child.options) {
              bonusPropArr.push(child.options[i].bonusProp);
            }
            bonusPropArr.sort((a, b) => {
              return b - a;
            });
            if (bonusPropArr[0] !== bonusPropArr[bonusPropArr.length - 1]) {
              bonusProp =
                bonusPropArr[bonusPropArr.length - 1] + "~" + bonusPropArr[0];
            } else {
              bonusProp = bonusPropArr[0];
            }
          }
          switch (startTitle + childTitle) {
            case "大小单双":
              imgList = ["01", "+", "03", "+", "05"];
              break;
            case "和值":
              imgList = ["01", "+", "01", "+", "01"];
              break;
            case "三连号-通选":
              imgList = ["01", "+", "02", "+", "03"];
              break;
            case "三同号-通选":
              imgList = ["01", "+", "01", "+", "01"];
              break;
            case "三同号-单选":
              imgList = ["01", "+", "01", "+", "01"];
              break;
            case "三不同号-标准":
              imgList = ["04", "+", "05", "+", "06"];
              break;
            case "三不同号-胆拖":
              imgList = ["02", "+", "04", "+", "06"];
              break;
            case "二同号-复选":
              imgList = ["01", "+", "01", "+", "06"];
              break;
            case "二同号-单选":
              imgList = ["01", "+", "01", "+", "06"];
              break;
            case "二不同号-标准":
              imgList = ["01", "+", "04", "+", "04"];
              break;
            case "二不同号-胆拖":
              imgList = ["01", "+", "04", "+", "04"];
              break;
          }
          titleList.push({
            k3Name: startTitle + childTitle,
            maxBonusProp: bonusProp,
            imgList: imgList,
            groupId: groupId,
            ...child
          });
        }
      }
      return titleList;
    },
    /*返回*/
    goBack() {
      this.pauseAudio();
      this.$router.push({ name: "hall" });
      this.clearAllSelected();
      this.CLEAR_OLD_CODE([]);
    },
    /*页面内通知*/
    getMessages() {
      let timers;
      if (this.userInfo) {
        this.msgTimer = setInterval(() => {
          getMessage().then(res => {
            let num = 0;
            console.log(res, "页面通知-----------------------------");
            if (res.data.msg) {
              this.msg = res.data.msg["0"].content;
              this.$refs.msg.className = "showMsg";
              timers = setInterval(() => {
                num++;
                if (num >= 3) {
                  this.$refs.msg.className = "";
                  clearInterval(timers);
                }
              }, 1000);
            } else {
              clearInterval(timers);
            }
          });
        }, 10000);
      } else {
        clearInterval(this.msgTimer);
      }
    }
  }
};
</script>
<style scoped lang="less">
html,
body,
.body {
  height: 100%;
}
.body {
  .k3Top {
    background-color: #3d3d3d !important;
  }
  .k3Common {
    background-color: #22563f !important;
    div {
      border: none !important;
    }
  }
  .k3Btn {
    background-color: #22563f !important;
    color: white;
  }
  .k3OnBtn {
    border-color: #ee6600 !important;
  }
  .top {
    color: white;
    height: 100px;
    background-color: #605aa2;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;

    .back {
      float: left;
      margin-left: 20px;
      font-size: 50px;
      text-align: left;
      line-height: 100px;
      cursor: pointer;
    }

    div {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 220px;
      line-height: 100px;

      span {
        font-size: 30px;
      }

      i {
        float: right;
        font-size: 18px;
      }
    }

    ul {
      width: 180px;
      float: right;

      li {
        float: left;
        height: 100px;
        line-height: 100px;

        i {
          font-size: 50px;
        }
      }

      li:first-child {
        position: relative;

        .car {
          color: white;
        }

        span {
          position: absolute;
          width: 40px;
          height: 40px;
          background-color: red;
          border-radius: 50%;
          top: 12px;
          right: -15px;
          line-height: 40px;
          text-align: center;
          color: white;
        }
      }

      li:nth-child(2) {
        margin-left: 50px;
        position: absolute;
        right: 25px;

        a {
          display: block;
          color: white;
        }

        dl {
          background-color: #5c5b57;
          position: absolute;
          top: 100px;
          left: -210px;
          width: 282px;
          border-radius: 15px;

          dt {
            position: absolute;
            top: -30px;
            right: 32px;
            width: 0;
            height: 0;
            border: 15px solid transparent;
            border-bottom-color: #5c5b57;
          }

          dd {
            overflow: hidden;
            text-align: left;

            b {
              font-size: 38px;
              font-weight: normal;
              float: left;
              margin: 0 28px 0 26px;
            }

            span {
              display: block;
              font-size: 29px;
              border-bottom: 1px solid #8b8d8c;
              overflow: hidden;
            }
          }

          dd:last-child {
            span {
              border: none;
            }
          }
        }
      }
    }
  }
  .playMode {
    position: fixed;
    top: 100px;
    width: 100%;
    z-index: 999;
    height: 75px;
    background-color: #837ebe;
    div {
      float: left;
      width: 49.69%;
      height: 75px;
      color: white;
      text-align: center;
      line-height: 75px;
      font-size: 30px;
      border-right: 1px solid #dc001a; /*no*/
      position: relative;
      i {
        margin-left: 10px;
      }
    }
    div:last-child {
      border-right: 0;
    }
  }
  .playModeSix {
    position: fixed;
    top: 100px;
    width: 100%;
    z-index: 999;
    height: 75px;
    background-color: #837ebe;
    span {
      line-height: 75px;
      color: white;
      font-size: 32px;
      i {
        margin-left: 10px;
      }
    }
  }
  .popupShow {
    height: 100% !important;
  }
  .popupMode {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    margin-top: 175px;
    ul {
      width: 100%;
      height: 122px;
      background-color: #fff;
      overflow: hidden;
      li {
        width: 186px;
        height: 46px;
        line-height: 46px;
        text-align: center;
        float: left;
        border: 1px solid #dfdcda; /*no*/
        border-radius: 10px;
        margin-top: 35px;
        margin-left: 96px;
        font-size: 28px;
      }
      li:last-child {
        margin-left: 173px;
      }
    }
  }
  .popupPlay {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    margin-top: 175px;
    ul {
      background-color: #fff;
      overflow: hidden;
      padding: 23px 20px 36px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 160px;
        height: 72px;
        line-height: 72px;
        border-radius: 10px;
        border: 1px solid #dfdcda; /*no*/
        margin-top: 20px;
        margin-left: 12px;
        font-size: 28px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    dl {
      overflow: hidden;
      background-color: #fff;
      padding-bottom: 20px;
      dt {
        span {
          display: flex;
          text-indent: 50px;
          margin: 10px auto;
          width: 91%;
        }
        span::after,
        span::before {
          border-top: 1px solid #dfdcda; /*no*/
          content: "";
          flex: 1;
          position: relative;
          top: 15px;
        }
      }
      dd {
        font-size: 28px;
        width: 160px;
        height: 72px;
        line-height: 72px;
        border-radius: 10px;
        border: 1px solid #dfdcda; /*no*/
        float: left;
        margin-top: 20px;
        margin-left: 12px;
        overflow: hidden;
      }
      dd:nth-of-type(4n + 1) {
        margin-left: 35px;
      }
    }
  }
  .k3Play {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #22563f;
    margin-top: 175px;
    border-top: 1px solid #0e7347; /*no*/
    z-index: 99;

    ul {
      overflow: hidden;
      li {
        overflow: hidden;
        width: 200px;
        height: 200px;
        float: left;
        margin-left: 35px;
        margin-top: 33px;
        border: 1px solid rgba(255, 255, 255, 0.3); /*no*/
        p {
          color: white;
          margin-top: 23px;
          line-height: 46px;
          font-size: 27px;
        }
        span {
          line-height: 47px;
          font-size: 23px;
          white-space: nowrap;
          color: #989a99;
        }
        div {
          overflow: hidden;
          display: flex;
          justify-content: space-between;
          padding: 0 15px;
          margin-top: 20px;
          i {
            height: 40px;
            width: 40px;
            img {
              width: 100%;
              height: 100%;
            }
            span {
              line-height: 40px;
              font-size: 30px;
              font-weight: bold;
            }
          }
          .jia {
            width: 15px;
            height: 60px;
          }
        }
      }
    }
  }
  .popups {
    background-color: white;
    width: 100%;
    position: fixed;
    top: 0;
    margin-top: 100px;
    height: 0;
    overflow: hidden;
    transition: 0.3s;
    z-index: 999;
    ul {
      width: 148px;
      background-color: #f2f0f3;
      height: 100%;
      float: left;

      li {
        line-height: 102px;
        font-size: 27px;
        text-align: center;
      }

      .on {
        background-color: white;
      }
    }

    dl {
      overflow: hidden;

      dd {
        overflow: hidden;

        div {
          float: left;
          width: 168px;
          height: 72px;
          border: 1px solid #dfdcda; /*no*/
          border-radius: 10px;
          margin: 16px 0 0 23px;
          line-height: 72px;
          font-size: 27px;
          overflow: hidden;
          span {
            color: #999;
          }
        }
      }

      .show {
        display: block;
      }
    }
  }
  .content {
    /*margin-top: 100px;*/
    /*padding-bottom: 104px;*/
    padding: 100px 0 104px;
    .msg {
      padding-top: 75px;
      text-align: left;
      p {
        line-height: 70px;
        height: 0;
        font-size: 29px;
        padding-left: 30px;
        background-color: rgba(167, 167, 167, 0.7);
        color: #fff;
        transition: 0.3s;
      }
      .showMsg {
        height: 70px;
      }
    }
  }
  .footer {
    width: 100%;
    height: 104px;
    background-color: #3d3d3d;
    border-top: 1px solid #545454; /*no*/
    position: fixed;
    bottom: 0;

    span {
      display: inline-block;
      color: white;
      font-size: 35px;
      text-align: center;
      line-height: 90px;
      border-radius: 10px;
      margin-left: 8px;
      margin-top: 7px;
    }

    span:first-child {
      width: 190px;
      height: 90px;
    }

    .random {
      width: 190px;
      height: 90px;
    }

    .buy {
      width: 300px;
    }
    .buyBig {
      width: 510px !important; // !浏览器字体变大，300px能显示
      transition: 0.3s;
    }
    .NoUser {
      height: 60px !important;
    }
    .footerFixed {
      height: 100px;
      position: absolute;
      bottom: 100px;
      background-color: rgba(0, 0, 0, 0.6);
      width: 100%;

      .left {
        width: 50%;
        height: 100%;
        float: left;
        text-align: left;
        margin-left: 18px;
        h3 {
          margin-top: 10px;
          font-size: 27px;
          color: white;
          margin-bottom: 5px;
        }
        p {
          color: #e7c619;
          font-size: 24px;
          line-height: 33px;
        }
      }
      .right {
        float: right;
        width: 40%;
        height: 100%;
        line-height: 104px;
        a {
          display: block;
          text-align: center;
          width: 100%;
          height: 100%;
          color: #d97b21;
          font-size: 26px;
        }
      }
    }
  }
}
</style>
