<script setup lang="ts">
import "../styles/machineControls.css"
import { MachineStore } from "../stores/store"
import AppSection from "./AppSection.vue";
const machineStore = MachineStore()
</script>

<template>
    <AppSection>
        <div class="controls-container">
            <div class="machine-controls">
                <button @click="machineStore.run(true)" :disabled="!machineStore.rules.length">
                    <i class="fa fa-play" />
                </button>
                <button @click="machineStore.run(false)" :disabled="!machineStore.rules.length">
                    <i class="fa fa-step-forward" />
                </button>
                <button @click="machineStore.stop" :disabled="!machineStore.rules.length">
                    <i class="fa fa-pause" />
                </button>
                <button @click="machineStore.loadProgram" :disabled="!machineStore.rules.length">
                    <i class="fa fa-sync" />
                </button>
            </div>
            <div class="speed-control">
                <span class="label">{{ $t("speed") }} </span>
                <input id="speed" type="range" min="0" max="1000" step="100" v-model.number="machineStore.rawSpeed" />
            </div>
        </div>
    </AppSection>
</template>