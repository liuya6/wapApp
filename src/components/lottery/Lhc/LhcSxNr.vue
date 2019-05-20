<template>
  <div class="betSix2">
    <ul v-if="isSpecial">
      <li v-for="(codeItem, codeIndex) in codeList" :key="'c' + codeIndex">
        <!--:class="['row-'+setColumn(codeList)]"-->
        <div
          @click="pickCode(0, codeItem.name, hasOperator)"
          :class="[codeSelected[0].indexOf(codeItem.name) >= 0 ? 'onBtn' : '']"
        >
          <h3>{{ codeItem.name }}</h3>
          <p>{{ zodiacNumber(codeIndex) }}</p>
          <span>赔率{{ codeItem.bonusProp }}</span>
        </div>
      </li>
    </ul>
    <ul v-else>
      <li v-for="(codeItem, codeIndex) in codeList" :key="'c' + codeIndex">
        <!--:class="['row-'+setColumn(codeList)]"-->
        <div
          @click="pickSixCode(codeItem.name)"
          :class="[codeSelected.indexOf(codeItem.name) >= 0 ? 'onBtn' : '']"
        >
          <h3>{{ codeItem.name }}</h3>
          <p>{{ zodiacNumber(codeIndex) }}</p>
          <span>赔率{{ codeItem.bonusProp }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    classify: Number,
    playData: Object,
    options: [Object, Array],
    zodiac: [Object, Array]
  },
  data() {
    return {
      config: {
        unique: false, // 号码唯一
        required: false, // 每个位置必选
        limit: [], // 号码限制,
        delimiter: " " // 分隔符
      },
      codeSelected: [],
      hasOperator: false // 是否有快捷操作
    };
  },
  computed: {
    ...mapGetters(["oldCodeList"]),
    selectNum() {
      return this.playData.selectNum;
    },
    titleList() {
      return [];
    },
    codeList() {
      return this.sortObjectByColumn(this.options, "sort");
    },
    isSpecial() {
      // 特殊
      let groupId = this.$store.getters.groupData.id;
      return groupId == 139 || groupId == 140;
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
    ...mapActions([
      "getOdds",
      "setCount",
      "setCode",
      "setPrice",
      "setCartCode"
    ]),
    zodiacNumber(index) {
      return this.zodiac[index].join(" ");
    },
    betCount() {
      // 注数统计
      let count = 0;
      if (this.isSpecial) {
        if (this.codeSelected[0].length >= this.selectNum) {
          count = this.mathCombination(
            this.codeSelected[0].length,
            this.selectNum
          );
        }
      } else {
        if (this.codeSelected.length >= this.selectNum) {
          count = this.mathCombination(
            this.codeSelected.length,
            this.selectNum
          );
        }
      }
      this.$store.dispatch("setCount", count);
    }
  }
};
</script>
