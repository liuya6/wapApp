<template>
  <div class="loading">
    <div v-if="loading" class="loading-container">
      <div class="loader">
        <div class="loading-bubbles">
          <div class="bubble-container">
            <div class="bubble"></div>
          </div>
          <div class="bubble-container">
            <div class="bubble"></div>
          </div>
          <div class="bubble-container">
            <div class="bubble"></div>
          </div>
        </div>
      </div>
    </div>
    <img v-else :src="src" alt="" width="100%" />
  </div>
</template>

<script>
export default {
  name: "ImgLoding",
  props: {
    src: String
  },
  data() {
    return {
      loading: true
    };
  },
  created() {
    let newImg = new Image();
    newImg.src = this.src;
    newImg.onload = () => {
      this.loading = false;
    };
  }
};
</script>
<style scoped lang="less">
.loading {
  height: 100%;
  img {
    vertical-align: middle;
  }
}
.loading-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
    .loading-bubbles {
      .bubble-container {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin: 0 5px;
        opacity: 0.8;
      }
      .bubble-container {
        .bubble {
          border-radius: 50%;
          background-color: red;
          width: 100%;
          height: 100%;
          transform-origin: 50% 50%;
          animation: bubble 1.2s -0.6s infinite ease-out;
        }
        &:nth-of-type(2n) .bubble {
          animation-delay: -0.3s;
        }
        &:nth-of-type(3n) .bubble {
          animation-delay: 0s;
        }
      }
    }
  }
}
@keyframes bubble {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>
