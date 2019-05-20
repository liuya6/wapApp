<template>
  <div class="body" v-title="'活动列表'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      活动申请
    </div>
    <ul class="applyList">
      <li v-for="(item, i) in applyList" :key="i">
        <router-link :to="{ name: 'activitydetail', params: { id: item.id } }">
          <i class="iconfont">&#xe669;</i>
          <h3>【{{ item.title }}】</h3>
          <p>
            <span>{{ timestampToString(item.createtime) }}</span>
            <span
              :style="{
                color:
                  item.status === 0
                    ? 'blue'
                    : item.status === 1
                    ? '#9a9a9a'
                    : 'red'
              }"
              >{{ item.status | changeStatus }}</span
            >
          </p>
        </router-link>
      </li>
      <div v-if="noData" class="noData">
        <div class="content_box">
          <div>
            <p><img src="../assets/img/jx-cat_03.png" alt="" /></p>
            <h4>您的活动申请记录是空的噢！</h4>
          </div>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import { activityApplyList } from "../api";
import { Toast } from "mint-ui";

export default {
  name: "applyactivitylist",
  data() {
    return {
      applyList: [],
      noData: false
    };
  },

  created() {
    this.initial();
  },
  activated() {
    this.initial();
  },
  filters: {
    changeStatus: function(value) {
      switch (value) {
        case 0:
          return "待处理";
        case 1:
          return "已处理";
        default:
          return "已拒绝";
      }
    }
  },
  methods: {
    initial() {
      activityApplyList().then(res => {
        if (res.status) {
          this.applyList = res.data;
          if (!res.data.length) {
            this.noData = true;
          } else {
            this.noData = false;
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.body {
  height: 100%;
  .top {
    width: 100%;
    height: 100px;
    background-color: #605aa2;
    line-height: 100px;
    text-align: center;
    color: white;
    font-size: 38px;
    position: fixed;
    top: 0;
    z-index: 20;
    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
      z-index: 10;
    }
  }

  ul.applyList {
    overflow-y: scroll;
    margin-top: 100px;
    li:first-child {
      border-top: 1px solid #e0dcd9; /*no*/
    }
    li {
      overflow: hidden;
      text-align: left;
      padding-left: 20px;
      padding-right: 100px;
      position: relative;
      border-bottom: 1px solid #e0dcd9; /*no*/
      a {
        width: 100%;
        height: 100%;
        h3 {
          line-height: 54px;
          font-size: 30px;
          color: #444;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-top: 10px;
        }
        p {
          line-height: 70px;
          font-size: 28px;
          position: relative;
          span:nth-child(2) {
            position: absolute;
            top: -32px;
            right: -20px;
          }
        }
        i {
          position: absolute;
          right: 30px;
          top: 48px;
          font-size: 30px;
          color: #999999;
        }
      }
    }
  }
}
</style>
