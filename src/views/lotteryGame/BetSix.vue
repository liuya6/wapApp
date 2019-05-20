<template>
  <div>
    <div class="container">
      <keep-alive>
        <component
          :is="childTemplate"
          :classify="lotteryData.classify"
          :play-data="playData"
          :options="playData.options"
          :zodiac="shengXiaoNumber"
          ref="childTemplate"
        ></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { sixZodiacNumber } from "../../api";

const LhcXm = () =>
  import(/* webpackChunkName:'Lhc' */ "@/components/lottery/Lhc/LhcXm");
const LhcXmNr = () =>
  import(/* webpackChunkName:'Lhc' */ "@/components/lottery/Lhc/LhcXmNr");
const LhcQt = () =>
  import(/* webpackChunkName:'Lhc' */ "@/components/lottery/Lhc/LhcQt");
const LhcQtLw = () =>
  import(/* webpackChunkName:'Lhc' */ "@/components/lottery/Lhc/LhcQtLw");
const LhcSx = () =>
  import(/* webpackChunkName:'Lhc' */ "@/components/lottery/Lhc/LhcSx");
const LhcSxNr = () =>
  import(/* webpackChunkName:'Lhc' */ "@/components/lottery/Lhc/LhcSxNr");
const PcddAll = () =>
  import(/* webpackChunkName:'Lhc' */ "@/components/lottery/Xy28/PcddAll");

const lhcObj = {
  LhcXm,
  LhcQt,
  LhcSx,
  LhcXmNr,
  LhcSxNr,
  LhcQtLw
};

const xy28Obj = {
  PcddAll
};
export default {
  name: "BetSix",
  components: {
    ...lhcObj,
    ...xy28Obj
  },
  props: {
    lotteryData: Object,
    playData: Object
  },
  data() {
    return {
      zodiacNumber: []
    };
  },
  computed: {
    shengXiaoNumber() {
      return this.zodiacNumber.shengXiaoNumber;
    },
    childTemplate() {
      console.log(
        "\\lottery\\" + this.playData.playedTpl,
        "-childTemplate-BetSix"
      );
      return this.playData.playedTpl;
    }
  },
  created() {
    sixZodiacNumber().then(res => {
      if (res.status) {
        this.zodiacNumber = res.data;
      }
    });
  },
  updated() {},
  methods: {}
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
}
</style>
