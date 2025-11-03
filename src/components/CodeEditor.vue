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
      <Codemirror v-model="machineStore.programCode" :style="{ height: '300px' }" :tab-size="2" />
      <div class="editor-controls">
        <div class="left-controls">
          <button @click="machineStore.loadProgram">{{ $t("compile") }}</button>
          <div class="load-input">
            <input v-model="machineStore.initialInput" :placeholder="$t('enterInput')" />
            <button @click="machineStore.loadInput">{{ $t("loadInput") }}</button>
          </div>
        </div>
      </div>
    </div>
  </AppSection>
</template>