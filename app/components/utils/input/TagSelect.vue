<script setup lang="ts">
import type { Label as LabelType, UUID } from "~~/shared/types";
import Label from "../Label.vue";
import { useFilteredTodos } from "~/composables/useFilteredTodos";
import { useTagStore } from "~/stores/labels/useTagStore";

const activeTags = defineModel<UUID[]>("tags", { required: true });

const props = defineProps<{ showAll: boolean }>();

const tagStore = useTagStore();

function onPress(tag: UUID) {
  if (activeTags.value!.includes(tag)) {
    activeTags.value = activeTags.value!.filter((id) => id !== tag);
  } else {
    activeTags.value!.push(tag);
  }
}

function isSelected(tag: LabelType): boolean {
  return activeTags.value!.includes(tag.uuid);
}

const filteredTodos = useFilteredTodos();

const tags = computed(() => {
  if (props.showAll) {
    return tagStore.data;
  }

  const activeTags = filteredTodos.value.flatMap((todo) => todo.tags);

  return tagStore.data.filter((tag) => {
    return activeTags.includes(tag.uuid);
  });
});
</script>

<template>
  <div class="overflow-scroll">
    <Label
      v-for="tag in tags"
      :key="tag.uuid"
      :label="tag"
      type="tag"
      :is-selected="isSelected(tag)"
      class="mr-1 mb-1"
      @press="onPress(tag.uuid)"
    />
  </div>
</template>
