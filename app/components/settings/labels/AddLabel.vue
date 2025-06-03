<script setup lang="ts">
import type { Label } from "~~/shared/types";
import EditLabel from "./EditLabel.vue";

const defaultLabel = ref({
  uuid: "",
  color: "#009966",
  name: "",
});

const emit = defineEmits<{ add: [Label] }>();

function onAddTag(label: Label) {
  emit("add", label);
}
</script>
<template>
  <EditLabel :default-label="defaultLabel" @save="onAddTag">
    <div
      class="border-secondary flex cursor-pointer items-center gap-1 rounded border-1 px-1"
    >
      <Icon name="material-symbols:add-2-rounded" size="20" />
      New
    </div>
  </EditLabel>
</template>
