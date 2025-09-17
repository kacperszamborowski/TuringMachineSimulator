<script setup lang="ts">
import "../styles/tape.css"
import { Tape as TapeClass, TapeCell } from '../turingMachine'
import { MachineStore } from "../stores/store"
import { computed } from "vue"

const machineStore = MachineStore()
const visibleCells = 21

function getTapeSegment(tape: TapeClass): TapeCell[] {
  const cells: TapeCell[] = []
  let current: TapeCell | null = tape.head

  //fill to the left
  for (let i = 0; i < Math.floor(visibleCells / 2); i++) {
    if (!current.left) {
      current.left = new TapeCell('', null, current)
    }
    current = current.left
  }

  //fill to the right
  for (let i = 0; i < visibleCells; i++) {
    if (!current) {
      break
    }
    cells.push(current)

    if (!current.right) {
      current.right = new TapeCell('', current, null)
    }
    current = current.right
  }

  return cells
}

const tapeSegments = computed(() =>
  machineStore.machine.tapes.map(tape => getTapeSegment(tape))
)
</script>

<template>
  <button @click="machineStore.addTape">{{ $t("addTape") }}</button>
  <button @click="machineStore.removeTape">{{ $t("removeTape") }}</button>

  <div class="tape-container">
    <div v-for="(cells, tIndex) in tapeSegments" :key="tIndex" class="tape">
      <div class="tape-track-wrapper">
        <transition-group name="slide" tag="div" class="tape-track">
          <div v-for="cell in cells" :key="cell.id" class="cell"
            :class="{ active: cell === machineStore.machine.tapes[tIndex].head }">
            {{ cell.value }}
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>
