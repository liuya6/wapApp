<template>
  <div class="body" v-title="'额度转换'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      额度转换
      <span>
        <router-link to="/user/conversionrecord">转换记录</router-link></span
      >
    </div>
    <div class="accountList">
      <ul>
        <li v-for="(item, i) in thirdGameList" :key="i" @click="addBorder(i)">
          <div>
            <img :src="imgUrl(item.img)" />
          </div>
          <div>
            <p>{{ item.name }}</p>
            <p>
              余额: <span>{{ moneyList[i] }}</span>
            </p>
          </div>
          <span @click="choose(item.typeKey, i)">转入</span>
        </li>
      </ul>
    </div>
    <div class="footer" v-show="!moneyFlag">
      <span @click="guihu" class="shenLan">一键归户</span>
    </div>
    <div class="moneyPopup" v-show="moneyFlag" @click="close">
      <div class="box" @click="stop">
        <div>
          <input
            type="text"
            placeholder="请输入转入金额"
            v-model="parameter.money"
            ref="moneyInput"
          />
          <span>元</span>
        </div>
        <div>
          <span>系统余额:</span><span>{{ userInfo.coin }}</span
          >元
        </div>
        <span class="onBtn" @click="confirm">确认转入</span>
      </div>
    </div>
    <div class="Popup" v-show="popupFlag" @click="popupFlag = false">
      <ul>
        <li
          class="iconfont"
          :class="{ guiHuTop: guiHuFlag }"
          style="color: #58d70a;font-size: 80px;margin-top: 10px"
        >
          &#xe62c;
        </li>
        <li :class="{ guiHu: guiHuFlag }">
          <span style="color: #666">{{ msgText }}</span>
        </li>
        <li v-show="!guiHuFlag">
          <span @click="popupFlag = false" style="color: #666666">返回</span>
          <span class="onBtn" @click="playGame">进入游戏</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  getThirdConvertList,
  exchangeAllToLottery,
  exchangeMoney,
  thirdMoney,
  thirdGameList
} from "../api";
import { Toast } from "mint-ui";
export default {
  name: "usertransfrom",
  data() {
    return {
      showBorder: "",
      gameList: "",
      moneyFlag: false,
      popupFlag: false,
      msgText: "",
      guiHuFlag: false,
      parameter: {
        type: 1, //1=转出，2=转入
        apiKey: "",
        money: ""
      },
      gameIndex: "",
      thirdGameList: {},
      moneyList: []
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {
    // 显示第三方所有游戏
    this.getThirdGameList();
  },
  methods: {
    ...mapActions(["checkedLogin"]),
    getThirdGameList() {
      thirdGameList().then(res => {
        this.thirdGameList = res.data;
        this.initMoney();
      });
    },
    getThirdMoney(typekey) {
      thirdMoney({ type: typekey })
        .then(res => {
          if (res.status) {
            this.moneyList.splice(
              this.gameIndex,
              1,
              res.data.money == "0" ? "0.00" : res.data.money
            );
          } else {
            this.moneyList.splice(this.gameIndex, 1, "0.00");
          }
        })
        .catch(err => {
          this.moneyList.splice(this.gameIndex, 1, "获取失败");
        });
    },
    initMoney() {
      for (let i in this.thirdGameList) {
        let item = this.thirdGameList[i];
        this.moneyList[i] = "获取中...";
        thirdMoney({ type: item.typeKey })
          .then(res => {
            if (res.status) {
              console.log(res.data.money);
              this.moneyList.splice(
                i,
                1,
                res.data.money == "0" ? "0.00" : res.data.money
              );
            } else {
              this.moneyList.splice(i, 1, "0.00");
            }
          })
          .catch(err => {
            this.moneyList.splice(i, 1, "获取失败");
          });
      }
    },
    addBorder(index) {
      this.showBorder = index;
    },
    choose(Key, index) {
      this.parameter.apiKey = Key;
      this.parameter.money = "";
      this.gameIndex = index;
      this.moneyFlag = true;
      this.$nextTick(() => {
        this.$refs.moneyInput.focus();
      });
    },
    stop(e) {
      e = window.event || e;
      e.stopPropagation();
    },
    close(e) {
      e = window.event || e;
      e.stopPropagation();
      this.moneyFlag = false;
    },
    confirm() {
      if (!this.parameter.money) {
        return Toast("请输入金额");
      }
      exchangeMoney(this.parameter).then(res => {
        if (res.status) {
          this.getThirdMoney(this.parameter.apiKey);
          // this.checkedLogin();
          this.moneyFlag = false;
          this.msgText = res.msg;
          this.popupFlag = true;
          this.guiHuFlag = false;
        } else {
          Toast(res.msg);
        }
      });
    },
    guihu() {
      exchangeAllToLottery().then(res => {
        if (res.status) {
          this.initMoney();
          // this.checkedLogin();
          this.guiHuFlag = true;
          this.msgText = res.msg;
          this.popupFlag = true;
        } else {
          Toast(res.msg);
        }
      });
    },
    playGame() {
      let key = this.parameter.apiKey;
      if (key === "KaiYuan" || key === "LeYou") {
        key = "QP";
      }
      if (key === "CQ9" || key === "MG" || key === "AG" || key === "JDB") {
        key = "DZ";
      }
      if (key === "OG") {
        key = "SX";
      }
      this.$router.push({ name: "hall", query: { typeKey: key } });
    }
  }
};
</script>
<style lang="less" scoped>
.body {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top {
    width: 100%;
    height: 100px;
    background-color: #605aa2;
    color: white;
    line-height: 100px;
    text-align: center;
    font-size: 38px;
    overflow: hidden;
    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
      z-index: 10;
    }
    span {
      position: absolute;
      right: 38px;
      font-size: 27px;
      z-index: 11;
      a {
        color: white;
      }
    }
  }
  .accountList {
    flex: 1;
    overflow-y: scroll;
    background-color: #f5f5f5;
    ul {
      li {
        height: 132px;
        line-height: 132px;
        background-color: #fff;
        border-bottom: 1px solid #e0dcd9; /*no*/
        div:first-child {
          width: 200px;
          text-align: center;
          img {
            width: 120px;
            height: 90px;
            margin-top: 18px;
            margin-left: 41px;
            float: left;
          }
        }

        div {
          width: 300px;
          height: 100%;
          float: left;
          text-align: left;
          p:first-child {
            width: 100%;
            line-height: 47px;
            font-size: 32px;
            margin-top: 20px;
            color: #676767;
          }
          p:nth-child(2) {
            line-height: 44px;
            font-size: 24px;
            color: #999;
            margin-bottom: 20px;
          }
        }
        > span {
          float: right;
          width: 128px;
          height: 52px;
          line-height: 52px;
          color: #3478f7;
          display: block;
          font-size: 26px;
          margin-top: 40px;
          margin-right: 40px;
          border-radius: 10px;
          border: 1px solid #3478f7; /*no*/
        }
      }
    }
  }
  .footer {
    width: 100%;
    height: 149px;
    font-size: 34px;
    background: #fff;
    span {
      width: 707px;
      height: 90px;
      line-height: 90px;
      margin-top: 20px;
      margin-left: 23px;
      display: block;
      color: white;
    }
  }
  .moneyPopup {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2;
    .box {
      width: 75%;
      height: 300px;
      border-radius: 20px;
      background-color: #f5f5f5;
      margin: 200px auto;
      padding-top: 50px;
      div:first-child {
        border: 1px solid #dfdcda; /*no*/
        border-radius: 15px;
        background-color: #fff;
        width: 90%;
        height: 80px;
        line-height: 80px;
        margin: auto;
        position: relative;
        input {
          width: 80%;
          height: 80px;
          background-color: #fff;
          font-size: 38px;
          border: 0;
        }
        span {
          position: absolute;
          right: 20px;
          top: 0;
          font-size: 33px;
          font-weight: bold;
        }
      }
      div:nth-child(2) {
        line-height: 80px;
        color: #999999;
        font-size: 27px;
      }
      > span {
        margin-top: 20px;
        display: inline-block;
        width: 250px;
        height: 80px;
        line-height: 80px;
        border-radius: 15px;
        font-size: 28px;
      }
    }
  }
  .Popup {
    ul {
      width: 500px;
      height: 450px;
      li:first-child {
        line-height: 230px;
      }
      .guiHuTop {
        line-height: 300px !important;
      }
      .guiHu {
        line-height: 50px;
      }
    }
  }
}
</style>
