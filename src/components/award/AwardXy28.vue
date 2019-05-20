<template>
  <div class="ssc_period">
    <div class="period" v-if="awardData.last">
      <div class="period_top">
        <div>
          <span>{{ awardData.next.actionNo || "-" }}期</span>
          <span>离投注截止还有</span>
        </div>
        <div>{{ time || "00:00:00" }}</div>
        <i class="iconfont" @click="Play">{{
          musicFlag ? "&#xe621;" : "&#xe679;"
        }}</i>
      </div>
      <i class="iconfont drop" @click="loadMore = !loadMore">{{
        loadMore ? "&#xe649;" : "&#xe64a;"
      }}</i>
      <ul :class="{ show: loadMore }">
        <li v-for="(item, i) in awardData.last" :key="i">
          <span>{{ item.actionNo }}期</span>
          <div v-if="item.data" key="has-code">
            <span
              v-for="(itemOne, k) in item.data"
              :key="i + k"
              :style="{
                backgroundColor: itemOne === ',' ? '#f2f2f2' : '#ff102c',
                color: itemOne === ',' ? '#666' : '#fff'
              }"
              >{{ itemOne === "," ? "+" : itemOne }}</span
            >
            <i>=</i>
            <span class="ball">{{ allValue(item.data) }}</span>
          </div>
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
              params: { modeName: 'HistoryXy28', id: lotteryData.id },
              query: { title: lotteryData.title }
            }"
            >查看更多</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "AwardBlock",
  props: {
    awardData: Object,
    timeOver: Function,
    lotteryData: Object
  },
  data() {
    return {
      loadMore: false, //下拉查看更多
      setTimer: "",
      time: ""
    };
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
    allValue(data) {
      let allNum = new Number();
      data = data.split(",");
      data.map(item => {
        allNum += item * 1;
      });
      return allNum;
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
.ssc_period {
  padding-bottom: 25px;
  .period {
    margin: auto;
    background-color: #f2f2f2;
    border-top: 1px solid #dedddb; /*no*/
    border-bottom: 1px solid #dedddb; /*no*/
    padding: 8px 20px 0;
    position: relative;
    .drop {
      position: absolute;
      right: 25px;
      font-size: 40px;
      color: #6d6d6d;
      line-height: 85px;
    }
    .period_top {
      overflow: hidden;
      border-bottom: 1px solid #e0dcd9; /*no*/
      position: relative;
      div {
        float: left;
      }
      div:first-child {
        width: 380px;
        text-align: left;
        span {
          display: block;
          line-height: 32px;
          color: #959499;
          font-size: 26px;
        }
      }
      div:nth-child(2) {
        float: right;
        line-height: 69px;
        font-size: 50px;
        font-weight: bold;
        color: #6c6c6c;
        margin-right: 75px;
      }
      i {
        position: absolute;
        right: 1px;
        top: 8px;
        font-size: 45px;
        color: #6d6d6d;
      }
    }
    ul {
      height: 78px;
      overflow: hidden;
      transition: 0.5s;
      li {
        line-height: 78px;
        text-align: left;
        color: #999;
        font-size: 28px;
        div {
          float: right;
          margin-right: 80px;
          span {
            display: inline-block;
            width: 52px;
            height: 52px;
            line-height: 52px;
            text-align: center;
            border-radius: 50%;
          }
          i {
            margin: 0 15px;
          }
        }
      }
      li:last-child {
        text-align: center;
        border-top: 1px solid #e0dcd9; /*no*/
        height: 54px;
        line-height: 54px;
        a {
          color: #959499;
        }
      }
    }
    .show {
      height: 444px !important;
    }
    .Unopened {
      span {
        width: 52px;
        padding-right: 0;
        margin-right: 15px;
      }
    }
  }
}
</style>
