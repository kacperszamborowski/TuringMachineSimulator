export interface Rule {
  currentState: string
  readSymbols: string[]
  nextState: string
  writeSymbols: string[]
  moves: ("L" | "R" | "S")[]
}

function handleBlank(s: string): string {
  return s === "_" ? "" : s
}

export function parseProgram(code: string, numTapes: number): Rule[] {
  const rules: Rule[] = []
  const lines = code.split("\n")
  let lineNumber: number = 0;

  for (const line of lines) {
    lineNumber++;
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("//"))
      continue

    const parts = trimmed.split("->")
    if (parts.length < 2) {
      throw new Error(`Niepoprawna reguła (brak ->) w linii ${lineNumber}`)
    }
    if (parts.length > 2) {
      throw new Error(`Niepoprawna reguła (więcej niż 1 ->) w linii ${lineNumber}`)
    }

    const left = parts[0].trim().split(",")
    const currentState = left[0]
    const readSymbols = left.slice(1).map(handleBlank)

    if (readSymbols.length !== numTapes) {
      throw new Error(`Niepoprawna liczba symboli wejściowych w linii ${lineNumber}`)
    }

    const right = parts[1].trim().split(",")
    const nextState = right[0]
    const writeSymbols = right.slice(1, 1 + numTapes).map(handleBlank)
    const moves = right.slice(1 + numTapes) as ("L" | "R" | "S")[]

    if (writeSymbols.length !== numTapes || moves.length !== numTapes) {
      throw new Error(
        `Niepoprawna liczba symboli wyjściowych lub ruchów w linii ${lineNumber}`
      )
    }

    for (const move of moves) {
      if (!["L", "R", "S"].includes(move)) {
        throw new Error(`Niepoprawny ruch "${move}" w linii: ${lineNumber}`)
      }
    }

    rules.push({
      currentState,
      readSymbols,
      nextState,
      writeSymbols,
      moves,
    })
  }

  return rules
}
