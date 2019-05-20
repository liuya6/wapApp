<template>
  <div class="body" v-title="$route.query.title + '走势图'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      {{ $route.query.title }}走势图
      <ul class="top_title">
        <li v-for="(item, i) in titleList" :key="'t' + i">
          <span
            :class="{ onTitle: i === titleIndex }"
            @click="changeTitle(i)"
            >{{ item }}</span
          >
        </li>
      </ul>
    </div>
    <div class="content">
      <table>
        <thead>
          <tr>
            <th>期数</th>
            <th v-for="(item, i) in periodsNum" :key="'p' + i">
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in gameList" :key="i">
            <td>{{ handleNumber(item.number) }}</td>
            <td v-for="(items, i) in periodsNum" :key="i">
              <span
                :class="{ onTrend: item.codeData[titleIndex].code === items }"
              >
                {{ items }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="canvasArr">
        <canvas
          class="canvas_item"
          v-for="(item, i) in initialArr"
          :key="i"
          width="70px"
          height="71px"
        >
        </canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { lotteryHistory } from "../api";
import { codeAndTitle } from "../common/data";
import { Toast } from "mint-ui";
export default {
  name: "GameTrend",
  data() {
    return {
      parameter: {
        typeId: this.$route.params.id,
        offset: 0,
        pageSize: 30
      },
      gameList: "",
      classify: this.$route.params.classify,
      titleIndex: 0,
      initialArr: []
    };
  },
  created() {
    lotteryHistory(this.parameter).then(res => {
      if (res.status) {
        this.gameList = res.data;
      } else {
        Toast(res.msg);
      }
    });
    this.initial();
  },
  updated() {
    this.drawCanvas();
  },
  computed: {
    periodsNum() {
      return codeAndTitle[this.classify].codeArr;
    },
    titleList() {
      return codeAndTitle[this.classify].titleArr;
    }
  },
  methods: {
    handleNumber(number) {
      return number.substr(-9);
    },
    initial() {
      //初始化canvans
      this.initialArr = [];
      for (let i = 0; i < this.parameter.pageSize - 1; i++) {
        this.initialArr.push({
          item: i
        });
      }
    },
    changeTitle(i) {
      this.titleIndex = i;
      this.drawCanvas();
    },
    drawCanvas() {
      //每次重绘页面返回顶部
      document.documentElement.scrollTop = 0;
      document.documentElement.scrollLeft = 0;
      //计算位置
      let allON = this.$el.querySelectorAll(".onTrend");
      let allCanvas = document.querySelectorAll(".canvas_item");
      let res = [];
      for (let i = 0; i < allON.length; i++) {
        let item = allON[i];
        let box = item.getBoundingClientRect();
        let top = box.top;
        let left = box.left;
        let nextItem = allON[i + 1];
        if (nextItem) {
          var nextBox = nextItem.getBoundingClientRect();
        }
        let nextLeft = nextBox.left;
        let nextTop = nextBox.top;
        let type = left > nextLeft ? 0 : 1; // 0 （ w,0 ） 1 （w， h)
        let resLeft;
        let boxWidth = left > nextLeft ? left - nextLeft : nextLeft - left;
        if (left == nextLeft) {
          resLeft = nextLeft + box.width / 2;
          type = 2;
          boxWidth = nextBox.width;
        } else {
          resLeft = left > nextLeft ? nextLeft : left;
          resLeft = resLeft + box.width / 2;
        }
        let boxHeight = 0;
        boxHeight = nextTop - top;
        boxHeight -= box.height / 2;
        let resTop = top + box.height;
        res.push({
          type,
          resLeft,
          resTop,
          boxHeight,
          boxWidth
        });
      }
      for (let i = 0; i < allCanvas.length; i++) {
        let item = allCanvas[i];
        let ctx = item.getContext("2d");
        item.height = parseInt(res[i].boxHeight);
        item.width = parseInt(res[i].boxWidth);
        let height = res[i].boxHeight;
        let width = item.getBoundingClientRect().width;
        item.style.top = res[i].resTop - 4 + "px";
        item.style.left = res[i].resLeft + "px";
        this.drawLine(ctx, width, height, res[i].type);
      }
    },
    //canvans绘制
    drawLine(ctx, w, h, type) {
      ctx.beginPath();
      let lineWidth = 1.5;
      if (type === 0) {
        ctx.moveTo(0, h - 5);
        ctx.lineTo(w - 5, 0);
      } else if (type === 1) {
        ctx.moveTo(0, 0);
        ctx.lineTo(w - 5, h - 5);
      } else {
        lineWidth = 2;
        ctx.moveTo(0, 0);
        ctx.lineTo(0, h - 5);
      }
      ctx.closePath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = "#ff102c";
      ctx.stroke();
    }
  }
};
</script>

<style scoped lang="less">
.body {
  .top {
    height: 100px;
    line-height: 100px;
    font-size: 37px;
    color: white;
    background-color: #605aa2;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;

    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
    }
    .top_title {
      display: flex;
      justify-content: flex-start;
      background-color: #e9e8f0 !important;
      overflow-x: scroll;
      color: #444;

      li {
        line-height: 80px;
        margin-right: 30px;

        span {
          display: inline-block;
          width: 100px;
          height: 50px;
          line-height: 50px;
          vertical-align: middle;
          border-radius: 10px;
          font-size: 29px;
        }

        .onTitle {
          background-color: #837ec0;
          color: white;
        }
      }

      li:first-child {
        margin-left: 30px;
      }

      li:last-child {
        padding-right: 30px;
      }
    }
  }

  .content {
    margin-top: 180px;
    table {
      width: 100%;
      thead {
        background-color: #f0efff;
        line-height: 60px;
        border-top: 1px solid #d4d1f0;

        tr {
          th {
            max-width: 10%;
            min-width: 30px;
            border-right: 1px solid #d4d1f0;
          }

          th:first-child {
            /*max-width: 20%;*/
            min-width: 150px;
          }

          th:last-child {
            border: 0;
          }
        }
      }

      tbody {
        line-height: 60px;

        tr {
          td {
            width: 100px;
            border-right: 1px solid #d4d1f0;
            color: white;
          }

          td:first-child {
            width: 130px;
            color: #3d3d3d;
          }

          td:last-child {
            border: 0;
          }
        }

        tr:nth-of-type(2n) {
          background-color: #f0efff;

          td {
            color: #f0efff !important;
          }

          td:first-child {
            color: #3d3d3d !important;
          }
        }
      }
    }

    .canvasArr {
      .canvas_item {
        position: absolute;
        z-index: 1;
      }
    }
  }
}
</style>
