<template>
  <div>
    <span>{{ task.firstNumber }}</span>
    <template
      v-for="(operation, index) in task.operations"
      :key="operation.type"
    >
      <Operation
        :isFocusing="index === focusedOperation"
        :operation="operation"
        :operationName="getOperationByType(operation.type)"
      />
    </template>
    <span>= {{ task.answer }}</span>
  </div>
  <ManageGameField :onUpdateFocusOperationValue="updateFocusOperationValue" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TaskInterface } from "@/types";
import { getOperationByType } from "@/utils";
import Operation from "@/components/GameField/Elements/Operation/index.vue";
import ManageGameField from "@/components/GameField/Elements/ManageGameField/index.vue";

export default defineComponent({
  name: "GameField",
  components: {
    Operation,
    ManageGameField,
  },
  data() {
    return {
      focusedOperation: 0,
    };
  },
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
    updateFocusOperationValue(number: number) {
      const changedOperations = this.task.operations.map((operation, i) => {
        if (i === this.focusedOperation) {
          let updatedValue;

          if (operation.value !== null) {
            updatedValue = +`${operation.value}${number}`;
          } else {
            updatedValue = number;
          }

          return { ...operation, value: updatedValue };
        } else {
          return operation;
        }
      });
      console.log(changedOperations);
      this.onChangeOperations(changedOperations);
    },
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
