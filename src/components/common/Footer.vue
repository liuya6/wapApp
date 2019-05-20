<template>
  <div class="footer">
    <div>
      <p
        v-for="(item, i) in foot"
        :key="i"
        :class="{ my: item.name === 'user' }"
      >
        <router-link :to="item.path" @click.native="go(i)">
          <i class="iconfont" v-html="item.icon"></i>
          <span>{{ item.txt }}</span>
        </router-link>
      </p>
      <b class="msg" v-if="userInfo && userInfo.unread"></b>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "foot",
  data() {
    return {
      foot: [
        { txt: "首页", path: "/home", name: "home", icon: "&#xe610" },
        { txt: "游戏大厅", path: "/hall", name: "hall", icon: "&#xe611" },
        { txt: "游戏记录", path: "/record", name: "record", icon: "&#xe612" },
        { txt: "我的", path: "/user", name: "user", icon: "&#xe613" }
      ]
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    go(index) {
      this.$router.replace({ path: this.foot[index].path });
    }
  }
};
</script>

<style scoped lang="less">
.footer {
  width: 100%;
  height: 100px;
  border-top: 1px solid #e2e2e2;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  div {
    position: relative;
    .msg {
      width: 15px;
      height: 15px;
      background-color: rgba(255, 0, 0, 0.8);
      color: #fff;
      border-radius: 30px;
      line-height: 30px;
      text-align: center;
      position: absolute;
      right: 75px;
      top: 8px;
      font-size: 20px;
    }
  }

  p {
    width: 25%;
    list-style: none;
    float: left;

    a {
      display: block;
      width: 100%;
      color: #797e84;
      text-decoration: none;
      cursor: pointer;

      i {
        display: block;
        line-height: 60px;
        font-size: 45px;
        cursor: pointer;
      }
      span {
        line-height: 40px;
      }
    }

    .router-link-active {
      i {
        color: #dc001a;
      }
    }
  }
}
</style>
