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
    .schedule {
      margin: 44px 0 66px 0;
      height: 87px;

      img {
        width: 100%;
        height: 87px;
      }
    }

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
          width: 136px;
          text-align-last: justify;
        }

        span:last-child {
          color: #999999;
          margin-left: 20px;
        }
      }

      li:last-child {
        padding-bottom: 20px;

        div {
          overflow: hidden;
          width: 390px;
          height: 390px;
          padding: 12px 0 0 20px;
        }
      }
    }

    .btn {
      margin-top: 111px;

      span {
        display: inline-block;
        width: 670px;
        height: 88px;
        line-height: 88px;
        text-align: center;
        font-size: 28px;
        border-radius: 10px;
      }
    }
  }
}
</style>
<template>
  <div class="body" v-title="'充值提交'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      充值提交
    </div>
    <div class="content">
      <div class="schedule">
        <img src="../assets/img/schedule.png" alt="" />
      </div>
      <ul>
        <li>
          <span>订单号</span>
          <span>{{ order.recharge.rechargeId }}</span>
        </li>
        <li>
          <span>充值方式</span>
          <span>{{ order.rechargeMethod.rechargeName }}</span>
        </li>
        <li>
          <span>存入金额</span>
          <span>{{ deposits }}元</span>
        </li>
        <li>
          <span>收款账号</span>
          <span>{{ order.rechargeMethod.username }}</span>
        </li>
        <li>
          <span>二维码</span>
          <div>
            <img :src="order.rechargeMethod.image" alt="" />
          </div>
        </li>
      </ul>
      <div class="btn">
        <span class="onBtn" @click="$router.push({ name: 'rechargerecord' })"
          >完成</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "RechargeSubmit",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["order", "deposits"])
  },
  mounted() {
    console.log(this.order);
  }
};
</script>
