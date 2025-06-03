<script setup lang="ts">
import { useTagStore } from "~/stores/labels/useTagStore";
import Label from "./labels/Label.vue";
import type { Label as LabelType } from "~~/shared/types";

const tagStore = useTagStore();
const todoStore = useTodoStore();

function onSaveTag(tag: LabelType) {
  tagStore.updateTag(tag.uuid, tag.color, tag.name);
}

function onDeleteTag(tag: LabelType) {
  tagStore.deleteTag(tag.uuid);
}

function isUsed(tag: LabelType): boolean {
  return todoStore.isTagUsed(tag.uuid);
}
</script>

<template>
  <div class="p-1 pt-0">
    <h2 class="text-muted-text text-lg">Tags</h2>
    <SettingsAddTag />
    <div>
      <div
        v-for="tag in tagStore.data"
        :key="tag.uuid"
        class="inline-block pr-1 pb-1"
      >
        <Label
          class="border-secondary flex items-center gap-0.5 rounded border-1 pl-1"
          :style="{ color: tag.color }"
          :label="tag"
          :is-used="isUsed(tag)"
          @save="onSaveTag"
          @delete="onDeleteTag"
        />
      </div>
    </div>
  </div>
</template>
