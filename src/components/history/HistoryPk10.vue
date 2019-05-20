<template>
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
    <ul class="pk10" v-if="lotteryArr.length">
      <li v-for="(item, i) in lotteryArr" :key="'l' + i">
        <P class="date">
          <span>第{{ item.number }}期</span>
        </P>
        <p class="num">
          <span
            v-for="(child, j) in item.codeData"
            :key="j"
            :class="child.color"
            >{{ child.code }}</span
          >
        </p>
      </li>
    </ul>
    <div v-else class="noData">
      暂无更多数据
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
</template>

<script>
import { lotteryHistory } from "../../api";
import { Toast } from "mint-ui";
export default {
  name: "HistoryNormal",
  data() {
    return {
      bottomStatus: false, //上拉动画
      topStatus: false, //下拉动画
      allLoaded: false, //上拉加载更多 无数据时的状态
      lotteryArr: [],
      parameter: {
        pageSize: 20,
        offset: 0,
        typeId: this.$route.params.id
      }
    };
  },
  created() {
    this.lotteryHistoryStart();
  },
  methods: {
    lotteryHistoryStart() {
      lotteryHistory(this.parameter).then(res => {
        this.lotteryArr = res.data;
      });
      return this.lotteryArr;
    },
    loadTop() {
      this.topStatus = "loading";
      this.parameter.offset = 0;
      let that = this;
      new Promise(function(resolve, reject) {
        resolve(that.lotteryHistoryStart());
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
      lotteryHistory(this.parameter).then(res => {
        let list;
        if (res.data.length) {
          if (
            this.lotteryArr[this.lotteryArr.length - 1].time ===
            res.data[0].time
          ) {
            list = res.data.shift();
          }
          list = res.data;
          this.lotteryArr = this.lotteryArr.concat(list);
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
<style lang="less" scoped>
.pk10 {
  overflow: hidden;

  li {
    width: 100%;
    border-bottom: 1px solid #dedddb;
    .date {
      font-size: 26px;
      text-align: left;
      padding-top: 20px;
      padding-left: 38px;
      margin-bottom: 20px;
      span {
        color: #999999;
      }
    }

    .num {
      overflow: hidden;
      margin-bottom: 20px;

      span {
        display: block;
        width: 53px;
        height: 53px;
        float: left;
        margin-left: 16px;
        line-height: 53px;
        border-radius: 10px;
        color: #fffeff;
        font-size: 30px;
      }
      span:first-child {
        margin-left: 38px;
      }
    }
  }
}
</style>
