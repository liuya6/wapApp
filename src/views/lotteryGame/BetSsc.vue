<template>
  <div>
    <div class="container">
      <!--开奖信息 begin-->
      <!--开奖信息 end-->
      <component :is="TemplateName"></component>
    </div>
  </div>
</template>

<script>
const Ssc5xDw = () => import("../../components/lottery/Ssc/Ssc5xDw");
const SscCtSm = () => import("../../components/lottery/SscCt/SscCtSm");

export default {
  name: "BetSsc",
  components: {
    Ssc5xDw,
    SscCtSm
  },

  data() {
    return {};
  },
  props: ["TemplateName"],
  computed: {},
  created() {},
  methods: {}
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
}
</style>
