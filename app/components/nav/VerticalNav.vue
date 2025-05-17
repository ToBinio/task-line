<script setup lang="ts">
const filterStore = useFilterStore();

const isSettingsSheetOpen = defineModel<boolean>("isSettingsSheetOpen");
const isFilterSheetOpen = defineModel<boolean>("isFilterSheetOpen");
const isNewSheetOpen = defineModel<boolean>("isNewSheetOpen");
</script>

<template>
  <div class="bg-surface absolute bottom-0 left-0 flex h-full w-48 flex-col">
    <div class="relativ flex">
      <button
        class="bg-secondary hover:bg-secondary-hover relative m-1 flex h-10 flex-1 items-center justify-center rounded transition-colors"
        @click="isSettingsSheetOpen = true"
      >
        <Icon name="material-symbols:settings-outline-rounded" size="24" />
      </button>
      <button
        class="bg-secondary hover:bg-secondary-hover relative m-1 flex h-10 flex-1 items-center justify-center rounded transition-colors"
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
