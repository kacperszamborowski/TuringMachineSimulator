<script setup lang="ts">
import "../styles/tape.css"
import { reactive, ref } from 'vue'
import { TuringMachine, Tape as TapeClass, TapeCell } from '../turingMachine'

const numTapes = 1
const machine = reactive(new TuringMachine(numTapes))
const symbols = ref<string[]>(Array(numTapes).fill('1'))

const visibleCells = 21

function getTapeSegment(tape: TapeClass): TapeCell[] {
  const cells: TapeCell[] = []
  let current: TapeCell | null = tape.head

  // dodaj po lewej
  for (let i = 0; i < Math.floor(visibleCells / 2); i++) {
    if (!current.left)
     current.left = new TapeCell('', null, current)
    current = current.left
  }

  // teraz current jest na lewej krawędzi
  for (let i = 0; i < visibleCells; i++) {
    if (!current)
     break
    cells.push(current)
    if (!current.right) current.right = new TapeCell('', current, null)
    current = current.right
  }

  return cells
}

function addTape() {
    machine.tapes.push(new TapeClass())
}

function removeTape() {
    if(machine.tapes.length <= 1)
        return
    machine.tapes.pop()
}

function moveLeft(tapeIndex: number) {
  machine.tapes[tapeIndex].moveLeft()
}

function moveRight(tapeIndex: number) {
  machine.tapes[tapeIndex].moveRight()
}

function writeSymbol(tapeIndex: number) {
  machine.tapes[tapeIndex].writeSymbol(symbols.value[tapeIndex])
}
</script>

<template>
    <button @click="addTape">Dodaj taśmę</button>
    <button @click="removeTape">Usuń taśmę</button>
  <div class="tape-container">
    <div v-for="(tape, tIndex) in machine.tapes" :key="tIndex" class="tape">
      <div class="tape-track">
        <div
          v-for="(cell, index) in getTapeSegment(tape)"
          :key="index"
          class="cell"
          :class="{ active: cell === tape.head }"
        >
          {{ cell.value }}
        </div>
      </div>
      <div class="controls">
        <button @click="moveLeft(tIndex)">⬅️ Lewo</button>
        <button @click="moveRight(tIndex)">➡️ Prawo</button>
        <input v-model="symbols[tIndex]" maxlength="1" />
        <button @click="writeSymbol(tIndex)">✍️ Zapisz</button>
      </div>
    </div>
  </div>
</template>