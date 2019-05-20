<template>
  <div>
    <div class="container">
      <keep-alive>
        <component
          :is="childTemplate"
          :classify="lotteryData.classify"
          :play-data="playData"
          :options="playData.options"
          ref="childTemplate"
        ></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
const Ssc = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/Ssc");
const SscSm = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/SscSm");
const Ssc3xQ3f = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/Ssc3xQ3f");
const Ssc3xH3f = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/Ssc3xH3f");
const SscTsH3 = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/SscTsH3");
const SscTsQ3 = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/SscTsQ3");
const SscZ3Q3 = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/SscZ3Q3");
const SscZ3Q6 = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/SscZ3Q6");
const SscZ3hHz = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/SscZ3hHz");
const SscZ3qHz = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/SscZ3qHz");
const Ssc2xQ2f = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/Ssc2xQ2f");
const SscZ2F2 = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/SscZ2F2");
const Ssc5xDw = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/Ssc5xDw");
const Ssc5xQ3 = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/Ssc5xQ3");
const Ssc5x3mBdw = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/Ssc5x3mBdw");
const Ssc5x2mBdw = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/Ssc5x2mBdw");
const Ssc5x1m = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/Ssc5x1m");
const SscDxdsQ2 = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/SscDxdsQ2");
const SscDxdsH2 = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/SscDxdsH2");
const SscDxQ4f = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/SscDxQ4f");
const SscDxH4f = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/SscDxH4f");
const Ssc11x5Dwd = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/Ssc11x5Dwd");
const Ssc11x5Bdw = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/Ssc11x5Bdw");
const Ssc11x5Bdwz = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/Ssc11x5Bdwz");
const Ssc11x5Bdwh = () =>
  import(/* webpackChunkName:'Ssc' */ "@/components/lottery/Ssc/Ssc11x5Bdwh");
// 11选5
const A115Rx1 = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Rx1");
const A115Rx2 = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Rx2");
const A115Rx3 = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Rx3");
const A115Rx4 = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Rx4");
const A115Rx5 = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Rx5");
const A115Rx6 = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Rx6");
const A115Rx7 = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Rx7");
const A115Rx8 = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Rx8");
const A115Q2Zhi = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Q2Zhi");
const A115Q2Zu = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Q2Zu");
const A115Rxtd2 = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Rxtd2");
const A115Q3Zhi = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Q3Zhi");
const A115Q3Zu = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Q3Zu");
const A115Rxtd3 = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Rxtd3");
const A115Rxtd4 = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Rxtd4");
const A115Rxtd5 = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Rxtd5");
const A115Rxtd6 = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Rxtd6");
const A115Rxtd7 = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Rxtd7");
const A115Rxtd8 = () =>
  import(/* webpackChunkName:'A115' */ "@/components/lottery/A115/A115Rxtd8");
// PK10
const Bjpk10Dw = () =>
  import(/* webpackChunkName:'pk10' */ "@/components/lottery/Pk10/Bjpk10Dw");
const Bjpk10X1 = () =>
  import(/* webpackChunkName:'pk10' */ "@/components/lottery/Pk10/Bjpk10X1");
const Bjpk10X2 = () =>
  import(/* webpackChunkName:'pk10' */ "@/components/lottery/Pk10/Bjpk10X2");
const Bjpk10X3 = () =>
  import(/* webpackChunkName:'pk10' */ "@/components/lottery/Pk10/Bjpk10X3");
const Bjpk10H1 = () =>
  import(/* webpackChunkName:'pk10' */ "@/components/lottery/Pk10/Bjpk10H1");
const Bjpk10H2 = () =>
  import(/* webpackChunkName:'pk10' */ "@/components/lottery/Pk10/Bjpk10H2");
const Bjpk10H3 = () =>
  import(/* webpackChunkName:'pk10' */ "@/components/lottery/Pk10/Bjpk10H3");
const Pk10Lm = () =>
  import(/* webpackChunkName:'pk10' */ "@/components/lottery/Pk10/Pk10Lm");
const Pk10Lh = () =>
  import(/* webpackChunkName:'pk10' */ "@/components/lottery/Pk10/Pk10Lh");
// 快3
const K3Hz = () =>
  import(/* webpackChunkName:'K3' */ "@/components/lottery/K3/K3Hz");
const K33tx = () =>
  import(/* webpackChunkName:'K3' */ "@/components/lottery/K3/K33tx");
const K33dx = () =>
  import(/* webpackChunkName:'K3' */ "@/components/lottery/K3/K33dx");
const K32fx = () =>
  import(/* webpackChunkName:'K3' */ "@/components/lottery/K3/K32fx");
const K32dx = () =>
  import(/* webpackChunkName:'K3' */ "@/components/lottery/K3/K32dx");
const K33x = () =>
  import(/* webpackChunkName:'K3' */ "@/components/lottery/K3/K33x");
const K33xdt = () =>
  import(/* webpackChunkName:'K3' */ "@/components/lottery/K3/K33xdt");
const K32xdt = () =>
  import(/* webpackChunkName:'K3' */ "@/components/lottery/K3/K32xdt");
const K32x = () =>
  import(/* webpackChunkName:'K3' */ "@/components/lottery/K3/K32x");
const K33ltx = () =>
  import(/* webpackChunkName:'K3' */ "@/components/lottery/K3/K33ltx");
const K3Bc = () =>
  import(/* webpackChunkName:'K3' */ "@/components/lottery/K3/K3Bc");
// 快乐十分
const KlsfX1R1l = () =>
  import(/* webpackChunkName:'Klsf' */ "@/components/lottery/Klsf/KlsfX1R1l");
const KlsfX1R1h = () =>
  import(/* webpackChunkName:'Klsf' */ "@/components/lottery/Klsf/KlsfX1R1h");
const KlsfRx2 = () =>
  import(/* webpackChunkName:'Klsf' */ "@/components/lottery/Klsf/KlsfRx2");
const KlsfX2Lzhi = () =>
  import(/* webpackChunkName:'Klsf' */ "@/components/lottery/Klsf/KlsfX2Lzhi");
const KlsfX2Lzu = () =>
  import(/* webpackChunkName:'Klsf' */ "@/components/lottery/Klsf/KlsfX2Lzu");
const KlsfRx2Dt = () =>
  import(/* webpackChunkName:'Klsf' */ "@/components/lottery/Klsf/KlsfRx2Dt");
const KlsfX2Lzudt = () =>
  import(/* webpackChunkName:'Klsf' */ "@/components/lottery/Klsf/KlsfX2Lzudt");
const KlsfX3Qzhi = () =>
  import(/* webpackChunkName:'Klsf' */ "@/components/lottery/Klsf/KlsfX3Qzhi");
const KlsfX3Qzu = () =>
  import(/* webpackChunkName:'Klsf' */ "@/components/lottery/Klsf/KlsfX3Qzu");
const KlsfRx3 = () =>
  import(/* webpackChunkName:'Klsf' */ "@/components/lottery/Klsf/KlsfRx3");
const KlsfRx3Dt = () =>
  import(/* webpackChunkName:'Klsf' */ "@/components/lottery/Klsf/KlsfRx3Dt");
const KlsfX3Qzudt = () =>
  import(/* webpackChunkName:'Klsf' */ "@/components/lottery/Klsf/KlsfX3Qzudt");
const KlsfRx4 = () =>
  import(/* webpackChunkName:'Klsf' */ "@/components/lottery/Klsf/KlsfRx4");
const KlsfRx4Dt = () =>
  import(/* webpackChunkName:'Klsf' */ "@/components/lottery/Klsf/KlsfRx4Dt");
const KlsfRx5 = () =>
  import(/* webpackChunkName:'Klsf' */ "@/components/lottery/Klsf/KlsfRx5");
const KlsfRx5Dt = () =>
  import(/* webpackChunkName:'Klsf' */ "@/components/lottery/Klsf/KlsfRx5Dt");
// 3d福彩
const A3dHz = () =>
  import(/* webpackChunkName:'A3d' */ "@/components/lottery/A3dFc/A3dHz");
const A3dZxhz = () =>
  import(/* webpackChunkName:'A3d' */ "@/components/lottery/A3dFc/A3dZxhz");
const A3dZxhzZ6 = () =>
  import(/* webpackChunkName:'A3d' */ "@/components/lottery/A3dFc/A3dZxhzZ6");
const Three2xQ2f = () =>
  import(/* webpackChunkName:'A3d' */ "@/components/lottery/A3dFc/Three2xQ2f");
const Ssc2xH2f = () =>
  import(/* webpackChunkName:'A3d' */ "@/components/lottery/A3dFc/Ssc2xH2f");
const Three3xDw = () =>
  import(/* webpackChunkName:'A3d' */ "@/components/lottery/A3dFc/Three3xDw");
const Ssc2xBdw = () =>
  import(/* webpackChunkName:'A3d' */ "@/components/lottery/A3dFc/Ssc2xBdw");
// other
const XyftHz = () =>
  import(/* webpackChunkName:'other' */ "@/components/lottery/Xyft/XyftHz");
const Pk10LmDxds1Lh = () =>
  import(/* webpackChunkName:'other' */ "@/components/lottery/Xyft/Pk10LmDxds1Lh");
const Pk10LmDxds1 = () =>
  import(/* webpackChunkName:'other' */ "@/components/lottery/Xyft/Pk10LmDxds1");

const sscObj = {
  Ssc,
  SscSm,
  Ssc3xQ3f,
  Ssc3xH3f,
  SscTsH3,
  SscTsQ3,
  SscZ3Q3,
  SscZ3Q6,
  SscZ3hHz,
  SscZ3qHz,
  Ssc2xQ2f,
  SscZ2F2,
  Ssc5xDw,
  Ssc5xQ3,
  Ssc5x3mBdw,
  Ssc5x2mBdw,
  Ssc5x1m,
  SscDxdsQ2,
  SscDxdsH2,
  SscDxQ4f,
  SscDxH4f,
  Ssc11x5Bdw,
  Ssc11x5Dwd,
  Ssc11x5Bdwz,
  Ssc11x5Bdwh
};
const a115Obj = {
  A115Rx1,
  A115Rx2,
  A115Rx3,
  A115Rx4,
  A115Rx5,
  A115Rx6,
  A115Rx7,
  A115Rx8,
  A115Q2Zhi,
  A115Q2Zu,
  A115Rxtd2,
  A115Q3Zhi,
  A115Q3Zu,
  A115Rxtd3,
  A115Rxtd4,
  A115Rxtd5,
  A115Rxtd6,
  A115Rxtd7,
  A115Rxtd8
};
const k3Obj = {
  // 快三
  K3Hz,
  K33x,
  K32x,
  K33xdt,
  K32xdt,
  K33ltx,
  K32fx,
  K32dx,
  K33dx,
  K3Bc,
  K33tx
};
const pk10Obj = {
  // pk10
  Bjpk10X1,
  Bjpk10X2,
  Bjpk10X3,
  Bjpk10H1,
  Bjpk10H2,
  Bjpk10H3,
  Bjpk10Dw,
  Pk10Lm,
  Pk10Lh,
  Pk10LmDxds1,
  Pk10LmDxds1Lh,
  XyftHz
};
const klsfObj = {
  KlsfRx5Dt,
  KlsfRx5,
  KlsfRx4Dt,
  KlsfRx4,
  KlsfX3Qzudt,
  KlsfRx3Dt,
  KlsfRx3,
  KlsfX3Qzhi,
  KlsfX3Qzu,
  KlsfX2Lzudt,
  KlsfRx2Dt,
  KlsfX2Lzu,
  KlsfRx2,
  KlsfX2Lzhi,
  KlsfX1R1l,
  KlsfX1R1h
};
const a3dfcObj = {
  Ssc2xBdw,
  Three3xDw,
  Ssc2xH2f,
  Three2xQ2f,
  A3dZxhzZ6,
  A3dZxhz,
  A3dHz
};

export default {
  name: "BetOfficial",
  components: {
    ...sscObj,
    ...a115Obj,
    ...pk10Obj,
    ...klsfObj,
    ...a3dfcObj,
    ...k3Obj
  },
  props: {
    lotteryData: Object,
    playData: Object
  },
  data() {
    return {};
  },
  computed: {
    childTemplate() {
      console.log(
        "\\lottery\\" + this.playData.playedTpl,
        "-childTemplate-BetOfficial"
      );
      return this.playData.playedTpl;
    }
  },
  created() {},
  updated() {},
  methods: {}
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
}
</style>
