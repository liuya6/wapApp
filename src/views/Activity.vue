<style scoped lang="less">
.body {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  .top {
    height: 100px;
    background-color: #605aa2;
    line-height: 100px;
    text-align: center;
    color: white;
    font-size: 38px;
    width: 100%;
  }

  .content {
    flex: 1;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background: #f6f6f6;
    padding-bottom: 100px;

    ul {
      li:first-child {
        margin-top: 15px;
      }

      li {
        background: #fff;
        border: 1px solid #dddddd;
        width: 94%;
        overflow: hidden;
        margin: 0 auto 10px;
        box-sizing: border-box;
        padding: 0;
        border-radius: 5px;
        .imgBox {
          width: 97%;
          padding-top: 10px;
          margin: 0 auto 5px;
          overflow: hidden;
          img {
            max-width: 100%;
            height: 220px;
          }
        }
        .activityDetail {
          padding-top: 10px;
          overflow: hidden;
          .application {
            width: 97%;
            height: 50px;
            display: block;
            line-height: 50px;
            margin: 20px auto;
            background: red;
            color: #fff;
            border: 0;
            outline: none;
          }
          .gray {
            background: gray;
          }
        }
      }

      .hide {
        display: none;
      }

      .show {
        display: block;
      }
    }
  }
}
</style>

<template>
  <div class="body" v-title="'活动列表'">
    <div class="top shenLan">活动</div>
    <div class="content">
      <ul>
        <li
          class="list-pic"
          v-for="(item, i) in activityArr"
          :key="i"
          @click="handleShow(i)"
        >
          <div class="imgBox">
            <a :href="'#' + i">
              <img v-lazy="item.image" :alt="item.title" :id="i" />
            </a>
          </div>
          <template>
            <div
              class="activityDetail"
              @click="stop"
              :class="[i === showTarget ? 'show' : 'hide']"
            >
              <div v-html="item.content"></div>
              <button
                class="application"
                :class="[num == i ? 'gray' : '']"
                @click="getApplication(item.id, i)"
              >
                申请活动
              </button>
            </div>
          </template>
        </li>
      </ul>
    </div>
    <my-Foot></my-Foot>
  </div>
</template>

<script>
import { activity, appllyActivity } from "../api";
import { Toast } from "mint-ui";
export default {
  name: "Activity",
  data() {
    return {
      activityArr: [],
      showObj: {},
      showTarget: "",
      num: -1
    };
  },
  mounted() {
    activity().then(res => {
      console.log(res.data);
      this.activityArr = res.data;
      for (let key in this.activityArr) {
        this.showObj[key] = false;
      }
    });
  },

  methods: {
    handleShow(index) {
      this.showTarget = this.showTarget === index ? "" : index;
    },
    stop(event) {
      event.stopPropagation();
    },
    getApplication(id, index) {
      console.log(id);
      appllyActivity({ articleId: id })
        .then(res => {
          console.log(res);
          if (!res.status) {
            Toast(res.msg);
            this.num = index;
            console.log(this.num);
          }
        })
        .catch(err => {
          console.log("活动申请失败", err);
        });
    }
  }
};
</script>
