<template>
  <div class="timer">
    <span class="timer_item">{{ localizedTimer.minutes }}:</span>
    <span class="timer_item">{{ localizedTimer.seconds }}</span>
    <div class="progress" :style="{ width: `${remainingTimePercent}%` }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Timer",
  props: {
    timer: {
      type: Number as PropType<number>,
      required: true,
    },
    startTime: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  computed: {
    localizedTimer() {
      return {
        minutes: Math.floor(this.timer / 60),
        seconds: this.timer % 60,
      };
    },
    remainingTimePercent() {
      return Math.floor((this.timer * 100) / this.startTime);
    },
  },
});
</script>

<style>
.timer {
  position: relative;

  width: 200px;

  background-color: rgba(127, 127, 200, 0.2);
}

.progress {
  position: absolute;
  top: 0;

  height: 100%;

  background-color: rgba(127, 127, 200, 1);
}

.timer_item {
  z-index: 2;
  position: relative;
}
</style>
