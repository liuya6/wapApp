<style scoped lang="less">
.betSix {
  ul {
    li {
      p {
        font-size: 30px;
        font-weight: bold;
      }
      span {
        font-size: 20px;
      }
    }
  }
}
</style>
<template>
  <div class="betSix">
    <ul>
      <li
        v-for="(codeItem, codeIndex) in codeList"
        :key="'c' + codeIndex"
        :class="['row-' + setColumn(codeList)]"
      >
        <div
          @click="pickSixCode(codeItem.name)"
          :class="[codeSelected.indexOf(codeItem.name) >= 0 ? 'onBtn' : '']"
        >
          <p>{{ codeItem.name }}</p>
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
      sixName: "SPBSOE",
      codeSelected: [] // 已选号码,
    };
  },
  computed: {
    ...mapGetters(["oldCodeList"]),
    selectNum() {
      return 1;
    },
    titleList() {
      return [];
    },
    codeList() {
      return this.sortObjectByColumn(this.options, "sort");
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
    betCount() {
      // 注数统计
      let count = this.codeSelected.length;
      this.$store.dispatch("setCount", count);
    }
  }
};
</script>
