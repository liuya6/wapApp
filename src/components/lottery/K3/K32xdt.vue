<template>
  <div class="sscGf">
    <div v-for="(item, index) in titleList" :key="index">
      <h3>{{ item }}</h3>
      <dl v-if="hasOperator">
        <dd
          v-for="(operatorItem, i) in operatorList"
          :key="'o' + i"
          @click="pickOperator(index, i)"
          :class="{ onBtn: operatorSelected[index] === i }"
        >
          {{ operatorItem }}
        </dd>
      </dl>
      <ul>
        <li
          v-for="(codeItem, codeIndex) in codeList"
          :key="'t' + index + 'c' + codeIndex"
          :class="['row-' + setColumn(codeList)]"
        >
          <span
            @click="pickCode(index, codeItem, hasOperator)"
            :class="[
              codeSelected[index].indexOf(codeItem) >= 0 ? 'yellow' : ''
            ]"
          >
            {{ codeItem }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { operatorList, codeAndTitle } from "@/common/data";
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
        unique: true, // 号码唯一
        required: true, // 每个位置必选
        limit: [1, 0], // 号码限制,
        delimiter: " " // 分隔符
      },
      codeSelected: [], // 已选号码
      hasOperator: false, // 是否有快捷操作
      operatorList, // 快捷操作
      operatorSelected: [] // 已选操作
    };
  },
  computed: {
    ...mapGetters(["oldCodeList"]),
    selectNum() {
      return 2;
    },
    titleList() {
      return ["胆码", "拖码"];
    },
    codeList() {
      return codeAndTitle[this.classify].codeArr;
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
        if (this.config.required && this.codeSelected[i].length === 0) {
          // 必填未选
          return this.$store.dispatch("setCount", count);
        }
      }
      let dLen = this.codeSelected[0].length; // 胆码
      let tLen = this.codeSelected[1].length; // 拖码
      count = this.mathCombination(tLen, this.selectNum - dLen);
      this.$store.dispatch("setCount", count);
    }
  }
};
</script>
<style scoped lang="less">
.sscGf {
  width: 100%;
  height: 100%;
  background: #0e7347;
  div {
    h3 {
      background: #0e7347;
      color: #fff;
    }
    ul {
      padding-top: 74px;
      border-bottom: 0px;
      li {
        span {
          width: 125px;
          height: 125px;
          line-height: 125px;
          background: #0e7347;
          border: 1px solid #fff; /*no*/
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
