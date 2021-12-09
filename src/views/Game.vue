<template>
  <div v-if="timer">
    <header class="game__header">
      <h1>The Game!</h1>
      <Timer :timer="timer" />
    </header>
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
import Timer from "@/components/Timer/index.vue";

export default defineComponent({
  name: "Game",
  components: {
    GameField,
    Timer,
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

<style>
.game__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
