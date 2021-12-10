<template>
  <span>{{ operationName }}</span>
  <input
    class="game-field_input"
    type="number"
    ref="input"
    :value="operation.value"
    @input="(e) => onChangeFocusOperationValue(+e.target.value)"
    @focus="onFocus"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { OperationInterface } from "@/types";

export default defineComponent({
  name: "Operation",
  props: {
    operation: {
      type: Object as PropType<OperationInterface>,
      required: true,
    },
    operationName: {
      type: String as PropType<string>,
      required: true,
    },
    operationIdentifier: {
      type: Number as PropType<number>,
      required: true,
    },
    isFocusing: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    onChangeFocusOperationValue: {
      type: Function as PropType<(value: number) => void>,
      required: true,
    },
    onSetFocusedOperation: {
      type: Function as PropType<(focusedOperation: number) => void>,
      required: true,
    },
  },
  methods: {
    onFocus() {
      this.onSetFocusedOperation(this.operationIdentifier);
    },
    focusOperationInput() {
      const input = this.$refs.input as HTMLInputElement;
      input.focus();
    },
  },
  mounted() {
    if (this.isFocusing) {
      this.focusOperationInput();
    }
  },
  watch: {
    isFocusing(value) {
      if (value) {
        this.focusOperationInput();
      }
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
