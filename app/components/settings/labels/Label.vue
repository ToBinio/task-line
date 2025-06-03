<script setup lang="ts">
import {
  PopoverTrigger,
  PopoverRoot,
  PopoverPortal,
  PopoverArrow,
  PopoverContent,
} from "reka-ui";
import type { Label } from "~~/shared/types";
import EditLabel from "./EditLabel.vue";

const props = defineProps<{ label: Label; isUsed: boolean }>();
const emit = defineEmits<{ save: [Label]; delete: [Label] }>();

function onSaveLabel(label: Label) {
  label.uuid = props.label.uuid;
  emit("save", label);
}

function onDeleteLabel() {
  emit("delete", props.label);
}
</script>
<template>
  <div>
    <div class="text-nowrap">
      <EditLabel :default-label="props.label" @save="onSaveLabel">
        <div class="cursor-pointer">
          {{ label.name }}
        </div>
      </EditLabel>
    </div>
    <PopoverRoot>
      <PopoverTrigger class="h-6">
        <div class="cursor-pointer">
          <Icon name="material-symbols:delete-outline-rounded" size="24" />
        </div>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          class="bg-popover z-50 mx-2 flex flex-col gap-2 rounded-lg p-2 drop-shadow-lg/30"
          side="top"
          :side-offset="5"
        >
          <span v-if="isUsed" class="flex gap-1">
            <Icon name="material-symbols:warning-outline-rounded" size="24" />
            still used
          </span>
          <button
            v-if="!isUsed"
            class="h-6 cursor-pointer"
            @click="onDeleteLabel"
          >
            <Icon name="material-symbols:delete-outline-rounded" size="24" />
          </button>

          <PopoverArrow
            class="fill-popover"
            :height="10"
            :width="20"
            :rounded="true"
          />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>
