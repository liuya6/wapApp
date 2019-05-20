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
    padding: 39px 46px 0 46px;

    div {
      h3 {
        font-size: 32px;
        line-height: 56px;
        text-align: left;
      }

      p {
        line-height: 43px;
        color: #999999;
        text-align: left;
        font-size: 26px;
        padding: 10px 0;
      }

      h4 {
        border-top: 1px solid #e0dcd9;
        color: #fb1313;
        padding-top: 25px;
        line-height: 49px;
        font-size: 26px;
      }

      span {
        text-align: center;
        color: #666666;
        line-height: 43px;
        font-size: 26px;
      }
    }
  }
}
</style>
<template>
  <div class="body" v-title="'提现说明'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      提现说明
    </div>
    <div class="content">
      <div>
        <h3>一，银行卡</h3>
        <p>
          工商银行（优先）、农业银行、交通银行、中国银行、建设银行、浦发银行、民生银行、招商银行、中信银行、广东发展银行、中国邮政、平安银行、华夏银行等。
        </p>
      </div>
      <div>
        <h3>二，提现限额</h3>
        <p>最低取款为50元人民币，单笔最高提款100万人民币，当日无上限。</p>
      </div>
      <div>
        <h3>三，无手续费</h3>
        <p>完成全额有效投注，全天24小时不限次数提款，手续费全免</p>
      </div>
      <div>
        <h4>*温馨提示</h4>
        <span
          >提款前确认提款银行，请广大用户妥善保管账户密码，切勿告知他人，因客户自身原因导致的账号被盗或者资金损失，平台一律不承担相关责任。</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WithdrawCaption"
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$el.className = "body animated slideInRight";
  //   });
  // }
};
</script>
