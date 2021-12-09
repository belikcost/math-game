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
  <ManageGameField
    :onFocusNextOperation="focusNextOperation"
    :onFocusPrevOperation="focusPrevOperation"
    :onUpdateFocusOperationValue="updateFocusOperationValue"
    :onCheckTaskAnswers="checkTaskAnswersAndResetFocus"
    :onFillOperationsWithCorrectValues="fillOperationsWithCorrectValues"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TaskInterface } from "@/types";
import { getOperationByType } from "@/utils";
import Operation from "@/components/GameField/Elements/Operation/index.vue";
import ManageGameField from "@/components/GameField/Elements/ManageGameField/index.vue";

const DEFAULT_FOCUSED_OPERATION = 0;

export default defineComponent({
  name: "GameField",
  components: {
    Operation,
    ManageGameField,
  },
  data() {
    return {
      focusedOperation: DEFAULT_FOCUSED_OPERATION,
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
    onCheckTaskAnswers: {
      type: Function as PropType<() => void>,
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

      this.onChangeOperations(changedOperations);
    },
    focusNextOperation() {
      if (this.focusedOperation !== this.task.operations.length - 1) {
        this.$data.focusedOperation = this.focusedOperation + 1;
      }
    },
    focusPrevOperation() {
      if (this.focusedOperation !== 0) {
        this.$data.focusedOperation = this.focusedOperation - 1;
      }
    },
    checkTaskAnswersAndResetFocus() {
      this.onCheckTaskAnswers();
      this.$data.focusedOperation = DEFAULT_FOCUSED_OPERATION;
    },
    fillOperationsWithCorrectValues() {
      const operationsWithCorrectValues = this.task.operations.map(
        (operation) => ({ ...operation, value: operation.correctValue })
      );

      this.onChangeOperations(operationsWithCorrectValues);
    },
  },
});
</script>
