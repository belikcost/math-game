<template>
  <div>
    <h2>Привет!</h2>
    <p>Добро пожаловать на тренировку!</p>
    <template v-if="previousResult">
      <p>
        Ваш последний результат - решено {{ previousResult.solvedTasks }} из
        {{ previousResult.totalTasks }} задач.
      </p>
      <p>Общая точность {{ previousResult.totalPercent }}%</p>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ResultInterface } from "@/types";

export default defineComponent({
  name: "Greeting",
  props: {
    previousResult: {
      type: Object as PropType<ResultInterface>,
      required: true,
    },
  },
});
</script>
