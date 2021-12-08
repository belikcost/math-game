<template>
  <div>
    <h2>Привет!</h2>
    <p>Добро пожаловать на {{ trainDay }} тренировочный день!</p>
    <template v-if="previousResult">
      <p>
        Ваш последний результат - решено {{ previousResult.solvedTasks }} из
        {{ previousResult.totalTasks }}.
      </p>
      <p>Общая точность {{ previousResult.totalPercent }}%</p>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Greeting",
  props: {
    previousResult: {
      type: null as unknown as PropType<null>,
      required: true,
    },
    trainDay: {
      type: Number as PropType<number>,
      required: true,
    },
  },
});
</script>
