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
            :class="[codeSelected[index].indexOf(codeItem) >= 0 ? 'onBtn' : '']"
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
        unique: false, // 号码唯一
        required: false, // 每个位置必选
        limit: [], // 号码限制,
        delimiter: " " // 分隔符
      },
      codeSelected: [], // 已选号码
      hasOperator: true, // 是否有快捷操作
      operatorList, // 快捷操作
      operatorSelected: [] // 已选操作
    };
  },
  computed: {
    ...mapGetters(["oldCodeList"]),
    selectNum() {
      return 3;
    },
    titleList() {
      return ["任选三"];
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
      // 注数统计
      let count = 0;
      let len = 0;
      for (let i in this.codeSelected) {
        len += this.codeSelected[i].length;
      }
      if (len >= this.selectNum) {
        count = this.mathCombination(len, this.selectNum);
      }
      this.$store.dispatch("setCount", count);
    }
  }
};
</script>
