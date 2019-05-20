<style scoped lang="less">
.body {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top {
    height: 100px;
    position: relative;
    top: 0;
    width: 100%;
    div:first-child {
      position: absolute;
      z-index: 10;
      width: 100%;
      line-height: 100px;
      overflow: hidden;
      text-align: center;
      background-color: #605aa2;
      color: white;
      i {
        position: absolute;
        left: 20px;
        font-size: 50px;
      }
      span {
        font-size: 38px;
        margin-right: 10px;
      }
      b {
        position: absolute;
        width: 38px;
        height: 38px;
        top: 30px;
        transition: 0.3s;
        img {
          vertical-align: top;
        }
      }
    }
    div:last-child {
      position: absolute;
      width: 100%;
      top: 100px;
      overflow: hidden;
      border-bottom: 1px solid #e7e1cd; /*no*/
      background-color: #fff;
      z-index: 1;
      ul {
        width: 80%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-bottom: 20px;
        li {
          float: left;
          width: 168px;
          height: 72px;
          text-align: center;
          line-height: 72px;
          margin-top: 30px;
          border: 1px solid #dfdcda; /*no*/
          border-radius: 10px;
          font-size: 28px;
        }
      }
    }
    .bounce-enter-active {
      animation: downIn 0.3s;
    }

    .bounce-leave-active {
      animation: downIn 0.3s reverse;
    }

    @keyframes downIn {
      0% {
        transform: translateY(-580px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
  .content {
    flex: 1;
    overflow-y: scroll;
    ul {
      li:first-child {
        border-top: 1px solid #e0dcd9; /*no*/
      }
      li {
        overflow: hidden;
        border-bottom: 1px solid #e0dcd9; /*no*/
        padding: 10px 0 13px 22px;
        div {
          float: left;
        }
        div:first-child {
          text-align: left;
          p {
            line-height: 54px;
            font-size: 30px;
            color: #444;
            width: 600px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          span {
            line-height: 47px;
            font-size: 25px;
            color: #666;
          }
        }
        div:last-child {
          float: right;
          line-height: 95px;
          span {
            margin-right: 13px;
            font-size: 30px;
            color: red;
          }
          i {
            font-size: 30px;
            color: #999999;
            margin-right: 17px;
          }
        }
      }
      .haveRead {
        div {
          span {
            color: #9a9a9a !important;
          }
          p {
            color: #9a9a9a !important;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="body" v-title="'我的消息'">
    <div class="top">
      <div class="shenLan">
        <i class="iconfont" @click="back">&#xe629;</i>
        <span @click="showFlag = !showFlag">
          {{ title }}
        </span>
        <b @click="showFlag = !showFlag" :class="showFlag ? 'rotate' : ''">
          <img src="../assets/img/down.png" />
        </b>
      </div>
      <transition name="bounce">
        <div v-show="showFlag">
          <ul>
            <li
              v-for="(item, i) in filter"
              :key="i"
              :class="{ onBtn: showNum === i }"
              @click="search(i, item.val, item.title)"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
      </transition>
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
        <ul v-if="msgArr.length">
          <li
            v-for="(item, i) in msgArr"
            :key="i"
            :class="{ haveRead: item.is_readed }"
          >
            <router-link :to="{ name: 'msgdetail', query: { id: item.id } }">
              <div>
                <p>【{{ item.from_username }}】{{ item.title }}</p>
                <span>{{ timestampToString(item.time) }}</span>
              </div>
              <div>
                <span>{{ item.is_readed ? "已读" : "未读" }}</span>
                <i class="iconfont">&#xe669;</i>
              </div>
            </router-link>
          </li>
        </ul>
        <div v-if="noData" class="noData">
          <div class="content_box">
            <div>
              <p><img src="../assets/img/jx-cat_03.png" alt="" /></p>
              <h4>您的消息是空的噢！</h4>
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
        <div slot="bottom" class="mint-loadmore-bottom" v-if="msgArr.length">
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
import { msgList } from "../api";
import { Toast } from "mint-ui";
const filter = [
  {
    title: "全部",
    val: 0
  },
  {
    title: "个人消息",
    val: 1
  },
  {
    title: "优惠活动",
    val: 2
  },
  {
    title: "出入款消息",
    val: 3
  }
];
export default {
  name: "MyMessage",
  data() {
    return {
      title: "全部消息",
      filter,
      showFlag: false,
      showNum: 0,
      msgArr: [],
      bottomStatus: false, //上拉动画
      topStatus: false, //下拉动画
      allLoaded: false, //上拉加载更多 无数据时的状态
      noData: false,
      parameter: {
        pageSize: 20,
        offset: 0,
        timeType: 0,
        type: 0
      }
    };
  },
  mounted() {
    this.msgListStart();
  },
  methods: {
    msgListStart() {
      msgList(this.parameter).then(res => {
        try {
          this.msgArr = res.data;
          if (!this.msgArr.length) {
            this.noData = true;
          } else {
            this.noData = false;
          }
        } catch (e) {
          console.log(e);
        }
      });
      return this.msgArr;
    },
    loadTop() {
      this.topStatus = "loading";
      this.parameter.offset = 0;
      let that = this;
      new Promise(function(resolve, reject) {
        resolve(that.msgListStart());
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
      msgList(this.parameter).then(res => {
        if (res.data.length) {
          this.msgArr = this.msgArr.concat(res.data);
        } else {
          Toast("暂无更多数据");
          this.allLoaded = true;
        }
        this.bottomStatus = null;
        this.$refs.loadMore.onBottomLoaded();
      });
    },
    search(i, val, title) {
      this.title = title;
      this.showFlag = !this.showFlag;
      this.showNum = i;
      this.parameter.type = val;
      this.parameter.offset = 0;
      this.allLoaded = false;
      this.msgListStart();
    }
  }
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$el.className = "body animated slideInRight";
  //   });
  // }
};
</script>
