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
        :onShowTaskResult="showTaskResult"
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
import { computed, defineComponent, PropType } from "vue";
import { SettingsInterface, TaskInterface } from "@/types";
import GameField from "@/components/GameField/index.vue";
import Timer from "@/components/Timer/index.vue";
import Modal from "@/primitives/Modal/index.vue";
import TaskFunctional from "@/domain/TaskFunctional";

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
  methods: {
    onChangeTaskOperations(operations: TaskInterface["operations"]) {
      this.onChangeCurrentTask({ ...this.currentTask, operations });
    },
    showTaskResult() {
      let modalText = "";

      if (this.taskFunctional.checkAnswers()) {
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
      const correctAnswers = this.taskFunctional.getCorrectAnswers();

      this.$data.modal = {
        active: true,
        text: `Ответы: ${correctAnswers.join(" ")}`,
      };
    },
  },
  setup(props) {
    const currentTask = computed(() => props.tasks[props.tasks.length - 1]);

    const taskFunctional = new TaskFunctional(currentTask.value);

    return { currentTask, taskFunctional };
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
