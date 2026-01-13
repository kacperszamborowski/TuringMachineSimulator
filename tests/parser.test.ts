import { parseProgram } from '../src/logic/parser'

describe('Analiza składni - poprawne przypadki', () => {
    test('poprawnie parsuje prosty program z jedną taśmą', () => {
        const program = `
      // Testowy program
      init: q0
      accept: qAccept

      q0,1 -> qAccept,1,S
    `

        const result = parseProgram(program, 1)

        expect(result.success).toBe(true)
        expect(result.initState).toBe('q0')
        expect(result.acceptState).toBe('qAccept')
        expect(result.neededTapes).toBe(1)
        expect(result.rules).toHaveLength(1)

        const rule = result.rules![0]
        expect(rule.currentState).toBe('q0')
        expect(rule.readSymbols).toEqual(['1'])
        expect(rule.writeSymbols).toEqual(['1'])
        expect(rule.moves).toEqual(['S'])
        expect(rule.nextState).toBe('qAccept')
    })
})

describe('Analiza składni - błędy składniowe', () => {
    test('zwraca błąd przy braku stanu początkowego', () => {
        const program = `
      accept: qAccept
      q0,1 -> qAccept,1,S
    `

        const result = parseProgram(program, 1)

        expect(result.success).toBe(false)
        expect(result.errorCode).toBe('missingInit')
    })

    test('zwraca błąd przy braku stanu akceptującego', () => {
        const program = `
      init: q0
      q0,1 -> qAccept,1,S
    `

        const result = parseProgram(program, 1)

        expect(result.success).toBe(false)
        expect(result.errorCode).toBe('missingAccept')
    })

    test('zwraca błąd przy niezgodnej liczbie taśm', () => {
        const program = `
      init: q0
      accept: qAccept
      q0,1,0 -> qAccept,1,0,S,S
    `

        const result = parseProgram(program, 1)

        expect(result.success).toBe(false)
        expect(result.errorCode).toBe('invalidRuleInputLength')
    })

    test('zwraca błąd przy niepoprawnym ruchu głowicy', () => {
        const program = `
      init: q0
      accept: qAccept
      q0,1 -> qAccept,1,X
    `

        const result = parseProgram(program, 1)

        expect(result.success).toBe(false)
        expect(result.errorCode).toBe('invalidRuleMove')
    })

    test('zwraca błąd przy zduplikowanym stanie początkowym', () => {
        const program = `
      init: q0
      init: q1
      accept: qAccept
      q0,1 -> qAccept,1,S
    `

        const result = parseProgram(program, 1)

        expect(result.success).toBe(false)
        expect(result.errorCode).toBe('duplicateInit')
    })

    test('zwraca błąd przy zduplikowanym stanie akceptującym', () => {
        const program = `
      init: q0
      accept: qAccept
      accept: qAccept2
      q0,1 -> qAccept,1,S
    `

        const result = parseProgram(program, 1)

        expect(result.success).toBe(false)
        expect(result.errorCode).toBe('duplicateAccept')
    })
})
