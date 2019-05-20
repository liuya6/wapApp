<template>
  <div class="six" v-if="awardData.last">
    <div>
      {{ awardData.next.actionNo || "-" }}期开奖倒计时
      <span>{{ time || "00:00:00" }}</span>
      <i class="iconfont" @click="Play">{{
        musicFlag ? "&#xe621;" : "&#xe679;"
      }}</i>
    </div>
    <i class="iconfont drop" @click="loadMore = !loadMore">{{
      loadMore ? "&#xe649;" : "&#xe64a;"
    }}</i>
    <ul :class="{ show: loadMore }">
      <li v-for="(item, index) in awardData.last" :key="index">
        <h3>{{ item.actionNo }}期</h3>
        <dl v-if="item.data" key="has-code">
          <dd
            v-for="(child, i) in handleCodeItem(item.codeData)"
            :key="i"
            :class="{ marl: child.code === '+' }"
          >
            <p
              :style="{ backgroundColor: child.color }"
              :class="{ add: child.code === '+' }"
            >
              {{ child.code }}
            </p>
            <span :class="{ reduce: child.zodiac === '-' }">{{
              child.zodiac
            }}</span>
          </dd>
        </dl>
        <div v-else key="no-code" class="Unopened">
          <span class="ball">等</span>
          <span class="ball">待</span>
          <span class="ball">开</span>
          <span class="ball">奖</span>
        </div>
      </li>
      <li>
        <router-link
          :to="{
            name: 'bethistory',
            params: { modeName: 'HistorySix', id: lotteryData.id },
            query: { title: lotteryData.title }
          }"
        >
          查看更多
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "AwardK3",
  data() {
    return {
      loadMore: false,
      setTimer: "",
      time: ""
    };
  },
  props: {
    awardData: Object,
    timeOver: Function,
    lotteryData: Object
  },
  created() {
    this.times();
  },
  destroyed() {
    clearInterval(this.setTimer);
  },
  watch: {
    "awardData.nowTime": {
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          clearInterval(this.setTimer);
          this.times();
        }
      }
    }
  },
  computed: {
    ...mapGetters(["musicFlag"])
  },
  methods: {
    ...mapMutations(["CHANGE_MUSIC_FLAG"]),
    handleCodeItem(codeArr) {
      let arr = [];
      for (let i = 0; i < codeArr.length; i++) {
        if (i === codeArr.length - 1) {
          arr.push({ code: "+", color: "", zodiac: "-" });
        }
        arr.push(codeArr[i]);
      }
      return arr;
    },
    Play() {
      this.CHANGE_MUSIC_FLAG();
      if (!this.musicFlag) {
        this.pauseAudio();
      }
    }
  }
};
</script>

<style scoped lang="less">
.six {
  position: relative;
  .add {
    color: #95949a;
    font-size: 50px;
    margin-left: 0 !important;
  }
  .reduce {
    opacity: 0;
    margin-left: 0 !important;
  }
  .marl {
    margin-left: 8px;
  }

  div {
    background-color: #f2f2f2;
    line-height: 54px;
    font-size: 26px;

    span {
      margin-left: 10px;
      color: #605aa4;
      font-weight: bold;
    }
  }
  div:first-child {
    border-bottom: 1px solid #e0dcd9; /*no*/
    i {
      font-size: 30px;
      color: #6d6d6d;
      margin-left: 10px;
    }
  }

  .drop {
    position: absolute;
    top: 80px;
    right: 230px;
    color: #6d6d6d;
    font-size: 29px;
  }

  ul {
    background-color: #f2f2f2;
    border-top: 1px solid #e0dcd9; /*no*/
    border-bottom: 1px solid #e0dcd9; /*no*/
    margin: 16px auto 24px;
    padding: 0 20px;
    height: 158px;
    overflow: hidden;
    transition: 0.5s;

    .Unopened {
      line-height: 110px;
      span {
        display: inline-block;
        width: 52px;
        height: 52px;
        line-height: 52px;
        text-align: center;
        border-radius: 50%;
        color: white;
      }
    }

    li {
      font-size: 26px;
      color: #999;
      border-bottom: 1px solid #dedddb; /*no*/
      h3 {
        line-height: 48px;
      }

      dl {
        overflow: hidden;
        display: flex;
        margin: 12px auto 0;

        dd {
          float: left;
          margin-left: 40px;
          b {
            line-height: 52px;
            font-size: 40px;
            font-weight: normal;
          }

          p {
            width: 52px;
            height: 52px;
            border-radius: 50%;
            line-height: 52px;
            text-align: center;
            color: white;
            font-size: 28px;
          }

          span {
            font-size: 27px;
            line-height: 48px;
          }
        }
        dd:last-child {
          margin-left: 0;
        }
      }
    }

    li:first-child {
      h3 {
        border-bottom: 1px solid #dedddb;
        /*no*/
      }
    }

    li:last-child {
      border: 0;
      text-align: center;
      height: 54px;
      line-height: 54px;
      font-size: 28px;

      a {
        color: #959499;
      }
    }
  }

  .show {
    height: 862px;
  }
}
</style>
