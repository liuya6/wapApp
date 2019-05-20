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
// ssc
const SscCtNn = () =>
  import(/* webpackChunkName:'SscCt' */ "@/components/lottery/SscCt/SscCtNn");
const SscCtSm = () =>
  import(/* webpackChunkName:'SscCt' */ "@/components/lottery/SscCt/SscCtSm");
const SscCtSzp = () =>
  import(/* webpackChunkName:'SscCt' */ "@/components/lottery/SscCt/SscCtSzp");
const SscCt1zdH = () =>
  import(/* webpackChunkName:'SscCt' */ "@/components/lottery/SscCt/SscCt1zdH");
const SscCt1zd = () =>
  import(/* webpackChunkName:'SscCt' */ "@/components/lottery/SscCt/SscCt1zd");
const SscCt2zd = () =>
  import(/* webpackChunkName:'SscCt' */ "@/components/lottery/SscCt/SscCt2zd");
const SscCt3zd = () =>
  import(/* webpackChunkName:'SscCt' */ "@/components/lottery/SscCt/SscCt3zd");
const SscCt1zz = () =>
  import(/* webpackChunkName:'SscCt' */ "@/components/lottery/SscCt/SscCt1zz");
const SscCt2zz = () =>
  import(/* webpackChunkName:'SscCt' */ "@/components/lottery/SscCt/SscCt2zz");
const SscCt2zh = () =>
  import(/* webpackChunkName:'SscCt' */ "@/components/lottery/SscCt/SscCt2zh");
const SscCtZx3 = () =>
  import(/* webpackChunkName:'SscCt' */ "@/components/lottery/SscCt/SscCtZx3");
const SscCtZx6 = () =>
  import(/* webpackChunkName:'SscCt' */ "@/components/lottery/SscCt/SscCtZx6");
const SscCtKd = () =>
  import(/* webpackChunkName:'SscCt' */ "@/components/lottery/SscCt/SscCtKd");
const SscCtLh = () =>
  import(/* webpackChunkName:'SscCt' */ "@/components/lottery/SscCt/SscCtLh");
// pk10
const Pk10CtLm = () =>
  import(/* webpackChunkName:'Pk10Ct' */ "@/components/lottery/Pk10Ct/Pk10CtLm");
const Pk10CtSzp = () =>
  import(/* webpackChunkName:'Pk10Ct' */ "@/components/lottery/Pk10Ct/Pk10CtSzp");
const Pk10CtGyh = () =>
  import(/* webpackChunkName:'Pk10Ct' */ "@/components/lottery/Pk10Ct/Pk10CtGyh");
//xyft
const XyftCtSzp = () =>
  import(/* webpackChunkName:'XyftCt' */ "@/components/lottery/xyftCt/XyftCtSzp");
const XyftCtLm = () =>
  import(/* webpackChunkName:'XyftCt' */ "@/components/lottery/xyftCt/XyftCtLm");
const XyftCtGyh = () =>
  import(/* webpackChunkName:'XyftCt' */ "@/components/lottery/xyftCt/XyftCtGyh");
// klsf
const KlsfCtSm = () =>
  import(/* webpackChunkName:'KlsfCt' */ "@/components/lottery/KlsfCt/KlsfCtSm");
const KlsfCtQ = () =>
  import(/* webpackChunkName:'KlsfCt' */ "@/components/lottery/KlsfCt/KlsfCtQ");
const KlsfCtLh = () =>
  import(/* webpackChunkName:'KlsfCt' */ "@/components/lottery/KlsfCt/KlsfCtLh");
// 3dfc
const A3dCtDw = () =>
  import(/* webpackChunkName:'A3dCt' */ "@/components/lottery/A3dFcCt/A3dCtDw");
const A3dCtBsdw = () =>
  import(/* webpackChunkName:'A3dCt' */ "@/components/lottery/A3dFcCt/A3dCtBsdw");
const A3dCtBgdw = () =>
  import(/* webpackChunkName:'A3dCt' */ "@/components/lottery/A3dFcCt/A3dCtBgdw");
const A3dCtSgdw = () =>
  import(/* webpackChunkName:'A3dCt' */ "@/components/lottery/A3dFcCt/A3dCtSgdw");
const A3dCtBsgdw = () =>
  import(/* webpackChunkName:'A3dCt' */ "@/components/lottery/A3dFcCt/A3dCtBsgdw");
const A3dCt1zz = () =>
  import(/* webpackChunkName:'A3dCt' */ "@/components/lottery/A3dFcCt/A3dCt1zz");
const A3dCt2zz = () =>
  import(/* webpackChunkName:'A3dCt' */ "@/components/lottery/A3dFcCt/A3dCt2zz");
const A3dCt3zz = () =>
  import(/* webpackChunkName:'A3dCt' */ "@/components/lottery/A3dFcCt/A3dCt3zz");
const A3dCtHs = () =>
  import(/* webpackChunkName:'A3dCt' */ "@/components/lottery/A3dFcCt/A3dCtHs");
const A3dCtZx3 = () =>
  import(/* webpackChunkName:'A3dCt' */ "@/components/lottery/A3dFcCt/A3dCtZx3");
const A3dCtZx6 = () =>
  import(/* webpackChunkName:'A3dCt' */ "@/components/lottery/A3dFcCt/A3dCtZx6");
const A3dCtKd = () =>
  import(/* webpackChunkName:'A3dCt' */ "@/components/lottery/A3dFcCt/A3dCtKd");
// SSC
const sscObj = {
  SscCtLh,
  SscCtKd,
  SscCtZx6,
  SscCtZx3,
  SscCt2zh,
  SscCt2zz,
  SscCt1zz,
  SscCt3zd,
  SscCt2zd,
  SscCt1zd,
  SscCt1zdH,
  SscCtSzp,
  SscCtSm,
  SscCtNn
};
// PK10
const pk10Obj = {
  Pk10CtGyh,
  Pk10CtSzp,
  Pk10CtLm
};
// Klsf
const klsfObj = {
  KlsfCtLh,
  KlsfCtQ,
  KlsfCtSm
};
// 3dfc
const a3dfcObj = {
  A3dCtBsgdw,
  A3dCtSgdw,
  A3dCtBgdw,
  A3dCtBsdw,
  A3dCt1zz,
  A3dCt2zz,
  A3dCt3zz,
  A3dCtKd,
  A3dCtZx3,
  A3dCtZx6,
  A3dCtHs,
  A3dCtDw
};
const xyftObj = {
  XyftCtSzp,
  XyftCtLm,
  XyftCtGyh
};
export default {
  name: "BetTradition",
  components: {
    ...sscObj,
    ...klsfObj,
    ...a3dfcObj,
    ...pk10Obj,
    ...xyftObj
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
        "-childTemplate-BetTradition"
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
