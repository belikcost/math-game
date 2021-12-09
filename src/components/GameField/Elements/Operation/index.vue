<template>
  <span>{{ operationName }}</span>
  <input
    class="game-field_input"
    type="number"
    ref="inputRef"
    disabled="disabled"
    :value="operation.value"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue";
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
  setup(props) {
    const inputRef = ref(null);

    onMounted(() => {
      const input = inputRef.value;

      if (input && props.isFocusing) {
        (input as HTMLInputElement).focus();
      }
    });
  },
});
</script>
