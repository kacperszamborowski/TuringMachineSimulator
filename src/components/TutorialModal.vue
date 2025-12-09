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
                    <p style="font-size:18px" v-html="$t('tutorial.howToUseContent')"></p>
                    <h3> {{ $t("tutorial.howDoesTheCodeWork") }}</h3>
                    <p style="font-size:18px" v-html="$t('tutorial.mentions')"></p>
                    <p style="font-size:18px" v-html="$t('tutorial.howDoesTheCodeWorkContentP1')"></p>
                    <p style="font-size:18px">
                        <span style="color:red">q0</span><span>,</span>
                        <span style="color:blue">1</span><span>,</span>
                        <span>_</span><span> -> </span>
                        <span style="color:orange">q0</span><span>,</span>
                        <span style="color:magenta">1</span><span>,</span>
                        <span style="color:grey">1</span><span>,</span>
                        <span style="color:purple">R</span><span>,</span>
                        <span style="color:green">R</span>
                    </p>
                    <p style="font-size:18px" v-html="$t('tutorial.howDoesTheCodeWorkContentP2')"></p>
                </div>
            </div>
        </div>
    </Teleport>
</template>
