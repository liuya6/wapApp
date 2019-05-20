<template>
  <div class="k3">
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
      <div class="content">
        <div class="contentOne" v-for="(item, i) in oneData" :key="i">
          <span>{{ item.actionNo }}期</span>
          <div v-if="item.data" key="has-code">
            <span v-for="(code, j) in item.data.split(',')" :key="i + j">
              <img
                :src="require('../../assets/img/touzi/touzi_0' + code + '.png')"
                alt
              />
            </span>
            <dl>
              <dd>
                <div>
                  <p v-for="(trend, k) in item.codeTrend" :key="k">
                    {{ trend }}
                  </p>
                </div>
              </dd>
            </dl>
          </div>
          <div v-else key="no-code" class="Unopened">
            <div>
              <span :class="'RotImg' + num"></span>
              <span :class="'RotImg' + num"></span>
              <span :class="'RotImg' + num"></span>
            </div>
          </div>
        </div>
        <div class="title" v-show="loadMore">
          <div>期号</div>
          <div>开奖号码</div>
          <div>和值</div>
          <div>大小</div>
          <div>单双</div>
        </div>
        <ul class="dialog" v-show="loadMore">
          <li v-for="(item, i) in awardData.last" :key="i">
            <div>
              <em>{{ item.actionNo }}</em>
              <i></i>
            </div>
            <div v-if="item.data" key="has-codes">
              <b v-for="(code, j) in item.data.split(',')" :key="i + j">
                <img
                  :src="
                    require('../../assets/img/touzi/touzi_0' + code + '.png')
                  "
                  alt
                />
              </b>
            </div>
            <div v-else key="no-codes" class="nodata">
              <span class="k3ball">等</span>
              <span class="k3ball">待</span>
              <span class="k3ball">开</span>
              <span class="k3ball">奖</span>
            </div>
            <div v-for="(trend, k) in item.codeTrend" :key="k">{{ trend }}</div>
          </li>
          <li>已显示最近50期开奖记录</li>
        </ul>
      </div>
    </div>
    <div class="description" v-show="lotteryData.classify === 9">
      {{ playData.info }}
    </div>
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
      time: "",
      num: 1,
      rotateTime: null
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
    },
    oneData(newVal) {
      if (this.rotateTime) {
        clearInterval(this.rotateTime);
      }
      if (!newVal.data) {
        this.rotateTime = setInterval(() => {
          this.num++;
          if (this.num > 4) {
            this.num = 1;
          }
        }, 80);
      } else {
        clearInterval(this.rotateTime);
      }
    }
  },
  computed: {
    ...mapGetters(["playData", "musicFlag"]),
    oneData() {
      let oneList = [];
      oneList["0"] = this.awardData.last["0"];
      return oneList;
    }
  },
  methods: {
    ...mapMutations(["CHANGE_MUSIC_FLAG"]),
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
.k3 {
  .period {
    margin: auto;
    border-bottom: 1px solid #22563f; /*no*/
    padding-top: 8px;
    position: relative;

    .drop {
      position: absolute;
      right: 25px;
      font-size: 40px;
      color: #fff;
      line-height: 78px;
      z-index: 2;
      top: 82px;
    }

    .period_top {
      overflow: hidden; /*no*/
      position: relative;
      div {
        float: left;
      }

      div:first-child {
        width: 350px;
        text-align: left;
        height: 69px;

        span {
          display: block;
          line-height: 32px;
          color: #fff;
          font-size: 26px;
          padding-left: 20px;
        }
      }

      div:nth-child(2) {
        float: right;
        line-height: 69px;
        font-size: 50px;
        font-weight: bold;
        color: #fff;
        margin-right: 85px;
      }

      i {
        position: absolute;
        right: 20px;
        top: 8px;
        font-size: 45px;
        color: #fff;
      }
    }

    .content {
      height: 78px;
      position: relative;

      .contentOne {
        line-height: 78px;
        text-align: left;
        color: #fff;
        font-size: 28px;
        overflow: hidden;
        padding-left: 20px;
        span {
          float: left;
        }
        div {
          float: left;
          margin-left: 27px;
          span {
            display: inline-block;
            vertical-align: top;
            width: 70px;
            height: 70px;
            margin-top: 6px;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .Unopened {
          float: right;
          margin-right: 80px;
          span {
            display: inline-block;
            width: 52px;
            height: 52px;
            line-height: 52px;
            text-align: center;
            color: white;
            margin-left: 12px;
            margin-top: 15px;
          }
          .RotImg1 {
            background: url("../../assets/img/k3.png") -55px 0 no-repeat;
            background-size: 210% 645%;
          }
          .RotImg2 {
            background: url("../../assets/img/k3.png") -55px -55px no-repeat;
            background-size: 210% 645%;
          }
          .RotImg3 {
            background: url("../../assets/img/k3.png") -55px -110px no-repeat;
            background-size: 210% 645%;
          }
          .RotImg4 {
            background: url("../../assets/img/k3.png") -55px -165px no-repeat;
            background-size: 210% 645%;
          }
        }
        dl {
          float: left;
          dd {
            overflow: hidden;
            p {
              width: 60px;
              float: left;
              height: 78px;
              line-height: 78px;
              text-align: center;
              font-size: 30px;
            }
          }
        }
      }
      .title {
        overflow: hidden;
        background-color: #22563f;
        border-top: 1px solid hsla(0, 0%, 100%, 0.3); /*no*/
        border-bottom: 1px solid #212121;
        height: 70px;
        box-sizing: border-box;
        font-size: 30px;
        color: #caebda;
        line-height: 70px;
        div {
          float: left;
        }
        div:nth-child(1) {
          width: 31%;
        }
        div:nth-child(2) {
          width: 30%;
        }
        div:nth-child(3) {
          width: 13%;
        }
        div:nth-child(4) {
          width: 13%;
        }
        div:nth-child(5) {
          width: 13%;
        }
      }
      .dialog {
        position: absolute;
        top: 148px;
        width: 100%;
        height: 800px;
        background-color: #22563f;
        overflow-y: scroll;
        z-index: 88;
        li {
          line-height: 70px;
          height: 70px;
          overflow: hidden;
          font-size: 0;
          div {
            float: left;
            font-size: 30px;
            color: #caebda;
            height: 70px;
            em {
              height: 70px;
              display: block;
              border-right: 1px solid #001a0b;
              font-style: normal;
            }
            img {
              width: 60px;
              height: 60px;
            }
            i {
              display: inline-block;
              width: 30px;
              height: 1px;
              border-bottom: 1px solid #001a0b; /*no*/
              position: absolute;
              right: -13px;
              top: 33px;
            }
          }
          div:nth-child(1) {
            width: 31%;
            position: relative;
          }
          div:nth-child(2) {
            width: 30%;
          }
          div:nth-child(3) {
            width: 13%;
          }
          div:nth-child(4) {
            width: 13%;
          }
          div:nth-child(5) {
            width: 13%;
          }
          .nodata {
            width: 69% !important;
            text-align: center;
            span {
              display: inline-block;
              width: 52px;
              height: 52px;
              line-height: 52px;
              text-align: center;
              border-radius: 50%;
              color: white;
              margin-left: 12px;
              background-color: #0e7347;
            }
          }
        }
        li:first-child {
          margin-top: 8px;
        }
        li:last-child {
          margin-top: 8px;
          font-size: 30px;
          text-align: center;
          color: #caebda;
          background-color: #1e4b37;
        }
      }
    }
  }
  .description {
    width: 90%;
    margin: 30px auto 0;
    color: #caebda;
    font-size: 28px;
  }
}
</style>
