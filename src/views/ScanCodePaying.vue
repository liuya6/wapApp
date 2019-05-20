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
    ul {
      text-align: left;
      padding-top: 15px;
      li {
        padding-left: 62px;
        line-height: 48px;
        overflow: hidden;
        span {
          float: left;
          font-size: 32px;
        }
        span:first-child {
          width: 133px;
          text-align-last: justify;
        }
        span:last-child {
          color: #999999;
          margin-left: 20px;
        }
      }
      li:last-child {
        padding-bottom: 20px;
        border-bottom: 1px solid #dedddb; /*no*/
        div {
          overflow: hidden;
          width: 226px;
          height: 226px;
          padding-left: 20px;
        }
      }
    }
    .msg {
      text-align: left;
      div {
        margin: 18px 0;
        span {
          display: inline-block;
          width: 197px;
          text-align: right;
          line-height: 75px;
          font-size: 32px;
          white-space: nowrap;
        }
        input {
          margin-left: 20px;
          width: 467px;
          height: 73px;
          border: 1px solid #999999; /*no*/
          border-radius: 10px;
          padding-left: 25px;
          font-size: 30px;
        }
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
    dl {
      text-align: left;
      padding: 23px 43px 0 30px;
      dd {
        line-height: 50px;
        color: #676767;
        font-size: 27px;
      }
    }
  }
}
</style>
<template>
  <div class="body">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      充值金额
    </div>
    <div class="content">
      <ul v-if="order">
        <li>
          <span>商户名称</span>
          <span>{{ order.rechargeMethod.ext2 }}</span>
        </li>
        <li>
          <span>存入时间</span>
          <span>{{ timestampToString(order.recharge.actionTime) }}</span>
        </li>
        <li>
          <span>支付码</span>
          <div>
            <img :src="order.rechargeMethod.image" alt="支付二维码" />
          </div>
        </li>
      </ul>
      <div class="msg" v-if="order">
        <div>
          <span>{{ order.rechargeMethod.orderdesc || "账号" }}</span>
          <input
            type="text"
            :placeholder="`请输入${order.rechargeMethod.orderdesc}`"
            v-model="payAccountName"
          />
        </div>
        <div>
          <span>存入金额</span>
          <input
            type="number"
            :placeholder="MaxMoney"
            v-model="parameter.amount"
          />
        </div>
      </div>
      <div class="btn">
        <span @click="back">上一步</span>
        <span class="onBtn" @click="submit">提交订单</span>
      </div>
      <dl>
        <dd>*扫码步骤:</dd>
        <dd>1，请自行截屏或长按保存二维码图片到相册。</dd>
        <dd>2，进入支付宝APP，打开扫一扫。</dd>
        <dd>3，在扫一扫中点击右上角，选择“从相册选择二维码”选取截屏的图片。</dd>
        <dd>
          4，输入你欲充值的金额并进行转账。如充值未及时到账，请联系在线客服。
        </dd>
        <dd>5，在支付宝支付完成后，请点击“提交订单”提交审核。</dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { rechargeSubmit } from "../api";
import { Toast } from "mint-ui";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "ScanCodePaying",
  data() {
    return {
      payAccountName: "",
      parameter: {
        rechargeId: "",
        amount: "",
        date: "",
        payAccountNameFull: "",
        bankPos: ""
      }
    };
  },
  created() {
    if (!this.$route.query.id) this.$router.go(-1);
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
    ...mapMutations(["DEPOSITS"]),
    submit() {
      if (!this.payAccountName) {
        return Toast("请输入账号");
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
            name: "scancodesubmit"
          });
        } else {
          Toast(res.msg);
        }
      });
    }
  }
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$el.className = "body animated slideInRight";
  //   });
  // }
};
</script>
