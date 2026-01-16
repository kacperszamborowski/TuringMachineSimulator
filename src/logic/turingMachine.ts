let cellIdCounter = 0

export class TapeCell {
  id: number
  value: string
  left: TapeCell | null
  right: TapeCell | null

  constructor(value: string = '', left: TapeCell | null = null, right: TapeCell | null = null) {
    this.id = cellIdCounter++
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

  toArray(): string[] {
    let cursor = this.head

    while (cursor.left) {
      cursor = cursor.left
    }

    const symbols: string[] = []

    while (cursor) {
      symbols.push(cursor.value)
      if (cursor.right) {
        cursor = cursor.right
      }
      else break
    }

    return symbols
  }

}

export class TuringMachine {
  tapes: Tape[]

  constructor(numTapes: number = 1) {
    this.tapes = Array.from({ length: numTapes }, () => new Tape())
  }
}
