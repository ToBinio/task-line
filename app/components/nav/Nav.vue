<script setup lang="ts">
import NewTodoSheet from "../edit/NewTodoSheet.vue";

const filterStore = useFilterStore();

const isSettingsSheetOpen = ref(false);
const isFilterSheetOpen = ref(false);
const isNewSheetOpen = ref(false);
</script>

<template>
  <FilterSheet v-model:is-open="isFilterSheetOpen" />
  <SettingsSheet v-model:is-open="isSettingsSheetOpen" />
  <EditTodoSheet />
  <NewTodoSheet v-model:is-open="isNewSheetOpen" />
  <div class="bg-surface fixed bottom-0 flex h-12 w-dvw justify-between">
    <div class="relativ -z-10 flex">
      <button
        class="bg-secondary hover:bg-secondary-hover relative m-1 flex aspect-square h-10 items-center justify-center rounded transition-colors"
        @click="isSettingsSheetOpen = true"
      >
        <Icon name="material-symbols:settings-outline-rounded" size="24" />
      </button>
      <button
        class="bg-secondary hover:bg-secondary-hover relative m-1 flex aspect-square h-10 items-center justify-center rounded transition-colors"
        @click="isFilterSheetOpen = true"
      >
        <Icon
          v-if="filterStore.isFiltering()"
          name="material-symbols:filter-alt"
          size="24"
        />
        <Icon v-else name="material-symbols:filter-alt-outline" size="24" />
      </button>
    </div>
    <button
      class="bg-primary hover:bg-primary-hover relative m-1 flex aspect-square h-10 items-center justify-center rounded transition-colors"
      @click="isNewSheetOpen = true"
    >
      <Icon name="material-symbols:add-2-rounded" size="24" />
    </button>
  </div>
</template>
