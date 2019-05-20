<template>
  <div class="body" v-title="'充值中心'">
    <div class="top shenLan">
      <i class="iconfont" @click="$router.push({ name: 'user' })">&#xe629;</i>
      充值
      <router-link to="/user/rechargerecord">充值记录</router-link>
    </div>
    <div class="content">
      <dl>
        <dt>选择充值方式</dt>
        <dd v-for="(item, i) in payList" :key="i" @click="Tab(item.type)">
          <b>
            <img
              :src="require('../assets/img/pay/' + item.type + '.png')"
              alt=""
            />
          </b>
          <span>{{ item.title }}</span>
          <i class="iconfont">&#xe669;</i>
        </dd>
      </dl>
    </div>
    <mt-popup
      class="popup"
      :visible.sync="popupFlag"
      popup-transition="popup-fade"
      position="bottom"
      v-model="popupFlag"
    >
      <ul>
        <li
          @click="gotoPay(item.payWay, item.id)"
          v-for="(item, i) in TabList"
          :key="i"
        >
          <div>
            <img :src="require('../assets/img/pay/' + type + '.png')" alt="" />
          </div>
          <div>
            <p>{{ item.rechargeName }}</p>
            <span>{{ item.desc }}</span>
          </div>
        </li>
      </ul>
    </mt-popup>
  </div>
</template>

<script>
import { rechargeBefore } from "../api/index";
import { mapActions } from "vuex";
export default {
  name: "Recharge",
  data() {
    return {
      popupFlag: false,
      payList: [],
      type: ""
    };
  },
  mounted() {
    rechargeBefore().then(res => {
      try {
        this.payList = res.data;
      } catch (e) {
        console.log(e);
      }
    });
  },
  computed: {
    TabList() {
      for (var i = 0; i < this.payList.length; i++) {
        let payListOne = this.payList[i];
        if (payListOne.type == this.type) {
          console.log(payListOne.data, "1212");
          return payListOne.data;
        }
      }
      return false;
    }
  },
  methods: {
    ...mapActions(["SubmitOrders"]),
    Tab(type) {
      this.type = type;
      this.popupFlag = !this.popupFlag;
    },
    gotoPay(payWay, id) {
      this.SubmitOrders({
        payWay,
        id
      });
    }
  }
  // beforeRouteEnter(to, from, next) {
  //   if (from.name === "user") {
  //     next(vm => {
  //       vm.$el.className = "body animated slideInRight";
  //     });
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

    a {
      position: absolute;
      color: white;
      right: 20px;
      font-size: 30px;
      padding-top: 10px;
    }
  }

  .content {
    flex: 1;
    overflow-y: scroll;

    dl {
      dt {
        padding-top: 27px;
        padding-left: 24px;
        line-height: 43px;
        background-color: #f6f6f6;
        text-align: left;
        font-size: 25px;
        color: #9a9a9a;
        border-bottom: 1px solid #e0dcd9;
      }

      dd {
        border-bottom: 1px solid #e0dcd9;
        overflow: hidden;

        b {
          display: block;
          width: 60px;
          height: 60px;
          margin: 25px 20px 0 21px;
          vertical-align: middle;
          float: left;
          line-height: 75px;

          img {
            display: inline-block;
            width: 100%;
          }
        }

        span {
          line-height: 109px;
          font-size: 30px;
          float: left;
        }

        i {
          line-height: 109px;
          font-size: 32px;
          position: absolute;
          right: 22px;
        }
      }
    }
  }

  .popup {
    ul {
      width: 100%;
      height: 580px;
      background-color: #fff;
      padding-left: 40px;
      overflow-y: scroll;

      li:first-child {
        border-top: 1px solid #c7ced6; /*no*/
        margin-top: 1px; /*no*/
      }

      li {
        border-bottom: 1px solid #c7ced6; /*no*/
        overflow: hidden;
        padding: 37px 0;

        div {
          float: left;
          text-align: left;

          p {
            font-size: 30px;
            line-height: 50px;
          }

          span {
            color: #999999;
          }
        }

        div:first-child {
          width: 90px;
          height: 90px;
          margin-right: 30px;
          line-height: 120px;

          img {
            width: 100%;
            display: inline-block;
          }
        }
        div:nth-child(2) {
          width: 550px;
          overflow: hidden;
        }
      }
    }
  }
}

.up-enter-active,
.up-leave-active {
  transform: translateY(0);
}

.up-enter,
.up-leave-to {
  transform: translateY(667px);
}
</style>
