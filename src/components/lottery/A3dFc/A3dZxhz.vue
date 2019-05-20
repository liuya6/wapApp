<template>
  <div class="betSix">
    <div v-for="(item, index) in titleList" :key="index">
      <h3>{{ item }}</h3>
      <ul>
        <li
          v-for="(codeItem, codeIndex) in codeList"
          :key="'t' + index + 'c' + codeIndex"
          :class="['row-' + setColumn(codeList)]"
        >
          <div
            @click="pickCode(index, codeItem, hasOperator)"
            :class="[codeSelected[index].indexOf(codeItem) >= 0 ? 'onBtn' : '']"
          >
            <p>{{ codeItem }}</p>
            <span>赔率{{ codeItem.bonusProp }}</span>
          </div>
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
        delimiter: "," // 分隔符
      },
      codeSelected: [], // 已选号码
      hasOperator: false // 是否有快捷操作
    };
  },
  computed: {
    ...mapGetters(["oldCodeList"]),
    selectNum() {
      return 1;
      // return 0;
    },
    titleList() {
      return ["和值"];
    },
    codeList() {
      let arr = [];
      for (let i = 1; i <= 26; i++) {
        arr.push(i);
      }
      return arr;
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
      let countArr = [
        "1",
        "2",
        "2",
        "4",
        "5",
        "6",
        "8",
        "10",
        "11",
        "13",
        "14",
        "14",
        "15",
        "15",
        "14",
        "14",
        "13",
        "11",
        "10",
        "8",
        "6",
        "5",
        "4",
        "2",
        "2",
        "1"
      ];
      let count = 0;
      for (let i in this.codeSelected) {
        for (let j in this.codeSelected[i]) {
          count += parseInt(countArr[this.codeSelected[i][j] - 1]);
        }
      }
      this.$store.dispatch("setCount", count);
    }
  }
};
</script>

<style></style>
