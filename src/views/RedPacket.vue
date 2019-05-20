<template>
  <div class="ser_home">
    <div class="top-menu">
      <router-link to="/home" class="back">返回首页</router-link>
    </div>
    <div class="top_cai" ref="top_cai" id="top_cai">
      <img src="../assets/img/top_cai.png" alt />
    </div>
    <ul class="red_packet" id="red_packet">
      <template v-for="(item, index) in liParams">
        <li
          :style="{
            left: item.left,
            animationDuration: item.durTime,
            webkitAnimationDuration: item.durTime
          }"
          :class="item.cls"
          :data-index="index"
          @webkitAnimationEnd="removeDom"
          :key="index"
        >
          <a href="javascript:;" v-on:click="Redgain">
            <i
              :style="{
                transform: item.transforms,
                webkitTransform: item.transforms
              }"
            ></i>
          </a>
        </li>
      </template>
    </ul>
    <div class="btm_cai" id="btm_cai">
      <img src="../assets/img/btm_cai.png" alt srcset />
    </div>
    <div class="backward" v-show="backwardFlag">
      <div class="top">
        <img src="../assets/img/first_one.png" alt />
        <div class="num" id="num"></div>
        <div class="btm">{{ RedTitle }}</div>
      </div>
    </div>
    <div class="no" v-show="Noshow">
      <img src="../assets/img/noredbag.png" alt />
      <div class="no_top">{{ ErrorInfo }}</div>
      <div class="no_btm" v-on:click="Noshow = false">知道了</div>
    </div>
    <div class="zhong" v-show="Zhongshow">
      <img src="../assets/img/zhongjiang.png" alt />
      <div class="zhong_money">
        获得红包:
        <span>{{ WinSum }}</span> 元
      </div>
      <div class="zhong_btn" v-on:click="Zhongshow = false">确定</div>
    </div>
  </div>
</template>

<script>
import { redPacket, grabRedPacket } from "../api";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      liParams: [],
      RedData: [],
      RedTitle: "",
      RedFlag: false,
      RedDataInfo: [],
      timer: null,
      duration: 1000000, // 结束时间
      yi: 2,
      flag: true,
      numz: 4,
      redChance: 1, //点击抽取概率
      redID: null,
      backwardFlag: true,
      Noshow: false,
      Zhongshow: false,
      ErrorInfo: null,
      WinSum: null,
      interObj: {},
      addredObj: {}
    };
  },
  created() {
    redPacket().then(res => {
      if (!res.status) {
        this.RedTitle = "红包活动已结束";
      } else {
        this.RedFlag = true;
        this.RedData = res.data;
        this.RedTitle = res.data.name;
        this.redID = res.data.id;
        this.redChance = res.data.config.redChance * 100;
      }
    });
  },
  mounted() {
    this.backward();
    this.interObj = setInterval(this.ttime, 10);
  },
  //离开当前页面后执行
  destroyed: function() {
    clearInterval(this.interObj);
    clearInterval(this.addredObj);
  },
  methods: {
    /*红包数量*/
    add() {
      let win =
        document.documentElement.clientWidth || document.body.clientWidth;
      let left = parseInt(Math.random() * (win - 50) + 0);
      let rotate = parseInt(Math.random() * (45 - -45) - 45) + "deg"; // 旋转角度
      let scales = (Math.random() * (16 - 8 + 1) + 8) * 0.1; // 图片尺寸
      let durTime = Math.random() * (2.5 - 12.2 + 1) + 12.2 + "s"; // 时间 1.2和1.2这个数值保持一样
      let addRed = {
        left: left + "px",
        cls: "move_1",
        transforms: "rotate(" + rotate + ") scale(" + scales + ")",
        durTime: durTime
      };
      this.liParams.push(addRed);
    },
    /**
     * 开启动画
     */
    startRedPacket() {
      setTimeout(() => {
        // 多少时间结束
        clearTimeout(this.timer);
        return;
      }, this.duration);
    },
    /**
     * 回收dom节点*/
    removeDom(e) {
      let target = e.currentTarget;
      document.querySelector("#red_packet").removeChild(target);
    },
    /**
     /**丢红包 */
    ttime() {
      let bigWidth = parseInt(document.body.clientWidth);
      let leftt = parseInt(this.$refs.top_cai.getBoundingClientRect().left);
      if (leftt <= 0) {
        this.flag = true;
      }
      if (leftt >= bigWidth - this.$refs.top_cai.offsetWidth) {
        this.flag = false;
      }
      if (this.flag) {
        this.yi = 2;
      } else {
        this.yi = -2;
      }
      document.getElementById("top_cai").style.left = leftt + this.yi + "px";
    },
    //倒计时
    backward() {
      this.numz--;
      if (this.numz > 0) {
        document.getElementById("num").innerHTML = this.numz;
        setTimeout(this.backward, 1000);
      } else {
        //去掉倒计时
        this.backwardFlag = false;
        if (!this.RedFlag) {
          return this.$router.go(-1);
        }
        document.getElementById("btm_cai").style.height = "100px";
        document.getElementById("top_cai").style.display = "block";
        this.addredObj = setInterval(this.add, 200);
      }
    },
    //点击红包的时候弹出模态层
    Redgain() {
      let randomNum = parseInt(Math.random() * 100, 10) + 1;
      if (randomNum <= this.redChance) {
        this.redpacket_click();
      }
    },
    redpacket_click() {
      grabRedPacket({ id: this.redID }).then(res => {
        console.log(res.code);
        if (res.status == 1) {
          this.Zhongshow = true;
          this.WinSum = res.data;
        } else {
          this.Noshow = true;
          this.ErrorInfo = res.msg;
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.ser_home {
  width: 100%;
  height: 100%;
  background: url("../assets/img/bj.png") no-repeat;
  background-size: 100% 100%;
}
.top-menu {
  height: 32px;
  line-height: 32px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
}
.top-menu .back {
  display: block;
  margin-left: 0.6rem;
  margin-top: 0.4rem;
  font-weight: bold;
  font-size: 36px;
  color: white;
  float: left;
}
.top_cai {
  width: 220px;
  height: 220px;
  position: fixed;
  top: 80px;
  left: 50%;
  display: none;
}
.btm_cai {
  width: 220px;
  height: 0px;
  position: fixed;
  bottom: 0;
  right: 0;
  transition: 0.3s;
  z-index: 100;
}
.btm_cai img {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
}
.backward {
  width: 100%;
  height: 100%;
  background: url(../assets/img/3.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
}
.no {
  width: 600px;
  height: 650px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  transform: translate(-20%);
  z-index: 99999;
  font-size: 40px;
}

.no_top {
  width: 240px;
  height: 190px;
  top: 80px;
  left: 180px;
  position: absolute;
  line-height: 70px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 0.0625rem;
}

.no_btm {
  width: 180px;
  height: 70px;
  position: absolute;
  left: 260px;
  top: 370px;
  background-color: #fece60;
  border-radius: 10px;
  text-align: center;
  line-height: 70px;
  font-weight: bold;
  letter-spacing: 0.0625rem;
}
.backward img {
  width: 100%;
  height: 100%;
}
.backward .num {
  color: red;
  font-weight: bold;
  font-size: 80px;
  text-align: center;
  line-height: 50px;
  margin-top: -180px;
  margin-left: -30px;
}
.backward .btm {
  width: 100%;
  color: #fff;
  position: absolute;
  text-align: center;
  top: -60px;
  font-weight: bold;
  font-size: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.backward .top {
  width: 380px;
  height: 380px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
}
.zhong {
  width: 500px;
  height: 550px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  z-index: 99999;
  font-family: "方正卡通简体";
}

.zhong_money {
  line-height: 40px;
  width: 400px;
  top: 260px;
  left: 60px;
  position: absolute;
  font-weight: bold;
  text-align: center;
  letter-spacing: 0.0625rem;
  font-size: 38px;
  color: #333;
  font-family: "方正卡通简体";
}
.zhong_money span {
  color: #feef00;
}

.zhong_btn {
  position: absolute;
  width: 400px;
  left: 55px;
  top: 450px;
  text-align: center;
  font-weight: bold;
  font-size: 48px;
  letter-spacing: 0.0625rem;
  font-weight: bold;
  color: #fff;
  letter-spacing: 2px;
  line-height: 110px;
  border-radius: 30px;
  overflow: hidden;
}

.red_packet {
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  i {
    width: 69px;
    height: 69px;
    display: block;
    background: url("../assets/img/hongbao.png") no-repeat;
    background-size: 100% 100%;
  }
  li {
    position: absolute;
    animation: all 3s linear;
    top: 300px;
    z-index: 10;
    &.move_1 {
      -webkit-animation: aim_move 10s linear 1 forwards;
      animation: aim_move 10s linear 1 forwards;
    }
  }
  a {
    display: block;
  }
}
@keyframes aim_move {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(110vh);
    transform: translateY(110vh);
  }
}
</style>
