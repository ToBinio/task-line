<script setup lang="ts">
import NewTodoSheet from "../edit/NewTodoSheet.vue";
import VerticalNav from "./VerticalNav.vue";
import HorizontalNav from "./HorizontalNav.vue";

const isSettingsSheetOpen = ref(false);
const isFilterSheetOpen = ref(false);
const isNewSheetOpen = ref(false);
</script>

<template>
  <FilterSheet v-model:is-open="isFilterSheetOpen" />
  <SettingsSheet v-model:is-open="isSettingsSheetOpen" />
  <EditTodoSheet />
  <NewTodoSheet v-model:is-open="isNewSheetOpen" />

  <VerticalNav
    v-model:is-settings-sheet-open="isSettingsSheetOpen"
    v-model:is-filter-sheet-open="isFilterSheetOpen"
    v-model:is-new-sheet-open="isNewSheetOpen"
    class="invisible md:visible"
  />
  <HorizontalNav
    v-model:is-settings-sheet-open="isSettingsSheetOpen"
    v-model:is-filter-sheet-open="isFilterSheetOpen"
    v-model:is-new-sheet-open="isNewSheetOpen"
    class="md:invisible"
  />
</template>
