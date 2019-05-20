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
    <ul class="six" v-if="lotteryArr.length">
      <li v-for="(item, i) in lotteryArr" :key="i">
        <p>
          <span>第{{ item.number }}期</span>
        </p>
        <p>
          <span
            v-for="(child, j) in handleCodeItem(item.codeData)"
            :key="j"
            :style="{ backgroundColor: child.color }"
            :class="{ add: child.code === '+' }"
          >
            {{ child.code }}
          </span>
        </p>
        <p>
          <span
            v-for="(child, j) in handleCodeItem(item.codeData)"
            :key="j"
            :class="{ reduce: child.zodiac === '-' }"
          >
            {{ child.zodiac }}
          </span>
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
  computed: {},
  created() {
    this.lotteryHistoryStart();
  },
  methods: {
    handleCodeItem(codeArr) {
      let arr = [];
      for (let i = 0; i < codeArr.length; i++) {
        if (i === codeArr.length - 1) {
          arr.push({ code: "+", color: "", zodiac: "-" });
        }
        arr.push(codeArr[i]);
      }
      return arr;
    },
    lotteryHistoryStart() {
      lotteryHistory(this.parameter).then(res => {
        this.lotteryArr = res.data;
        console.log(this.lotteryArr);
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
.six {
  overflow: hidden;
  .add {
    margin-left: 0 !important;
  }
  .reduce {
    opacity: 0;
    margin-left: 0 !important;
  }
  span:last-child {
    margin-left: 0 !important;
  }
  li {
    height: 170px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #e0dcd9;

    p {
      flex: 1;
      b {
        color: #666;
      }
    }

    p:first-child {
      line-height: 56px;
      font-size: 28px;
      color: #444444;
    }

    p:nth-child(2) {
      padding-left: 60px;

      .add {
        background-color: #fff;
        color: #95949a;
        font-size: 50px;
      }

      span {
        display: block;
        width: 54px;
        height: 54px;
        border-radius: 50%;
        line-height: 54px;
        text-align: center;
        margin-left: 23px;
        float: left;
        color: white;
        font-size: 28px;
      }
    }

    p:nth-child(3) {
      padding-left: 60px;

      .add {
        background-color: #fff;
        color: #95949a;
        font-size: 50px;
      }

      span {
        display: block;
        width: 54px;
        height: 54px;
        border-radius: 50%;
        line-height: 54px;
        text-align: center;
        margin-left: 23px;
        float: left;
        color: #959499;
        font-size: 28px;
      }
    }
  }
}
</style>
