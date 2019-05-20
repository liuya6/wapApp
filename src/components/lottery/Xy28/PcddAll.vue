<template>
  <div v-if="playData.id !== 345" key="template-1">
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
  </div>
  <div v-else key="template-2">
    <div class="betSix">
      <ul>
        <li
          v-for="(codeItem, codeIndex) in codeList"
          :key="'c' + codeIndex"
          :class="['row-' + setColumn(codeList)]"
        >
          <div
            @click="pickCode(0, codeItem, hasOperator)"
            :class="[codeSelected[0].indexOf(codeItem) >= 0 ? 'onBtn' : '']"
          >
            <p>{{ codeItem }}</p>
            <span>赔率{{ playData.bonusProp }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
      sixName: "pcdd",
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
      // return ["第一个号", "第二个号", "第三个号"];
    },
    codeList() {
      let codeList = [];
      if (this.playData.id !== 345) {
        // item.name
        codeList = this.sortObjectByColumn(this.options, "sort");
      } else {
        let arr = [];
        for (let i = 1; i <= 27; i++) {
          arr.push(i);
        }
        // item
        codeList = this.sortArray(arr);
      }
      return codeList;
    }
    // codeNumberList() {
    //   let arr = [];
    //   for (let i = 1; i <= 27; i++) {
    //     arr.push(i);
    //   }
    //   return arr;
    // }
  },
  watch: {
    "playData.id"(newValue, oldValue) {
      if (newValue != oldValue) {
        console.log(newValue, oldValue, 3333333332);
        this.initSelected();
      }
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
      "clearCartCode",
      "setCartCode"
    ]),
    betCount() {
      // 注数统计
      if (this.playData.id === 345) {
        if (this.codeSelected[0].length === this.selectNum) {
          return this.$store.dispatch("setCount", 1);
        }
        return this.$store.dispatch("setCount", 0);
      } else {
        this.$store.dispatch("setCount", this.codeSelected.length);
      }
    },
    betCodeSplice(index) {
      // 单注号码
      this.setCode(this.codeSelected[index]);
    },
    /* 加入购物车 */
    cartCodeSplice() {
      let cartCode = [];
      let temp = {};
      if (this.playData.id === 345) {
        this.setCode(this.codeSelected.join(this.delimiter));
        this.getOdds({ delimiter: this.delimiter });
        temp = { ...this.cartSixCodeSplice(), name: this.sixName || "Lhc-vue" };
        cartCode.push(temp);
      } else {
        for (let i = 0; i < this.codeSelected.length; i++) {
          this.betCodeSplice(i);
          this.$store.dispatch("setCount", 1);
          this.getOdds({ delimiter: this.delimiter });
          temp = {
            ...this.cartSixCodeSplice(),
            name: this.sixName || "Lhc-vue"
          };
          cartCode.push(temp);
        }
      }
      this.setCartCode(cartCode);
      this.betCount();
    }
  }
};
</script>
