<script setup lang="ts">
import {
    PopoverContent,
    PopoverPortal,
    PopoverRoot,
    PopoverTrigger,
    PopoverArrow,
} from "reka-ui";

const tagStore = useTagStore();

let open = ref(false);
let color = ref("#009966");
let tagName = ref("");

const isValid = computed(() => {
    return tagName.value != "" && color.value != "";
});

function onRandomizeColor() {
    color.value =
        "#" +
        Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0");
}

function onAddTag() {
    tagStore.addTag(tagName.value, color.value);

    open.value = false;
    tagName.value = "";
}
</script>
<template>
    <PopoverRoot v-model:open="open">
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
                    class="h-8 pl-1 border-1 border-stone-300 dark:border-stone-600 rounded w-36"
                    placeholder="new Tag"
                    type="text"
                    v-model="tagName"
                />
                <div
                    class="h-8 flex border-1 border-stone-300 dark:border-stone-600 rounded"
                >
                    <button
                        class="flex justify-center items-center aspect-square"
                        @click="onRandomizeColor"
                    >
                        <Icon
                            name="material-symbols:autorenew-rounded"
                            class="text-stone-500 hover:text-stone-400 transition-colors"
                            size="24"
                        />
                    </button>
                    <input
                        v-model="color"
                        class="rounded-sm h-full w-full"
                        type="color"
                    />
                </div>
                <button
                    class="h-8 border-1 rounded border-stone-300 dark:border-stone-600 px-0.5 flex justify-center items-center disabled:bg-stone-700 hover:bg-stone-600 transition-colors bg-cyan-400 dark:bg-cyan-700"
                    @click="onAddTag"
                    :disabled="!isValid"
                >
                    <Icon
                        name="material-symbols:add-2-rounded"
                        class="transition-colors"
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
</template>

<style scoped>
::-moz-color-swatch,
::-moz-focus-inner {
    border: 0;
}
</style>
