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
      <Codemirror v-model="machineStore.programCode" placeholder="Zaprogramuj maszynę" :style="{ height: '300px' }"
        :tab-size="2" />
      <div class="editor-controls">
        <div class="left-controls">
          <button @click="machineStore.loadProgram">{{ $t("compile") }}</button>
          <div class="load-input">
            <input v-model="machineStore.initialInput" :placeholder="$t('enterInput')" />
            <button @click="machineStore.loadInput">{{ $t("loadInput") }}</button>
          </div>
        </div>
        <div class="right-controls">
          <button @click="machineStore.run(500)"><i class="fa fa-play" /></button>
          <button @click="machineStore.step"><i class="fa fa-step-forward" /></button>
          <button @click="machineStore.stop"><i class="fa fa-pause" /></button>
          <button @click="machineStore.resetMachine"><i class="fa fa-sync" /></button>
        </div>
      </div>
    </div>
  </AppSection>
</template>