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
    padding: 46px 40px 0;
    .divInput {
      width: 620px;
      height: 80px;
      line-height: 80px;
      border-radius: 80px;
      padding-left: 50px;
      text-align: left;
      border: 1px solid #dedddb;
      background-color: #f6f6f6;
      input {
        width: 600px;
        border: 0;
        background-color: #f6f6f6;
        font-size: 31px;
        vertical-align: middle;
      }
    }
    ul {
      overflow: hidden;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      margin-top: 24px;
      li {
        width: 216px;
        height: 74px;
        background-color: #c6cfd6;
        color: white;
        text-align: center;
        line-height: 74px;
        font-size: 29px;
        margin-top: 16px;
        border-radius: 10px;
      }
    }
    .btn {
      width: 669px;
      height: 87px;
      line-height: 87px;
      background-color: #605aa2;
      color: white;
      text-align: center;
      border-radius: 10px;
      margin: 31px auto 0;
      font-size: 26px;
    }
  }
  .Popup {
    ul {
      li:first-child {
        color: #999;
        font-size: 300px;
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
      <div class="divInput">
        <input
          type="number"
          placeholder="输入金额（50-10000元）"
          v-model="data.amount"
          v-focus
          pattern="\d*"
        />
      </div>
      <ul>
        <li
          v-for="(item, i) in payNum"
          :key="i"
          @click="changePayNum(item.val)"
        >
          {{ item.title }}
        </li>
      </ul>
      <div class="btn onBtn" @click="submit">确认</div>
    </div>
    <transition name="fadeUp">
      <div class="Popup" v-show="isSuccess">
        <ul>
          <li class="iconfont">&#xe600;</li>
          <li>
            是否充值成功？
          </li>
          <li>
            稍后请查收你的账户
          </li>
          <li>
            <!--<span @click="$router.push({name:'recharge'})">操作失败</span>-->
            <span @click="isSuccess = false">操作失败</span>
            <span
              @click="$router.push({ name: 'rechargerecord' })"
              class="onBtn"
              >充值成功</span
            >
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
const payNum = [
  {
    title: "50元",
    val: 50
  },
  {
    title: "100元",
    val: 100
  },
  {
    title: "200元",
    val: 200
  },
  {
    title: "500元",
    val: 500
  },
  {
    title: "1000元",
    val: 1000
  },
  {
    title: "3000元",
    val: 3000
  }
];
export default {
  name: "Paying",
  data() {
    return {
      orderLimit: {},
      payNum,
      isSuccess: false,
      data: {
        methodId: this.$route.query.id,
        amount: ""
      }
    };
  },
  created() {
    this.orderLimit = this.$store.getters.order.rechargeMethod;
    if (!this.$route.query.id) this.$router.go(-1);
  },
  methods: {
    changePayNum(num) {
      this.data.amount = num;
    },
    submit() {
      if (!this.data.amount) {
        return Toast("请输入金额");
      }
      if (parseFloat(this.orderLimit.rechargeMin) > this.data.amount) {
        return Toast("金额不能少于" + this.orderLimit.rechargeMin + "元");
      }
      if (parseFloat(this.orderLimit.rechargeMax) < this.data.amount) {
        return Toast("金额不能大于" + this.orderLimit.rechargeMax + "元");
      }
      // this.isSuccess = true;
      this.winOpen(
        "/api/common/pay/create/methodId/" +
          this.data.methodId +
          "/money/" +
          this.data.amount
      );
    }
  }
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$el.className = "body animated slideInRight";
  //   });
  // }
};
</script>
