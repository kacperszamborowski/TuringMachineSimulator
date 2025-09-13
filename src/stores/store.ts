import { defineStore } from 'pinia'
import { ref } from 'vue'

export const TapesCounterStore = defineStore('tapesCounter', () => {
  const numberOfTapes = ref(1)
  function setNumber(newNumber: number) {
    numberOfTapes.value = newNumber
  }
  function getNumber() {
    return numberOfTapes.value
  }
  return { numberOfTapes, setNumber, getNumber }
})