<template>
  <div class="sscCt">
    <div v-for="(item, index) in titleList" :key="index">
      <ul>
        <li
          v-for="(codeItem, codeIndex) in codeList"
          :key="'t' + index + 'c' + codeIndex"
          @click="pickCode(index, codeIndex, hasOperator)"
          :class="[
            codeSelected[index].indexOf(codeIndex) >= 0 ? 'yellow' : '',
            'row-' + setColumn(codeList)
          ]"
        >
          <span style="font-weight: bold">{{ codeIndex }}</span>
          <span>赔率{{ codeItem.bonusProp }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    classify: Number,
    playData: Object,
    options: [Object, Array]
  },
  data() {
    return {
      config: {
        unique: false, // 号码唯一
        required: false, // 每个位置必选
        limit: [], // 号码限制,
        delimiter: " " // 分隔符
      },
      codeSelected: [], // 已选号码
      hasOperator: false // 是否有快捷操作
    };
  },
  computed: {
    ...mapGetters(["oldCodeList"]),
    selectNum() {
      return 1;
    },
    titleList() {
      return ["选项"];
    },
    codeList() {
      return this.options;
    }
  },
  created() {
    this.initSelected();
    if (this.oldCodeList.length > 0) {
      this.codeSelected = [...this.oldCodeList];
      this.betCount();
    }
  },
  updated() {
    this.betCount();
  },
  methods: {
    ...mapActions(["setCount", "setCode"]),
    betCount() {
      let count = 0;
      for (let i in this.codeSelected) {
        count += this.codeSelected[i].length;
      }
      this.$store.dispatch("setCount", count);
    }
  }
};
</script>
<style scoped lang="less">
.sscCt {
  height: 100%;
  padding-bottom: 100px !important;
  background-color: #0e7347;
  div {
    h3 {
      color: #fff;
      border-bottom: 1px solid #22563f; /*no*/
    }
    ul {
      width: 564px;
      padding-top: 30px;
      margin: auto;
      overflow: hidden;
      li {
        width: 125px !important;
        height: 124px !important;
        text-align: center;
        border: 1px solid #fff; /*no*/
        border-radius: 10px;
        margin-right: 21px;
        margin-bottom: 20px;
        transition: 0.3s;
        overflow: hidden;
        background-color: #0e7347;
        box-sizing: border-box;
        span {
          width: 100%;
          display: block;
        }
        span:first-child {
          color: #fff;
          line-height: 47px;
          margin-top: 13px;
          font-size: 34px;
          font-weight: bold;
        }

        span:last-child {
          color: #fff;
          line-height: 50px;
          font-size: 26px;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      li:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}
</style>
