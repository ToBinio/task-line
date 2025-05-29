<script setup lang="ts">
import type { Tag } from "~~/shared/types";
import EditTag from "./EditTag.vue";

const tagStore = useTagStore();

const tag = ref({
  uuid: "",
  color: "#009966",
  name: "",
});

function onAddTag(tag: Tag) {
  tagStore.addTag(tag.name, tag.color);
}
</script>
<template>
  <EditTag :default-tag="tag" @save="onAddTag">
    <div
      class="border-secondary flex cursor-pointer items-center gap-1 rounded border-1 px-1"
    >
      <Icon name="material-symbols:add-2-rounded" size="20" />
      New
    </div>
  </EditTag>
</template>
