<style scoped lang="less">
.betSix {
  ul {
    li {
      p {
        margin-top: 0;
        line-height: 125px;
      }
    }
  }
}
</style>
<template>
  <div class="betSix">
    <ul v-if="isSpecial">
      <li
        v-for="(codeItem, codeIndex) in codeList"
        :key="'c' + codeIndex"
        :class="['row-' + setColumn(codeList)]"
      >
        <div
          @click="pickCode(0, codeItem, hasOperator)"
          :class="[
            getColor(codeItem),
            codeSelected[0].indexOf(codeItem) >= 0
              ? 'onBtn-' + getColor(codeItem)
              : ''
          ]"
        >
          <p>{{ codeItem }}</p>
          <!--<span>赔率{{codeItem.bonusProp || playData.bonusProp}}</span>-->
        </div>
      </li>
    </ul>
    <ul v-else>
      <li
        v-for="(codeItem, codeIndex) in codeList"
        :key="'c' + codeIndex"
        :class="['row-' + setColumn(codeList)]"
      >
        <div
          @click="pickSixCode(codeItem)"
          :class="[
            getColor(codeItem),
            codeSelected.indexOf(codeItem) >= 0
              ? 'onBtn-' + getColor(codeItem)
              : ''
          ]"
        >
          <p>{{ codeItem }}</p>
          <!--<span>赔率{{codeItem.bonusProp || playData.bonusProp}}</span>-->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { lhcCodeColor } from "@/common/data";
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
      lhcCodeColor,
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
      let arr = [];
      for (let i = 1; i <= 49; i++) {
        if (i < 10) {
          arr.push("0" + i);
        } else {
          arr.push(i);
        }
      }
      return this.sortArray(arr);
    },
    isSpecial() {
      // 特殊
      let groupId = this.$store.getters.groupData.id;
      return groupId == 139 || groupId == 140;
    }
  },
  watch: {
    "playData.id": {
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          this.initSelected();
        }
      }
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
    ...mapActions([
      "getOdds",
      "setCount",
      "setCode",
      "setPrice",
      "setCartCode"
    ]),
    getColor(code) {
      let color = "";
      code = code + "";
      if (lhcCodeColor.red.indexOf(code) >= 0) {
        color = "red";
      } else if (lhcCodeColor.blue.indexOf(code) >= 0) {
        color = "blue";
      } else if (lhcCodeColor.green.indexOf(code) >= 0) {
        color = "green";
      }
      return color;
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
