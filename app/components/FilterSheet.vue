<script setup lang="ts">
import { useFilterStore } from "~/stores/useFilterStore";
import TagSelect from "./utils/input/TagSelect.vue";
import Sheet from "./utils/Sheet.vue";

const isOpen = defineModel<boolean>("isOpen", { required: true });

const filterStore = useFilterStore();

function close() {
  isOpen.value = false;
}
</script>

<template>
  <Sheet :is-open="isOpen" title="Filter Sheet" @close="close">
    <div class="p-1 pt-0">
      <h2 class="text-lg text-stone-400">Tags</h2>
      <TagSelect v-model:tags="filterStore.tags" />
    </div>
  </Sheet>
</template>
