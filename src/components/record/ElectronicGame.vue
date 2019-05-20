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
            background-color: #5f59a3;
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
      div:nth-child(1) {
        span {
          display: inline-block;
          width: 400px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      div:nth-child(2) {
        padding-left: 0;
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
        position: absolute;
        bottom: 50px;

        span {
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
  <div style="width:100%;height: 100%">
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
      <ul v-if="gameArr.length">
        <li v-for="(item, i) in gameArr" :key="i">
          <div>
            <p>{{ item.title }}</p>
            <span>编号：{{ item.round }}</span>
          </div>
          <div>
            <p>下注：{{ item.bet }}元</p>
            <span :class="{ WinningColor: item.win > 0 }"
              >赢：{{ item.win > 0 ? item.win : 0.0 }}元</span
            >
          </div>
          <i class="iconfont">&#xe669;</i>
        </li>
      </ul>
      <div v-if="noData" class="noData">
        <div class="content_box">
          <div>
            <p><img src="../../assets/img/jx-cat_03.png" alt="记录为空" /></p>
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
      <div slot="bottom" class="mint-loadmore-bottom" v-if="gameArr.length">
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
        <dd v-for="(item, i) in gameList" :key="i">
          <h3>{{ item.title }}</h3>
          <span
            v-for="(child, index) in item.content"
            :key="index"
            :class="{ onBtn: timeType == index }"
            @click="Selected(child.val)"
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
import { thirdRecord } from "../../api/index";
const gameList = [
  {
    title: "时间筛选",
    content: [
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
      // },
      // {
      //   name: "近半年",
      //   val: "6"
      // },
      // {
      //   name: "近一年",
      //   val: "7"
      // }
    ]
  }
];
export default {
  name: "ElectronicGame",
  data() {
    return {
      gameList,
      bottomStatus: false, //上拉动画
      topStatus: false, //下拉动画
      allLoaded: false, //上拉加载更多 无数据时的状态
      timeType: 0,
      parameter: {
        pageSize: 20,
        page: 1,
        timeType: 0,
        type: this.type
      },
      gameArr: [],
      noData: false
    };
  },
  props: ["TabShowFlag", "Tab", "type"],
  created() {
    this.gameRecords();
  },
  watch: {
    type(newVal) {
      this.timeType = 0;
      this.parameter.type = newVal;
      this.gameRecords();
    }
  },
  methods: {
    gameRecords() {
      thirdRecord(this.parameter).then(res => {
        try {
          this.gameArr = res.data.list;
          if (!this.gameArr.length) {
            this.noData = true;
          } else {
            this.noData = false;
          }
        } catch (e) {
          console.log(e);
        }
      });
      return this.gameArr;
    },
    loadTop() {
      this.topStatus = "loading";
      this.parameter.page = 1;
      let that = this;
      new Promise(function(resolve, reject) {
        resolve(that.gameRecords());
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
      this.parameter.page += 1;
      thirdRecord(this.parameter).then(res => {
        if (res.data.list.length) {
          this.gameArr = this.gameArr.concat(res.data.list);
        } else {
          Toast("暂无更多数据");
          this.allLoaded = true;
        }
        this.bottomStatus = null;
        this.$refs.loadMore.onBottomLoaded();
      });
    },
    Selected(val) {
      this.timeType = val;
    },
    search() {
      this.allLoaded = false;
      if (this.timeType) this.parameter.timeType = this.timeType;
      this.parameter.offset = 0;
      this.gameRecords();
      this.Tab();
    }
  }
};
</script>
