<script setup lang="ts">
import { Codemirror } from "vue-codemirror"
import { MachineStore } from "../stores/store"
import "../styles/codeEditor.css"

const machineStore = MachineStore();

</script>

<template>
  <div class="editor">
    <Codemirror
      v-model="machineStore.programCode"
      placeholder="Zaprogramuj maszynę"
      :style="{ height: '300px' }"
      :tab-size="2"
    />
    <button @click="machineStore.loadProgram">Parsuj</button>
  </div>
</template>