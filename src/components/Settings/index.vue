<template>
  <div class="settings">
    <h3>Настройки</h3>
    <input
      type="range"
      min="1"
      max="15"
      :value="settings.duration"
      @input="onChangeDuration"
    />
    <span>Длительность {{ settings.duration }} минут.</span>

    <input
      type="range"
      min="1"
      max="5"
      :value="settings.level"
      @input="onChangeLevel"
    />
    <span>Сложность {{ settings.level }}.</span>

    <div
      class="settings_label"
      v-for="operationType in initialOperations"
      :key="operationType"
    >
      <span class="settings_label-text">
        {{ getOperationByType(operationType) }}
      </span>
      <input
        type="checkbox"
        :checked="checkOperationChoose(operationType)"
        @change="(e) => onChooseOperation(e.target.checked, operationType)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { OperationsEnums } from "@/enums";
import { SettingsInterface } from "@/types";
import { getOperationByType } from "@/utils";

export default defineComponent({
  name: "Settings",
  props: {
    settings: {
      type: Object as PropType<SettingsInterface>,
      required: true,
    },
    onChangeSettings: {
      type: Function as PropType<(settings: SettingsInterface) => void>,
      required: true,
    },
  },
  methods: {
    getOperationByType,
    checkOperationChoose(operationType: number) {
      return this.settings.operations.some(
        (operationFromSettings) => operationFromSettings === operationType
      );
    },
    onChooseOperation(choose: boolean, changedOperationType: number) {
      let changedOperations = [...this.settings.operations];

      if (choose) {
        changedOperations.push(changedOperationType);
      } else {
        changedOperations = changedOperations.filter(
          (operation) => operation !== changedOperationType
        );
      }

      this.onChangeSettings({
        ...this.settings,
        operations: changedOperations,
      });
    },
    onChangeDuration(e: Event) {
      const duration = +(e.target as HTMLInputElement).value;

      this.onChangeSettings({
        ...this.settings,
        duration,
      });
    },
    onChangeLevel(e: Event) {
      const level = +(e.target as HTMLInputElement).value;

      this.onChangeSettings({
        ...this.settings,
        level,
      });
    },
  },
  computed: {
    initialOperations() {
      return Object.values(OperationsEnums).filter(
        (operation) => !isNaN(+operation)
      );
    },
  },
});
</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;

  width: 50%;

  margin: 0 auto;
}

.settings_label {
  display: flex;
  align-items: center;
}

.settings_label-text {
  font-size: 30px;
  width: 30px;
}
</style>
