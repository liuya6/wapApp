<template>
  <div class="sscCt">
    <div v-for="(item, index) in titleList" :key="index">
      <ul>
        <li
          v-for="(codeItem, codeIndex) in codeList"
          :key="'t' + index + 'c' + codeIndex"
          @click="pickCode(index, codeItem, hasOperator)"
          :class="[
            codeSelected[index].indexOf(codeItem) >= 0 ? 'yellow' : '',
            'row-' + setColumn(codeList)
          ]"
        >
          <span>{{ codeItem }}</span>
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
      return ["号码"];
    },
    codeList() {
      return ["通选"];
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
  width: 100%;
  height: 100%;
  background: #0e7347;
  div:first-child {
    h3 {
      border-top: 0px; /*no*/
      background: #0e7347;
      color: #fff;
      border-bottom: 1px solid #22563f;
    }
    ul {
      width: 563px;
      padding-top: 30px;
      margin: auto;
      overflow: hidden;
      li {
        width: 125px !important;
        height: 125px !important;
        margin: auto;
        border: 1px solid #fff; /*no*/
        border-radius: 10px !important;
        text-align: center;
        background-color: #0e7347;
        line-height: 125px;
        span:first-child {
          display: block;
          font-weight: bold;
          color: #fff;
          margin-right: 0;
          font-size: 0.6rem;
        }
      }
    }
  }
}
</style>
