<style scoped lang="less">
.body {
  overflow: hidden;
  width: 100%;
  height: 100%;
  .back {
    position: fixed;
    left: 0;
    top: 100px;
    width: 80px;
    height: 80px;
    line-height: 80px;
    border-radius: 50%;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.6);
    font-size: 25px;
    color: silver;
  }
}
</style>
<template>
  <div class="body" v-title="'KY棋牌'">
    <div class="back" @click="backa">
      返回
    </div>
    <iframe :src="url" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>

<script>
import { chessEnter, thirdEnter } from "../api";
import { MessageBox, Toast } from "mint-ui";
export default {
  name: "KYchess",
  data() {
    return {
      url: ""
    };
  },
  created() {
    // chessEnter({ id: this.$route.params.id }).then(res => {
    //   this.url = res.data.url;
    // });
    thirdEnter({
      gameType: this.$route.params.type,
      gameId: this.$route.params.id
    }).then(res => {
      if (res.msg) {
        Toast(res.msg);
        // if (!res.status) (
        //   this.$router.go(-1)
        // )
        return (window.location = res.data.url);
      }
      this.url = res.data.url;
    });
  },
  mounted() {
    let back = document.getElementsByClassName("back")[0];
    let WindowWidth = document.body.clientWidth;
    let WindowHeight = document.body.clientHeight;
    let boxWidth = back.offsetWidth;
    let boxHeight = back.offsetHeight;
    back.ontouchmove = function(e) {
      e = window.event || e;
      let endX = e.changedTouches[0].clientX - boxWidth / 2;
      let endY = e.changedTouches[0].clientY - boxHeight / 2;
      if (endX < 0) {
        endX = 0;
      }
      if (endX > WindowWidth - boxWidth) {
        endX = WindowWidth - boxWidth;
      }
      if (endY <= 0) {
        endY = 0;
      }
      if (endY > WindowHeight - boxHeight) {
        endY = WindowHeight - boxHeight;
      }
      back.style.left = endX + "px";
      back.style.top = endY + "px";
    };
  },
  methods: {
    backa() {
      MessageBox.confirm("确定退出吗?")
        .then(action => {
          this.$router.go(-1);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
