<template>
  <div>
    <Greeting :previousResult="previousResult" :trainDay="trainDay" />
    <Settings :settings="settings" :onChangeSettings="onChangeSettings" />
    <button @click="onStartTheGame">Play!</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Greeting from "@/components/Greeting/index.vue";
import Settings from "@/components/Settings/index.vue";
import { SettingsInterface } from "@/types";

export default defineComponent({
  name: "Start",
  components: {
    Greeting,
    Settings,
  },
  data() {
    return {
      trainDay: 1,
      previousResult: null,
      result: null,
    };
  },
  props: {
    settings: {
      type: Object as PropType<SettingsInterface>,
      required: true,
    },
    onChangeSettings: {
      type: Function as PropType<(settings: SettingsInterface) => void>,
      required: true,
    },
    onStartTheGame: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
});
</script>
