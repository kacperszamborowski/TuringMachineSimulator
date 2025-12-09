<script setup lang="ts">
import { Codemirror } from "vue-codemirror"
import { MachineStore } from "../stores/store"
import AppSection from "./AppSection.vue";
import { ref, watch } from "vue"
import TutorialModal from "../components/TutorialModal.vue"
import "../styles/codeEditor.css"
import '@fortawesome/fontawesome-free/css/all.css';
import "../styles/modal.css"

const machineStore = MachineStore();

const tutorialOpen = ref(false)
watch(tutorialOpen, open => {
  document.body.style.overflow = open ? "hidden" : ""
})

</script>

<template>
  <AppSection>
    <div class="editor">
      <div class="editor-controls">
        <button @click="machineStore.loadProgram">{{ $t("compile") }}</button>
        <button @click="tutorialOpen = true">{{ $t("howDoesThisWork") }}</button>
        <div class="load-input">
          <input v-model="machineStore.initialInput" :placeholder="$t('enterInput')" />
          <button @click="machineStore.loadInput">{{ $t("loadInput") }}</button>
        </div>
      </div>
      <Codemirror v-model="machineStore.programCode" :style="{ height: '300px' }" :tab-size="2" />
    </div>
  </AppSection>
  <TutorialModal :open="tutorialOpen" @close="tutorialOpen = false"></TutorialModal>
</template>