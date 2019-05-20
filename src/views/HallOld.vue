<template>
  <div class="body" v-title="'游戏大厅'">
    <div class="top">
      <div>
        <span @click="showMenu = !showMenu">{{ title }}</span>
        <i :class="showMenu ? '' : 'rotate'" @click="showMenu = !showMenu">
          <img src="../assets/img/down.png" alt="" />
        </i>
      </div>
      <transition name="bounce">
        <ul class="nav" v-show="!showMenu">
          <li
            v-for="(item, i) in classify"
            :key="i"
            @click="change(item.title, item.value)"
          >
            {{ item.title }}
          </li>
        </ul>
      </transition>
    </div>
    <div class="content" v-if="allGame">
      <div class="games">
        <dl v-for="(item, i) in allGame" :key="i">
          <dt>{{ item.gameTitle }}</dt>
          <dd
            v-for="(child, i) in item.gameData"
            :key="i"
            @click="playGame(child.classify, child.id, child.title)"
          >
            <div>
              <img
                :src="imgUrl(child.classify, child.imgName)"
                :alt="child.title"
              />
            </div>
            <p>{{ child.title }}</p>
          </dd>
        </dl>
      </div>
    </div>
    <my-Foot></my-Foot>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
const classify = [
  { title: "时时彩", value: "0" },
  { title: "11选5", value: "1" },
  { title: "PK10", value: "2" },
  { title: "快3", value: "3" },
  { title: "其他", value: "4" },
  { title: "KY棋牌", value: "5" },
  { title: "全部游戏", value: "6" }
];
export default {
  name: "hallOld",
  data() {
    return {
      flag: true,
      classify,
      title: "全部游戏",
      showMenu: true
    };
  },
  computed: {
    ...mapGetters(["allGame"])
  },
  watch: {},
  created() {
    this.allGames();
  },
  methods: {
    ...mapActions(["allGames"]),
    ...mapMutations(["CHANGE_GAME"]),
    change(name, index) {
      this.title = name;
      this.showMenu = true;
      this.CHANGE_GAME(index);
    }
  }
};
</script>
<style scoped lang="less">
.top {
  height: 80px;
  color: white;
  font-size: 30px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  div {
    position: absolute;
    width: 100%;
    line-height: 80px;
    background-color: #605aa2;
    z-index: 2;

    span {
      margin-right: 10px;
    }

    i {
      position: absolute;
      width: 38px;
      height: 38px;
      top: 20px;
      transition: 0.3s;

      img {
        width: 100%;
        vertical-align: top;
      }
    }
  }

  .nav {
    width: 100%;
    position: absolute;
    top: 80px;
    left: 0;
    background-color: #605aa2;
    transition: 0.3s;
    z-index: 1;

    li {
      border-top: 1px solid #6f6aab;
      line-height: 80px;

      a {
        display: block;
        color: white;
        font-size: 25px;
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
.content {
  padding-top: 80px;
  padding-bottom: 100px;
}
.games {
  dl {
    overflow: hidden;

    dt {
      line-height: 51px;
      font-size: 28px;
      text-align: left;
      padding-left: 20px;
      background-color: #f6f6f6;
      margin-bottom: 20px;
    }

    dd {
      float: left;
      width: 25%;
      text-align: center;
      background-color: #fff;
      div {
        display: inline-block;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      p {
        line-height: 60px;
        font-size: 26px;
      }

      a {
        display: block;
        padding-top: 23px;
        border-bottom: 1px solid #e0dcd9;
        border-right: 1px solid #e0dcd9;
      }
    }
  }
}
</style>
