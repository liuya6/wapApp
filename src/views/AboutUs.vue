<style scoped lang="less">
.body {
  .top {
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 37px;
    color: white;
    background-color: #605aa2;
    position: fixed;
    top: 0;
    left: 0;

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
    padding-top: 100px;
    div {
      padding: 20px 50px 0 50px;
      font-size: 30px;
      line-height: 60px;
      text-align: left;
    }
  }
}
</style>
<template>
  <div class="body" v-title="'关于我们'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      {{ aboutUsArr.title }}
    </div>
    <div class="content">
      <div v-html="aboutUsArr.content"></div>
    </div>
  </div>
</template>

<script>
import { aboutUs } from "../api";
export default {
  name: "AboutUs",
  data() {
    return {
      aboutUsArr: []
    };
  },
  mounted() {
    aboutUs().then(res => {
      try {
        this.aboutUsArr = res.data;
      } catch (e) {
        console.log(e);
      }
    });
  }
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$el.className = "body animated slideInRight";
  //   });
  // }
};
</script>
