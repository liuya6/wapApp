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
    a:nth-child(2) {
      color: white;
      font-weight: normal;
      position: absolute;
      font-size: 40px;
      line-height: 105px;
      padding-left: 10px;
    }
    a:last-child {
      position: absolute;
      color: white;
      right: 20px;
      font-size: 30px;
      padding-top: 10px;
    }
  }
  .content {
    background-color: #f6f6f6;
    ul {
      margin-top: 35px;
      li {
        line-height: 109px;
        font-size: 30px;
        text-align: left;
        overflow: hidden;
        border-bottom: 1px solid #e0dcd9; /*no*/
        background-color: #fff;
        a {
          display: block;
          overflow: hidden;
        }
        b {
          width: 65px;
          height: 65px;
          display: inline-block;
          float: left;
          margin: 21px 15px 0 20px;
          line-height: 85px;
          img {
            display: inline-block;
            width: 100%;
          }
        }
        span {
          float: left;
        }
        span:nth-child(3) {
          float: right;
          margin-right: 60px;
        }
        i {
          position: absolute;
          right: 22px;
          font-size: 31px;
          color: #999999;
        }
      }
      .card {
        border-top: 1px solid #e0dcd9; /*no*/
      }
      .withdrawMoney {
        padding-left: 40px;
        div:first-child {
          line-height: 67px;
          color: #999999;
          font-size: 22px;
          span {
            font-size: 31px;
          }
        }
        div:last-child {
          line-height: 103px;
          b {
            height: 103px;
            line-height: 103px;
            margin: 0;
            font-size: 60px;
          }
          input {
            width: 550px;
            border: 0;
            font-size: 60px;
            vertical-align: middle;
          }
        }
      }
      li:last-child {
        padding-left: 40px;
        line-height: 58px;
        span {
          font-size: 25px;
        }
        span:nth-child(1) {
          color: #999999;
        }
        span:nth-child(2) {
          color: red;
        }
        span:nth-child(3) {
          color: #5e5ba2;
          float: right;
          margin-right: 22px;
        }
      }
    }
    .btn {
      width: 669px;
      height: 87px;
      line-height: 87px;
      color: white;
      text-align: center;
      border-radius: 10px;
      margin: 31px auto 0;
      font-size: 26px;
    }
    .no {
      background-color: #a7a7a7 !important;
    }
    .allW {
      float: right;
      margin-right: 45px;
    }
  }
  .popup {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
    ul {
      background-color: #fff;
      width: 90%;
      margin: 200px auto 0;
      border-radius: 10px;
      padding-top: 30px;
      li:first-child {
        line-height: 80px;
        font-size: 37px;
      }
      li:nth-child(2) {
        color: #a0a0a0;
        font-size: 25px;
      }
      li:nth-child(3) {
        display: flex;
        justify-content: space-around;
        padding: 0 20px;
        margin: 20px 0;
        input {
          text-align: center;
          font-size: 30px;
          width: 70px;
          height: 70px;
          float: left;
          border-radius: 10px;
          border: 1px solid #a0a0a0; /*no*/
        }
      }
      li:nth-child(4) {
        padding: 30px 0;
        span {
          display: inline-block;
          width: 285px;
          height: 80px;
          line-height: 80px;
          border: 1px solid #a0a0a0; /*no*/
          text-align: center;
          border-radius: 10px;
          font-size: 28px;
        }
        span:first-child {
          margin-right: 15px;
        }
        span:last-child {
          margin-left: 15px;
          background-color: #605aa2;
          color: white;
        }
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
<template>
  <div class="body" v-title="'提现中心'">
    <div class="top shenLan">
      <i class="iconfont" @click="goBack">&#xe629;</i>
      提现
      <router-link class="iconfont" to="/user/withdrawcaption"
        >&#xe737;</router-link
      >
      <router-link to="/user/withdrawalsrecord">提现记录</router-link>
    </div>
    <div class="content">
      <ul>
        <li class="card" v-if="myBankCard">
          <router-link
            :to="{ name: 'bankcardlist', query: { from: 'withdraw' } }"
          >
            <b>
              <img :src="bankImg(myBankCard.logo)" alt="" />
            </b>
            <span>
              {{ myBankCard.bankname || myBankCard.oldBankName }}
            </span>
            <span>
              {{ bankNum(myBankCard.account) }}
            </span>
            <i class="iconfont">
              &#xe669;
            </i>
          </router-link>
        </li>
        <li class="withdrawMoney">
          <div>
            <span>提现金额</span>
            （单次提现金额最小{{ cashMin }}元，最大{{ cashMax }}元）
          </div>
          <div>
            <b>
              ￥
            </b>
            <input
              type="number"
              v-focus
              v-model="bankWithdraw.amount"
              pattern="\d*"
            />
          </div>
        </li>
        <li>
          <span>余额：￥{{ userInfo ? userInfo.coin : 0 }}</span>
          <span v-if="isNo"
            >（您当前打码量不足，可能会导致提款失败,还差{{
              (userInfo.cashCodeAmount - userInfo.codeAmount).toFixed(2)
            }}元）</span
          >
          <span v-else @click="allMoneyWithdraw" class="allW">全部提现</span>
        </li>
      </ul>
      <div class="btn onBtn" @click="goWithdraw">确认</div>
    </div>
    <transition name="fade">
      <div class="popup" v-show="withdrawFlag">
        <ul>
          <li>
            输入提现密码
          </li>
          <li>
            请输入6位提现密码，如忘记密码请咨询客服找回
          </li>
          <li class="withdraw">
            <input
              type="tel"
              v-for="(item, i) in 6"
              :key="i"
              maxlength="1"
              v-model="bankWithdraw.coinpwd[i]"
              style="-webkit-text-security:disc;text-security:disc;"
              v-focus
            />
          </li>
          <li>
            <span @click="cancel">取消</span>
            <span @click="confirm" class="onBtn">确认</span>
          </li>
        </ul>
      </div>
    </transition>
    <transition name="fadeUp">
      <div class="success" v-show="isSuccess">
        <ul>
          <li class="iconfont">&#xe62c;</li>
          <li>
            恭喜你！提现申请成功
          </li>
          <li>
            稍后请查收你的账户
          </li>
          <li>
            <span @click="accountdetails">查看记录</span>
            <span @click="goUser">知道了</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { myBankCard, withdrawMoney, cashConfigs } from "../api/index";
import { mapGetters, mapActions } from "vuex";
import { nextInput } from "../common/common";
import { Toast, MessageBox } from "mint-ui";

export default {
  name: "Withdraw",
  data() {
    return {
      isNo: "",
      withdrawFlag: false,
      isSuccess: false,
      myBank: [],
      bankWithdraw: {
        bankId: "",
        amount: "",
        coinpwd: {}
      },
      cashMin: 0,
      cashMax: 0
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    myBankCard() {
      for (let i = 0; i < this.myBank.length; i++) {
        let item = this.myBank[i];
        if (item.id == this.bankWithdraw.bankId) {
          return item;
        }
      }
      return false;
    },
    withdrawalPwd() {
      let list = "";
      for (let i in this.bankWithdraw.coinpwd) {
        let item = this.bankWithdraw.coinpwd[i];
        list += item;
      }
      return list;
    }
  },
  created() {
    cashConfigs().then(res => {
      if (res.status) {
        this.cashMax = res.data.cashMax;
        this.cashMin = res.data.cashMin;
      }
    });
  },
  mounted() {
    nextInput(".withdraw");

    myBankCard().then(res => {
      let StartId = res.data[0].id;
      if (res.status) {
        this.myBank = res.data;
        if (this.$route.query.bankId) {
          this.bankWithdraw.bankId = this.$route.query.bankId;
        } else {
          if (localStorage.getItem("bankId")) {
            this.bankWithdraw.bankId = localStorage.getItem("bankId");
          } else {
            this.bankWithdraw.bankId = StartId;
          }
        }
      }
    });
    this.isNo =
      this.userInfo.cashCodeAmount - this.userInfo.codeAmount > 0
        ? true
        : false;
    if (this.isNo) {
      MessageBox.alert("未达到打码量要收取50%的行政费");
    }
  },
  methods: {
    ...mapActions(["checkedLogin"]),
    allMoneyWithdraw() {
      this.bankWithdraw.amount = parseInt(this.userInfo.coin);
    },
    goBack() {
      this.$router.push({
        name: "user"
      });
    },
    goWithdraw() {
      console.log(this.userInfo, 2222);
      if (!this.bankWithdraw.amount) {
        return Toast("请输入提现金额");
      }
      if (this.userInfo.coin <= 0) {
        return Toast("账户余额为空");
      }
      if (this.cashMin && this.bankWithdraw.amount < parseFloat(this.cashMin)) {
        return Toast("不得低于最小金额");
      }
      if (this.cashMax && this.bankWithdraw.amount > parseFloat(this.cashMax)) {
        return Toast("不得高于最大金额");
      }
      if (this.userInfo.coin < this.bankWithdraw.amount) {
        return Toast("账户余额不足");
      }
      this.withdrawFlag = true;
    },
    confirm() {
      if (!this.withdrawalPwd || this.withdrawalPwd.length < 6) {
        return Toast("请输入提现密码");
      }
      this.bankWithdraw.coinpwd = this.withdrawalPwd;
      withdrawMoney(this.bankWithdraw).then(res => {
        try {
          Toast(res.msg);
          this.bankWithdraw.coinpwd = {};
          if (res.status) {
            this.checkedLogin();
            this.withdrawFlag = !this.withdrawFlag;
            this.bankWithdraw.amount = "";
            this.isSuccess = !this.isSuccess;
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    cancel() {
      this.bankWithdraw.coinpwd = {};
      this.withdrawFlag = !this.withdrawFlag;
    },
    goUser() {
      this.$router.push({
        name: "user"
      });
    },
    accountdetails() {
      this.$router.push({
        name: "withdrawalsrecord"
      });
    }
  }
};
</script>
