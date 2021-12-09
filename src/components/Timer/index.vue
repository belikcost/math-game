<template>
  <div>
    <span>{{ localizedTimer.minutes }}:</span>
    <span>{{ localizedTimer.seconds }}</span>
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
  },
  computed: {
    localizedTimer() {
      return {
        minutes: Math.floor(this.timer / 60),
        seconds: this.timer % 60,
      };
    },
  },
});
</script>
