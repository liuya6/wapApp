<style scoped lang="less">
.body {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top {
    height: 100px;
    background-color: #605aa2;
    line-height: 100px;
    text-align: center;
    color: white;
    font-size: 38px;
    position: relative;

    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
    }
  }

  .content {
    padding-bottom: 500px;
    flex: 1;
    overflow-y: scroll;

    dl {
      margin: auto;
      background-color: #f6f6f6;
      border-radius: 10px;
      padding: 17px 0 20px 25px;

      dd {
        overflow: hidden;

        div {
          float: left;
          width: 50%;
          text-align: left;

          span {
            line-height: 57px;
            font-size: 26px;
          }

          span:nth-child(1) {
            width: 80px;
            display: inline-block;
          }

          span:nth-child(2) {
            color: #9a9a9a;
          }
        }
      }

      dd:last-child {
        border-top: 1px solid #dedddb; /*no*/
        margin-top: 19px;
        line-height: 90px;

        span {
          float: left;
          margin-right: 25px;
        }

        p {
          float: left;
          overflow: hidden;
          line-height: 90px;

          span {
            width: 50px;
            height: 50px;
            color: white;
            background-color: #dc001a;
            border-radius: 50%;
            margin: 20px 0 0 12px;
            line-height: 55px;
            text-align: center;
            font-size: 30px;
          }
        }
      }
    }

    ul {
      margin: 25px auto;
      background-color: #f6f6f6;
      border-radius: 10px;
      padding: 0 0 0 25px;

      li:first-child {
        border-bottom: 1px solid #e0dcd9;
        line-height: 70px;
      }

      li {
        overflow: hidden;
        line-height: 56px;
        text-align: left;
        font-size: 30px;

        span:nth-child(1) {
          float: left;
          width: 160px;
        }

        span:nth-child(2) {
          color: #9a9a9a;
        }
      }

      li:last-child {
        span {
          height: 100%;
        }

        div {
          overflow: hidden;
          color: #9a9a9a;
        }
      }
    }
  }

  .bottom {
    margin: auto;
    background-color: #f6f6f6;
    border-radius: 10px;
    padding: 10px 0 10px 25px;

    div {
      overflow: hidden;
      line-height: 60px;
      text-align: left;
      font-size: 30px;

      span:nth-child(1) {
        float: left;
        width: 160px;
      }

      span:nth-child(2) {
        color: #9a9a9a;
      }
    }
  }
  .pk10 {
    p {
      float: none !important;
      text-align: left;
    }
    div {
      width: 100% !important;
    }
    span {
      display: inline-block !important;
      width: 52px !important;
      height: 52px;
      line-height: 52px;
      text-align: center;
      border-radius: 10px;
      color: white !important;
      margin-right: 15px !important;
    }
  }
  .isK3 {
    i {
      width: 70px;
      height: 70px;
      float: left;
      margin-left: 20px;
      margin-top: 8px;
    }
  }
  .isSix {
    p {
      float: none !important;
      text-align: left;
    }
    ul {
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      width: 95%;
      margin: 0 !important;
      padding: 0 !important;
      li:first-child {
        border: 0 !important;
      }
      li {
        float: left;
        text-align: center;

        b {
          line-height: 52px;
          font-size: 40px;
          font-weight: normal;
        }

        p {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          line-height: 52px !important;
          text-align: center;
          color: white;
          font-size: 28px;
        }

        span {
          display: block !important;
          width: 100% !important;
          font-size: 27px;
          line-height: 48px;
          margin-right: 0 !important;
          text-align: center !important;
        }
      }
    }
  }
  .Revoke {
    padding: 20px 0;
    span {
      width: 93%;
      height: 90px;
      line-height: 90px;
      display: block;
      margin: auto;
      border-radius: 10px;
      color: #fffffd;
      font-size: 34px;
    }
  }
}
</style>
<template>
  <div class="body" v-title="'彩票详情'" v-if="lotteryDetails">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      {{ lotteryDetails.title }}-彩票详情
    </div>
    <div class="content">
      <dl>
        <dd>
          <div>
            <span>彩种</span>
            <span>{{ lotteryDetails.title }}</span>
          </div>
          <div>
            <span>玩法</span>
            <span
              >{{ lotteryDetails.groupName }}-{{
                lotteryDetails.playName
              }}</span
            >
          </div>
        </dd>
        <dd>
          <div>
            <span>期号</span>
            <span>第{{ lotteryDetails.actionNo }}期</span>
          </div>
          <div>
            <span>开奖</span>
            <span>{{ lotteryDetails.info }}</span>
          </div>
        </dd>
        <dd v-if="isXy28" key="isXy28">
          <span>开奖号码</span>
          <p v-if="lotteryDetails.lotteryNo" key="hasCode">
            <span
              class="onBtn"
              v-for="(item, i) in lotteryDetails.lotteryNo"
              :key="i"
              :style="{
                backgroundColor: item == ',' ? '#f6f6f6' : '',
                color: item == ',' ? '#999' : '',
                fontSize: item == ',' ? '22px' : ''
              }"
              >{{ item == "," ? "+" : item }}</span
            >
            <span
              style="color: #999999;background-color: #f6f6f6;font-size: 22px"
              >=</span
            >
            <span>{{ allValue(lotteryDetails.lotteryNo) }}</span>
          </p>
          <p v-else key="noCode">等待开奖</p>
        </dd>
        <dd v-else-if="isPk10" class="pk10" key="Pk10">
          <p>开奖号码</p>
          <div v-if="lotteryDetails.lotteryNo" key="hasCode">
            <span
              class="onBtn"
              v-for="(item, i) in lotteryArr(lotteryDetails.lotteryNo)"
              :key="i"
              :class="'code' + item"
              >{{ item }}</span
            >
          </div>
          <p v-else key="noCode">等待开奖</p>
        </dd>
        <dd v-else-if="isK3" class="isK3" key="isK3">
          <p>开奖号码</p>
          <p v-if="lotteryDetails.lotteryNo" key="hasCode">
            <i v-for="(item, i) in number(lotteryDetails.lotteryNo)" :key="i">
              <img
                :src="require('../assets/img/touzi/touzi_0' + item + '.png')"
                alt
              />
            </i>
          </p>
          <p v-else key="noCode">等待开奖</p>
        </dd>
        <dd v-else-if="isKl10" class="kl10" key="isKl10">
          <span>开奖号码</span>
          <p v-if="lotteryDetails.lotteryNo" key="hasCode">
            <span
              class="onBtn"
              v-for="(item, i) in lotteryArr(lotteryDetails.lotteryNo)"
              :key="i"
              >{{ item }}</span
            >
          </p>
          <p v-else key="noCode">等待开奖</p>
        </dd>
        <dd v-else-if="isSix_" class="isSix" key="isSix">
          <p>开奖号码</p>
          <ul v-if="lotteryDetails.lotteryNo" key="hasCode">
            <li v-for="(item, i) in lotteryDetails.codeData" :key="i">
              <p :style="{ backgroundColor: item.color }">{{ item.code }}</p>
              <span>{{ item.zodiac }}</span>
            </li>
          </ul>
          <p v-else key="noCode">等待开奖</p>
        </dd>
        <dd v-else>
          <span>开奖号码</span>
          <p v-if="lotteryDetails.lotteryNo" key="hasCode">
            <span
              class="ball"
              v-for="(item, i) in lotteryArr(lotteryDetails.lotteryNo)"
              :key="i"
              >{{ item }}</span
            >
          </p>
          <p v-else key="noCode">等待开奖</p>
        </dd>
      </dl>
      <ul>
        <li>
          <span>订单号码</span>
          <span>{{ lotteryDetails.wjorderId }}</span>
        </li>
        <li>
          <span>投注时间</span>
          <span>{{ timestampToString(lotteryDetails.actionTime) }}</span>
        </li>
        <li>
          <span>投注金额</span>
          <span>{{ lotteryDetails.amount }}元</span>
        </li>
        <li>
          <span>投注赔率</span>
          <span>{{ handleOdds(lotteryDetails) }}</span>
        </li>
        <li>
          <span>投注号码</span>
          <div>
            <div v-for="(item, i) in lotteryDetails.bonusArr" :key="i">
              {{ item }}
            </div>
          </div>
        </li>
      </ul>
      <div class="bottom">
        <div>
          <span>是否中奖</span>
          <span>{{ lotteryDetails.info }}</span>
        </div>
        <div>
          <span>返点</span>
          <span>{{ parseInt(lotteryDetails.fanDian).toFixed(3) }}%</span>
        </div>
        <div>
          <span>中奖金额</span>
          <span>{{ lotteryDetails.bonus }}元</span>
        </div>
        <div>
          <span>输赢</span>
          <span>{{ lotteryDetails.bill }}元</span>
        </div>
        <div>
          <span>和局返还</span>
          <span>{{ lotteryDetails.returnAmount }}元</span>
        </div>
        <div>
          <span>返点金额</span>
          <span
            >{{
              (
                (lotteryDetails.fanDian / 100) *
                parseInt(lotteryDetails.amount)
              ).toFixed(3)
            }}元</span
          >
        </div>
      </div>
    </div>
    <div class="Revoke" v-if="!isShowDelete">
      <span @click="revoke" class="onBtn">撤单</span>
    </div>
  </div>
</template>

<script>
import { lotteryDetail, lotteryCancel } from "../api";
import { MessageBox, Toast } from "mint-ui";
export default {
  name: "LotteryDetails",
  data() {
    return {
      lotteryDetails: [],
      classify: this.$route.params.classify,
      isShowDelete: true
    };
  },
  mounted() {
    lotteryDetail({
      id: this.$route.query.id
    }).then(res => {
      try {
        this.lotteryDetails = res.data;
        this.isShowDelete = this.isShowDeletes;
      } catch (e) {
        console.log(e);
      }
    });
  },
  computed: {
    isPk10() {
      return this.classify == 6 || this.classify == 12;
    },
    isK3() {
      return this.classify == 9;
    },
    isKl10() {
      return this.classify == 4;
    },
    isXy28() {
      return this.classify == 10;
    },
    isSix_() {
      return this.classify == 11;
    },
    isShowDeletes() {
      return this.lotteryDetails.lotteryNo || this.lotteryDetails.isDelete;
    }
  },
  methods: {
    handleOdds(lottery) {
      if (Number(lottery.bonusProp)) {
        return lottery.bonusProp;
      } else {
        if (lottery.oddsMore) {
          let oddsObj = JSON.parse(lottery.oddsMore);
          let oddsArr = [];
          Object.keys(oddsObj).forEach(i => {
            oddsArr.push(i, oddsObj[i]);
          });
          return String(oddsArr);
        }
      }
    },
    // 撤单
    revoke() {
      MessageBox.confirm("确定撤销此次投注?").then(action => {
        lotteryCancel({
          typeId: this.lotteryDetails.type,
          betId: this.lotteryDetails.id
        }).then(res => {
          if (res.status) {
            this.$router.go(-1);
          }
          Toast(res.msg);
        });
      });
    },
    number(string) {
      if (string) {
        string = string.replace(/,/g, "");
      }
      return string;
    },
    allValue(data) {
      let allNum = new Number();
      data = data.split(",");
      data.map(item => {
        allNum += item * 1;
      });
      return allNum;
    },
    lotteryArr(data) {
      return data.split(",");
    }
  }
};
</script>
