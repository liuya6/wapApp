<template>
  <div class="body" v-title="'追号'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      追号
    </div>
    <div class="content">
      <div class="content_top">
        <div class="left" @click="toTab(1)">
          {{ period }}
          <i class="iconfont">&#xe63d;</i>
        </div>
        <div class="center" @click="toTab(2)">
          {{ multiple }}
          <i class="iconfont">&#xe63d;</i>
        </div>
        <div class="right">
          <input type="checkbox" id="checkedAll" @click="checkedAll" checked />
          <label for="checkedAll">全选</label>
        </div>
      </div>
      <div class="shadowBox" v-if="tab === 1" @click="tab = -1">
        <ul class="left_content">
          <li
            v-for="(item, i) in numList"
            :value="item.value"
            @click="changePeriod(item.name, item.val, i)"
            :key="'n' + i"
            :class="{ onBtn: i == showPeriod }"
          >
            {{ item.name }}
          </li>
        </ul>
        <div class="shadow"></div>
      </div>
      <div class="shadowBox" v-if="tab === 2" @click="tab = -1">
        <ul class="left_content">
          <li
            v-for="(item, i) in preDoublingList"
            :value="item.value"
            @click="changeMultiple(item.name, item.val, i)"
            :class="{ onBtn: i == showMultiple }"
            :key="'d' + i"
          >
            {{ item.name }}
          </li>
        </ul>
        <div class="shadow"></div>
      </div>
      <div class="content_btm">
        <ul>
          <li v-for="(item, i) in chasingList" :key="'c' + i">
            <div>第{{ item.actionNo }}期</div>
            <div>
              <input type="number" v-model="item.doubling" />
              <span>倍</span>
            </div>
            <div>{{ (amount * item.doubling).toFixed(3) }}元</div>
            <div>
              <input
                type="checkbox"
                :id="'cj' + i"
                :checked="item.selected"
                @click="checkedOne(item)"
              />
              <label class="shenLan" :for="'cj' + i"></label>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <div class="buy">
        <span class="shenLan" @click="handleBuy">购买</span>
      </div>
      <div class="total">
        <span>共{{ totalNum }}期，总金额{{ totalAmount }}元</span>
        <div>
          <span>中奖即停</span>
          <span>
            <input type="checkbox" id="WinningStop" v-model="winningStop" />
            <label for="WinningStop"></label>
          </span>
        </div>
      </div>
    </div>
    <div class="Popup" v-show="popupFlag">
      <ul>
        <li class="iconfont" style="color: #58d70a;font-size: 120px;">
          &#xe62c;
        </li>
        <li>
          <span style="color: #666">下注成功</span>
          <div style="color: #999;font-size: 16px;margin-top: 2%;">
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
          <span @click="$router.go(-1)" class="onBtn">继续购彩</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { lotteryFuture, lotteryBuy } from "../api";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Toast } from "mint-ui";

const numList = [
  {
    name: "最近5期",
    val: 5
  },
  {
    name: "最近10期",
    val: 10
  },
  {
    name: "最近20期",
    val: 20
  },
  {
    name: "最近30期",
    val: 30
  }
];

const preDoublingList = [
  {
    name: "1倍",
    val: 1
  },
  {
    name: "2倍",
    val: 2
  },
  {
    name: "3倍",
    val: 3
  },
  {
    name: "5倍",
    val: 5
  },
  {
    name: "10倍",
    val: 10
  }
];

export default {
  name: "ChasingCode",
  data() {
    return {
      showContent: false,
      showCenter: false,
      tab: -1,
      numList,
      preDoublingList,
      typeId: this.$route.params.id,
      num: 5,
      preDoubling: 1,
      chasingList: [],
      winningStop: false,
      popupFlag: false,
      msgText: "",
      period: "最近5期",
      multiple: "1倍",
      showPeriod: "",
      showMultiple: ""
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
      "odds",
      "code"
    ]),
    totalNum() {
      let count = 0;
      for (let i = 0; i < this.chasingList.length; i++) {
        if (this.chasingList[i].selected) {
          count++;
        }
      }
      return count;
    },
    totalAmount() {
      let amount = 0;
      for (let i = 0; i < this.chasingList.length; i++) {
        if (this.chasingList[i].selected) {
          amount += parseFloat(this.amount * this.chasingList[i].doubling);
        }
      }
      return amount.toFixed(3);
    }
  },
  watch: {
    chasingList: {
      handler(newVal) {
        console.log(newVal);
        for (let i = 0; i < newVal.length; i++) {
          if (newVal[i].doubling <= 0) {
            newVal[i].doubling = 1;
          }
        }
      },
      deep: true
    }
  },
  created() {
    this.handleFuture();
  },
  methods: {
    ...mapMutations(["CLEAR_OLD_CODE"]),
    changePeriod(name, val, index) {
      this.period = name;
      this.num = val;
      this.showPeriod = this.showPeriod === index ? "" : index;
      this.handleFuture();
    },
    changeMultiple(name, val, index) {
      this.tab = -1;
      this.multiple = name;
      sessionStorage.setItem("PreDoubling", val);
      for (let i = 0; i < this.chasingList.length; i++) {
        this.chasingList[i].doubling = val;
      }
      this.showMultiple = this.showMultiple === index ? "" : index;
    },
    toTab(index) {
      this.tab = index;
    },
    checkedAll(e) {
      e = window.event || e;
      let checkedFlag = e.target.checked;
      if (checkedFlag) {
        for (let i = 0; i < this.chasingList.length; i++) {
          this.chasingList[i].selected = true;
        }
      } else {
        for (let i = 0; i < this.chasingList.length; i++) {
          this.chasingList[i].selected = false;
        }
      }
    },
    checkedOne(item) {
      item.selected = !item.selected;
    },
    handleFuture() {
      lotteryFuture({
        typeId: this.typeId,
        num: this.num
      }).then(res => {
        if (res.status) {
          let List = [];
          for (let i = 0; i < res.data.length; i++) {
            List[i] = {
              ...res.data[i],
              selected: true,
              doubling:
                sessionStorage.getItem("PreDoubling") || this.preDoubling
            };
          }
          this.chasingList = List;
        }
      });
    },
    handleBuy() {
      this.CLEAR_OLD_CODE([]);
      let buyData = {
        code: [],
        para: {
          zhuiHao: 1, // 是否追号
          zhuiHaoMode: this.winningStop ? 1 : 0, // 是否中奖后停止
          type: this.lotteryData.id,
          actionNo: this.awardNext.actionNo,
          kjTime: this.awardNext.actionTime
        },
        zhuiHao: "",
        is_combine: 0
      };
      buyData.code = this.buyBetCode();
      buyData.zhuiHao = this.followDataSplice(this.chasingList);
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
    flex: 1;
    overflow-y: scroll;
    padding-bottom: 58px;

    display: flex;
    flex-direction: column;

    .content_top {
      background-color: #f6f6f6;
      height: 84px;
      line-height: 84px;
      border-bottom: 1px solid #e0dcd9;
      /*no*/

      .left {
        float: left;
        margin-left: 20px;
      }

      .center {
        float: left;
        margin-left: 20px;
      }

      .right {
        float: right;

        select {
          background-color: #f6f6f6;
          outline: none;
          border: 0;
          appearance: none;
          text-align-last: center;
          font-size: 26px;

          option {
            appearance: none;
            width: 100%;
            text-align-last: center;
          }
        }

        input {
          display: none;
        }

        label {
          float: right;
          width: 140px;
          height: 62px;
          background-color: #ffffff;
          text-align: center;
          line-height: 62px;
          border-radius: 8px;
          border: 1px solid #e0dcd9;
          /*no*/
          margin-right: 20px;
          margin-top: 10px;
          font-size: 26px;
        }
      }
    }

    .shadowBox {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 184px;
      left: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      z-index: 10;

      .left_content {
        width: 100%;
        height: 110px;
        background-color: white;
        border-bottom: 1px solid #e0dcd9; /*no*/
        display: flex;
        justify-content: space-around;

        li {
          float: left;
          width: 120px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          color: #999;
          font-size: 25px;
          margin-top: 35px;
          border-radius: 10px;
          border: 1px solid #ededed; /*no*/
        }

        li:first-child {
          margin-left: 20px;
        }
      }

      .shadow {
        width: 100%;
        flex: 1;
        background-color: rgba(0, 0, 0, 0.3);
      }
    }

    .content_btm {
      ul {
        overflow: hidden;

        li {
          overflow: hidden;
          border-bottom: 1px solid #e0dcd9;
          /*no*/
          position: relative;

          div {
            float: left;
          }

          div:first-child {
            width: 255px;
            font-size: 26px;
            color: #656565;
            margin-left: 20px;
            margin-right: 45px;
            line-height: 109px;
          }

          div:nth-child(2) {
            width: 138px;
            height: 47px;
            border: 1px solid #dddddd;
            /*no*/
            background-color: #f6f6f6;
            margin-top: 31px;
            overflow: hidden;
            border-radius: 10px;

            input {
              width: 83px;
              height: 47px;
              border: 0;
              background-color: #f6f6f6;
              text-align: center;
            }

            span {
              background-color: #ffffff;
              display: inline-block;
              width: 50px;
              height: 47px;
              vertical-align: top;
              line-height: 47px;
              font-size: 26px;
              color: #999999;
            }
          }

          div:nth-child(3) {
            width: 145px;
            overflow: hidden;
            white-space: nowrap;
            line-height: 109px;
            margin-left: 75px;
            font-size: 25px;
            color: #666666;
            text-overflow: ellipsis;
          }

          div:last-child {
            position: absolute;
            top: 31px;
            right: 20px;
            float: right;

            input {
              display: none;
            }

            input + label {
              display: inline-block;
              vertical-align: top;
              width: 45px;
              height: 45px;
              text-align: center;
              line-height: 45px;
              background-color: #837cbf;
              border-radius: 50%;
            }

            input:checked + label::before {
              content: "\2714";
              font-size: 29px;
              color: white;
            }
          }
        }
      }
    }
  }

  .footer {
    position: relative;

    .buy {
      height: 102px;
      border-top: 1px solid #545454;
      /*no*/
      background-color: #3d3d3d;

      span {
        display: inline-block;
        width: 96%;
        background-color: #605aa2;
        color: white;
        margin: 7px auto 0;
        height: 90px;
        border-radius: 10px;
        font-size: 34px;
        line-height: 90px;
      }
    }

    .total {
      position: absolute;
      bottom: 102px;
      width: 100%;
      line-height: 58px;
      border-top: 1px solid #c1c1c1;
      /*no*/
      background-color: rgba(0, 0, 0, 0.6);
      text-align: left;
      color: white;
      font-size: 27px;

      span:first-child {
        margin-left: 18px;
      }

      div {
        float: right;
        margin-right: 20px;
        color: #e7c818;

        span:first-child {
          margin-right: 10px;
        }

        input {
          display: none;
        }

        input + label {
          display: inline-block;
          vertical-align: top;
          width: 25px;
          height: 25px;
          text-align: center;
          line-height: 25px;
          background-color: #e7c818;
          border-radius: 6px;
          margin-top: 16px;
        }

        input:checked + label::before {
          content: "\2714";
          font-size: 20px;
          color: #646464;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
