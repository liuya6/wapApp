<style scoped lang="less">
.Nn {
  span {
    display: block;
    font-weight: bold;
    height: 50px;
    line-height: 50px;
    padding-top: 30px;
    margin-bottom: 10px;
    margin-right: 0 !important;
  }
  p {
    line-height: 20px;
    color: #999;
    font-size: 24px;
    padding-bottom: 20px;
  }
}
</style>
<template>
  <div class="sscCt">
    <div v-for="(item, index) in titleList" :key="index">
      <h3>{{ item }}</h3>
      <ul>
        <li
          v-for="(codeItem, codeIndex) in codeList"
          :key="'t' + index + 'c' + codeIndex"
          @click="pickCode(index, codeIndex, hasOperator)"
          :class="[
            codeSelected[index].indexOf(codeIndex) >= 0 ? 'onBtn' : '',
            // 'row-'+setColumn(codeList),
            'row-4 Nn'
          ]"
        >
          <span>{{ codeIndex }}</span>
          <p>{{ codeItem.bonusProp }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { operatorList, codeAndTitle } from "@/common/data";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SscCtNn",
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
    },
    titleList() {
      return [this.playData.name];
    },
    codeList() {
      return this.options;
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
