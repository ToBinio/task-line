<script setup lang="ts">
import { useFilterStore } from "~/stores/useFilterStore";
import TagSelect from "./utils/input/TagSelect.vue";
import CategorySelect from "./utils/input/CategorySelect.vue";
import Sheet from "./utils/Sheet.vue";
import TimeSelect from "./filter/TimeSelect.vue";

const isOpen = defineModel<boolean>("isOpen", { required: true });

const filterStore = useFilterStore();

function close() {
  isOpen.value = false;
}
</script>

<template>
  <Sheet :is-open="isOpen" title="Filter Sheet" @close="close">
    <div class="p-1 pt-0">
      <h2 class="text-muted-text text-lg">Categories</h2>
      <CategorySelect v-model:category="filterStore.category" />
    </div>
    <div class="p-1 pt-0">
      <h2 class="text-muted-text text-lg">Tags</h2>
      <TagSelect v-model:tags="filterStore.tags" :show-all="false" />
    </div>
    <div class="p-1">
      <h2 class="text-muted-text text-lg">Time</h2>
      <TimeSelect v-model:time="filterStore.time" />
    </div>
  </Sheet>
</template>
