<template>
  <div class="body" v-title="'活动申请详情'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      活动申请详情
    </div>
    <ul class="activityDetail">
      <li>
        <p>
          活动名称<span>{{ activityArr.title }}</span>
        </p>
        <p>
          申请状态<span
            :style="{
              color:
                activityArr.status == 0
                  ? 'blue'
                  : activityArr.status == 1
                  ? '#9a9a9a'
                  : 'red'
            }"
            >{{ activityArr.status | changeStatus }}</span
          >
        </p>
        <p>
          申请时间 <span>{{ timestampToString(activityArr.createtime) }}</span>
        </p>
        <p>
          备注信息 <span>{{ activityArr.info }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getActivityDetail } from "../api";
export default {
  name: "activitydetail",
  data() {
    return {
      activityArr: "",
      id: this.$route.params.id
    };
  },
  created() {
    this.initial();
  },
  activated() {
    this.id = this.$route.params.id;
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
      getActivityDetail({ id: this.id }).then(res => {
        if (res.status) {
          this.activityArr = res.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.body {
  height: 100%;
  background: #f5f5f5;
  .top {
    width: 100%;
    height: 100px;
    background-color: #605aa2;
    line-height: 100px;
    text-align: center;
    color: white;
    font-size: 38px;
    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
      z-index: 10;
    }
  }
  .activityDetail {
    text-align: left;
    font-size: 30px;
    li {
      background: #fff;
      p {
        line-height: 80px;
        padding-left: 20px;
        border-bottom: 1px solid #eaeaea; /*no*/
        span {
          margin-left: 150px;
        }
      }
    }
  }
}
</style>
