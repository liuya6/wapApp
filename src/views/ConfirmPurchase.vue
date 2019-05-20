<template>
  <div class="body" v-title="'确认购买'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      确认购买
    </div>
    <div class="content">
      <ul>
        <li>
          <h3>玩法</h3>
          <p v-if="isK3" key="isK3">
            {{ lotteryData.title || "?" }}-{{ playData.name || "?" }}
          </p>
          <p v-else key="noK3">
            {{ lotteryData.title || "?" }}
            -{{ groupData.groupName || "?" }} -{{ playData.name || "?" }}
          </p>
        </li>
        <li v-if="isSix && !this.isSpecial" class="isSix">
          <h3>所选号码<span>（单位为元）</span></h3>
          <dl>
            <dd v-for="(item, i) in codeList" :key="i">
              <span>{{ item }}</span>
              <p>
                <input
                  type="number"
                  v-model="sixCode[item]"
                  oninput="if(value.length>5)value=value.slice(0,6)"
                />
              </p>
            </dd>
          </dl>
        </li>
        <li v-else>
          <h3>所选号码</h3>
          <p>{{ code }}</p>
        </li>
      </ul>
      <div class="allNum">
        <p>
          总注数 <span style="color: red">{{ count }}</span> 注， 总金额
          <span style="color: red">{{
            isSix && !this.isSpecial ? sixAmount : amount
          }}</span>
          元
        </p>
        <span v-if="!isSix">单注最高中奖{{ bonus }}元</span>
      </div>
      <div class="odds">
        <h3 v-if="!noCart && !isK3" key="no_range_block">返点</h3>
        <h3 v-else class="noRange" key="no_range">最高赔率:{{ showOdds }}</h3>
        <div v-show="!noCart && !isK3">
          <mt-range v-model="rangeValue" :max="maxRebates" :step="1">
          </mt-range>
        </div>
        <p v-show="!noCart && !isK3">
          <span>赔率{{ showOdds }}</span>
          <span>返点{{ rebates }}%</span>
        </p>
      </div>
      <div class="price unit">
        <span>单位</span>
        <dl v-if="!noCart && !isK3 && isUnitShow">
          <dd
            :class="{ onBtn: unit === 1 }"
            v-if="unitList.yuanmosi === '1'"
            @click="changeUnit('yuanmosi')"
          >
            元
          </dd>
          <dd
            :class="{ onBtn: unit === 0.1 }"
            v-if="unitList.jiaomosi === '1'"
            @click="changeUnit('jiaomosi')"
          >
            角
          </dd>
          <dd
            :class="{ onBtn: unit === 0.01 }"
            v-if="unitList.fenmosi === '1'"
            @click="changeUnit('fenmosi')"
          >
            分
          </dd>
          <dd
            :class="{ onBtn: unit === 0.001 }"
            v-if="unitList.limosi === '1'"
            @click="changeUnit('limosi')"
          >
            厘
          </dd>
        </dl>
        <dl v-else>
          <dd class="onBtn">元</dd>
        </dl>
      </div>
      <div class="price">
        <span>单注</span>
        <div>
          <input
            type="number"
            @focus="tempDoubling = doubling"
            @blur="
              !doubling ? (doubling = tempDoubling) : (doubling = doubling)
            "
            @input="changePrices"
            v-model="doubling"
            style="color: black;font-size: 18px;"
          />
          倍
          <!--{{unitText[unit]}}-->
        </div>
        <dl>
          <dd
            v-for="(item, i) in doublingList"
            :key="i"
            :class="{ onBtn: doubling == item }"
            @click="changePrice(item)"
          >
            {{ item }} 倍
            <!--{{unitText[unit]}}-->
          </dd>
        </dl>
      </div>
      <div class="buy">
        <div v-show="!noCart">
          <span @click="goChasing()">追号</span>
          <span @click="goCart()">加入购物车</span>
        </div>
        <p class="shenLan goBuy" @click="goBuy">直接购买</p>
      </div>
    </div>
    <div class="Popup" v-show="popupFlag">
      <ul>
        <li class="iconfont" style="color: #58d70a;font-size: 120px">
          &#xe62c;
        </li>
        <li>
          <span style="color: #666666">下注成功</span>
          <div style="color: #999999;font-size: 16px;margin-top: 2%;">
            <p>{{ msgText.title }}第{{ msgText.actionNo }}期</p>
            <p>投注金额：{{ msgText.amount }}元</p>
          </div>
        </li>
        <li>
          <span
            @click="
              $router.push({
                name: 'betrecord',
                params: { id: $route.params.id },
                query: { title: lotteryData.title }
              })
            "
            style="color: #666666"
            >查看记录</span
          >
          <span @click="goBet" class="onBtn">继续购彩</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { lotteryBuy, oneSetting, sysUnit } from "../api";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Toast } from "mint-ui";
const UNIT_OBJ = {
  yuanmosi: { value: 1, name: "betModeMaxFanDian0", text: "元" },
  jiaomosi: { value: 0.1, name: "betModeMaxFanDian1", text: "角" },
  fenmosi: { value: 0.01, name: "betModeMaxFanDian2", text: "分" },
  limosi: { value: 0.001, name: "betModeMaxFanDian3", text: "厘" }
};
// const UNIT_TEXT = {
//   1: "元",
//   0.1: "角",
//   0.01: "分",
//   0.001: "厘"
// }
export default {
  name: "confirmPurchase",
  data() {
    return {
      typeId: this.$route.params.id,
      rangeValue: 0,
      doublingList: ["10", "50", "100"],
      popupFlag: false,
      msgText: "",
      tempDoubling: 0,
      sixCode: {},
      unitList: {},
      unitText: {
        1: "元",
        0.1: "角",
        0.01: "分",
        0.001: "厘"
      }
    };
  },
  computed: {
    ...mapGetters([
      /* user.js */
      "userInfo",
      /* lottery.js */
      "lotteryData",
      "groupData",
      "playData",
      "awardNext",
      /* bet.js */
      // "doubling",
      "unit",
      "price",
      "count",
      "amount",
      "bonus",
      "rebates",
      "sysRebates",
      "unitRebates",
      "odds",
      "showOdds",
      "code",
      "sixAmount"
    ]),
    isUnitShow() {
      if (
        this.unitList.yuanmosi === "1" ||
        this.unitList.yuanmosi === "1" ||
        this.unitList.yuanmosi === "1" ||
        this.unitList.yuanmosi === "1"
      ) {
        return true;
      } else {
        return false;
      }
    },
    doubling: {
      get() {
        return this.$store.getters.doubling;
      },
      set(value) {
        this.setDoubling(value);
      }
    },
    maxRebates() {
      let fandian =
        this.userInfo && this.userInfo.fanDian
          ? this.userInfo.fanDian
          : this.sysRebates;
      console.log(this.userInfo, this.sysRebates, fandian);
      fandian =
        this.unitRebates && this.unitRebates < fandian
          ? this.unitRebates
          : fandian;
      return parseInt(fandian * 10);
    },
    isSix() {
      return this.lotteryData.classify == 10 || this.lotteryData.classify == 11;
    },
    isK3() {
      return this.lotteryData.classify == 9;
    },
    isSpecial() {
      // 特殊
      let playId = this.$store.getters.playData.id;
      let groupId = this.$store.getters.groupData.id;
      return groupId == 139 || groupId == 140 || playId == 345;
    },
    noCart() {
      return (
        this.lotteryData.classify == 10 ||
        this.lotteryData.classify == 11 ||
        this.$route.query.modeType == 1
      );
    },
    codeList() {
      return this.code.split(",");
    }
  },
  watch: {
    rangeValue(newValue) {
      this.setRebates(parseFloat(newValue / 10));
    },
    doubling(newVal) {
      if (!newVal) {
        this.setDoubling(0);
      }
    },
    sixCode: {
      handler(newVal) {
        let AllAmount = 0;
        let codeList = [];
        let flag = true;
        for (let i in newVal) {
          AllAmount = AllAmount + newVal[i] * 1;
          if (Number(newVal[i]) !== this.doubling) {
            this.setDoubling("");
          }
          codeList.push(newVal[i]);
        }
        this.setSixAmount(AllAmount);
        for (let k = 0; k < codeList.length; k++) {
          let codeOne = codeList[k];
          if (codeList.indexOf(codeOne) !== 0) {
            flag = false;
          }
        }
        if (flag) {
          for (let j = 0; j < this.doublingList.length; j++) {
            let itemOne = this.doublingList[j];
            if (codeList.indexOf(itemOne) === 0) {
              this.setDoubling(itemOne);
            }
          }
        }
      },
      deep: true
    }
  },
  created() {
    this.checkedLogin({});
    this.setSysRebates();
    this.setRebates(parseFloat(this.rangeValue / 10));
    if (this.isSix && !this.isSpecial) {
      this.initialSixCode();
    }
    this.getSysUnit();
  },
  methods: {
    ...mapMutations(["CLEAR_OLD_CODE"]),
    ...mapActions([
      /* user */
      "checkedLogin" /* bet */,
      "setCode",
      "setCount",
      "getOdds",
      "setDoubling",
      "setRebates",
      "setUnit",
      "clearRebates",
      "clearBetCode",
      "setSysRebates" /* cart */,
      "addCartCode",
      "setSixAmount"
    ]),
    getSysUnit() {
      sysUnit().then(res => {
        if (res.status) {
          this.unitList = res.data;
          console.log(this.unitList, 33333);
        }
      });
    },
    changeUnit(name) {
      this.setUnit(UNIT_OBJ[name].value);
    },
    changePrices(e) {
      e = window.event || e;
      let val = e.target.value;
      if (val.length > 6) val = val.slice(0, 6);
      this.changePrice(val);
    },
    changePrice(item) {
      if (this.isSix) {
        for (let i in this.sixCode) {
          this.$set(this.sixCode, i, item);
        }
      }
      this.setDoubling(item);
    },
    initialSixCode() {
      console.log("【initialSixCode】", this.code, this.isSpecial);
      let delimiter = "";
      if (this.isSpecial) {
        delimiter = " ";
        this.code.split(delimiter).map(item => {
          this.$set(this.sixCode, item, this.price);
        });
      } else {
        delimiter = ",";
        this.code.split(delimiter).map(item => {
          this.$set(this.sixCode, item, this.price);
        });
      }
    },
    goBet() {
      if (this.playData.id === 345) {
        return this.$router.push({
          name: "bet",
          param: {
            id: this.lotteryData.id,
            classify: this.lotteryData.classify
          },
          query: { title: this.lotteryData.title }
        });
      } else {
        return this.$router.go(-1);
      }
    },
    goBuy() {
      this.CLEAR_OLD_CODE([]);
      if (!this.userInfo) {
        return this.$router.push({
          path: "/login",
          query: { redirect: this.$router.currentRoute.fullPath }
        });
      }
      let buyData = {
        code: [],
        para: {
          type: this.lotteryData.id,
          actionNo: this.awardNext.actionNo,
          kjTime: this.awardNext.actionTime
        },
        zhuiHao: "",
        is_combine: 0
      };
      if (this.isSix && !this.isSpecial) {
        buyData.code = this.buyBetSixCode(this.sixCode);
      } else {
        buyData.code = this.buyBetCode();
      }
      console.log(buyData);
      lotteryBuy(buyData).then(res => {
        if (res.status) {
          this.msgText = res.data;
          this.popupFlag = !this.popupFlag;
        } else {
          Toast({
            message: res.msg,
            position: "middle"
          });
        }
      });
    },
    goCart() {
      if (!this.userInfo) {
        return this.$router.push({
          path: "/login",
          query: { redirect: this.$router.currentRoute.fullPath }
        });
      }
      this.CLEAR_OLD_CODE([]);
      this.addCartCode(this.betCode2cartCode());
      this.$router.replace({ name: "cart", params: { id: this.typeId } });
    },
    goChasing() {
      if (!this.userInfo) {
        return this.$router.push({
          path: "/login",
          query: { redirect: this.$router.currentRoute.fullPath }
        });
      }
      this.$router.push({
        name: "chasingcode",
        params: { id: this.typeId }
      });
    }
  }
};
</script>
<style scoped lang="less">
.body {
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
    ul {
      text-align: left;

      li {
        padding-left: 43px;
        border-bottom: 1px solid #dddddd;
        font-size: 29px;

        h3 {
          line-height: 46px;
        }

        p {
          color: #989898;
          line-height: 43px;
        }
      }

      li:first-child {
        padding-top: 27px;
        padding-bottom: 16px;
      }

      li:last-child {
        padding-top: 5px;
        padding-bottom: 11px;

        p {
          padding-right: 10px;
          line-height: 46px;
          word-wrap: break-word;
        }
      }

      .isSix {
        padding-bottom: 30px !important;

        h3 {
          span {
            color: #999999;
          }
        }

        dl {
          overflow: hidden;

          dd {
            float: left;
            width: 125px;
            overflow: hidden;
            text-align: center;
            margin-right: 10px;

            span {
              color: #666666;
              font-size: 30px;
              display: inline-block;
              margin-top: 30px;
              margin-bottom: 10px;
            }

            p {
              width: 120px;
              height: 55px;
              border: 1px solid #dcdcdc; /*no*/
              border-radius: 10px;
              padding-right: 0;

              input {
                width: 100%;
                border: 0;
                vertical-align: middle;
                text-align: center;
                font-size: 30px;
              }
            }
          }
        }
      }
    }

    .allNum {
      width: 95%;
      margin: 20px auto 0;
      background-color: #f2f2f2;
      padding: 10px 0 13px 0;

      p {
        line-height: 46px;
        font-size: 30px;
      }

      span {
        font-size: 27px;
        color: #989898;
        line-height: 42px;
      }
    }

    .odds {
      margin-top: 41px;

      h3 {
        float: left;
        line-height: 48px;
        margin: 0 30px 0 42px;
        color: #666666;
        font-size: 30px;
      }

      .noRange {
        float: none;
        text-align: left;
        color: #999999;
      }

      div:nth-child(2) {
        width: 97%;
      }

      p {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        padding-left: 130px;
        padding-right: 25px;

        span {
          font-size: 28px;
          color: #999999;
        }

        span:first-child {
        }
      }
    }

    .price {
      padding: 45px 0 40px 42px;

      span {
        float: left;
        line-height: 65px;
      }

      div {
        text-align: left;
        overflow: hidden;
        padding-left: 31px;

        input {
          width: 175px;
          height: 60px;
          border: 1px solid #dddddd; /*no*/
          border-radius: 10px;
          margin-right: 20px;
          text-align: center;
        }
      }

      dl {
        display: flex;
        justify-content: space-between;
        padding-left: 77px;
        padding-right: 30px;
        margin-top: 15px;

        dd {
          width: 178px;
          height: 62px;
          background-color: #c6cfd6;
          color: white;
          line-height: 62px;
          border-radius: 10px;
        }
      }

      .quick {
        color: #666666;
        font-size: 29px;
        line-height: 60px;
      }
    }

    .buy {
      border-top: 1px solid #dddddd; /*no*/
      background-color: #f6f6f6;
      padding-top: 67px;
      font-size: 26px;

      div {
        width: 95%;
        margin: auto;
        display: flex;
        justify-content: space-between;

        span {
          display: inline-block;
          width: 343px;
          height: 85px;
          border: 1px solid #dddddd; /*no*/
          line-height: 85px;
          border-radius: 10px;
          background-color: #ffffff;
        }
      }

      .goBuy {
        margin: 20px auto 0;
        text-align: center;
        width: 95%;
        height: 87px;
        color: white;
        line-height: 87px;
        border-radius: 10px;
        font-size: 30px;
      }
    }
    .unit {
      padding-bottom: 0;
      overflow: hidden;
      > span {
        line-height: 100px;
      }
      dl {
        padding-left: 15px;
        padding-right: 15px;
        justify-content: flex-start;
        dd {
          width: 120px;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
