<template>
  <span>{{ times | timeGO }}</span>
</template>

<script>
export default {
  name: "Timer",
  data() {
    return {
      setTimer: "",
      times: ""
    };
  },
  props: {
    time: Number,
    typeId: Number
  },
  created() {
    this.times = this.time;
    this.clearTimer();
    this.startTimer();
  },
  destroyed() {
    this.clearTimer();
  },
  watch: {
    time(newVal) {
      this.times = newVal;
      this.clearTimer();
      if (newVal < 0) {
        this.$emit("changLongTimeOver", this.typeId);
        return;
      }
      this.startTimer();
    }
  },
  methods: {
    clearTimer() {
      clearInterval(this.setTimer);
      this.setTimer = null;
    },
    startTimer() {
      this.setTimer = setInterval(() => {
        this.times--;
        if (this.times <= 0) {
          this.clearTimer();
          this.$emit("changLongTimeOver", this.typeId);
          return false;
        }
      }, 1000);
    }
  }
};
</script>
