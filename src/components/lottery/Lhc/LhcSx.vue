<template>
  <div class="betSix2">
    <ul>
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
// import sixFunc from '../../common/sixFunc'
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
      sixName: "SPANM",
      codeSelected: []
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
      this.$store.dispatch("setCount", this.codeSelected.length);
    }
  }
};
</script>
