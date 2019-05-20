<template>
  <div class="body">
    <div class="top shenLan">
      <i class="iconfont" @click="goBack">&#xe629;</i>
      {{ $route.params.enName }}电子
    </div>
    <div class="content">
      <ul>
        <li v-for="(other, j) in gameList" :key="j">
          <div
            @click="
              playGame(
                '',
                other.link,
                other.gameId,
                other.title,
                '',
                other.enName,
                other.isHall
              )
            "
          >
            <i>
              <my-img :src="imgUrl(other.img, '')"></my-img>
            </i>
            <p>{{ other.title }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { thirdHall } from "../api";
export default {
  name: "ElectronicGames",
  data() {
    return {
      gameList: []
    };
  },
  created() {
    this.initHall();
    sessionStorage.firstTimeHall = 0;
  },
  activated() {
    if (Number(sessionStorage.firstTimeHall) > 0) {
      this.initHall();
    }
  },
  methods: {
    initHall() {
      thirdHall({ typeKey: this.$route.params.enName }).then(res => {
        this.gameList = res.data;
      });
    },
    goBack() {
      this.gameList = [];
      this.$router.go(-1);
      sessionStorage.firstTimeHall = 1;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$el.className = "body animated slideInRight";
    });
  }
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
      overflow-y: scroll;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;

      li {
        overflow: hidden;
        width: 25%;
        text-align: center;
        margin: 20px 0;

        div {
          i {
            display: inline-block;
            width: 120px;
            height: 120px;
            line-height: 120px;

            img {
              display: inline-block;
              vertical-align: middle;
            }
          }

          p {
            font-size: 28px;
            color: #666;
          }
        }
      }
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
