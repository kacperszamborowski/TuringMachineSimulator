<script setup lang="ts">
import LanguagueChoice from './components/LanguagueChoice.vue';
import Tape from './components/Tape.vue'
import ErrorBox from './components/ErrorBox.vue';
import CodeEditor from './components/CodeEditor.vue';
import "./styles/app.css"
import MachineControls from './components/MachineControls.vue';
</script>

<template>
  <main class="app">
    <LanguagueChoice />
    <h1>{{ $t("header") }}</h1>
    <Tape />
    <MachineControls />
    <ErrorBox />
    <CodeEditor />
  </main>
</template>