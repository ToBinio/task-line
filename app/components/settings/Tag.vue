<script setup lang="ts">
import {
  PopoverTrigger,
  PopoverRoot,
  PopoverPortal,
  PopoverArrow,
  PopoverContent,
} from "reka-ui";
import type { Tag } from "~~/shared/types";

defineProps<{ tag: Tag }>();

const tagStore = useTagStore();
</script>
<template>
  <div
    :key="tag.uuid"
    class="flex h-8 items-center gap-0.5 rounded border-1 border-stone-300 pl-1 dark:border-stone-700"
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
          class="z-50 mx-2 flex flex-col gap-2 rounded-lg bg-stone-700 p-2 drop-shadow-lg/30"
          side="top"
          :side-offset="5"
        >
          <button class="h-6" @click="tagStore.deleteTag(tag.uuid)">
            <Icon name="material-symbols:delete-outline-rounded" size="24" />
          </button>
          <PopoverArrow
            class="fill-stone-700"
            :height="10"
            :width="20"
            :rounded="true"
          />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>
