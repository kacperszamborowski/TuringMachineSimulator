<script setup lang="ts">
import { MachineStore } from "../stores/store"
import AppSection from "./AppSection.vue";
const machineStore = MachineStore()
</script>

<template>
    <AppSection class="error" v-if="machineStore.errorCode">
        {{ $t(machineStore.errorCode) }} {{ machineStore.errorLine }}
    </AppSection>
</template>