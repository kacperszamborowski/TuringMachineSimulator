<script setup lang="ts">
import "../styles/machineStatus.css"
import { MachineStore } from "../stores/store"
import AppSection from "./AppSection.vue";
const machineStore = MachineStore()
</script>

<template>
    <AppSection>
        <div class="status-container">
            <div>
                <span class="label">{{ $t("statusState") }}</span>
                <span class="value">{{ machineStore.currentState }}</span>
            </div>
            <div class="status-box" :class="machineStore.status">
                <span class="label">Status:</span>
                <span class="value">
                    <template v-if="machineStore.status === 'running'">{{ $t("machineRunning") }}</template>
                    <template v-else-if="machineStore.status === 'success'">{{ $t("machineSuccess") }}</template>
                    <template v-else-if="machineStore.status === 'fail'">{{ $t("machineFail") }}</template>
                    <template v-else>{{ $t("machineStopped") }}</template>
                </span>
            </div>
        </div>
    </AppSection>
</template>