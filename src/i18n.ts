import { createI18n } from "vue-i18n";

const messages = {
  pl: {
    header: "Symulator maszyny Turinga",
    addTape: "Dodaj taśmę",
    removeTape: "Usuń taśmę",
  },
  en: {
    header: "Turing machine simulator",
    addTape: "Add tape",
    removeTape: "Remove tape",
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