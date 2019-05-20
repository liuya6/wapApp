<template>
  <div class="ChangLongLegend">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      长龙助手说明
    </div>
    <div class="content">
      <div class="content-long">
        <p>
          长龙助手是对快3、时时彩、PK10、六合彩特定玩法的“大小单双”
          开奖结果进行跟踪统计，并可进行快捷投注的助手工具；
        </p>
        <p>
          每期出现大、小、单、双的概率为50%，如果连续3期及以上的开奖结果相同，称之为“长龙”，通常会采用倍投的方式进行“砍龙”或“顺龙”。
        </p>
        <h3 class="long-ico">什么是砍龙？</h3>
        <p class="long-tab">
          如连续开5期“单”，可以选择“双”进行投注，这种投注方案称之为“砍龙”；
        </p>
        <h3 class="long-ico">什么是顺龙？</h3>
        <p class="long-tab">
          如连续开5期“单”，继续选择“单”进行投注，这种投注方案称之为“顺龙”；
        </p>
        <h3 class="long-ico">什么是倍投？</h3>
        <p class="long-tab">
          倍投是一种翻倍投注方式，是为了保障能够在“砍龙”或“顺龙”的过程中持续盈利的一种投注方式。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangLongLegend"
};
</script>

<style scoped lang="less">
.ChangLongLegend {
  .top {
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 37px;
    color: white;

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
    padding: 40px 30px 0 30px;
    text-align: left;
    font-size: 28px;
    p {
      margin: 30px 0;
    }
    .long-ico {
      color: #dc001a;
      position: relative;
      padding-left: 40px;
      &:after {
        content: "";
        background-image: url(../assets/img/icon.png);
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 3px;
        width: 35px;
        height: 35px;
      }
    }
  }
}
</style>
