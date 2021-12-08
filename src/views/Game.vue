<template>
  <div v-if="timer">
    <h1>The Game!</h1>
    <GameField
      :task="currentTask"
      :onChangeOperations="onChangeCurrentTaskOperations"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SettingsInterface, TaskInterface } from "@/types";
import GameField from "@/components/GameField/index.vue";

export default defineComponent({
  name: "Game",
  components: {
    GameField,
  },
  created() {
    if (!this.timer) {
      this.$router.push("/start");
    }
  },
  props: {
    settings: {
      type: Object as PropType<SettingsInterface>,
      required: true,
    },
    timer: {
      type: Number as PropType<number>,
      required: true,
    },
    tasks: {
      type: Array as PropType<TaskInterface[]>,
      required: true,
    },
    onChangeCurrentTask: {
      type: Function as PropType<(changedTasks: TaskInterface) => void>,
      required: true,
    },
  },
  computed: {
    currentTask() {
      return this.tasks[this.tasks.length - 1];
    },
  },
  methods: {
    onChangeCurrentTaskOperations(operations: TaskInterface["operations"]) {
      this.onChangeCurrentTask({ ...this.currentTask, operations });
    },
  },
});
</script>
