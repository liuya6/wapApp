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
            <p style="font-weight: bold">{{ codeIndex }}</p>
            <span>{{ codeItem.bonusProp }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!--<div class="sscCt">-->
  <!--<div v-for="(item,index) in titleList"-->
  <!--:key="index">-->
  <!--<h3>{{item}}</h3>-->
  <!--<ul>-->
  <!--<li v-for="(codeItem, codeIndex) in codeList"-->
  <!--:key="'t' + index + 'c' + codeIndex"-->
  <!--@click="pickCode(index, codeIndex, hasOperator)"-->
  <!--:class="[-->
  <!--codeSelected[index].indexOf(codeIndex) >= 0 ? 'onBtn': '',-->
  <!--'row-'+setColumn(codeList),-->
  <!--]"-->
  <!--&gt;-->
  <!--<span>{{codeIndex}}</span>-->
  <!--<span>{{codeItem.bonusProp}}</span>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--</div>-->
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
      codeSelected: [], // 已选号码,
      hasOperator: false // 是否有快捷操作
    };
  },
  computed: {
    ...mapGetters(["oldCodeList"]),
    selectNum() {
      return 1;
    },
    titleList() {
      return ["选择"];
    },
    codeList() {
      return this.options;
    }
  },
  created() {
    this.initSelected();
    // this.betCount();
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
      for (let i in this.codeSelected) {
        count += this.codeSelected[i].length;
      }
      this.$store.dispatch("setCount", count);
    }
  }
};
</script>
