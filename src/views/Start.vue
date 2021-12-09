<template>
  <div>
    <Greeting :previousResult="previousResult" />
    <Settings :settings="settings" :onChangeSettings="onChangeSettings" />
    <button @click="onStartTheGame">Play!</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Greeting from "@/components/Greeting/index.vue";
import Settings from "@/components/Settings/index.vue";
import { SettingsInterface, TaskInterface } from "@/types";

export default defineComponent({
  name: "Start",
  components: {
    Greeting,
    Settings,
  },
  props: {
    settings: {
      type: Object as PropType<SettingsInterface>,
      required: true,
    },
    onChangeSettings: {
      type: Function as PropType<(settings: SettingsInterface) => void>,
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
      if (this.previousTasks.length !== 0) {
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
      } else {
        return null;
      }
    },
  },
});
</script>
