export class TapeCell {
  value: string
  left: TapeCell | null
  right: TapeCell | null

  constructor(value: string = '', left: TapeCell | null = null, right: TapeCell | null = null) {
    this.value = value
    this.left = left
    this.right = right
  }
}

export class Tape {
  head: TapeCell

  constructor() {
    this.head = new TapeCell('')
  }

  moveRight() {
    if (!this.head.right) this.head.right = new TapeCell('', this.head)
    this.head = this.head.right
  }

  moveLeft() {
    if (!this.head.left) this.head.left = new TapeCell('', null, this.head)
    this.head.left.right = this.head
    this.head = this.head.left
  }

  writeSymbol(symbol: string) {
    this.head.value = symbol
  }
}

export class TuringMachine {
  tapes: Tape[]

  constructor(numTapes: number = 1) {
    this.tapes = Array.from({ length: numTapes }, () => new Tape())
  }
}
