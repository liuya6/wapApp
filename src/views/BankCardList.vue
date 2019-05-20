<template>
  <div class="body" v-title="'银行卡列表'">
    <div class="top shenLan">
      <i class="iconfont" @click="goBack">&#xe629;</i>
      银行卡
      <span @click="boundBank" class="iconfont">&#xe678;</span>
    </div>
    <div class="content">
      <ul>
        <li v-for="(item, i) in myBank" :key="i" @click="goWithdraw(item.id)">
          <div>
            Card No.
          </div>
          <div>
            <b>
              <img :src="bankImg(item.logo)" alt="" />
            </b>
            <div>
              <span>{{ item.bankname || item.oldBankName }}</span>
              <p>{{ bankNum(item.account) }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { myBankCard } from "../api/index";
import { MessageBox } from "mint-ui";
export default {
  name: "BankList",
  data() {
    return {
      myBank: []
    };
  },
  mounted() {
    myBankCard().then(res => {
      console.log(res);
      if (res.status) {
        this.myBank = res.data;
      }
    });
  },
  methods: {
    goWithdraw(id) {
      this.$router.replace({ name: "withdraw", query: { bankId: id } });
      localStorage.setItem("bankId", id);
    },
    goBack() {
      if (this.myBank.length < 5 || this.$route.query.from) {
        this.$router.go(-1);
      } else {
        this.$router.push({ name: "user" });
      }
    },
    boundBank() {
      if (this.myBank.length < 5) {
        this.$router.push({
          name: "boundbank",
          query: { showWithdrawalFlag: "1" }
        });
      } else {
        MessageBox("提示", "最多只能绑定5张银行卡！");
      }
    }
  }
  // beforeRouteEnter(to, from, next) {
  //   console.log(from.name)
  //   if (from.name === "user") {
  //     next(vm => {
  //       vm.$el.className = "body animated slideInRight";
  //     });
  //   } else if(from.name === "boundbank" ||  from.name === "withdraw"){
  //     next();
  //   } else {
  //     next(vm => {
  //       vm.$el.className = "body animated slideInLeft";
  //     });
  //   }
  // }
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
      font-size: 50px;
    }
  }

  .content {
    flex: 1;
    overflow-y: scroll;
    background-color: white;

    ul {
      li {
        width: 669px;
        height: 236px;
        margin: 30px auto 0;
        border-radius: 10px;
        background: url("../assets/img/bankcard-bg.png") left bottom no-repeat
          color(#f5f5f5);
      }

      div:nth-child(1) {
        text-align: right;
        line-height: 64px;
        color: #605aa4;
        font-size: 25px;
        padding-right: 20px;
      }

      div:nth-child(2) {
        text-align: left;
        overflow: hidden;

        b {
          display: inline-block;
          width: 110px;
          height: 110px;
          float: left;
          margin: 10px 25px 0 50px;
          line-height: 175px;
          img {
            display: inline-block;
            width: 100%;
          }
        }

        div {
          float: left;

          span {
            display: block;
            line-height: 50px;
            font-size: 32px;
            margin-top: 13px;
            letter-spacing: 3px;
          }

          p {
            line-height: 67px;
            font-size: 40px;
            color: #656565;
          }
        }
      }

      li:last-child {
        margin-bottom: 30px;
      }
    }
  }
}
</style>
