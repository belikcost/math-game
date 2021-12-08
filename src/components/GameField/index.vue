<template>
  <div>
    <span>{{ task.firstNumber }}</span>
    <template v-for="operation in task.operations" :key="operation.type">
      <span>{{ getOperationByType(operation.type) }}</span>
      <input class="game-field_input" type="number" />
    </template>
    <span>= {{ task.answer }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TaskInterface } from "@/types";
import { getOperationByType } from "@/utils";

export default defineComponent({
  name: "GameField",
  props: {
    task: {
      type: Object as PropType<TaskInterface>,
      required: true,
    },
    onChangeOperations: {
      type: Function as PropType<
        (operations: TaskInterface["operations"]) => void
      >,
      required: true,
    },
  },
  methods: {
    getOperationByType,
  },
});
</script>

<style scoped>
.game-field_input {
  width: 20px;
}

.game-field_input::-webkit-outer-spin-button,
.game-field_input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
