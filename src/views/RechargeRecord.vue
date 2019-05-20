<template>
  <div class="body" v-title="'充值记录'">
    <div class="top shenLan">
      <i class="iconfont" @click="$router.push({ name: 'recharge' })"
        >&#xe629;</i
      >
      充值记录
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
        <ul v-if="rechargeArr.length">
          <li v-for="(item, i) in rechargeArr" :key="i">
            <div>
              <p>充值{{ item.amount }}元</p>
              <span>订单号：{{ item.rechargeId }}</span>
            </div>
            <div>
              <p
                :style="{
                  color:
                    item.state === 0
                      ? 'black'
                      : item.state === 1
                      ? '#59d80b'
                      : 'red'
                }"
              >
                {{
                  item.state === 0
                    ? "审核中"
                    : item.state === 1
                    ? "充值成功"
                    : "充值失败"
                }}
              </p>
              <span>{{ item.mark }}</span>
            </div>
          </li>
        </ul>
        <div v-if="noData" class="noData">
          <div class="content_box">
            <div>
              <p><img src="../assets/img/jx-cat_03.png" alt="" /></p>
              <h4>您的充值记录是空的噢！</h4>
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
          v-if="rechargeArr.length"
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
import { rechargeRecord } from "../api";
import { Toast } from "mint-ui";
export default {
  name: "RechargeRecord",
  data() {
    return {
      bottomStatus: false, //上拉动画
      topStatus: false, //下拉动画
      allLoaded: false, //上拉加载更多 无数据时的状态
      rechargeArr: [],
      noData: false,
      parameter: {
        offset: 0,
        pageSize: 20
      }
    };
  },
  mounted() {
    this.RechargeRecords();
  },
  methods: {
    RechargeRecords() {
      rechargeRecord(this.parameter).then(res => {
        try {
          this.rechargeArr = res.data;
          this.allLoaded = false;
          if (!this.rechargeArr.length) {
            this.noData = true;
          } else {
            this.noData = false;
          }
        } catch (e) {
          console.log(e);
        }
      });
      return this.rechargeArr;
    },
    loadTop() {
      this.topStatus = "loading";
      this.parameter.offset = 0;
      let that = this;
      new Promise(function(resolve, reject) {
        resolve(that.RechargeRecords());
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
      rechargeRecord(this.parameter).then(res => {
        if (res.data.length) {
          this.rechargeArr = this.rechargeArr.concat(res.data);
        } else {
          Toast("暂无更多数据");
          this.allLoaded = true;
        }
        this.bottomStatus = null;
        this.$refs.loadMore.onBottomLoaded();
      });
    }
  }
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$el.className = "body animated slideInRight";
  //   });
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
      font-size: 30px;
    }
  }
  .content {
    flex: 1;
    overflow-y: scroll;
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
  }
}
</style>
