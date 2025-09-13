<script setup lang="ts">
import { ref } from "vue"
import { Codemirror } from "vue-codemirror"
import { parseProgram } from "../parser"
import { TapesCounterStore } from "../stores/store"
import "../styles/codeEditor.css"

const tapesCounter = TapesCounterStore();

const code = ref(`//przykład
q0,1,0 -> q1,1,0,R,L
q1,_,_ -> q2,1,1,N,N
`)

function runParser() {
    console.log("code editor" + tapesCounter.getNumber())
  try {
    const rules = parseProgram(code.value, tapesCounter.getNumber())
    console.log("Reguły:", rules)
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="editor">
    <Codemirror
      v-model="code"
      placeholder="Zaprogramuj maszynę"
      :style="{ height: '300px' }"
      :tab-size="2"
    />
    <button @click="runParser">Parsuj</button>
  </div>
</template>