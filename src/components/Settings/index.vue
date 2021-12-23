<template>
  <div class="settings">
    <h3>Настройки</h3>
    <input
      type="range"
      min="1"
      max="15"
      :value="settingsStore.settings.duration"
      @input="onChangeDuration"
    />
    <span>Длительность {{ settingsStore.settings.duration }} минут.</span>

    <input
      type="range"
      min="1"
      max="5"
      :value="settingsStore.settings.level"
      @input="onChangeLevel"
    />
    <span>Сложность {{ settingsStore.settings.level }}.</span>

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
        :checked="settingsStore.checkOperationChoose(operationType)"
        @change="(e) => onChooseOperations(e, operationType)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { OperationsEnums } from "@/enums";
import { getOperationByType } from "@/utils";
import SettingsStore from "@/domain/SettingsStore";

export default defineComponent({
  name: "Settings",
  props: {
    settingsStore: {
      type: Object as PropType<SettingsStore>,
      required: true,
    },
  },
  methods: {
    getOperationByType,
    onChooseOperations(e: Event, operationType: number) {
      const checked = (e.target as HTMLInputElement).checked;

      this.settingsStore.chooseOperation(checked, operationType);
    },
    onChangeDuration(e: Event) {
      const duration = +(e.target as HTMLInputElement).value;

      this.settingsStore.change({
        ...this.settingsStore.settings,
        duration,
      });
    },
    onChangeLevel(e: Event) {
      const level = +(e.target as HTMLInputElement).value;

      this.settingsStore.change({
        ...this.settingsStore.settings,
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
