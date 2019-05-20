<template>
  <div class="body" v-title="'会员中心'">
    <div class="top white">
      <i class="iconfont" @click="back">&#xe629;</i>
      会员中心
    </div>
    <div class="content">
      <div class="member">
        <h1 class="memberLogo">
          <span class="grade">{{ grade }}</span>
          <img src="../assets/img/vip_03.png" alt="" />
        </h1>
        <div class="progress">
          <!-- <mt-progress :value="value" :bar-height="24"></mt-progress> -->
          <div class="progressContainer" ref="progress">
            <div class="progressline" :style="{ width: value + '%' }"></div>
          </div>
        </div>
        <p>累计打码：{{ currentCode }}/{{ maxCode }}</p>
        <div class="level">
          <div class="nav">
            <div
              v-for="(item, index) in nav"
              :key="index"
              @click="addBorder(index)"
            >
              <span :class="[currentIndex == index ? 'active' : '']">{{
                item.text
              }}</span>
              <span
                class="line"
                :class="[currentIndex == index ? 'action' : '']"
              ></span>
            </div>
          </div>
          <ul class="list" v-if="currentIndex == 0">
            <li>
              <h3>晋级礼金</h3>
              <p>{{ nowBonusUp }}元</p>
            </li>
            <li>
              <h3>周周俸禄</h3>
              <p>{{ nowBonusWeek }}元</p>
            </li>
            <li>
              <h3>月月俸禄</h3>
              <p>{{ nowBonusMonth }}元</p>
            </li>
          </ul>
          <ul class="list" v-if="currentIndex == 1">
            <li>
              <h3>晋级礼金</h3>
              <p>{{ nextBonusUp }}元</p>
            </li>
            <li>
              <h3>周周俸禄</h3>
              <p>{{ nextBonusWeek }}元</p>
            </li>
            <li>
              <h3>月月俸禄</h3>
              <p>{{ nextBonusMonth }}元</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="navList">
        <h3>会员特权</h3>
        <ul>
          <li>
            <img src="../assets/img/vip_08.png" alt="" />
            <p>晋级礼金</p>
          </li>
          <li>
            <img src="../assets/img/vip_10.png" alt="" />
            <p>周周俸禄</p>
          </li>
          <li>
            <img src="../assets/img/vip_17.png" alt="" />
            <p>月月俸禄</p>
          </li>
          <li>
            <img src="../assets/img/vip_06.png" alt="" />
            <p>荣升VIP</p>
          </li>
          <li>
            <img src="../assets/img/vip_12.png" alt="" />
            <p>加速存取</p>
          </li>
          <li>
            <img src="../assets/img/vip_14.png" alt="" />
            <p>经理客服</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getMember } from "../api";
import { mapActions, mapGetters, mapMutations } from "vuex";
const nav = [{ text: "当前等级", flag: true }, { text: "下一级", flag: true }];
import { Progress } from "mint-ui";
export default {
  name: "member",
  data() {
    return {
      value: 0,
      grade: "",
      nav: nav,
      currentIndex: 0,
      currentCode: 0, //当前打码量
      maxCode: 0, //当前等级最大打码量
      nowBonusMonth: "", //当前等级月月俸禄
      nowBonusUp: "", //当前等级晋级礼金
      nowBonusWeek: "", //当前等级周周俸禄
      nextBonusMonth: "", //下一等级月月俸禄
      nextBonusUp: "", //下一等级晋级礼金
      nextBonusWeek: "" //下一等级周周俸禄
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    addBorder: function(index) {
      this.currentIndex = index;
    },
    getMemberList: function() {
      getMember().then(res => {
        if (res.status) {
          this.currentCode = parseFloat(Number(this.userInfo.scoreTotal));
          this.grade = res.data.nowLevel.levelName;
          this.maxCode = parseInt(Number(res.data.nextLevel.minScore));
          this.nextMaxCode = parseInt(Number(res.data.nextLevel.minScore));
          this.value = (this.currentCode / this.maxCode) * 100;

          if (this.currentCode >= this.maxCode) {
            this.maxCode = this.nextMaxCode;
            this.grade = res.data.nextLevel.levelName;
          }
          this.nowBonusMonth = parseInt(res.data.nowLevel.bonusMonth);
          this.nowBonusUp = parseInt(res.data.nowLevel.bonusUp);
          this.nowBonusWeek = parseInt(res.data.nowLevel.bonusWeek);

          this.nextBonusMonth = parseInt(res.data.nextLevel.bonusMonth);
          this.nextBonusUp = parseInt(res.data.nextLevel.bonusUp);
          this.nextBonusWeek = parseInt(res.data.nextLevel.bonusWeek);
        }
      });
    }
  },
  mounted() {
    this.getMemberList();
  }
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$el.className = "body animated slideInRight";
  //   });
  // }
};
</script>
<style lang="less" scoped>
.body {
  .top {
    height: 100px;
    line-height: 100px;
    font-size: 37px;
    color: #656565;
    background-color: #fff;
    position: relative;
    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
    }
  }
  .member {
    height: 630px;
    background: #282828;
    color: #fff;
    display: flex;
    flex-direction: column;
    h1 {
      // height: 200px;
      text-align: center;
      position: relative;
      img {
        width: 132px;
        height: 146px;
        margin-top: 19px;
        margin-bottom: 16px;
      }
      span {
        display: block;
        width: 100px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 24px;
        // background: #6f67fa;
        color: #ececec;
        position: absolute;
        right: 43.5%;
        bottom: 38px;
        border-radius: 50%;
        z-index: 10;
      }
    }
    .progress {
      width: 100%;
      height: 20px;
      .progressContainer {
        width: 616px;
        height: 20px;
        margin: 0 auto;
        border-radius: 20px;
        background: #161616;
        overflow: hidden;
        position: relative;
        .progressline {
          height: 20px;
          background: #e0b800;
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 20px;
        }
      }
    }
    > p {
      height: 100px;
      line-height: 90px;
      font-size: 25px;
    }
    div.level {
      /*margin-top: 12px;*/
      flex: 1;
      display: flex;
      flex-direction: column;
      background: url("../assets/img/vip-bg.png") no-repeat top center;
      background-size: 100% 5%;

      .nav {
        width: 100%;
        line-height: 125px;
        height: 135px;
        position: relative;
        div {
          width: 50%;
          color: #989898;
          display: block;
          float: left;
          font-size: 27px;
          position: relative;
          .line {
            width: 57px;
            height: 4px;
            display: block;
            background: #999;
            position: absolute;
            bottom: 20px;
            left: 43%;
          }
          .active {
            color: #fff;
          }
          .action {
            background: #fff !important;
            color: #fff;
          }
        }
      }
      .list {
        width: 100%;
        flex: 1;
        li:first-child {
          margin-left: 40px;
        }
        li:nth-child(3) {
          margin-right: 0;
        }
        li {
          width: 184px;
          height: 133px;
          border: 1px solid #957441;
          float: left;
          margin-right: 54px;
          h3 {
            line-height: 66px;
            font-size: 26px;
            color: #815a00;
          }
          p {
            line-height: 52px;
            color: #fff;
            font-size: 24px;
          }
        }
      }
    }
  }
  .navList {
    overflow: hidden;
    color: #999;
    h3 {
      text-align: center;
      font-size: 30px;
      line-height: 105px;
      color: #825a03;
      font-weight: bold;
    }
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      li {
        width: 33%;
        height: 186px;
        text-align: center;
        img {
          width: 74px;
          height: 69px;
          margin-top: 16px;
          margin-bottom: 16px;
        }
        p {
          font-size: 25px;
        }
      }
    }
  }
}
</style>
