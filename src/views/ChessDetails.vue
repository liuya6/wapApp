<style scoped lang="less">
.body {
  .top {
    height: 100px;
    background-color: #605aa2;
    line-height: 100px;
    text-align: center;
    color: white;
    font-size: 38px;
    position: relative;

    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
    }
  }

  .content {
    padding-top: 18px;

    ul {
      width: 710px;
      margin: auto;
      overflow: hidden;
      background-color: #f6f6f6;
      border-radius: 10px;

      li {
        width: 50%;
        float: left;
        line-height: 60px;
        font-size: 25px;

        span {
          float: left;
          margin-left: 29px;
        }

        p {
          float: left;
          margin-left: 25px;
          color: #999999;
        }
      }
    }

    dl {
      width: 681px;
      margin: 20px auto 0;
      overflow: hidden;
      background-color: #f6f6f6;
      border-radius: 10px;
      padding-left: 29px;

      dd {
        float: left;
        line-height: 60px;
        width: 654px;

        span {
          float: left;
          width: 131px;
          text-align: left;
          font-size: 28px;
        }

        p {
          float: left;
          margin-left: 25px;
          color: #999999;
          font-size: 28px;
        }
      }

      dd:first-child {
        border-bottom: 1px solid #dedddb;
      }
    }
  }
}
</style>
<template>
  <div class="body" v-title="'棋牌详情'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      棋牌详情
    </div>
    <div class="content">
      <ul>
        <li>
          <span>游戏类型</span>
          <p>{{ chessDetail.gameName }}</p>
        </li>
        <li>
          <span>玩法</span>
          <p>{{ chessDetail.roomName }}</p>
        </li>
      </ul>
      <dl>
        <dd>
          <span>订单号码</span>
          <p>{{ chessDetail.GameID }}</p>
        </dd>
        <dd>
          <span>桌子号</span>
          <p>{{ chessDetail.TableID }}</p>
        </dd>
        <dd>
          <span>投注时间</span>
          <p>{{ timestampToString(chessDetail.GameStartTime) }}</p>
        </dd>
        <dd>
          <span>下注金额</span>
          <p>{{ chessDetail.AllBet }}元</p>
        </dd>
        <dd>
          <span>赢</span>
          <p>{{ chessDetail.Profit > 0 ? chessDetail.Profit : "0.000" }}元</p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { gameDetail } from "../api/index";
export default {
  name: "ChessDetails",
  data() {
    return {
      chessDetail: []
    };
  },
  mounted() {
    gameDetail({
      id: this.$route.query.id,
      typeKey: this.$route.query.type
    }).then(res => {
      this.chessDetail = res.data;
      console.log(res.data);
    });
  }
};
</script>
