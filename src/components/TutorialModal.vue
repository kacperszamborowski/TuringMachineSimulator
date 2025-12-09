<script setup lang="ts">
defineProps<{
    open: boolean
}>()

const emit = defineEmits<{
    close: []
}>()
</script>

<template>
    <Teleport to="body">
        <div v-if="open" class="modal-overlay" @click.self="emit('close')">
            <div class="modal">
                <header class="modal-header">
                    <h2>{{ $t("tutorial.tutorial") }}</h2>
                    <button class="close-btn" @click="emit('close')">{{ $t("tutorial.close") }}</button>
                </header>

                <div class="modal-content">
                    <h3>{{ $t("tutorial.howToUse") }}</h3>
                    <p>
                        ...<br />
                        ...<br />
                        ...<br />
                    </p>
                    <p>
                        ...<br />
                    </p>
                </div>
            </div>
        </div>
    </Teleport>
</template>
