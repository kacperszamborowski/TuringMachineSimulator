<script setup lang="ts">
import Tape from './components/Tape.vue'
import CodeEditor from './components/CodeEditor.vue';
import "./styles/app.css"
</script>

<template>
  <main class="app">
    <h1>Symulator maszyny Turinga</h1>
    <Tape />
    <CodeEditor />
  </main>
</template>