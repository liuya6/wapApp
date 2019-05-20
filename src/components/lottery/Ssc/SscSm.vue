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
            @click="pickCode(index, codeIndex, hasOperator)"
            :class="[
              codeSelected[index].indexOf(codeIndex) >= 0 ? 'onBtn' : ''
            ]"
          >
            <p>{{ codeIndex }}</p>
            <span>赔率{{ codeItem.bonusProp }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { operatorList, codeAndTitle } from "@/common/data";
import { mapActions } from "vuex";

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
      codeSelected: [], // 已选号码,
      hasOperator: false // 是否有快捷操作
    };
  },
  computed: {
    selectNum() {
      return 1;
    },
    titleList() {
      return ["总和"];
    },
    codeList() {
      return this.options;
    }
  },
  created() {
    this.initSelected();
    this.setConfig(this.config);
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

<style></style>
