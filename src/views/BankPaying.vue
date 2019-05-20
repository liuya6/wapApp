<template>
  <div class="body">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      充值金额
    </div>
    <div class="content">
      <dl>
        <dd>
          <span>订单号</span>
          <span>{{ order.recharge.rechargeId }}</span>
        </dd>
        <dd>
          <span>银行</span>
          <span>{{ order.rechargeMethod.rechargeName }}</span>
        </dd>
        <dd>
          <span>收款人</span>
          <span>{{ order.rechargeMethod.username }}</span>
          <span
            v-clipboard:copy="order.rechargeMethod.username"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >复制</span
          >
        </dd>
        <dd>
          <span>账号</span>
          <span>{{ order.rechargeMethod.account }}</span>
          <span
            v-clipboard:copy="order.rechargeMethod.account"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >复制</span
          >
        </dd>
        <dd>
          <span>开户网点</span>
          <span>{{ order.rechargeMethod.bankname }}</span>
          <span
            v-clipboard:copy="order.rechargeMethod.bankname"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >复制</span
          >
        </dd>
      </dl>
      <ul>
        <li>
          <span>存入时间</span>
          <input
            type="text"
            :placeholder="timestampToString(order.recharge.actionTime)"
            readonly
          />
        </li>
        <li>
          <span>存款人姓名</span>
          <input
            type="text"
            placeholder="请输入存款人姓名"
            v-model="payAccountName"
          />
        </li>
        <li>
          <span>存入金额</span>
          <input
            type="text"
            :placeholder="MaxMoney"
            v-model="parameter.amount"
          />
        </li>
        <li>
          <span>转账方式</span>
          <select v-model="parameter.bankPos">
            <option value="网银转账">网银转账</option>
            <option value="ATM现金入款">ATM现金入款</option>
            <option value="手机银行转账">手机银行转账</option>
            <option value="ATM自动柜员机">ATM自动柜员机</option>
            <option value="银行柜台转账">银行柜台转账</option>
            <option value="其他">其他</option>
          </select>
        </li>
      </ul>
      <div class="btn">
        <span @click="back">上一步</span>
        <span class="onBtn" @click="submit">提交订单</span>
      </div>
      <div class="remind">
        <p>*提醒您:</p>
        <p>1，请如实填写存入时间、存入金额、存款人姓名。</p>
        <p>2，每笔转账请提交一次</p>
        <p>3，如转账金额添加零头如5003.10，便于查收，加快到账速度</p>
        <p>4，转账完成后请保留单据作为核对凭证</p>
      </div>
    </div>
  </div>
</template>

<script>
import { rechargeSubmit } from "../api";
import { Toast } from "mint-ui";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "BankPaying",
  data() {
    return {
      payAccountName: "",
      parameter: {
        rechargeId: "",
        methodId: this.$route.query.id,
        amount: "",
        date: "",
        payAccountNameFull: "",
        bankPos: "网银转账"
      }
    };
  },
  mounted() {
    console.log(this.order);
  },
  computed: {
    ...mapGetters(["order"]),
    MaxMoney() {
      if (
        this.order.rechargeMethod.rechargeMin &&
        this.order.rechargeMethod.rechargeMax
      ) {
        return `${this.order.rechargeMethod.rechargeMin}-${
          this.order.rechargeMethod.rechargeMax
        }元`;
      } else if (
        this.order.rechargeMethod.rechargeMin &&
        !this.order.rechargeMethod.rechargeMax
      ) {
        return `金额最低${this.order.rechargeMethod.rechargeMin}元`;
      } else if (
        !this.order.rechargeMethod.rechargeMin &&
        this.order.rechargeMethod.rechargeMax
      ) {
        return `金额最高${this.order.rechargeMethod.rechargeMax}元`;
      } else {
        return `请输入存入金额`;
      }
    }
  },
  methods: {
    ...mapMutations(["DEPOSITS", "TRANSFER_METHOD"]),
    submit() {
      if (!this.payAccountName) {
        return Toast("请输入存款人姓名");
      }
      if (!this.parameter.amount) {
        return Toast("请输入存入金额");
      }
      this.parameter.rechargeId = this.order.recharge.rechargeId;
      this.parameter.date = this.timestampToString(
        this.order.recharge.actionTime
      );
      this.parameter.payAccountNameFull =
        this.order.rechargeMethod.orderdesc + this.payAccountName;
      this.DEPOSITS(this.parameter.amount);
      this.TRANSFER_METHOD(this.parameter.bankPos);

      if (parseFloat(this.order.rechargeMethod.rechargeMin) > 0) {
        if (
          this.parameter.amount <
          parseFloat(this.order.rechargeMethod.rechargeMin)
        ) {
          return Toast(
            "充值金额不能低于" + this.order.rechargeMethod.rechargeMin + "元"
          );
        }
      }
      if (parseFloat(this.order.rechargeMethod.rechargeMax) > 0) {
        if (
          this.parameter.amount >
          parseFloat(this.order.rechargeMethod.rechargeMax)
        ) {
          return Toast(
            "充值金额不能高于" + this.order.rechargeMethod.rechargeMax + "元"
          );
        }
      }
      rechargeSubmit(this.parameter).then(res => {
        if (res.status) {
          this.$router.push({
            name: "banksubmit"
          });
        } else {
          Toast(res.msg);
        }
      });
    },
    onCopy: function(e) {
      Toast("复制成功");
    },
    onError: function(e) {
      Toast("复制失败");
    }
  }
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$el.className = "body animated slideInRight";
  //   });
  // }
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
  }
  .content {
    dl {
      background-color: #fff;
      text-align: left;
      padding-top: 15px;
      dd {
        padding-left: 60px;
        font-size: 30px;
        span {
          line-height: 50px;
        }
        span:first-child {
          display: inline-block;
          width: 130px;
          text-align-last: justify;
        }
        span:nth-child(2) {
          color: #999999;
          margin-left: 25px;
        }
        span:nth-child(3) {
          float: right;
          color: #999999;
          margin-right: 50px;
        }
      }
      dd:last-child {
        border-bottom: 1px solid #e0dcd9; /*no*/
      }
    }
    ul {
      background-color: #fff;
      text-align: left;
      li {
        margin: 16px 0;
        span {
          line-height: 75px;
          font-size: 30px;
          -ms-text-align-last: right;
          text-align: right;
          display: inline-block;
          width: 188px;
        }
        input {
          margin-left: 30px;
          width: 467px;
          height: 73px;
          border: 1px solid #999999; /*no*/
          border-radius: 10px;
          padding-left: 25px;
          font-size: 30px;
        }
        select {
          display: inline-block;
          margin-left: 30px;
          font-size: 32px;
          border: 0px;
          height: 75px;
          outline: none;
          text-align-last: center;
        }
      }
      li:last-child {
        border-bottom: 1px solid #e0dcd9; /*no*/
      }
    }
    .btn {
      width: 95%;
      display: flex;
      margin: 30px auto 0;
      justify-content: space-around;
      span {
        display: inline-block;
        width: 333px;
        height: 86px;
        border: 1px solid #e0dcd9; /*no*/
        text-align: center;
        line-height: 86px;
        font-size: 30px;
        border-radius: 10px;
      }
    }
    .remind {
      text-align: left;
      padding: 23px 43px 0 30px;
      p {
        line-height: 50px;
        color: #676767;
        font-size: 27px;
      }
    }
  }
}
</style>
