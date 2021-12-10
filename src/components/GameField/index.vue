<template>
  <div>
    <span>{{ task.firstNumber }}</span>
    <template
      v-for="(operation, index) in task.operations"
      :key="operation.type"
    >
      <Operation
        :operationIdentifier="index"
        :isFocusing="index === focusedOperation"
        :operation="operation"
        :operationName="getOperationByType(operation.type)"
        :onChangeFocusOperationValue="changeFocusOperationValue"
        :onSetFocusedOperation="setFocusedOperation"
      />
    </template>
    <span>= {{ task.answer }}</span>
  </div>
  <ManageGameField
    :onFocusNextOperation="focusNextOperation"
    :onFocusPrevOperation="focusPrevOperation"
    :onUpdateFocusOperationValue="updateFocusOperationValue"
    :onShowTaskResultAndResetFocus="showTaskResultAndResetFocus"
    :onShowCorrectTaskAnswers="onShowCorrectTaskAnswers"
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
    onShowTaskResult: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onShowCorrectTaskAnswers: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  methods: {
    getOperationByType,
    setFocusedOperation(focusedOperation: number) {
      this.$data.focusedOperation = focusedOperation;
    },
    updateFocusOperationValue(number: number) {
      const focusedOperationValue =
        this.task.operations[this.focusedOperation].value;

      if (focusedOperationValue !== null) {
        this.changeFocusOperationValue(+`${focusedOperationValue}${number}`);
      } else {
        this.changeFocusOperationValue(number);
      }
    },
    changeFocusOperationValue(value: number) {
      const changedOperations = this.task.operations.map((operation, i) => {
        if (i === this.focusedOperation) {
          return { ...operation, value };
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
    showTaskResultAndResetFocus() {
      this.onShowTaskResult();
      this.$data.focusedOperation = DEFAULT_FOCUSED_OPERATION;
    },
  },
});
</script>
