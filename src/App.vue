<template>
  <router-view
    :tasks="tasks"
    :previousTasks="previousTasks"
    :onChangeCurrentTask="onChangeCurrentTask"
    :onStartTheGame="startTheGame"
    :onEndTheGame="endTheGame"
    :settingsStore="settingsStore"
    :timer="timerTime"
    :startTime="startTime"
    :onCreateTask="createTask"
  />
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from "vue";

import { OperationsEnums } from "@/enums";

import StorageHelper from "@/domain/StorageHelper";
import TaskFunctional from "@/domain/TaskFunctional";
import Timer from "@/domain/Timer";

import { getSecondsFromMinutes } from "./utils";
import SettingsStore from "@/domain/SettingsStore";
import { TaskInterface } from "@/types";

interface AppStateInterface {
  tasks: TaskInterface[];
  timerTime: number;
  startTime: number;
  timer: Timer | null;
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
      timer: null,
      timerTime: 0,
      startTime: 0,
    };
  },
  methods: {
    startTheGame() {
      const startTime = getSecondsFromMinutes(
        this.settingsStore.settings.duration
      );

      const timer = new Timer({
        startTime,
        interval: ONE_SECOND,
        onTimerEnd: this.endTheGame,
        onTick: (nextTime) => (this.$data.timerTime = nextTime),
      });

      this.$data.timer = timer;
      this.$data.timerTime = timer.time;
      this.$data.startTime = startTime;

      timer.start();
      this.createTask();
    },
    endTheGame() {
      this.setPreviousTasks(this.tasks);
      this.storageHelper.setToStorage(
        "previousTasks",
        JSON.stringify(this.tasks)
      );

      if (this.timer) this.timer.end();

      this.$data.tasks = [];
      this.$data.timerTime = 0;

      this.$router.push("/start");
    },
    createTask() {
      const taskFunctional = new TaskFunctional(
        undefined,
        this.settingsStore.settings.operations,
        this.settingsStore.settings.level
      );

      this.$data.tasks.push(taskFunctional.task);
    },
    onChangeCurrentTask(changedTask: TaskInterface) {
      this.$data.tasks[this.tasks.length - 1] = changedTask;
    },
  },
  watch: {
    timerTime(nextValue) {
      if (nextValue) {
        this.$router.push("/");
      }
    },
  },
  setup() {
    const storageHelper = new StorageHelper(localStorage);
    const settingsFromStorage =
      storageHelper.getFromStorageAndParse("settings");

    const settingsStore: Ref<SettingsStore> = ref(
      new SettingsStore(settingsFromStorage || INITIAL_SETTINGS)
    );

    watch(
      () => ({ ...settingsStore.value.settings }),
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
      settingsStore,
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
