<script setup lang="ts">
import {
  PopoverTrigger,
  PopoverRoot,
  PopoverPortal,
  PopoverArrow,
  PopoverContent,
} from "reka-ui";
import type { Tag } from "~~/shared/types";

const props = defineProps<{ tag: Tag }>();

const tagStore = useTagStore();
const todoStore = useTodoStore();

const isTagUsed = computed(() => {
  return todoStore.isTagUsed(props.tag.uuid);
});
</script>
<template>
  <div
    :key="tag.uuid"
    class="border-secondary flex items-center gap-0.5 rounded border-1 pl-1"
    :style="{ color: tag.color }"
  >
    <div class="text-nowrap">
      {{ tag.name }}
    </div>
    <PopoverRoot>
      <PopoverTrigger class="h-6">
        <Icon name="material-symbols:delete-outline-rounded" size="24" />
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          class="bg-popover z-50 mx-2 flex flex-col gap-2 rounded-lg p-2 drop-shadow-lg/30"
          side="top"
          :side-offset="5"
        >
          <span v-if="isTagUsed" class="flex gap-1">
            <Icon name="material-symbols:warning-outline-rounded" size="24" />
            Tag used
          </span>
          <button
            v-if="!isTagUsed"
            class="h-6 cursor-pointer"
            @click="tagStore.deleteTag(props.tag.uuid)"
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
