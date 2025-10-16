import { parseProgram, type Rule } from '../parser'
import { TuringMachine, Tape as TapeClass } from '@/turingMachine'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const MachineStore = defineStore('machineStore', () => {
  const exampleCode = `//example input: 11111
//2 tapes
init: q0
accept: q2
q0,1,_ -> q0,1,1,R,R
q0,_,_ -> q1,_,_,L,L
q1,1,1 -> q1,1,_,L,L
q1,_,_ -> q0,_,_,R,R`

  const numberOfTapes = ref(1)
  const machine = reactive(new TuringMachine(1))
  const programCode = ref(exampleCode)
  const rules = ref<Rule[]>([])
  const initialInput = ref("")
  const currentState = ref("")
  const initState = ref("")
  const acceptState = ref("")
  const isRunning = ref(false)
  let stepId: number | null = null
  const errorCode = ref<string | null>(null)
  const errorLine = ref<number | null>(null)

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
      console.log("Succes")
      stop()
      return
    }

    const currentSymbols = machine.tapes.map(tape => tape.head.value || "")
    const rule = rules.value.find(r =>
      r.currentState === currentState.value &&
      r.readSymbols.every((symbol, i) => symbol === currentSymbols[i])
    )

    //Handle it better later
    if (!rule) {
      console.log("Brak pasującej reguły – zatrzymanie.")
      stop()
      return
    }
    //

    rule.writeSymbols.forEach((symbol, i) => machine.tapes[i].writeSymbol(symbol))
    rule.moves.forEach((move, i) => {
      if (move === "L") machine.tapes[i].moveLeft()
      if (move === "R") machine.tapes[i].moveRight()
      //S - stay
    })

    currentState.value = rule.nextState
  }

  function run(speed: number = 500) {
    if (isRunning.value) return
    isRunning.value = true
    stepId = setInterval(step, speed)
  }

  function stop() {
    isRunning.value = false
    if (stepId) {
      clearInterval(stepId)
      stepId = null
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
    initialInput,
    loadInput,
    currentState,
    isRunning,
    step,
    run,
    stop,
    errorCode,
    errorLine
  }
})