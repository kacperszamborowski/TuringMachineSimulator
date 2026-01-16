import { TapeCell, Tape, TuringMachine } from '../src/logic/turingMachine'

describe('Maszyna Turinga', () => {
    test('tworzy maszynę z jedną taśmą domyślnie', () => {
        const machine = new TuringMachine()

        expect(machine.tapes).toHaveLength(1)
    })

    test('tworzy maszynę z określoną liczbą taśm', () => {
        const machine = new TuringMachine(3)

        expect(machine.tapes).toHaveLength(3)
    })

    test('każda taśma posiada niezależną głowicę', () => {
        const machine = new TuringMachine(2)

        machine.tapes[0].writeSymbol('1')
        machine.tapes[1].writeSymbol('0')

        expect(machine.tapes[0].head.value).toBe('1')
        expect(machine.tapes[1].head.value).toBe('0')
    })
})

describe('Taśma', () => {
    test('po utworzeniu głowica wskazuje na pustą komórkę', () => {
        const tape = new Tape()

        expect(tape.head.value).toBe('')
        expect(tape.head.left).toBeNull()
        expect(tape.head.right).toBeNull()
    })

    test('przesunięcie w prawo', () => {
        const tape = new Tape()
        const startCell = tape.head

        tape.moveRight()

        expect(tape.head).not.toBe(startCell)
        expect(tape.head.left).toBe(startCell)
        expect(startCell.right).toBe(tape.head)
    })

    test('przesunięcie w lewo', () => {
        const tape = new Tape()
        const startCell = tape.head

        tape.moveLeft()

        expect(tape.head).not.toBe(startCell)
        expect(tape.head.right).toBe(startCell)
        expect(startCell.left).toBe(tape.head)
    })

    test('zapisanie symbolu w bieżącej komórce', () => {
        const tape = new Tape()

        tape.writeSymbol('1')

        expect(tape.head.value).toBe('1')
    })

    test('symbol jest zapisany po przesunięciu i powrocie', () => {
        const tape = new Tape()

        tape.writeSymbol('1')
        tape.moveRight()
        tape.moveLeft()

        expect(tape.head.value).toBe('1')
    })

    test('zwraca wszystkie komórki od lewej do prawej bez ruszania głowicy', () => {
        const tape = new Tape()

        tape.writeSymbol('A')
        tape.moveRight()
        tape.writeSymbol('B')
        tape.moveRight()
        tape.writeSymbol('')
        tape.moveRight()
        tape.writeSymbol('C')
        tape.moveLeft()
        tape.moveLeft()

        const result = tape.toArray()

        expect(result).toHaveLength(4)

        expect(result).toEqual(['A', 'B', '', 'C'])

        expect(tape.head.value).toBe('B')
    })
})

describe('Komórki taśmy', () => {
    test('tworzy komórkę z domyślnymi wartościami', () => {
        const cell = new TapeCell()

        expect(cell.value).toBe('')
        expect(cell.left).toBeNull()
        expect(cell.right).toBeNull()
        expect(typeof cell.id).toBe('number')
    })

    test('tworzy komórkę z określoną wartością', () => {
        const cell = new TapeCell('1')

        expect(cell.value).toBe('1')
    })
})