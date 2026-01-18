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
  initState?: string
  acceptState?: string
  neededTapes?: number
  errorCode?: string
  lineNumber?: number
}

function handleBlank(s: string): string {
  return s === "_" ? "" : s
}

export function parseProgram(code: string, numTapes: number): ParseResult {
  const rules: Rule[] = []
  const lines = code.split("\n").map(l => l.trim())
  let lineNumber: number = 0;
  let initState: string | null = null
  let acceptState: string | null = null
  let neededTapes: number = 0;

  for (const line of lines) {
    lineNumber++;

    if (line.length === 0) {
      continue
    }

    if (line.startsWith("//"))
      continue

    if (line.startsWith("init:")) {
      if (initState !== null) {
        return { success: false, errorCode: "duplicateInit", lineNumber }
      }
      initState = line.replace("init:", "").trim()
      continue
    }

    if (line.startsWith("accept:")) {
      if (acceptState !== null) {
        return { success: false, errorCode: "duplicateAccept", lineNumber }
      }
      acceptState = line.replace("accept:", "").trim()
      continue
    }

    //Podział reguły na części
    const parts = line.split("->")
    if (parts.length < 2) {
      return { success: false, errorCode: "invalidRuleMissing", lineNumber }
    }
    if (parts.length > 2) {
      return { success: false, errorCode: "invalidRuleTooMany", lineNumber }
    }

    //Przetwarzanie lewej strony reguły
    const left = parts[0].trim().split(",")
    const currentState = left[0]
    const readSymbolsRaw = left.slice(1)

    neededTapes = readSymbolsRaw.length

    if (readSymbolsRaw.length !== numTapes) {
      return { success: false, errorCode: "invalidRuleInputLength", lineNumber }
    }
    if (readSymbolsRaw.some(sym => sym === "")) {
      return { success: false, errorCode: "invalidRuleInputBlank", lineNumber }
    }
    if (readSymbolsRaw.some(sym => sym.length > 1)) {
      return { success: false, errorCode: "invalidRuleInputSymbolLength", lineNumber }
    }
    const readSymbols = readSymbolsRaw.map(handleBlank)

    //Przetwarzanie prawej strony reguły
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
    if (writeSymbolsRaw.some(sym => sym.length > 1)) {
      return { success: false, errorCode: "invalidRuleOutputSymbolLength", lineNumber }
    }
    if (moves.length !== numTapes) {
      return { success: false, errorCode: "invalidRuleOutputMovesLength", lineNumber }
    }
    const writeSymbols = writeSymbolsRaw.map(handleBlank)

    for (const move of moves) {
      if (move.includes("//")) {
        return { success: false, errorCode: "invalidComment", lineNumber }
      }
      if (!["L", "R", "S"].includes(move)) {
        return { success: false, errorCode: "invalidRuleMove", lineNumber }
      }
    }

    //Dodanie reguły do listy
    rules.push({
      currentState,
      readSymbols,
      nextState,
      writeSymbols,
      moves,
    })
  }

  if (!initState) {
    return { success: false, errorCode: "missingInit", lineNumber: -1 }
  }

  if (!acceptState) {
    return { success: false, errorCode: "missingAccept", lineNumber: -1 }
  }

  return { success: true, rules, initState, acceptState, neededTapes }
}
