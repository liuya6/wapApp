<template>
  <div class="body" v-title="'游戏记录'">
    <div class="top">
      <div class="shenLan">
        <span @click="showMenu = !showMenu">{{ title }}</span>
        <i :class="showMenu ? '' : 'rotate'" @click="showMenu = !showMenu">
          <img src="../assets/img/down.png" alt />
        </i>
        <i class="iconfont" @click="TabRight">&#xe67f;</i>
      </div>
      <transition name="bounce">
        <ul class="nav shenLan" v-show="!showMenu">
          <li
            v-for="(item, i) in classify"
            :key="i"
            @click="Tab(item.typeKey, item.name)"
          >
            {{ item.name }}
          </li>
        </ul>
      </transition>
    </div>
    <div class="content" :style="{ marginBottom: !isShow ? '1.333rem' : '0' }">
      <keep-alive>
        <component
          :is="selectVal"
          :TabShowFlag="TabShowFlag"
          :Tab="TabRight"
          :type="select"
        ></component>
      </keep-alive>
    </div>
    <my-Foot v-show="!isShow"></my-Foot>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { recordTitle, thirdGameList } from "../api";
import Lottery from "../components/record/Lottery";
import KaiYuan from "../components/record/KaiYuan";
import ElectronicGame from "../components/record/ElectronicGame";

export default {
  name: "recording",
  data() {
    return {
      classify: [],
      title: "彩票记录",
      TabShowFlag: false,
      CqShowFlag: false,
      AgShowFlag: false,
      select: "Lottery",
      showMenu: true
    };
  },
  computed: {
    isShow() {
      return this.TabShowFlag;
    },
    selectVal() {
      switch (this.select) {
        case "Lottery":
          return "Lottery";
        case "KaiYuan":
        case "LeYou":
          return "KaiYuan";
        default:
          return "ElectronicGame";
      }
    }
  },
  components: {
    Lottery,
    KaiYuan,
    ElectronicGame
  },
  created() {
    if (
      sessionStorage.getItem("select") &&
      sessionStorage.getItem("RecordTitle")
    ) {
      this.select = sessionStorage.getItem("select");
      this.title = sessionStorage.getItem("RecordTitle");
    }
    this.checkedLogin();
    this.initialTitle();
  },
  activated() {},
  methods: {
    ...mapActions(["checkedLogin"]),
    initialTitle() {
      recordTitle().then(res => {
        this.classify = res.data;
      });
    },
    Tab(type, RecordTitle) {
      this.showMenu = true;
      sessionStorage.setItem("select", type);
      sessionStorage.setItem("RecordTitle", RecordTitle);
      this.select = type;
      this.title = RecordTitle;
      this.AllClose();
    },
    TabRight() {
      this.TabShowFlag = !this.TabShowFlag;
    },
    AllClose() {
      this.TabShowFlag = false;
    }
  }
};
</script>

<style scoped lang="less">
.body {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;

  .top {
    height: 101px;
    color: white;
    font-size: 28px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    .iconfont {
      position: absolute;
      top: 31px;
      width: 38px;
      line-height: 38px;
      right: 20px;
      font-size: 45px;
    }
    div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      line-height: 101px;
      background-color: #605aa2;
      z-index: 2;

      span {
        margin-right: 10px;
      }

      i {
        position: absolute;
        width: 38px;
        height: 38px;
        top: 31px;
        transition: 0.3s;
        vertical-align: middle;
        img {
          width: 100%;
          vertical-align: top;
        }
      }
    }

    .nav {
      width: 100%;
      position: absolute;
      top: 100px;
      left: 0;
      background-color: #605aa2;
      transition: 0.3s;

      li {
        border-top: 1px solid rgba(255, 255, 255, 0.5);
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
    flex: 1;
    padding-top: 101px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
