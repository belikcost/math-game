<template>
  <router-view
    :tasks="tasks"
    :previousTasks="previousTasks"
    :onChangeCurrentTask="onChangeCurrentTask"
    :onStartTheGame="startTheGame"
    :onEndTheGame="endTheGame"
    :settings="settings"
    :timer="timer"
    :onChangeSettings="changeSettings"
    :onCreateTask="createTask"
  />
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from "vue";
import { OperationsEnums } from "@/enums";
import { SettingsInterface, TaskInterface } from "@/types";
import StorageHelper from "@/domain/StorageHelper";
import {
  calculateAnswer,
  generateRandomValue,
  getSecondsFromMinutes,
  sortOperationsByLogic,
} from "./utils";

interface AppStateInterface {
  tasks: TaskInterface[];
  timer: number;
  timerInterval: number | undefined;
}
const ONE_SECOND = 1000;
const INITIAL_SETTINGS = {
  duration: 5,
  level: 2,
  operations: [OperationsEnums.addition, OperationsEnums.division],
};

export default defineComponent({
  name: "App",
  data(): AppStateInterface {
    return {
      tasks: [],
      timer: 0,
      timerInterval: undefined,
    };
  },
  methods: {
    startTheGame() {
      this.$data.timer = getSecondsFromMinutes(this.settings.duration);

      this.startTimer();
      this.createTask();
    },
    endTheGame() {
      this.setPreviousTasks(this.tasks);
      this.storageHelper.setToStorage(
        "previousTasks",
        JSON.stringify(this.tasks)
      );

      this.$data.tasks = [];
      this.$data.timer = 0;
      clearInterval(this.timerInterval);

      this.$router.push("/start");
    },
    startTimer() {
      const updateTimer = () => {
        if (this.timer && this.timer > 0) {
          (this.$data.timer as number)--;
        } else {
          clearInterval(this.timerInterval);
          this.endTheGame();
        }
      };

      this.$data.timerInterval = setInterval(updateTimer, ONE_SECOND);
    },
    createTask() {
      const operations = this.settings.operations;
      const level = this.settings.level;

      const task: TaskInterface = {
        firstNumber: generateRandomValue(Math.random, Math.floor),
        operations: [],
        answer: null,
      };

      while (task.operations.length < level) {
        operations.forEach((operation) => {
          task.operations.push({
            type: operation,
            correctValue: generateRandomValue(Math.random, Math.floor),
            value: null,
          });
        });
      }

      task.operations = sortOperationsByLogic(task.operations);

      task.answer = calculateAnswer(task.firstNumber, task.operations);

      this.$data.tasks.push(task);
    },
    onChangeCurrentTask(changedTask: TaskInterface) {
      this.$data.tasks[this.tasks.length - 1] = changedTask;
    },
  },
  watch: {
    timer(nextValue) {
      if (nextValue) {
        this.$router.push("/");
      }
    },
  },
  setup() {
    const storageHelper = new StorageHelper(localStorage);
    const settingsFromStorage =
      storageHelper.getFromStorageAndParse("settings");

    const settings: Ref<SettingsInterface> = ref(
      settingsFromStorage || INITIAL_SETTINGS
    );

    const changeSettings = (changedSettings: SettingsInterface) => {
      settings.value = changedSettings;
    };

    watch(
      () => ({ ...settings.value }),
      (nextValue) => {
        storageHelper.setToStorage("settings", JSON.stringify(nextValue));
      },
      { deep: true }
    );

    const previousTasksFromStorage =
      storageHelper.getFromStorageAndParse("previousTasks");

    const previousTasks: Ref<TaskInterface[]> = ref(
      previousTasksFromStorage || []
    );

    const setPreviousTasks = (tasks: TaskInterface[]) => {
      previousTasks.value = tasks;
    };

    return {
      storageHelper,
      settings,
      changeSettings,
      previousTasks,
      setPreviousTasks,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
