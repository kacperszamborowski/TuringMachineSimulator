<script setup lang="ts">
import { Codemirror } from "vue-codemirror"
import { MachineStore } from "../stores/store"
import "../styles/codeEditor.css"
import AppSection from "./AppSection.vue";
import '@fortawesome/fontawesome-free/css/all.css';

const machineStore = MachineStore();

</script>

<template>
  <AppSection>
    <div class="editor">
      <div class="editor-controls">
        <button @click="machineStore.loadProgram">{{ $t("compile") }}</button>
        <div class="load-input">
          <input v-model="machineStore.initialInput" :placeholder="$t('enterInput')" />
          <button @click="machineStore.loadInput">{{ $t("loadInput") }}</button>
        </div>
      </div>
      <Codemirror v-model="machineStore.programCode" :style="{ height: '300px' }" :tab-size="2" />
    </div>
  </AppSection>
</template>