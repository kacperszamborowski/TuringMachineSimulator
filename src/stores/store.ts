import { parseProgram, type Rule } from '../parser'
import { TuringMachine, Tape as TapeClass } from '@/turingMachine'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const MachineStore = defineStore('machineStore', () => {
  const numberOfTapes = ref(1)
  const machine = reactive(new TuringMachine(1))
  const programCode = ref("")
  const rules = ref<Rule[]>([])

  function setNumberOfTapes(newNumber: number) {
    numberOfTapes.value = newNumber
    machine.tapes = Array.from({ length: newNumber }, () => new TapeClass())
  }

  function addTape() {
    machine.tapes.push(new TapeClass())
    numberOfTapes.value = machine.tapes.length
  }

  function removeTape() {
    if (machine.tapes.length <= 1) {
      return
    }
    machine.tapes.pop()
    numberOfTapes.value = machine.tapes.length
  }

  function loadProgram() {
    try {
      rules.value = parseProgram(programCode.value, numberOfTapes.value)
      console.log(rules.value)
    } catch (e) {
      console.error("Błąd parsowania:", e)
    }
  }

  return {
     numberOfTapes,
     setNumberOfTapes,
     addTape,
     removeTape,
     loadProgram,
     machine,
     programCode,
     rules,
     }
})