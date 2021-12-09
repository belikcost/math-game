<template>
  <span>{{ operationName }}</span>
  <input
    class="game-field_input"
    type="number"
    disabled="disabled"
    :value="operation.value"
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
    isFocusing: {
      type: Boolean as PropType<boolean>,
      required: true,
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
