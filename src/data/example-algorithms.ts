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

    binary_palindrome: `// Wejście / input: 10001
// 2 taśmy / 2 tapes
init: q0
accept: qAccept

q0,1,_ -> q0,1,1,R,R
q0,0,_ -> q0,0,0,R,R
q0,_,_ -> q1,_,_,L,S

q1,1,_ -> q1,1,_,L,S
q1,0,_ -> q1,0,_,L,S
q1,_,_ -> q2,_,_,R,L

q2,1,1 -> q2,1,1,R,L
q2,0,0 -> q2,0,0,R,L
q2,_,_ -> qAccept,_,_,S,S`,

    algorithm3: `// example algorithm 3...`,
}

export type ExampleKey = keyof typeof algorithms