<script setup lang="ts">
import { MachineStore } from "../stores/store"
import AppSection from "./AppSection.vue";
import "../styles/errorBox.css"

const machineStore = MachineStore()
</script>

<template>
    <transition name="fade">
        <AppSection v-if="machineStore.errorCode" class="error">
            <span>{{ $t(machineStore.errorCode) }} {{ machineStore.errorLine }}</span>
        </AppSection>
    </transition>
</template>