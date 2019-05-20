<template>
  <div class="sscCt">
    <div v-for="(item, index) in titleList" :key="index">
      <h3>{{ item }}</h3>
      <ul>
        <li
          v-for="(codeItem, codeIndex) in codeList"
          :key="'t' + index + 'c' + codeIndex"
          @click="pickCode(index, codeItem, hasOperator)"
          :class="[
            codeSelected[index].indexOf(codeItem) >= 0 ? 'onBtn' : '',
            'row-' + setColumn(codeList)
          ]"
        >
          <span>{{ codeItem }}</span>
          <span>{{ options[codeItem].bonusProp }}</span>
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
      hasOperator: false // 是否有快捷操作
    };
  },
  computed: {
    ...mapGetters(["oldCodeList"]),
    selectNum() {
      return 1;
    },
    titleList() {
      return [
        "万千和数",
        "万百和数",
        "万十和数",
        "万个和数",
        "千百和数",
        "千十和数",
        "千个和数",
        "百十和数",
        "百个和数",
        "十个和数"
      ];
    },
    codeList() {
      return ["单", "双"];
    }
  },
  created() {
    this.initSelected();
    this.setConfig(this.config);
    if (this.oldCodeList.length > 0) {
      this.codeSelected = [...this.oldCodeList];
      this.betCount();
    }
  },
  updated() {
    this.betCount();
  },
  methods: {
    ...mapActions(["setCount", "setCode", "setConfig"]),
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
