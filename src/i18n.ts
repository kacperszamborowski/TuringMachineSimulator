import { createI18n } from "vue-i18n";

const messages = {
  pl: {
    header: "Symulator maszyny Turinga",
    addTape: "Dodaj taśmę",
    removeTape: "Usuń taśmę",
    invalidRuleMissing: "Niepoprawna reguła (brak ->) w linii ",
    invalidRuleTooMany: "Niepoprawna reguła (więcej niż 1 ->) w linii ",
    invalidRuleInput: "Niepoprawna liczba symboli wejściowych w linii ",
    invalidRuleOutput: "Niepoprawna liczba symboli wyjściowych lub ruchów w linii ",
    invalidRuleMove: "Niepoprawny ruch w linii "
  },
  en: {
    header: "Turing machine simulator",
    addTape: "Add tape",
    removeTape: "Remove tape",
    invalidRuleMissing: "Invalid rule (missing '->') in line ",
    invalidRuleTooMany: "Invalid rule (more than 1 '->') in line ",
    invalidRuleInput: "Invalid number of input symbols in line ",
    invalidRuleOutput: "Invalid number of output symbols or moves in line ",
    invalidRuleMove: "Invalid move in line "
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