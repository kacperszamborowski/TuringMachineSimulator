<script setup lang="ts">
import { useI18n } from "vue-i18n";
import "flag-icons/css/flag-icons.min.css";
import "../styles/languagueChoice.css"

const { locale } = useI18n();

function changeLanguage(lang: string) {
  locale.value = lang;
  localStorage.setItem("locale", lang);
}
</script>

<template>
  <div class="flags">
    <span class="fi fi-pl flag" @click="changeLanguage('pl')"></span>
    <span class="fi fi-gb flag" @click="changeLanguage('en')"></span>
  </div>
</template>