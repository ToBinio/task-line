<script setup lang="ts">
import type { Label as LabelType, UUID } from "~~/shared/types";
import Label from "../Label.vue";
import { useCategoryStore } from "~/stores/labels/useCategoryStore";

const activeCategory = defineModel<UUID | undefined>("category", {
  required: true,
});

const categoryStore = useCategoryStore();

function onPress(category: UUID) {
  if (activeCategory.value == category) {
    activeCategory.value = undefined;
  } else {
    activeCategory.value = category;
  }
}

function isSelected(category: LabelType): boolean {
  return activeCategory.value == category.uuid;
}
</script>

<template>
  <div class="overflow-scroll">
    <Label
      v-for="category in categoryStore.data"
      :key="category.uuid"
      :label="category"
      type="category"
      :is-selected="isSelected(category)"
      class="mr-1 mb-1"
      @press="onPress(category.uuid)"
    />
  </div>
</template>
