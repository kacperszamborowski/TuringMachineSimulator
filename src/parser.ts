export interface Rule {
  currentState: string
  readSymbols: string[]
  nextState: string
  writeSymbols: string[]
  moves: ("L" | "R" | "S")[]
}

export interface ParseResult {
  success: boolean
  rules?: Rule[]
  errorCode?: string
  lineNumber?: number
}

function handleBlank(s: string): string {
  return s === "_" ? "" : s
}

export function parseProgram(code: string, numTapes: number): ParseResult {
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
      return { success: false, errorCode: "invalidRuleMissing", lineNumber }
    }
    if (parts.length > 2) {
      return { success: false, errorCode: "invalidRuleTooMany", lineNumber }
    }

    const left = parts[0].trim().split(",")
    const currentState = left[0]
    const readSymbolsRaw = left.slice(1)

    if (readSymbolsRaw.length !== numTapes) {
      return { success: false, errorCode: "invalidRuleInputLength", lineNumber }
    }
    if (readSymbolsRaw.some(sym => sym === "")) {
      return { success: false, errorCode: "InvalidRuleInputBlank", lineNumber }
    }
    const readSymbols = readSymbolsRaw.map(handleBlank)

    const right = parts[1].trim().split(",")
    const nextState = right[0]
    const writeSymbolsRaw = right.slice(1, 1 + numTapes)
    const moves = right.slice(1 + numTapes) as ("L" | "R" | "S")[]

    if (writeSymbolsRaw.length !== numTapes) {
      return { success: false, errorCode: "invalidRuleOutputLength", lineNumber }
    }
    if (writeSymbolsRaw.some(sym => sym === "")) {
      return { success: false, errorCode: "invalidRuleOutputBlank", lineNumber }
    }
    if (moves.length !== numTapes) {
      return { success: false, errorCode: "invalidRuleOutputMovesLength", lineNumber }
    }
    const writeSymbols = writeSymbolsRaw.map(handleBlank)

    for (const move of moves) {
      if (!["L", "R", "S"].includes(move)) {
        return { success: false, errorCode: "invalidRuleMove", lineNumber }
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

  return { success: true, rules }
}
