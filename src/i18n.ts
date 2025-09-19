import { createI18n } from "vue-i18n";

const messages = {
  pl: {
    header: "Symulator maszyny Turinga",
    addTape: "Dodaj taśmę",
    removeTape: "Usuń taśmę",
    invalidRuleMissing: "Niepoprawna reguła (brak '->') w linii ",
    invalidRuleTooMany: "Niepoprawna reguła (więcej niż 1 '->') w linii ",
    invalidRuleInputLength: "Niepoprawna liczba taśm lub symboli wejściowych w linii ",
    InvalidRuleInputBlank: "Niepoprawna liczba symboli wejściowych (symbol pusty powinien być zapisany jako '_' w linii ",
    invalidRuleOutputLength: "Niepoprawna liczba taśm lub symboli wyjściowych w linii ",
    invalidRuleOutputBlank: "Niepoprawna liczba symboli wyjściowych (symbol pusty powinien być zapisany jako '_' w linii ",
    invalidRuleOutputMovesLength: "Niepoprawna liczba ruchów w linii ",
    invalidRuleMove: "Niepoprawny ruch (dozwolone ruchy: L, R, S) w linii "
  },
  en: {
    header: "Turing machine simulator",
    addTape: "Add tape",
    removeTape: "Remove tape",
    invalidRuleMissing: "Invalid rule (missing '->') in line ",
    invalidRuleTooMany: "Invalid rule (more than 1 '->') in line ",
    invalidRuleInputLength: "Invalid number of tapes or input symbols in line ",
    InvalidRuleInputBlank: "Invalid number of input symbols (blank symbol should be written as '_') in line ",
    invalidRuleOutputLength: "Invalid number of tapes or output symbols in line ",
    invalidRuleOutputBlank: "Invalid number of output symbols (blank symbol should be written as '_') in line ",
    invalidRuleOutputMovesLength: "Invalid number of moves in line ",
    invalidRuleMove: "Invalid move (allowed moves: L, R, S) in line "
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