import { createI18n } from "vue-i18n";

const messages = {
  pl: {
    header: "Symulator maszyny Turinga",
    addTape: "Dodaj taśmę",
    removeTape: "Usuń taśmę",
    tape: "Taśma",
    empty: "Pusta",
    duplicateInit: "Znaleziono duplikat \"init\", w linii ",
    duplicateAccept: "Znaleziono duplikat \"accept\", w linii ",
    invalidRuleMissing: "Niepoprawna reguła (brak '->') w linii ",
    invalidRuleTooMany: "Niepoprawna reguła (więcej niż 1 '->') w linii ",
    invalidRuleInputLength: "Niepoprawna liczba taśm lub symboli wejściowych w linii ",
    invalidRuleInputBlank: "Niepoprawna liczba symboli wejściowych (symbol pusty powinien być zapisany jako '_' w linii ",
    invalidRuleInputSymbolLength: "Symbole wejściowe muszą być pojedynczymi znakami, w linii ",
    invalidRuleOutputLength: "Niepoprawna liczba taśm lub symboli wyjściowych w linii ",
    invalidRuleOutputBlank: "Niepoprawna liczba symboli wyjściowych (symbol pusty powinien być zapisany jako '_' w linii ",
    invalidRuleOutputSymbolLength: "Symbole wyjściowe muszą być pojedynczymi znakami, w linii ",
    invalidRuleOutputMovesLength: "Niepoprawna liczba ruchów w linii ",
    invalidRuleMove: "Niepoprawny ruch (dozwolone ruchy: L, R, S) w linii ",
    invalidComment: "Komentarz musi obejmować całą linię w linii ",
    missingInit: "Brak stanu inicjalizującego: ",
    missingAccept: "Brak stanu akceptującego: ",
    invalidNumberOfTapes: "Niepoprawna ilość taśm",
    statusState: "Stan:",
    machineStopped: "Zatrzymano",
    machineRunning: "W trakcie",
    machineSuccess: "Sukces",
    machineFail: "Błąd",
    compile: "Kompiluj",
    enterInput: "Wejście...",
    loadInput: "Wczytaj",
    speed: "Prędkość:",
    stepCount: "Kroki:",
    custom: "Własny",
    chooseExampleAlgorithm: "Wybierz przykładowy algorytm",
    one_tape: "1 taśma",
    two_tapes: "2 taśmy",
    three_tapes: "3 taśmy",
    binaryPalindrome1: "Palindrom binarny (1 taśma)",
    evenUnaryNumber: "Parzysta liczba unarna",
    binaryPalindrome2: "Palindrom binarny (2 taśmy)",
    wordLength: "Długość słowa",
    unaryMultiplication: "Mnożenie liczb unarnych",
    binaryAddition: "Dodawanie binarne",
    howDoesThisWork: "Jak to działa?",
    tutorial: {
      tutorial: "Poradnik",
      mentions: `
      Symbol <b>'_'</b> oznacza pustą komórkę, <b>nie</b> używaj <b>' '</b><br />
      Możliwe ruchy głowicy: R - w prawo, L - w lewo, S - stój w miejscu<br />`,
      close: "Zamknij",
      howToUse: "Jak korzystać z symulatora",
      howToUseContent: `
        Spójrzmy na przykładowy algorytm - palindrom binarny (2 taśmy), który można wybrać z <b>menu</b> na górze strony<br />
        Ten algorytm działa na 2 taśmach, więc w lewym górnym rogu strony trzeba dodać taśmę klikając na przycisk <b>'Dodaj taśmę'</b><br />
        Kolejnym krokiem jest skompilowanie algorytmu - kliknij przycisk <b>'Kompiluj'</b><br />
        Następnie w polu tekstowym <b>'Wejście'</b> trzeba wpisać przykładowe wejście - na przykład <b>10001</b> i kliknąć <b>"Wczytaj"</b><br />
        Jeśli pole tekstowe <b>'Wejście'</b> zawiera dane w momencie kliknięcia <b>'Kompiluj'</b>, zostaną one wczytane automatycznie<br />
        Teraz pozostaje tylko <b>uruchomić maszynę</b> - kliknij <b>ikonę startu</b> w sekcji sterowania maszyną<br />
        W tej sekcji jest również dostępny <b>suwak</b>, którym możesz zmienić <b>prędkość</b> działania maszyny<br />
        W prawym górnym rogu widać <b>informacje</b> o stanie maszyny - ilość kroków, aktualny stan i status<br />
        Po zakończeniu działania maszyny, status powinien być 'Sukces', ponieważ 10001 jest palindromem<br />`,
      howDoesTheCodeWork: "Jak działa kod?",
      howDoesTheCodeWorkContentP1: `
        Spójrzmy na przykładowy algorytm - palindrom binarny (2 taśmy), który można wybrać z <b>menu</b> na górze strony<br />
        // oznacza komentarz, który jest ignorowany przez maszynę<br />
        'init: q0' oznacza, że maszyna wystartuje w stanie q0<br />
        'accept: qAccept' oznacza, że maszyna, gdy osiągnie ten stan, zakończy działanie z sukcesem<br />
        Składnia: 'stan, wejście1, wejście2, wejście... -> nowy_stan, wyjście1, wyjście2, wyjście..., ruch1, ruch2, ruch...'<br />
        Przykładowa linia 6: `,
      howDoesTheCodeWorkContentP2: `
        Oznacza: <br />
        Gdy maszyna jest w stanie <span style="color:red">q0</span><br />
         i głowica (żółte pole) na pierwszej taśmie zawiera symbol <span style="color:blue">1</span>,<br />
         a na drugiej taśmie symbol pusty '_', to:<br />
        - przejdź do stanu <span style="color:orange">q0</span> (pozostań w stanie <span style="color:red">q0</span> w tym przypadku)<br />
        - na pierwszej taśmie zapisz symbol <span style="color:magenta">1</span> (pozostaw bez zmian)<br />
        - na drugiej taśmie zapisz symbol <span style="color:grey">1</span><br />
        - przesuń głowicę pierwszej taśmy w prawo <span style="color:purple">R</span><br />
        - przesuń głowicę drugiej taśmy w prawo <span style="color:green">R</span><br />
        Cały kod działa na takiej zasadzie<br />`
    }
  },
  en: {
    header: "Turing machine simulator",
    addTape: "Add tape",
    removeTape: "Remove tape",
    tape: "Tape",
    empty: "Empty",
    duplicateInit: "Duplicate \"init\" found in line ",
    duplicateAccept: "Duplicate \"accept\" found in line ",
    invalidRuleMissing: "Invalid rule (missing '->') in line ",
    invalidRuleTooMany: "Invalid rule (more than 1 '->') in line ",
    invalidRuleInputLength: "Invalid number of tapes or input symbols in line ",
    invalidRuleInputBlank: "Invalid number of input symbols (blank symbol should be written as '_') in line ",
    invalidRuleInputSymbolLength: "Input symbols must be single characters in line ",
    invalidRuleOutputLength: "Invalid number of tapes or output symbols in line ",
    invalidRuleOutputBlank: "Invalid number of output symbols (blank symbol should be written as '_') in line ",
    invalidRuleOutputSymbolLength: "Output symbols must be single characters in line ",
    invalidRuleOutputMovesLength: "Invalid number of moves in line ",
    invalidRuleMove: "Invalid move (allowed moves: L, R, S) in line ",
    invalidComment: "Comment must cover the whole line in line ",
    missingInit: "Initial state missing: ",
    missingAccept: "Accept state missing: ",
    invalidNumberOfTapes: "Invalid number of tapes",
    statusState: "State:",
    machineStopped: "Stopped",
    machineRunning: "Running",
    machineSuccess: "Success",
    machineFail: "Failed",
    compile: "Compile",
    enterInput: "Input...",
    loadInput: "Load",
    speed: "Speed:",
    stepCount: "Steps:",
    custom: "Custom",
    chooseExampleAlgorithm: "Choose example algorithm",
    one_tape: "1 tape",
    two_tapes: "2 tapes",
    three_tapes: "3 tapes",
    binaryPalindrome1: "Binary palindrome (1 tape)",
    evenUnaryNumber: "Even unary number",
    binaryPalindrome2: "Binary palindrome (2 tapes)",
    wordLength: "Word length",
    unaryMultiplication: "Unary multiplication",
    binaryAddition: "Binary addition",
    howDoesThisWork: "How does this work?",
    tutorial: {
      tutorial: "Tutorial",
      mentions: `
      <b>'_'</b> symbol means an empty cell, <b>don't</b> use <b>' '</b><br />
      Possible head moves: R - right, L - left, S - stay<br />`,
      close: "Close",
      howToUse: "How to use the Simulator",
      howToUseContent: `
        Let's look at an example algorithm - a binary palindrome (2 tapes), which can be selected from the <b>menu</b> at the top of the page<br />
        This algorithm works on 2 tapes, so in the top-left corner you need to add a tape by clicking the <b>'Add Tape'</b> button<br />
        The next step is to compile the algorithm - click the <b>'Compile'</b> button<br />
        Then, in the <b>'Input'</b> field, enter an example input - for instance <b>10001</b> - and click <b>'Load'</b><br />
        If <b>'Input'</b> field has data inside when <b>'Compile'</b> is clicked, it will input the data automatically<br />
        Now, you just need to <b>run the machine</b> - click the <b>'play' icon</b> in the machine control section<br />
        In this section there's also a <b>slider</b> which you can use to adjust the <b>speed</b> of the machine<br />
        In the top-right corner, you can see <b>information</b> about the machine's state - number of steps, current state, and status<br />
        Once the machine finishes running, the status should be 'Success', because 10001 is a palindrome<br />`,
      howDoesTheCodeWork: "How does the code work?",
      howDoesTheCodeWorkContentP1: `
        Let's look at an example algorithm - a binary palindrome (2 tapes), which can be selected from the <b>menu</b> at the top of the page<br />
        // means a comment, which is ignored by the machine<br />
        'init: q0' means the machine will start in state q0<br />
        'accept: qAccept' means that when the machine reaches this state, it will stop with success<br />
        Syntax: 'state, input1, input2, input... -> new_state, output1, output2, output..., move1, move2, move...'<br />
        Example line 6: `,
      howDoesTheCodeWorkContentP2: `
        Means: <br />
        When the machine is in state <span style="color:red">q0</span><br />
         and the head (yellow square) on the first tape contains symbol <span style="color:blue">1</span>,<br />
         and the head on the second tape contains blank symbol '_', then:<br />
        - go to state <span style="color:orange">q0</span> (stay in state <span style="color:red">q0</span> in this case)<br />
        - on the first tape write symbol <span style="color:magenta">1</span> (leave unchanged)<br />
        - on the second tape write symbol <span style="color:grey">1</span><br />
        - move the head of the first tape to the right <span style="color:purple">R</span><br />
        - move the head of the second tape to the right <span style="color:green">R</span><br />
        The entire code works on this principle<br />`
    }
  },
};

const savedLocale = localStorage.getItem("locale") || "pl";

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: "en",
  messages,
});

export default i18n;