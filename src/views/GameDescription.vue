<template>
  <div class="body" v-title="'玩法说明'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      玩法说明
    </div>
    <div class="content">
      <div class="content_title">
        {{ playData.name }}-{{ playData.playName }}
      </div>
      <div class="content_middle" v-html="playData.info"></div>
    </div>
  </div>
</template>

<script>
// import { lotteryIntro } from "../api";
import { mapGetters } from "vuex";
export default {
  name: "GameDescription",
  data() {
    return {
      description: ""
    };
  },
  created() {
    // lotteryIntro({
    //   typeName: this.$route.query.typeName,
    //   modeType: this.$route.query.modeType
    // }).then(res => {
    //   // console.log(res);
    //   this.description = res.data.content;
    // });
  },
  computed: {
    ...mapGetters(["playData"])
  }
};
</script>

<style scoped lang="less">
.body {
  .top {
    height: 100px;
    width: 100%;
    line-height: 100px;
    font-size: 37px;
    color: white;
    background-color: #605aa2;
    position: fixed;
    top: 0;

    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
    }
  }
  .content {
    margin-top: 120px;
    padding: 0 20px 0;
    .content_title {
      font-size: 30px;
      line-height: 70px;
      font-weight: bold;
    }
    .content_middle {
      font-size: 30px;
      line-height: 50px;
      text-align: left;
    }
  }
}
</style>
