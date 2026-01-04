export const algorithms = {
    custom: ``,

    binaryPalindrome1: `// Wejście / input: 01110
// 1 taśma / 1 tape
init: qInit
accept: qAccept

qInit,0 -> q0R,_,R
qInit,1 -> q1R,_,R
qInit,_ -> qAccept,_,S

q0R,0 -> q0R,0,R
q0R,1 -> q0R,1,R
q0R,_ -> q0L,_,L

q1R,1 -> q1R,1,R
q1R,0 -> q1R,0,R
q1R,_ -> q1L,_,L

q0L,0 -> qReset,_,L
q0L,_ -> qAccept,_,S

q1L,1 -> qReset,_,L
q1L,_ -> qAccept,_,S

qReset,0 -> qReset,0,L
qReset,1 -> qReset,1,L
qReset,_ -> qInit,_,R`,

    evenUnaryNumber: `//Wejście / input: 111111
//1 taśmy / 1 tape
init: q0
accept: qAccept

q0,1 -> q1,1,S
q1,1 -> q2,_,R
q2,1 -> q1,_,R
q1,_ -> qAccept,_,S`,

    binaryPalindrome2: `// Wejście / input: 10001
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

    wordLength: `// Wejście / input: 11111111
// 2 taśma / 2 tapes
init: q0
accept: qAccept

q0,1,_ -> q1,_,1,R,R

q1,1,_ -> q2,_,_,R,S
q1,_,_ -> qAccept,_,_,S,L

q2,1,_ -> q2,1,_,S,L
q2,1,0 -> qR,1,1,S,S
q2,1,1 -> q3,1,0,S,L
q2,_,_ -> q3,_,_,S,L

qR,1,1 -> qR,1,1,S,R
qR,1,0 -> qR,1,0,S,R
qR,1,_ -> q1,1,_,S,S

q3,1,1 -> q3,1,0,S,L
q3,1,0 -> qR,1,1,S,S
q3,1,_ -> qR,1,1,S,S
q3,_,1 -> q3,_,0,S,L
q3,_,0 -> qAccept,_,1,S,S
q3,_,_ -> qAccept,_,1,S,S`,

    binaryAddition: `//Wejście / input: 101+10
//3 taśmy / 3 tapes
init: q0
accept: qAccept

q0,1,_,_ -> q0,_,_,1,R,S,R
q0,0,_,_ -> q0,_,_,0,R,S,R
q0,+,_,_ -> q1,_,_,_,R,S,S

q1,1,_,_ -> q1,_,1,_,R,R,S
q1,0,_,_ -> q1,_,0,_,R,R,S
q1,_,_,_ -> q2,_,_,_,L,L,L

q2,_,0,1 -> q2,1,_,_,L,L,L
q2,_,1,0 -> q2,1,_,_,L,L,L
q2,_,0,0 -> q2,0,_,_,L,L,L
q2,_,_,1 -> q2,1,_,_,L,S,L
q2,_,1,_ -> q2,1,_,_,L,L,S
q2,_,_,0 -> q2,0,_,_,L,S,L
q2,_,0,_ -> q2,0,_,_,L,L,S
q2,_,1,1 -> q3,0,1,1,L,S,S
q2,_,_,_ -> qAccept,_,_,_,R,S,S

q3,_,1,1 -> q4,1,_,_,S,L,L

q4,1,0,1 -> q3,0,1,1,L,S,S
q4,1,1,0 -> q3,0,1,1,L,S,S
q4,1,0,0 -> q2,1,_,_,L,L,L
q4,1,_,0 -> q2,_,1,0,S,S,S
q4,1,0,_ -> q2,_,0,1,S,S,S
q4,1,_,1 -> q2,_,1,1,S,S,S
q4,1,1,_ -> q2,_,1,1,S,S,S
q4,1,1,1 -> q5,1,1,1,L,S,S
q4,1,_,_ -> qAccept,1,_,_,S,S,S

q5,_,1,1 -> q4,1,_,_,S,L,L`,

    unaryMultiplication: `//Wejście / input: 111*11
//3 taśmy / 3 tapes
init: q0
accept: qAccept

q0,1,_,_ -> q0,_,_,1,R,S,R
q0,*,_,_ -> q1,_,_,_,R,S,S

q1,1,_,_ -> q1,_,1,_,R,R,S
q1,_,_,_ -> q2,_,_,_,L,L,L

q2,_,1,1 -> q2,1,1,1,L,S,L
q2,_,1,_ -> q3,_,_,_,S,L,R

q3,_,1,1 -> q3,1,1,1,L,S,R
q3,_,1,_ -> q2,_,_,_,S,L,L

q2,_,_,1 -> qAccept,_,_,1,R,S,S
q3,_,_,1 -> qAccept,_,_,1,R,S,S`,
}

export type ExampleKey = keyof typeof algorithms