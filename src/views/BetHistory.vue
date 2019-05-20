<style scoped lang="less">
.body {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;

  .top {
    height: 100px;
    line-height: 100px;
    font-size: 37px;
    color: white;
    background-color: #605aa2;
    position: relative;

    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
    }

    span {
      color: white;
      font-weight: normal;
      position: absolute;
      right: 25px;
      font-size: 30px;
    }
  }

  .content {
    flex: 1;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
<template>
  <div class="body">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      {{ $route.query.title }}-历史开奖
    </div>
    <div class="content">
      <components :is="modeName"></components>
    </div>
  </div>
</template>

<script>
const HistoryK3 = () => import("@/components/history/HistoryK3");
const HistoryNormal = () => import("@/components/history/HistoryNormal");
const HistoryPk10 = () => import("@/components/history/HistoryPk10");
const HistorySix = () => import("@/components/history/HistorySix");
const HistoryXy28 = () => import("@/components/history/HistoryXy28");
const HistoryKl10 = () => import("@/components/history/HistoryKl10");

export default {
  name: "BetHistory",
  data() {
    return {
      modeName: this.$route.params.modeName
    };
  },
  components: {
    HistoryK3,
    HistoryNormal,
    HistoryPk10,
    HistorySix,
    HistoryXy28,
    HistoryKl10
  }
};
</script>
