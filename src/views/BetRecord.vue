<style scoped lang="less">
.body {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
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
        top: 42px;
        font-size: 29px;
        color: #dedddb;
      }
    }
  }
  .content {
    flex: 1;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
<template>
  <div class="body">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      {{ $route.query.title }}-投注记录
    </div>
    <div class="content">
      <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :auto-fill="false"
        ref="loadMore"
        style="min-height: 100%"
        bottomPullText
        :bottomDistance="100"
        :topDistance="100"
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
                <p>
                  {{ item.title }}
                  <b v-show="item.zhuihao">追</b>
                </p>
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
              <p>
                <img src="../assets/img/jx-cat_03.png" alt />
              </p>
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
        <div
          slot="bottom"
          class="mint-loadmore-bottom"
          v-if="lotteryArr.length"
        >
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
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { lotteryRecord } from "../api";
export default {
  name: "BetRecord",
  data() {
    return {
      bottomStatus: false, //上拉动画
      topStatus: false, //下拉动画
      allLoaded: false, //上拉加载更多 无数据时的状态
      lotteryArr: [],
      noData: false,
      parameter: {
        pageSize: 20,
        offset: 0,
        status: 0,
        timeType: 0,
        typeId: this.$route.params.id
      }
    };
  },
  created() {
    this.lotteryRecordsStart();
  },
  methods: {
    lotteryRecordsStart() {
      lotteryRecord(this.parameter).then(res => {
        this.lotteryArr = res.data;
        if (!this.lotteryArr.length) {
          this.noData = true;
        }
      });
      return this.lotteryArr;
    },
    loadTop() {
      this.topStatus = "loading";
      this.parameter.offset = 0;
      let that = this;
      new Promise(function(resolve, reject) {
        resolve(that.lotteryRecordsStart());
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
    }
  }
};
</script>
