<script setup lang="ts">
import "../styles/errorBox.css"
import { MachineStore } from "../stores/store"
const machineStore = MachineStore()
</script>

<template>
    <div v-if="machineStore.errorCode" class="error-box">
        {{ $t(machineStore.errorCode) }} {{ machineStore.errorLine }}
    </div>
</template>