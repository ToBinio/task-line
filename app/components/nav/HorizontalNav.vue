<script setup lang="ts">
const filterStore = useFilterStore();

const isSettingsSheetOpen = defineModel<boolean>("isSettingsSheetOpen");
const isFilterSheetOpen = defineModel<boolean>("isFilterSheetOpen");
const isNewSheetOpen = defineModel<boolean>("isNewSheetOpen");
</script>

<template>
  <div class="bg-surface fixed bottom-0 flex h-12 w-dvw justify-between">
    <div class="relativ -z-10 flex">
      <button
        class="bg-secondary hover:bg-secondary-hover relative m-1 flex aspect-square h-10 cursor-pointer items-center justify-center rounded transition-colors"
        @click="isSettingsSheetOpen = true"
      >
        <Icon name="material-symbols:settings-outline-rounded" size="24" />
      </button>
      <button
        class="bg-secondary hover:bg-secondary-hover relative m-1 flex aspect-square h-10 cursor-pointer items-center justify-center rounded transition-colors"
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
      class="bg-primary hover:bg-primary-hover relative m-1 flex aspect-square h-10 cursor-pointer items-center justify-center rounded transition-colors"
      @click="isNewSheetOpen = true"
    >
      <Icon name="material-symbols:add-2-rounded" size="24" />
    </button>
  </div>
</template>
