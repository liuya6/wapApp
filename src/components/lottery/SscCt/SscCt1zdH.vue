<template>
  <div class="sscCt">
    <div v-for="(item, index) in titleList" :key="index">
      <h3>{{ item }}</h3>
      <ul>
        <li
          v-for="(codeItem, codeIndex) in codeList[index]"
          :key="'t' + index + 'c' + codeIndex"
          @click="pickCode(index, codeItem, hasOperator)"
          :class="[
            codeSelected[index].indexOf(codeItem) >= 0 ? 'onBtn' : '',
            'row-' + setColumn(codeList[index])
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
      let title = [this.playData.name];
      return title.concat(["总和、龙虎和"]);
    },
    codeList() {
      let number = [];
      for (let i = 0; i < 10; i++) {
        number.push(i);
      }
      let codeList = [];
      for (let i = 0; i < this.titleList.length; i++) {
        if (i < this.titleList.length - 1) {
          codeList[i] = number.concat(["大", "小", "单", "双", "质", "合"]);
        } else {
          codeList[i] = ["和大", "和小", "和单", "和双", "龙", "虎", "和"];
        }
      }
      return codeList;
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
