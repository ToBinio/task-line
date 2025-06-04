<script setup lang="ts">
import Sheet from "../utils/Sheet.vue";
import Categories from "./Categories.vue";
import GoogleLogin from "./GoogleLogin.vue";
import Tags from "./Tags.vue";
import { useI18n } from "vue-i18n";
import type { Language, Languages } from "~/utils/languages";

const { t } = useI18n();

const isOpen = defineModel<boolean>("isOpen", { required: true });

function close() {
  isOpen.value = false;
}

const { locale, locales, setLocale } = useI18n();

function onLanguageChange(newLocale: string) {
  switch (newLocale) {
    case "en": {
      setLocale("en");
      break;
    }
    case "de": {
      setLocale("de");
      break;
    }
    default: {
      console.error("Unknown locale");
    }
  }
}
</script>

<template>
  <Sheet :is-open="isOpen" title="Settings Sheet" @close="close">
    <Categories />
    <Tags />

    <div class="p-1 pt-0">
      <h2 class="text-muted-text text-lg">{{ t("login") }}</h2>
      <GoogleLogin />
    </div>

    <div class="p-1 pt-0">
      <h2 class="text-muted-text text-lg">{{ t("languages") }}</h2>
      <select
        class="border-muted-text bg-surface text-muted-text mt-1 w-full rounded border px-2 py-1"
        :value="locale"
        @change="onLanguageChange(($event.target as HTMLSelectElement).value)"
      >
        <option v-for="lang in locales" :key="lang.code" :value="lang.code">
          {{ lang.name }}
        </option>
      </select>
    </div>
  </Sheet>
</template>
