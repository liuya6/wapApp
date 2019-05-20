<template>
  <div class="sscGf">
    <div v-for="(item, index) in titleList" :key="index">
      <dl v-if="hasOperator">
        <dd
          v-for="(operatorItem, i) in operatorList"
          :key="'o' + i"
          @click="pickOperator(index, i)"
          :class="{ onBtn: operatorSelected[index] === i }"
        >
          {{ operatorItem }}
        </dd>
      </dl>
      <ul>
        <li
          v-for="(codeItem, codeIndex) in codeList"
          :key="'t' + index + 'c' + codeIndex"
          :class="['row-' + setColumn(codeList)]"
        >
          <span
            @click="pickCode(index, codeItem, hasOperator)"
            :class="[
              codeSelected[index].indexOf(codeItem) >= 0 ? 'yellow' : ''
            ]"
          >
            {{ codeItem }}
          </span>
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
      codeSelected: [], // 已选号码
      hasOperator: false // 是否有快捷操作
    };
  },
  computed: {
    ...mapGetters(["typeData", "playOptionHash", "oldCodeList"]),
    titleList() {
      return ["号码"];
    },
    codeList() {
      return ["通选"];
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

<style scoped lang="less">
.sscGf {
  width: 100%;
  height: 100%;
  background: #0e7347;
  div {
    h3 {
      width: 100%;
      background: #0e7347;
      color: #fff;
      margin-left: 0;
      border-bottom: 1px solid #22563f; /*no*/
    }
    ul {
      width: 100%;
      padding-top: 30px;
      overflow: hidden;
      border-bottom: 0;
      li {
        width: 125px !important;
        height: 125px !important;
        text-align: center;
        line-height: 125px;
        margin: auto;
        span {
          display: block;
          width: 100%;
          height: 100%;
          margin: 0;
          border: 1px solid #fff; /*no*/
          border-radius: 10px;
          line-height: 125px;
          background: #0e7347;
          font-weight: bold;
          color: #fff;
        }
      }
    }
  }
}
</style>
