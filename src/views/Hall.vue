<template>
  <div class="body" v-title="'游戏大厅'">
    <!-- 搜索框 -->
    <div class="top" style="display: none">
      <div :class="searchFlag ? 'leftSearch' : 'centerSearch'" @click="search">
        <i class="iconfont">&#xe62e;</i>
        <span>{{ initialSearch }}</span>
      </div>
      <div class="search">
        <input
          type="text"
          ref="searchInput"
          placeholder="搜索"
          v-model="searchContent"
        />
        <span class="cancel" @click="cencel">
          取消
        </span>
      </div>
    </div>
    <div class="content searchContents" v-if="searchFlag">
      <ul>
        <li>
          <i>
            <img src="../assets/img/ceshi.png" alt="" />
          </i>
          <div>
            <span>彩票</span>
            <h3>北京时时彩</h3>
          </div>
          <b class="iconfont">&#xe669;</b>
        </li>
      </ul>
    </div>
    <!-- 搜索框 end -->
    <div class="content" v-else>
      <dl class="contentTitle">
        <dd
          v-for="(item, i) in newAllGame"
          :key="i"
          @click="changeGame(item.typeKey)"
        >
          <span :class="{ onHall: item.typeKey === initialVal }">
            {{ item.name }}
          </span>
        </dd>
      </dl>
      <mt-tab-container v-model="initialVal" swipeable class="TabContent">
        <mt-tab-container-item
          v-for="(item, i) in newAllGame"
          :key="i"
          :id="item.typeKey"
        >
          <div v-if="item.typeKey === 'Lottery'" class="lottery">
            <dl>
              <dd
                v-for="(lottery, i) in designationGame(item)"
                :key="i"
                :class="{ ons: lotteryType === lottery.gameType }"
                @click="changeLottery(lottery.gameType)"
              >
                {{ lottery.gameTitle }}
              </dd>
            </dl>
            <ul>
              <li v-for="(itemOne, j) in lotteryTypeList(item.list)" :key="j">
                <div
                  @click="
                    playGame(
                      item.typeKey,
                      itemOne.link,
                      itemOne.gameId,
                      itemOne.title,
                      itemOne.classify
                    )
                  "
                >
                  <i>
                    <my-img :src="imgUrl(itemOne.img, item.typeKey)"></my-img>
                  </i>
                  <p>{{ itemOne.title }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div v-else class="other" style="background-color: #ffffff;">
            <ul>
              <li v-for="(other, j) in designationGame(item)" :key="j">
                <div
                  @click="
                    playGame(
                      item.typeKey,
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
                    <my-img :src="imgUrl(other.img, item.typeKey)"></my-img>
                  </i>
                  <p>{{ other.title }}</p>
                </div>
              </li>
            </ul>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <my-Foot class="foot"></my-Foot>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Lazyload } from "mint-ui";
export default {
  name: "hall",
  data() {
    return {
      searchFlag: false,
      initialSearch: "搜索",
      searchContent: "",
      initialVal: this.$route.query.typeKey || "Lottery",
      lotteryType: 1
    };
  },
  created() {
    this.newAllGames({});
  },
  activated() {
    if (this.$route.query.typeKey) {
      this.initialVal = this.$route.query.typeKey;
    }
    this.titleTab();
  },
  computed: {
    ...mapGetters(["newAllGame"])
  },
  watch: {
    initialVal(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.titleTab();
        });
      }
    }
  },
  methods: {
    ...mapActions(["newAllGames"]),
    ...mapMutations(["CHANGE_GAMES"]),
    search() {
      this.searchFlag = true;
      this.$refs.searchInput.focus();
      this.initialSearch = "";
    },
    cencel() {
      this.searchFlag = false;
      this.searchContent = "";
      this.initialSearch = "搜索";
    },
    changeGame(typeKey) {
      this.initialVal = typeKey;
      this.$router.replace({ name: "hall", query: { typeKey: typeKey } });
    },
    designationGame(game) {
      if (game.typeKey === this.initialVal) {
        return game.list;
      }
    },
    lotteryTypeList(game) {
      for (let i = 0; i < game.length; i++) {
        let listOne = game[i];
        if (listOne.gameType === this.lotteryType) {
          return listOne.gameData;
        }
      }
    },
    changeLottery(type) {
      this.lotteryType = type;
    },
    titleTab() {
      let initialWidth = document.body.clientWidth;
      let onElement = document.querySelectorAll(".onHall")[0];
      if (!onElement) {
        return false;
      }
      let nextElement = onElement.parentNode.nextSibling;
      let lastElement = onElement.parentNode.previousSibling;
      let nextElementWidth = 0;
      let lastElementWidth = 0;
      let nextOnBoxRight = 0;
      let lastOnBoxLeft = 0;
      if (nextElement) {
        nextElementWidth = nextElement.getBoundingClientRect().width;
        nextOnBoxRight = nextElement.getBoundingClientRect().right;
      }
      if (lastElement) {
        lastElementWidth = lastElement.getBoundingClientRect().width;
        lastOnBoxLeft = lastElement.getBoundingClientRect().left;
      }
      let onBoxRight = onElement.getBoundingClientRect().right;
      let onBoxLeft = onElement.getBoundingClientRect().left;
      let contentTitle = document.querySelectorAll(".contentTitle")[0];
      let contentTitleChild = contentTitle.childNodes[0];
      let initialLeft = window.getComputedStyle(contentTitleChild, null)
        .marginLeft;
      let startLeft = contentTitle.scrollLeft;
      if (onBoxRight > initialWidth) {
        let Difference = onBoxRight - initialWidth;
        contentTitle.scrollLeft =
          startLeft +
          (Difference + parseInt(initialLeft)) +
          parseInt(nextElementWidth);
      } else if (nextOnBoxRight > initialWidth) {
        let Difference = nextOnBoxRight - initialWidth;
        contentTitle.scrollLeft =
          startLeft + (Difference + parseInt(initialLeft));
      } else if (lastOnBoxLeft < 0) {
        contentTitle.scrollLeft =
          startLeft + lastOnBoxLeft - parseInt(initialLeft);
      } else if (onBoxRight <= 0 || parseInt(onBoxLeft) <= 0) {
        contentTitle.scrollLeft =
          startLeft +
          (onBoxLeft - parseInt(initialLeft)) -
          parseInt(lastElementWidth);
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "electronicgames") {
      return next(vm => {
        vm.$el.className = "body animated slideInLeft";
      });
    }
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.$el.className = "body";
    return next();
  }
};
</script>
<style scoped lang="less">
.body {
  height: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  -o-flex-direction: column;
  flex-direction: column;
  box-pack: space-between;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  -ms-justify-content: space-between;
  -o-justify-content: space-between;
  justify-content: space-between;

  .top {
    background-color: #f6f6f6;
    height: 80px;
    padding-top: 10px;
    position: relative;

    .centerSearch {
      width: 96%;
      height: 70px;
      color: #999999;
      background-color: #ffffff;
      z-index: 1;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      line-height: 70px;
      border-radius: 10px;

      i {
        font-size: 35px;
        font-weight: bold;
      }

      span {
        font-size: 30px;
      }
    }

    .leftSearch {
      width: 50px;
      height: 70px;
      color: #999999;
      background-color: #ffffff;
      z-index: 1;
      position: absolute;
      top: 10px;
      left: 30px;
      line-height: 70px;

      i {
        font-size: 35px;
      }

      span {
        font-size: 30px;
      }
    }

    /*.search {*/
    /*  width: 85%;*/
    /*  height: 70px;*/
    /*  line-height: 70px;*/
    /*  margin-left: 20px;*/
    /*  background-color: #ffffff;*/
    /*  position: relative;*/
    /*  border-radius: 10px;*/

    /*  input {*/
    /*    width: 80%;*/
    /*    height: 70px;*/
    /*    line-height: 70px;*/
    /*    border: 0;*/
    /*    font-size: 30px;*/
    /*  }*/

    /*  .cancel {*/
    /*    font-size: 32px;*/
    /*    background-color: #f6f6f6;*/
    /*    color: #0d9e13;*/
    /*    position: absolute;*/
    /*    right: -75px;*/
    /*    top: 0;*/
    /*  }*/
    /*}*/
  }

  .content {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow-y: scroll;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
    box-pack: space-between;
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    -ms-justify-content: space-between;
    -o-justify-content: space-between;
    justify-content: space-between;

    .contentTitle {
      /*display: flex;*/
      /*flex-wrap: nowrap;*/
      /*overflow-x: scroll;*/
      height: 80px;
      font-size: 30px;
      background-color: #f6f6f6;

      dd {
        float: left;
        width: 25%;
        height: 80px;
        line-height: 80px;
        white-space: nowrap;
        text-align: center;

        span {
          display: inline-block;
          box-sizing: border-box;
          height: 80px;
          color: #666;
        }

        .onHall {
          color: #dc001a;
          position: relative;
        }

        .onHall:after {
          content: "";
          position: absolute;
          left: 5px;
          top: auto;
          bottom: 0;
          right: auto;
          height: 6px;
          width: 50px;
          background-color: #dc001a;
        }
      }
    }

    .TabContent {
      -webkit-box-flex: 1;
      -moz-box-flex: 1;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      overflow-y: scroll;
      overflow-scrolling: touch;
      -webkit-overflow-scrolling: touch;

      .lottery {
        width: 100%;
        height: 100%;
        overflow: hidden;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: box;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;

        dl {
          overflow: hidden;
          width: 20%;
          height: 100%;
          background-color: #f6f6f6;
          float: left;

          dd {
            text-align: center;
            height: 113px;
            line-height: 113px;
            overflow: hidden;
            font-size: 30px;
            color: #666;
          }

          .ons {
            background-color: #ffffff;
          }
        }

        ul {
          width: 80%;
          float: right;
          overflow-y: scroll;

          li {
            float: left;
            overflow: hidden;
            width: 33.333%;
            text-align: center;
            margin: 20px 0;

            div {
              i {
                display: inline-block;
                width: 120px;
                height: 120px;
              }

              p {
                font-size: 28px;
                color: #666;
              }
            }
          }
        }
        ::-webkit-scrollbar {
          display: none;
        }
      }

      .other {
        ul {
          overflow-y: scroll;

          li {
            float: left;
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
  }

  /*.searchContents {*/
  /*  ul {*/
  /*    li {*/
  /*      border-bottom: 1px solid silver; !*no*!*/
  /*      overflow: hidden;*/
  /*      position: relative;*/

  /*      i {*/
  /*        float: left;*/
  /*        width: 120px;*/
  /*        height: 120px;*/
  /*        border-radius: 50%;*/
  /*        overflow: hidden;*/
  /*        margin: 20px 0 20px 20px;*/
  /*      }*/

  /*      div {*/
  /*        float: left;*/
  /*        text-align: left;*/
  /*        margin-left: 20px;*/
  /*        font-size: 28px;*/

  /*        span {*/
  /*          display: block;*/
  /*          margin-top: 20px;*/
  /*          line-height: 50px;*/
  /*        }*/

  /*        h3 {*/
  /*          font-size: 48px;*/
  /*        }*/
  /*      }*/
  /*    }*/

  /*    b {*/
  /*      position: absolute;*/
  /*      right: 20px;*/
  /*      top: 66px;*/
  /*    }*/
  /*  }*/
  /*}*/
  .foot {
    position: static !important;
  }
}
</style>
