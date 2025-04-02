<script setup lang="ts">
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
    <Sheet :isOpen="isOpen" @close="close">
        <div class="p-1">
            <h2 class="text-lg text-stone-400">Tags</h2>
            <div class="flex pt-1 pb-2 gap-1 overflow-scroll">
                <div
                    class="rounded border-1 border-stone-300 dark:border-stone-700 pl-1 flex"
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
            <div class="flex h-8 gap-2">
                <input
                    class="pl-1 border-1 border-stone-300 dark:border-stone-700 rounded text-lg w-36"
                    placeholder="new Tag"
                    type="text"
                    v-model="tagName"
                />
                <div
                    class="flex h-full border-1 border-stone-300 dark:border-stone-700 rounded"
                >
                    <button
                        class="px-0.5 flex justify-center items-center"
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
                        class="h-7.5 rounded-sm"
                        type="color"
                    />
                </div>
                <button
                    class="border-1 rounded aspect-square border-stone-300 dark:border-stone-700 px-0.5 flex justify-center items-center bg-stone-700 hover:bg-stone-600 transition-colors"
                    @click="onAddTag"
                >
                    <Icon
                        name="material-symbols:add-2-rounded"
                        class="text-stone-300 hover:text-stone-200 transition-colors"
                        size="20"
                    />
                </button>
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
