export const algorithms = {
    custom: `//example input: 11111
//2 tapes
init: q0
accept: q2
q0,1,_ -> q0,1,1,R,R
q0,_,_ -> q1,_,_,L,L
q1,1,1 -> q1,1,_,L,L
q1,_,_ -> q2,_,_,R,R`,
    algorithm1: `// example algorithm 1...`,

    algorithm2: `// example algorithm 2...`,

    algorithm3: `// example algorithm 3...`,
}

export type ExampleKey = keyof typeof algorithms