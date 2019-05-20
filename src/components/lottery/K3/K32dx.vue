<template>
  <div class="sscGf">
    <div v-for="(item, index) in titleList" :key="index">
      <h3>{{ item }}</h3>
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
          v-for="(codeItem, codeIndex) in codeList[index]"
          :key="'t' + index + 'c' + codeIndex"
          :class="['row-' + setColumn(codeList[index])]"
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
        unique: true, // 号码唯一
        required: true, // 每个位置必选
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
      return ["二同号", "不同号"];
    },
    codeList() {
      return [
        ["11", "22", "33", "44", "55", "66"],
        ["1", "2", "3", "4", "5", "6"]
      ];
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
    pickCode(index, item, autoSet = false) {
      let _newValue = [...this.codeSelected[index]];
      let _i = _newValue.indexOf(item); // 判断是否已选中
      if (_i >= 0) {
        _newValue.splice(_i, 1);
      } else {
        _newValue.push(item);
      }
      if (this.config.unique) {
        // 号码唯一
        for (let i = 0; i < this.codeSelected.length; i++) {
          if (i === index) {
            continue;
          } else {
            if (i === 0) {
              item = item * 11;
            } else {
              item = item / 11;
            }
            let _j = this.codeSelected[i].indexOf(item.toString());
            if (_j >= 0) {
              this.codeSelected[i].splice(_j, 1);
            }
          }
        }
      }
      if (this.config.limit) {
        // 限制号码个数
        if (
          this.config.limit[index] > 0 &&
          _newValue.length > this.config.limit[index]
        ) {
          _newValue.splice(this.config.limit[index] - 1, 1);
        }
      }
      this.$set(this.codeSelected, index, _newValue);
      if (autoSet) {
        this.autoSetOperatorSelected(index, _newValue);
      }
    },
    betCount() {
      let count = 1;
      for (let i in this.codeSelected) {
        count *= this.codeSelected[i].length;
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
      color: #fff;
    }
    ul {
      padding-top: 74px;
      overflow: hidden;
      border-bottom: 0;
      li {
        color: #fff;

        span {
          display: block;
          width: 125px;
          height: 125px;
          line-height: 125px;
          background: #0e7347;
          border: 1px solid #fff; /*no*/
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
