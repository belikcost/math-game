<template>
  <div class="manage-game-field">
    <div
      class="manage-game-field_item"
      v-for="(_, index) in arrayFromTenthItems"
      @click="onUpdateFocusOperationValue(index)"
      :key="index"
    >
      {{ index }}
    </div>
    <div class="manage-game-field_item" @click="onFocusPrevOperation">&lt;</div>
    <div class="manage-game-field_item" @click="onFocusNextOperation">&gt;</div>
    <div class="manage-game-field_item" @click="onCheckTaskAnswers">=</div>
    <div
      class="manage-game-field_item"
      @click="onFillOperationsWithCorrectValues"
    >
      ?
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ManageGameField",
  props: {
    onUpdateFocusOperationValue: {
      type: Function as PropType<(number: number) => void>,
      required: true,
    },
    onFocusNextOperation: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onFocusPrevOperation: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onCheckTaskAnswers: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onFillOperationsWithCorrectValues: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup() {
    const arrayFromTenthItems = Array.from(Array(10));

    return { arrayFromTenthItems };
  },
});
</script>

<style scoped>
.manage-game-field {
  display: flex;
  justify-content: space-around;

  width: 500px;
  margin: 50px auto;
}

.manage-game-field_item {
  cursor: pointer;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;

  background-color: darkred;
  color: #fff;

  font-size: 24px;
}
</style>
