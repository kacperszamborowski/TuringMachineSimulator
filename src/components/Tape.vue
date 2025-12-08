<script setup lang="ts">
import "../styles/tape.css"
import { Tape as TapeClass, TapeCell } from '../turingMachine'
import { MachineStore } from "../stores/store"
import { computed } from "vue"
import AppSection from "./AppSection.vue"
import { algorithms, type ExampleKey } from "@/example-algorithms"

const machineStore = MachineStore()
const visibleCells = 23

function loadAlgorithm(key: ExampleKey) {
  machineStore.programCode = algorithms[key]
}

function onAlgorithmChange(e: Event) {
  const target = e.target as HTMLSelectElement | null
  if (!target) return

  loadAlgorithm(target.value as ExampleKey)
}

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
  <AppSection class="wide">
    <div class="tape-box">
      <div class="tape-buttons">
        <button @click="machineStore.addTape">{{ $t("addTape") }}</button>
        <button @click="machineStore.removeTape">{{ $t("removeTape") }}</button>
      </div>
      <div class="algorithms-menu">
        <select @change="onAlgorithmChange($event)">
          <option value="" disabled selected>{{ $t("chooseExampleAlgorithm") }}</option>
          <option value="custom">{{ $t("custom") }}</option>
          <option value="algorithm1">1</option>
          <option value="algorithm2">2</option>
          <option value="algorithm3">3</option>
        </select>
      </div>
      <div class="machine-info">
        <div>
          <span class="label">{{ $t("stepCount") }}</span>
          <span class="value">{{ machineStore.stepCount }}</span>
        </div>
        <div>
          <span class="label">{{ $t("statusState") }}</span>
          <span class="value">{{ machineStore.currentState }}</span>
        </div>
        <div class="status-box" :class="machineStore.status">
          <span class="label">Status:</span>
          <span class="value">
            <template v-if="machineStore.status === 'running'">{{ $t("machineRunning") }}</template>
            <template v-else-if="machineStore.status === 'success'">{{ $t("machineSuccess") }}</template>
            <template v-else-if="machineStore.status === 'fail'">{{ $t("machineFail") }}</template>
            <template v-else>{{ $t("machineStopped") }}</template>
          </span>
        </div>
      </div>
    </div>

    <div class="tape-container" :style="{ '--anim-speed': machineStore.speed + 'ms' }">
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
  </AppSection>
</template>
