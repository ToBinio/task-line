<script setup lang="ts">
import NewTodoSheet from "../edit/NewTodoSheet.vue";

const isSettingsSheetOpen = ref(false);
const isFilterSheetOpen = ref(false);
const isNewSheetOpen = ref(false);
</script>

<template>
  <FilterSheet v-model:is-open="isFilterSheetOpen" />
  <SettingsSheet v-model:is-open="isSettingsSheetOpen" />
  <EditTodoSheet />
  <NewTodoSheet v-model:is-open="isNewSheetOpen" />
  <div
    class="fixed bottom-0 flex h-12 w-dvw justify-between bg-stone-200 dark:bg-stone-800"
  >
    <div class="relativ -z-10 flex">
      <button
        class="relative m-1 flex aspect-square h-10 items-center justify-center rounded bg-stone-400 transition-colors hover:bg-stone-500 dark:bg-stone-700"
        @click="isSettingsSheetOpen = true"
      >
        <Icon name="material-symbols:settings-outline-rounded" size="24" />
      </button>
      <button
        class="relative m-1 flex aspect-square h-10 items-center justify-center rounded bg-stone-400 transition-colors hover:bg-stone-500 dark:bg-stone-700"
        @click="isFilterSheetOpen = true"
      >
        <Icon name="material-symbols:filter-alt" size="24" />
      </button>
    </div>
    <button
      class="relative m-1 flex aspect-square h-10 items-center justify-center rounded bg-cyan-400 transition-colors hover:bg-stone-500 dark:bg-cyan-700"
      @click="isNewSheetOpen = true"
    >
      <Icon name="material-symbols:add-2-rounded" size="24" />
    </button>
  </div>
</template>
