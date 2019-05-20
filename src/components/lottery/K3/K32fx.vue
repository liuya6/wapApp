<style lang="less" scoped>
.betSix {
  width: 100%;
  height: 100%;
  background: #0e7347;
  div {
    h3 {
      background: #0e7347;
      color: #fff;
      border-top: 0;
      border-bottom: 1px solid #22563f; /*no*/
    }
    ul {
      padding-top: 30px;
      li {
        p {
          font-size: 40px;
          color: #fff;
        }
        span {
          font-size: 20px;
          color: #fff;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
<template>
  <div class="betSix">
    <div v-for="(item, index) in titleList" :key="index">
      <ul>
        <li
          v-for="(codeItem, codeIndex) in codeList"
          :key="'t' + index + 'c' + codeIndex"
          :class="['row-' + setColumn(codeList)]"
        >
          <div
            @click="pickCode(index, codeItem, hasOperator)"
            :class="[
              codeSelected[index].indexOf(codeItem) >= 0 ? 'yellow' : ''
            ]"
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
      return ["号码"];
    },
    codeList() {
      return ["11*", "22*", "33*", "44*", "55*", "66*"];
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
    ...mapActions(["setCount", "setCode"]),
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
