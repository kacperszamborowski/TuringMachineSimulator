import { parseProgram, type Rule } from '../logic/parser'
import { TuringMachine, Tape as TapeClass } from '@/logic/turingMachine'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const MachineStore = defineStore('machineStore', () => {
  const numberOfTapes = ref(1)
  const machine = reactive(new TuringMachine(1))
  const programCode = ref("")
  const rules = ref<Rule[]>([])
  const initialInput = ref("")
  const currentState = ref("q0")
  const initState = ref("")
  const acceptState = ref("")
  const isRunning = ref(false)
  const status = ref<"stopped" | "running" | "success" | "fail">("stopped")
  const errorCode = ref<string | null>(null)
  const errorLine = ref<number | null>(null)
  const rawSpeed = ref(500)
  const speed = computed(() => 1000 - rawSpeed.value)
  const stepCount = ref(0)
  const neededTapes = ref(0)

  function setError(errCode: string | null, errLine: number | null) {
    errorCode.value = errCode
    errorLine.value = errLine
  }

  function clearError() {
    errorCode.value = null
    errorLine.value = null
  }

  function setNumberOfTapes(newNumber: number) {
    numberOfTapes.value = newNumber
    machine.tapes = Array.from({ length: newNumber }, () => new TapeClass())
  }

  function addTape() {
    if (isRunning.value) {
      return
    }
    machine.tapes.push(new TapeClass())
    numberOfTapes.value = machine.tapes.length
  }

  function removeTape() {
    if (machine.tapes.length <= 1) {
      return
    }
    if (isRunning.value) {
      return
    }
    machine.tapes.pop()
    numberOfTapes.value = machine.tapes.length
  }

  function resetMachine() {
    machine.tapes = Array.from({ length: numberOfTapes.value }, () => new TapeClass())
    currentState.value = initState.value
    stepCount.value = 0
    clearError()
    stop()
  }

  function loadProgram() {
    const result = parseProgram(programCode.value, numberOfTapes.value)

    if (!result.success) {
      const errCode = result.errorCode || "Error"
      const errLine = result.lineNumber || 0
      setError(errCode, errLine)
      return
    }

    if (result.rules) {
      rules.value = result.rules
      initState.value = result.initState!
      acceptState.value = result.acceptState!
      neededTapes.value = result.neededTapes!
      loadInput()
    }
  }

  function loadInput() {
    if (machine.tapes.length === 0) return

    resetMachine()

    const tape = machine.tapes[0]
    let current = tape.head

    for (const char of initialInput.value) {
      current.value = char
      if (!current.right) {
        current.right = new TapeClass().head
        current.right.left = current
      }
      current = current.right
    }
  }

  function step() {
    if (currentState.value === acceptState.value) {
      stop()
      status.value = "success"
      return
    }

    stepCount.value++

    const currentSymbols = machine.tapes.map(tape => tape.head.value || "")
    const rule = rules.value.find(r =>
      r.currentState === currentState.value &&
      r.readSymbols.every((symbol, i) => symbol === currentSymbols[i])
    )

    if (!rule) {
      stop()
      status.value = "fail"
      return
    }

    rule.writeSymbols.forEach((symbol, i) => machine.tapes[i].writeSymbol(symbol))
    rule.moves.forEach((move, i) => {
      if (move === "L") machine.tapes[i].moveLeft()
      if (move === "R") machine.tapes[i].moveRight()
      //S - stay
    })

    currentState.value = rule.nextState
  }

  function run() {
    if (isRunning.value) return

    while (numberOfTapes.value > neededTapes.value) { //removes unnecessary tapes added after compilation
      removeTape()
    }

    while (numberOfTapes.value < neededTapes.value) { //adds missing tapes removed after compilation
      addTape()
    }

    isRunning.value = true
    status.value = "running"

    const loop = () => {
      if (!isRunning.value) return
      step()
      setTimeout(loop, speed.value)
    }
    loop()
  }

  function stop() {
    isRunning.value = false
    status.value = "stopped"
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
    initialInput,
    loadInput,
    currentState,
    isRunning,
    status,
    step,
    run,
    stop,
    errorCode,
    errorLine,
    resetMachine,
    rawSpeed,
    speed,
    stepCount
  }
})