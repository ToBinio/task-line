<script setup lang="ts">
import {
    PopoverTrigger,
    PopoverRoot,
    PopoverPortal,
    PopoverArrow,
    PopoverContent,
} from "reka-ui";

defineProps<{ tag: Tag }>();

let tagStore = useTagStore();
</script>
<template>
    <div
        class="h-8 rounded border-1 border-stone-300 dark:border-stone-700 pl-1 flex items-center gap-0.5"
        :style="{ color: tag.color }"
        :key="tag.uuid"
    >
        <div class="text-nowrap">
            {{ tag.name }}
        </div>
        <PopoverRoot>
            <PopoverTrigger class="h-6">
                <Icon
                    name="material-symbols:delete-outline-rounded"
                    size="24"
                />
            </PopoverTrigger>
            <PopoverPortal>
                <PopoverContent
                    class="flex flex-col gap-2 z-50 bg-stone-700 p-2 rounded-lg mx-2 drop-shadow-lg/30"
                    side="top"
                    :sideOffset="5"
                >
                    <button class="h-6" @click="tagStore.deleteTag(tag.uuid)">
                        <Icon
                            name="material-symbols:delete-outline-rounded"
                            size="24"
                        />
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
