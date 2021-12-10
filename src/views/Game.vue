<template>
  <div>
    <div v-if="timer">
      <header class="game__header">
        <h1>The Game!</h1>
        <Timer :timer="timer" :startTime="startTime" />
      </header>
      <GameField
        :task="currentTask"
        :onChangeOperations="onChangeTaskOperations"
        :onCheckTaskAnswers="checkTaskAnswers"
        :onShowCorrectTaskAnswers="showCorrectTaskAnswers"
      />
      <button @click="onEndTheGame">Отмена</button>
    </div>
    <Modal v-if="modal.active">
      {{ modal.text }}
      <button @click="hideModalAndCreateTask">Далее</button>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SettingsInterface, TaskInterface } from "@/types";
import GameField from "@/components/GameField/index.vue";
import Timer from "@/components/Timer/index.vue";
import Modal from "@/primitives/Modal/index.vue";

export default defineComponent({
  name: "Game",
  components: {
    GameField,
    Timer,
    Modal,
  },
  data() {
    return {
      modal: {
        active: false,
        text: "",
      },
    };
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
    startTime: {
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
    onCreateTask: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onEndTheGame: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  computed: {
    currentTask() {
      return this.tasks[this.tasks.length - 1];
    },
  },
  methods: {
    onChangeTaskOperations(operations: TaskInterface["operations"]) {
      this.onChangeCurrentTask({ ...this.currentTask, operations });
    },
    checkTaskAnswers() {
      const checkAnswersResult = this.currentTask.operations.every(
        (operation) => operation.value === operation.correctValue
      );

      let modalText = "";

      if (checkAnswersResult) {
        modalText = "Ответ верный";
      } else {
        modalText = "Ответ неверный";
      }

      this.$data.modal = { active: true, text: modalText };
    },
    hideModalAndCreateTask() {
      this.$data.modal.active = false;
      this.onCreateTask();
    },
    showCorrectTaskAnswers() {
      const correctAnswers: number[] = [];

      this.currentTask.operations.forEach((operation) => {
        correctAnswers.push(operation.correctValue);
      });

      this.$data.modal = {
        active: true,
        text: `Ответы: ${correctAnswers.join(" ")}`,
      };
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
