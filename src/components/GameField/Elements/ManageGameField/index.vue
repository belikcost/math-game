<template>
  <div class="manage-game-field">
    <button
      class="manage-game-field_item"
      v-for="(_, index) in arrayFromTenthItems"
      @click="onUpdateFocusOperationValue(index)"
      :key="index"
    >
      {{ index }}
    </button>
    <button class="manage-game-field_item" @click="onFocusPrevOperation">
      &lt;
    </button>
    <button class="manage-game-field_item" @click="onFocusNextOperation">
      &gt;
    </button>
    <button
      class="manage-game-field_item"
      @click="onShowTaskResultAndResetFocus"
    >
      =
    </button>
    <button class="manage-game-field_item" @click="onShowCorrectTaskAnswers">
      ?
    </button>
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
    onShowTaskResultAndResetFocus: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onShowCorrectTaskAnswers: {
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
  justify-content: space-between;
  flex-wrap: wrap;

  width: 500px;
  margin: 50px auto;
}

.manage-game-field_item {
  cursor: pointer;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;

  margin: 10px 20px;

  background-color: darkred;
  color: #fff;

  font-size: 24px;
}
</style>
