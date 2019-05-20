<style scoped lang="less">
div {
  ul {
    overflow: hidden;

    li {
      overflow: hidden;
      border-bottom: 1px solid #e0dcd9;
      position: relative;

      a {
        display: block;
        overflow: hidden;
      }

      div {
        float: left;
        text-align: left;
        padding: 10px 0 10px 20px;

        p {
          line-height: 50px;
          font-size: 30px;

          b {
            display: inline-block;
            font-weight: normal;
            width: 36px;
            height: 36px;
            text-align: center;
            line-height: 36px;
            font-size: 20px;
            color: white;
            background-color: #dc001a;
            border-radius: 50%;
            margin-left: 8px;
            vertical-align: middle;
          }
        }

        span {
          color: #999999;
          line-height: 50px;
          font-size: 26px;
        }
      }

      div:nth-child(2) {
        float: right;
        margin-right: 63px;
        text-align: right;
      }

      i {
        position: absolute;
        right: 10px;
        top: 38px;
        font-size: 40px;
        color: #dedddb;
      }
    }
  }
  .Tab {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin-top: 100px;
    background-color: rgba(0, 0, 0, 0.3);
    transition: 0.3s;
    overflow: hidden;
    z-index: 1;
    visibility: hidden;

    dl {
      transition: 0.3s;
      position: absolute;
      right: -586px;
      width: 586px;
      height: 100%;
      background-color: #ffffff;
      overflow-y: scroll;

      dd {
        text-align: left;

        h3 {
          line-height: 104px;
          margin-left: 15px;
          font-size: 30px;
        }

        span {
          text-align: center;
          margin-left: 15px;
          margin-bottom: 20px;
          display: inline-block;
          width: 170px;
          border: 1px solid #dfdcda; /*no*/
          line-height: 72px;
          color: #666666;
          border-radius: 10px;
          font-size: 27px;
        }
      }

      dd:last-child {
        margin: 30px 0 30px 0;

        span {
          margin-bottom: 0;
          width: 263px;
          border: 1px solid #dfdcda; /*no*/
          line-height: 88px;
          text-align: center;
          font-size: 30px;
        }
      }
    }
  }

  .show {
    visibility: visible !important;

    dl {
      right: 0 !important;
    }
  }
}
</style>
<template>
  <div style="height: 100%">
    <mt-loadmore
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      :auto-fill="false"
      ref="loadMore"
      style="min-height: 100%"
      bottomPullText=""
      :bottomDistance="50"
      :topDistance="50"
    >
      <ul v-if="lotteryArr.length">
        <li v-for="(item, i) in lotteryArr" :key="i">
          <router-link
            :to="{
              name: 'lotterydetails',
              params: { classify: item.classify },
              query: { id: item.id }
            }"
          >
            <div>
              <p>{{ item.title }}<b v-show="item.zhuihao">追</b></p>
              <span>第{{ item.actionNo }}期</span>
            </div>
            <div>
              <p>{{ item.amount }}元</p>
              <span :class="{ WinningColor: item.status === 21 }">{{
                item.info
              }}</span>
            </div>
            <i class="iconfont">&#xe669;</i>
          </router-link>
        </li>
      </ul>
      <div v-if="noData" class="noData">
        <div class="content_box">
          <div>
            <p><img src="../../assets/img/jx-cat_03.png" alt="" /></p>
            <h4>您的游戏记录是空的噢！</h4>
            <p>"赶紧去买几注，今天您的运气很好！！！"</p>
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
      <div slot="bottom" class="mint-loadmore-bottom" v-if="lotteryArr.length">
        <span
          v-show="bottomStatus !== 'loading'"
          :class="{ 'is-rotate': bottomStatus === 'drop' }"
          >上拉显示更多</span
        >
        <span v-show="bottomStatus === 'loading'" id="bottom">
          <mt-spinner type="double-bounce" color="#26a2ff"></mt-spinner>
        </span>
      </div>
    </mt-loadmore>
    <div class="Tab" :class="{ show: TabShowFlag }">
      <dl>
        <dd v-for="(item, i) in lotteryList" :key="i">
          <h3>{{ item.title }}</h3>
          <span
            v-for="(child, index) in item.content"
            :key="index"
            @click="Selected(i, index, child.val)"
            :class="{ onBtn: filter[i] == index }"
            >{{ child.name }}</span
          >
        </dd>
        <dd>
          <span @click="Tab">取消</span>
          <span class="onBtn" @click="search">确认</span>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { lotteryRecordStart, lotteryRecord } from "../../api/index";
const lotteryList = [
  {
    title: "状态筛选",
    content: [
      { name: "全部", val: "0" },
      { name: "未开奖", val: "10" },
      { name: "已开奖", val: "20" },
      { name: "已中奖", val: "21" },
      { name: "未中奖", val: "22" },
      { name: "已撤单", val: "30" }
    ]
  },
  {
    title: "时间筛选",
    content: [
      { name: "全部", val: "0" },
      { name: "今天", val: "1" },
      { name: "昨天", val: "2" },
      { name: "近一周", val: "3" },
      { name: "近一月", val: "4" }
      // { name: "近三月", val: "5" },
      // { name: "近半年", val: "6" },
      // { name: "近一年", val: "7" }
    ]
  },
  {
    title: "彩种筛选",
    content: [{ name: "全部", val: "0" }]
  }
];
export default {
  name: "Lottery",
  data() {
    return {
      lotteryList,
      isOn: [0, 0],
      bottomStatus: false, //上拉动画
      topStatus: false, //下拉动画
      allLoaded: false, //上拉加载更多 无数据时的状态
      lotteryArr: [],
      // filter: sessionStorage.getItem("lotteryFilter")
      //   ? sessionStorage.getItem("lotteryFilter").split(",")
      //   : [0, 0, 0],
      filter: [0, 0, 0],
      filterArr: [0, 0, 0],
      status: "",
      timeType: "",
      typeId: "",
      parameter: {
        pageSize: 20,
        offset: 0,
        status: 0,
        timeType: 0,
        typeId: 0
      },
      noData: false
    };
  },
  props: ["TabShowFlag", "Tab"],
  created() {
    this.lotteryRecords();
    this.lotteryRecordStarts();
  },
  activated() {
    this.filter = [0, 0, 0];
    this.parameter = {
      pageSize: 20,
      offset: 0,
      status: 0,
      timeType: 0,
      typeId: 0
    };
    this.lotteryRecords();
  },
  methods: {
    loadTop() {
      this.topStatus = "loading";
      this.parameter.offset = 0;
      let that = this;
      new Promise(function(resolve, reject) {
        resolve(that.lotteryRecords());
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
      lotteryRecord(this.parameter).then(res => {
        if (res.data.length) {
          this.lotteryArr = this.lotteryArr.concat(res.data);
        } else {
          Toast("暂无更多数据");
          this.allLoaded = true;
        }
        this.bottomStatus = null;
        this.$refs.loadMore.onBottomLoaded();
      });
    },
    lotteryRecordStarts() {
      lotteryRecordStart().then(res => {
        for (var i in this.lotteryList) {
          if (this.lotteryList[i]["title"] === "彩种筛选") {
            this.lotteryList[i]["content"] = [{ name: "全部", val: "0" }];
            if (res.data) {
              this.lotteryList[i]["content"] = this.lotteryList[i][
                "content"
              ].concat(res.data);
            }
          }
        }
      });
    },
    lotteryRecords() {
      lotteryRecord(this.parameter).then(res => {
        try {
          this.lotteryArr = res.data;
          if (!this.lotteryArr.length) {
            this.noData = true;
          } else {
            this.noData = false;
          }
        } catch (e) {
          console.log(e);
        }
      });
      return this.lotteryArr;
    },
    Selected(i, index, val) {
      this.$set(this.filter, i, index);
      switch (i) {
        case 0:
          this.status = val;
          break;
        case 1:
          this.timeType = val;
          break;
        case 2:
          this.typeId = val;
          break;
      }
    },
    search() {
      this.allLoaded = false;
      if (this.status) this.parameter.status = this.status;
      if (this.timeType) this.parameter.timeType = this.timeType;
      if (this.typeId) this.parameter.typeId = this.typeId;
      // sessionStorage.setItem("status", this.parameter.status);
      // sessionStorage.setItem("LotteryTimeType", this.parameter.timeType);
      // sessionStorage.setItem("typeId", this.parameter.typeId);
      // sessionStorage.setItem("lotteryFilter", this.filter);
      this.parameter.offset = 0;
      console.log(this.parameter);
      this.lotteryRecords();
      this.Tab();
    }
  }
};
</script>
