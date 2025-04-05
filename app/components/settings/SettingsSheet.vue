<script setup lang="ts">
import {
    PopoverContent,
    PopoverPortal,
    PopoverRoot,
    PopoverTrigger,
    PopoverArrow,
} from "reka-ui";
import Sheet from "../utils/Sheet.vue";

let isOpen = defineModel<boolean>("isOpen", { required: true });

const tagStore = useTagStore();
let color = ref("");
let tagName = ref("");

function close() {
    isOpen.value = false;
}

function onRandomizeColor() {
    color.value =
        "#" +
        Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0");
}

function onAddTag() {
    tagStore.addTag(tagName.value, color.value);
}
</script>

<template>
    <Sheet :isOpen="isOpen" title="Settings Sheet" @close="close">
        <div class="p-1">
            <h2 class="text-lg text-stone-400">Tags</h2>
            <div class="flex pt-1 pb-2 gap-1 overflow-scroll">
                <PopoverRoot>
                    <PopoverTrigger
                        class="aspect-square rounded border-1 border-stone-300 dark:border-stone-700 px-1 flex items-center border-dashed"
                    >
                        <Icon name="material-symbols:add-2-rounded" size="20" />
                    </PopoverTrigger>
                    <PopoverPortal>
                        <PopoverContent
                            class="flex flex-col gap-2 z-50 bg-stone-700 p-2 rounded-lg mx-2 drop-shadow-lg/30"
                            side="top"
                            :sideOffset="5"
                        >
                            <input
                                class="pl-1 border-1 border-stone-300 dark:border-stone-600 rounded text-lg w-36"
                                placeholder="new Tag"
                                type="text"
                                v-model="tagName"
                            />
                            <div
                                class="h-7.5 flex border-1 border-stone-300 dark:border-stone-600 rounded"
                            >
                                <button
                                    class="flex justify-center items-center aspect-square"
                                    @click="onRandomizeColor"
                                >
                                    <Icon
                                        name="material-symbols:autorenew-rounded"
                                        class="text-stone-500 hover:text-stone-400 transition-colors"
                                        size="20"
                                    />
                                </button>
                                <input
                                    v-model="color"
                                    class="rounded-sm h-full w-full"
                                    type="color"
                                />
                            </div>
                            <button
                                class="border-1 rounded border-stone-300 dark:border-stone-600 px-0.5 flex justify-center items-center bg-stone-700 hover:bg-stone-600 transition-colors"
                                @click="onAddTag"
                            >
                                <Icon
                                    name="material-symbols:add-2-rounded"
                                    class="text-stone-300 hover:text-stone-200 transition-colors"
                                    size="20"
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
                <div
                    class="rounded border-1 border-stone-300 dark:border-stone-700 pl-1 flex gap-0.5"
                    v-for="tag in tagStore.data"
                    :style="{ color: tag.color }"
                    :key="tag.uuid"
                >
                    {{ tag.name }}
                    <button class="h-6" @click="tagStore.deleteTag(tag.uuid)">
                        <Icon
                            name="material-symbols:delete-outline-rounded"
                            size="24"
                        />
                    </button>
                </div>
            </div>
        </div>
    </Sheet>
</template>

<style scoped>
::-moz-color-swatch,
::-moz-focus-inner {
    border: 0;
}
</style>
