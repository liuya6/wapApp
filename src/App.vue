<template>
  <div id="app" v-title="''">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如列表A页面 -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如详情B页面-->
    </router-view>
    <div>
      <audio
        src="/music/stop-time.mp3"
        id="eventAudio"
        loop="loop"
        preload="auto"
      ></audio>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {},

  computed: {
    ...mapGetters(["webName", "oldCodeList"])
  },
  created() {
    this.$store.dispatch("setWebName");
    this.$store.dispatch("getAllConfig");
    this.$store.dispatch("tjShow");
    sessionStorage.touchstartNum = "1";
  },
  mounted() {
    this.$nextTick(() => {
      window.document.addEventListener("touchstart", () => {
        let Audios = document.getElementById("eventAudio");
        if (sessionStorage.touchstartNum == "1") {
          Audios.load();
          sessionStorage.touchstartNum = "0";
        }
      });
    });
  },
  methods: {
    ...mapMutations(["CLEAR_OLD_CODE"])
  },
  watch: {
    $route: {
      handler: function(val) {
        if (
          val.name !== "bet" &&
          val.name !== "confirmpurchase" &&
          val.name !== "chasingcode"
        ) {
          console.log("清除oldCodeList");
          if (this.oldCodeList.length) {
            this.CLEAR_OLD_CODE([]);
          }
        }
      },
      deep: true
    }
  }
};
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
