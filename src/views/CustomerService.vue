<style scoped lang="less">
.body {
  height: 100%;
  overflow: hidden;
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
  }
  .content {
    background-color: #f6f6f6;
    flex: 1;
  }
}
</style>
<template>
  <div class="body" v-title="'在线客服'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      在线客服
    </div>
    <div class="content">
      <iframe :src="url" frameborder="0" width="100%" height="100%"></iframe>
    </div>
  </div>
</template>

<script>
import { service } from "../api";
export default {
  name: "CustomerService",
  data() {
    return {
      url: ""
    };
  },
  created() {
    service().then(res => {
      this.url = res.data;
    });
  }
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$el.className = "body animated slideInRight";
  //   });
  // }
};
</script>
