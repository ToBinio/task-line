<script setup lang="ts">
import TimeSelect from "../filter/TimeSelect.vue";
import TagSelect from "../utils/input/TagSelect.vue";

const filterStore = useFilterStore();

const isSettingsSheetOpen = defineModel<boolean>("isSettingsSheetOpen");
const isNewSheetOpen = defineModel<boolean>("isNewSheetOpen");
</script>

<template>
  <div
    class="bg-surface absolute bottom-0 left-0 flex h-full w-48 flex-col justify-between"
  >
    <div>
      <button
        class="bg-secondary hover:bg-secondary-hover relative m-1 flex aspect-square h-10 cursor-pointer items-center justify-center rounded transition-colors"
        @click="isSettingsSheetOpen = true"
      >
        <Icon name="material-symbols:settings-outline-rounded" size="24" />
      </button>

      <div class="p-1 pt-0">
        <h2 class="text-muted-text text-lg">Tags</h2>
        <TagSelect v-model:tags="filterStore.tags" />
      </div>
      <div class="p-1">
        <h2 class="text-muted-text text-lg">Time</h2>
        <TimeSelect v-model:time="filterStore.time" />
      </div>
    </div>

    <button
      class="bg-primary hover:bg-primary-hover relative m-1 flex aspect-square h-10 cursor-pointer items-center justify-center rounded transition-colors"
      @click="isNewSheetOpen = true"
    >
      <Icon name="material-symbols:add-2-rounded" size="24" />
    </button>
  </div>
</template>
