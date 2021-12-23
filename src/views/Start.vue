<template>
  <div>
    <Greeting :previousResult="previousResult" />
    <Settings :settingsStore="settingsStore" />
    <button @click="onStartTheGame">Play!</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Greeting from "@/components/Greeting/index.vue";
import Settings from "@/components/Settings/index.vue";
import { TaskInterface } from "@/types";
import SettingsStore from "@/domain/SettingsStore";

export default defineComponent({
  name: "Start",
  components: {
    Greeting,
    Settings,
  },
  props: {
    settingsStore: {
      type: Object as PropType<SettingsStore>,
      required: true,
    },
    onStartTheGame: {
      type: Function as PropType<() => void>,
      required: true,
    },
    previousTasks: {
      type: Object as PropType<TaskInterface[]>,
      required: true,
    },
  },
  computed: {
    previousResult() {
      if (this.previousTasks.length === 0) return null;

      const totalTasks = this.previousTasks.length;
      let solvedTasks = 0;

      this.previousTasks.forEach((task) => {
        const answersCorrect = task.operations.every(
          (operation) => operation.value === operation.correctValue
        );

        if (answersCorrect) {
          solvedTasks++;
        }
      });

      const totalPercent = Math.floor((solvedTasks * 100) / totalTasks);

      return {
        solvedTasks,
        totalTasks,
        totalPercent,
      };
    },
  },
});
</script>
