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

    b {
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
    ul {
      li:first-child {
        border-top: 1px solid #e0dcd9;
      }
      li:last-child {
        margin-bottom: 5px;
      }
      li {
        padding: 23px 22px 26px 20px;
        text-align: left;
        border-bottom: 1px solid #e0dcd9;

        div:first-child {
          font-size: 30px;
          margin-bottom: 10px;
          overflow: hidden;

          span:last-child {
            float: right;
          }
        }

        div:last-child {
          font-size: 27px;
          overflow: hidden;
          color: #999999;
          span:last-child {
            float: right;
          }
        }
      }
    }
  }
  .popup {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin-top: 100px;
    background-color: rgba(0, 0, 0, 0.3);
    visibility: hidden;
    div {
      position: absolute;
      right: -589px;
      width: 569px;
      height: 100%;
      background-color: #fff;
      padding-left: 20px;
      overflow: hidden;
      transition: 0.5s;
      dl {
        overflow: hidden;
        dt {
          margin-top: 21px;
          line-height: 63px;
          font-size: 29px;
          text-align: left;
        }
        dd {
          width: 169px;
          height: 73px;
          float: left;
          border: 1px solid #dfdcda; /*no*/
          font-size: 27px;
          text-align: center;
          line-height: 73px;
          margin: 20px 15px 0 0;
          border-radius: 10px;
        }
      }
      p {
        text-align: left;
        position: absolute;
        bottom: 143px;
        span {
          display: inline-block;
          width: 264px;
          height: 88px;
          text-align: center;
          line-height: 88px;
          font-size: 30px;
          border: 1px solid #dfdcda; /*no*/
          border-radius: 10px;
          margin-right: 12px;
        }
      }
    }
  }
  .show {
    visibility: visible;
    div {
      right: 0;
    }
  }
}
</style>
<template>
  <div class="body" v-title="'账目明细'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      账目明细
      <b class="iconfont" @click="showFlag = !showFlag">&#xe67f;</b>
    </div>
    <div class="content">
      <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :auto-fill="false"
        ref="loadMore"
        style="min-height: 100%"
        bottomPullText=""
        :bottomDistance="100"
        :topDistance="100"
      >
        <ul v-if="accountArr.length">
          <li v-for="(item, i) in accountArr" :key="i">
            <div>
              <span>{{ item.info }}</span>
              <span :style="{ color: item.coin > 0 ? '#4dd60a' : 'black' }">
                {{ item.coin }}
              </span>
            </div>
            <div>
              <span>{{ timestampToString(item.actionTime) }}</span>
              <span>余额 {{ item.userCoin }}</span>
            </div>
          </li>
        </ul>
        <div v-if="noData" class="noData">
          <div class="content_box">
            <div>
              <p><img src="../assets/img/jx-cat_03.png" alt="" /></p>
              <h4>您的账目明细是空的噢！</h4>
            </div>
          </div>
        </div>
        <div slot="top" class="mint-loadmore-top">
          <span
            v-show="topStatus !== 'loading'"
            :class="{ 'is-rotate': topStatus === 'drop' }"
            >下拉刷新</span
          >
          <span v-show="topStatus === 'loading'" id="top">
            <mt-spinner type="double-bounce" color="#26a2ff"></mt-spinner>
          </span>
        </div>
        <div
          slot="bottom"
          class="mint-loadmore-bottom"
          v-if="accountArr.length"
        >
          <span
            v-show="bottomStatus !== 'loading'"
            :class="{ 'is-rotate': bottomStatus === 'drop' }"
          >
            上拉显示更多
          </span>
          <span v-show="bottomStatus === 'loading'" id="bottom">
            <mt-spinner type="double-bounce" color="#26a2ff"></mt-spinner>
          </span>
        </div>
      </mt-loadmore>
    </div>
    <div class="popup" :class="{ show: showFlag }">
      <div>
        <dl v-for="(item, i) in filterList" :key="i">
          <dt>{{ item.title }}</dt>
          <dd
            v-for="(child, index) in item.arr"
            :key="index"
            :class="{ onBtn: filter[i] == index }"
            @click="Selected(i, index, child.val)"
          >
            {{ child.name }}
          </dd>
        </dl>
        <p>
          <span @click="showFlag = !showFlag">取消</span>
          <span class="onBtn" @click="search">确认</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { accountDetails } from "../api";
const filterList = [
  {
    title: "分类筛选",
    arr: [
      {
        name: "全部",
        val: "0"
      },
      {
        name: "充值",
        val: "10"
      },
      {
        name: "提现",
        val: "20"
      },
      {
        name: "返点",
        val: "30"
      },
      {
        name: "派奖",
        val: "40"
      },
      {
        name: "撤单",
        val: "50"
      },
      {
        name: "投注",
        val: "60"
      },
      {
        name: "活动",
        val: "80"
      },
      {
        name: "其他",
        val: "90"
      }
    ]
  },
  {
    title: "时间筛选",
    arr: [
      {
        name: "全部",
        val: "0"
      },
      {
        name: "今天",
        val: "1"
      },
      {
        name: "昨天",
        val: "2"
      },
      {
        name: "近一周",
        val: "3"
      },
      {
        name: "近一月",
        val: "4"
      }
      // {
      //   name: "近三月",
      //   val: "5"
      // }
    ]
  }
];
export default {
  name: "AccountDetails",
  data() {
    return {
      filterList,
      showFlag: false,
      allLoaded: false,
      topStatus: "",
      bottomStatus: "",
      filter: sessionStorage.getItem("accountFilter")
        ? sessionStorage.getItem("accountFilter").split(",")
        : [0, 0],
      parameter: {
        pageSize: 20,
        offset: 0,
        billType: sessionStorage.getItem("billType") || 0,
        timeType: sessionStorage.getItem("accountTimeType") || 0
      },
      accountArr: [],
      billType: "",
      timeType: "",
      noData: false
    };
  },
  mounted() {
    this.AccountDetails();
  },
  methods: {
    AccountDetails() {
      accountDetails(this.parameter).then(res => {
        try {
          this.accountArr = res.data;
          console.log(this.accountArr, "没数据");
          if (!this.accountArr.length) {
            this.noData = true;
          } else {
            this.noData = false;
          }
        } catch (e) {
          console.log(e);
        }
      });
      return this.accountArr;
    },
    loadTop() {
      this.topStatus = "loading";
      this.parameter.offset = 0;
      let that = this;
      new Promise(function(resolve, reject) {
        resolve(that.AccountDetails());
        reject("网络请求失败");
      }).then(res => {
        if (res.length) {
          Toast("刷新成功");
        } else {
          Toast("暂无更多数据");
        }
        that.$refs.loadMore.onTopLoaded();
        that.topStatus = null;
      });
    },
    loadBottom() {
      this.bottomStatus = "loading";
      this.parameter.offset += this.parameter.pageSize;
      accountDetails(this.parameter).then(res => {
        if (res.data.length) {
          this.accountArr = this.accountArr.concat(res.data);
        } else {
          Toast("暂无更多数据");
          this.allLoaded = true;
        }
        this.bottomStatus = null;
        this.$refs.loadMore.onBottomLoaded();
      });
    },
    Selected(i, index, val) {
      this.$set(this.filter, i, index);
      switch (i) {
        case 0:
          this.billType = val;
          break;
        case 1:
          this.timeType = val;
          break;
      }
    },
    search() {
      this.allLoaded = false;
      if (this.timeType) this.parameter.timeType = this.timeType;
      if (this.billType) this.parameter.billType = this.billType;
      sessionStorage.setItem("accountTimeType", this.parameter.timeType);
      sessionStorage.setItem("billType", this.parameter.billType);
      sessionStorage.setItem("accountFilter", this.filter);
      this.parameter.offset = 0;
      this.AccountDetails();
      this.showFlag = !this.showFlag;
    }
  }
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$el.className = "body animated slideInRight";
  //   });
  // }
};
</script>
