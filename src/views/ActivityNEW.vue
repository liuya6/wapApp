<template>
  <div class="activity" v-title="'优惠大厅'">
    <div class="activityBox">
      <div class="top">
        <div>
          <i class="iconfont" @click="goBack">&#xe629;</i>
          <span class="titleSpan" @click="showMenu = !showMenu">{{
            title
          }}</span>
          <i
            @click="showMenu = !showMenu"
            class="iconfont rotatei"
            :class="showMenu ? '' : 'rotate'"
            >&#xe63d;</i
          >
          <span @click="$router.push({ name: 'applyactivitylist' })"
            >申请记录</span
          >
        </div>
        <transition name="bounce">
          <ul class="openNav" v-show="!showMenu">
            <li
              class="center"
              v-for="(item, i) in navList"
              :key="i"
              @click="tab(i, item)"
            >
              <span>
                {{ item.name }}
              </span>
            </li>
          </ul>
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
          :bottomDistance="50"
          :topDistance="50"
        >
          <ul>
            <li
              class="list-pic"
              v-for="(item, i) in activityArr"
              :key="i"
              @click="handleShow(i)"
            >
              <div class="imgBox">
                <a :href="'#' + i">
                  <my-img :src="item.image" :id="i"></my-img>
                </a>
              </div>
              <template>
                <div
                  class="activityDetail"
                  @click="stop"
                  :class="[i === showTarget ? 'show' : 'hide']"
                >
                  <div v-html="item.content"></div>
                </div>
              </template>
            </li>
          </ul>
          <div slot="top" class="mint-loadmore-top">
            <span
              v-show="topStatus !== 'loading'"
              :class="{ 'is-rotate': topStatus === 'drop' }"
              style="color: #fff"
              >下拉刷新</span
            >
            <span v-show="topStatus === 'loading'" id="top">
              <mt-spinner type="double-bounce" color="#26a2ff"></mt-spinner>
            </span>
          </div>
          <div
            slot="bottom"
            class="mint-loadmore-bottom"
            style="margin-bottom: 0"
            :class="allLoaded ? 'hide' : 'show'"
            v-if="activityArr.length >= parameter.pageSize"
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
  </div>
</template>

<script>
import { activity, appllyActivity } from "../api";
import { Toast } from "mint-ui";

export default {
  name: "Activity",
  data() {
    return {
      navList: [
        { id: 1, name: "全部活动", type: "" },
        { id: 1, name: "彩票活动", type: 0 },
        { id: 1, name: "棋牌活动", type: 1 },
        { id: 1, name: "真人活动", type: 2 },
        { id: 1, name: "电子活动", type: 3 }
      ],
      parameter: {
        type: "",
        client: 1,
        page: 1,
        pageSize: 10
      },
      bottomStatus: false, //上拉动画
      topStatus: false, //下拉动画
      allLoaded: false, //上拉加载更多 无数据时的状态
      showMenu: true,
      activityArr: [],
      showTarget: "",
      title: "全部活动"
    };
  },
  created() {
    this.init();
  },
  updated() {
    let that = this;
    let id;
    let ApplyBtn = document.querySelectorAll(".apply");
    for (let i = 0; i < ApplyBtn.length; i++) {
      let ApplyBtnOne = ApplyBtn[i];
      ApplyBtnOne.onclick = function() {
        id = this.getAttribute("id");
        if (!id) {
          id = this.getAttribute("data-id");
        }
        that.getApplication(id);
      };
    }
  },
  methods: {
    init() {
      activity(this.parameter).then(res => {
        if (res.status) {
          this.activityArr = res.data.list;
          if (this.activityArr.length < this.parameter.pageSize) {
            this.allLoaded = true;
          }
        }
      });
    },
    tab(index, item) {
      if (this.title == item.name) {
        return (this.showMenu = true);
      }
      console.log(this.title, item.name);
      this.activityArr = [];
      this.showMenu = true;
      this.parameter.type = item.type;
      this.parameter.page = 1;
      this.allLoaded = false;
      this.init();
      this.title = item.name;
    },
    handleShow(index) {
      this.showTarget = this.showTarget === index ? "" : index;
    },
    stop(event) {
      event.stopPropagation();
    },
    loadTop() {
      this.topStatus = "loading";
      this.parameter.page = 1;
      this.parameter.pageSize = 10;
      let that = this;
      new Promise(function(resolve, reject) {
        resolve(
          activity(that.parameter).then(res => {
            that.activityArr = res.data.list;
            return res;
          })
        );
        reject("网络请求失败");
      }).then(res => {
        console.log(res);
        if (res.data.list.length) {
          this.allLoaded = false;
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
      activity(this.parameter).then(res => {
        if (res.data.list.length) {
          this.activityArr = this.activityArr.concat(res.data.list);
          if (res.data.list.length < this.parameter.pageSize) {
            this.allLoaded = true;
          }
        } else {
          Toast("暂无更多数据");
          this.allLoaded = true;
        }
        this.bottomStatus = null;
        this.$refs.loadMore.onBottomLoaded();
      });
    },
    getApplication(id) {
      appllyActivity({ articleId: id })
        .then(res => {
          Toast(res.msg);
        })
        .catch(err => {
          console.log(err);
          Toast("活动申请失败");
        });
    },
    goBack() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style scoped lang="less">
.activity {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .activityLeave {
    transform: translateX(50%);
  }
  .activityBox {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: 0.38s;
    .top {
      height: 104px;
      background-color: #dc001a;
      font-size: 30px;
      color: white;
      text-align: center;
      line-height: 104px;
      span {
        &:nth-child(4) {
          position: absolute;
          right: 23px;
          line-height: 104px;
        }
      }
      .rotatei {
        position: absolute;
        width: 38px;
        height: 38px;
        line-height: 38px;
        top: 31px;
        transition: 0.3s;
        vertical-align: middle;
        font-size: 30px;
      }
      .rotate {
        transform: rotate(180deg);
      }
      > div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;
        line-height: 101px;
        background-color: #dc001a;
      }
      i:first-child {
        position: absolute;
        left: 20px;
        font-size: 40px;
      }
      i:last-child {
        font-size: 30px;
      }
      .titleSpan {
        margin-right: 16px;
      }
    }
  }
  .content {
    flex: 1;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    ul {
      li:first-child {
        margin-top: 15px;
      }
      li {
        background: #fff;
        border: 1px solid #dddddd;
        width: 94%;
        overflow: hidden;
        margin: 0 auto 26px;
        box-sizing: border-box;
        padding: 0;
        border-radius: 5px;
        .imgBox {
          width: 97%;
          padding-top: 10px;
          margin: 0 auto 5px;
          overflow: hidden;
          text-align: center;
          a {
            .loading,
            .loading-container {
              height: 200px;
            }
            img {
              height: 100% !important;
            }
          }
          img {
            width: 100%;
            height: 224px;
            display: inline-block;
          }
          a {
            display: block;
          }
        }
        .activityDetail {
          padding-top: 10px;
          overflow: hidden;
          .application {
            width: 97%;
            height: 50px;
            display: block;
            line-height: 50px;
            margin: 20px auto;
            background: red;
            color: #fff;
            border: 0;
            outline: none;
          }
          .gray {
            background: gray;
          }
          img {
            max-width: 100%;
          }
        }
      }
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
.openNav {
  width: 100%;
  position: absolute;
  top: 100px;
  left: 0;
  background: #dc001a;
  transition: 0.3s;
  z-index: 99;
  li {
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    height: 80px;
    line-height: 80px;
    text-align: left;
    i {
      display: inline-block;
      width: 68px;
      height: 80px;
      line-height: 80px;
      overflow: hidden;
      margin-right: 20px;
      margin-left: 35%;
      img {
        display: inline-block;
        vertical-align: middle;
        width: 100%;
      }
    }
    span {
      display: inline-block;
      vertical-align: top;
      line-height: 80px;
    }
    a {
      display: block;
      color: white;
      font-size: 25px;
    }
    &:last-child {
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    }
  }
  .center {
    text-align: center;
  }
}
</style>
