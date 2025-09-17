<script setup lang="ts">
import { Codemirror } from "vue-codemirror"
import { MachineStore } from "../stores/store"
import "../styles/codeEditor.css"

const machineStore = MachineStore();

</script>

<template>
  <div class="editor">
    <Codemirror v-model="machineStore.programCode" placeholder="Zaprogramuj maszynę" :style="{ height: '300px' }"
      :tab-size="2" />
    <button @click="machineStore.loadProgram">Parsuj</button>
  </div>
  <input v-model="machineStore.initialInput" placeholder="Wprowadź początkowy stan, np. 11111" />
  <button @click="machineStore.loadInput">Załaduj wejście</button>
  <button @click="machineStore.step">▶️ Krok</button>
  <button @click="machineStore.run(500)">⏩ Start</button>
  <button @click="machineStore.stop">⏹ Stop</button>
  <p>Stan: {{ machineStore.currentState }}</p>
</template>