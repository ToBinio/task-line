<script setup lang="ts">
import NewTodoSheet from "../edit/NewTodoSheet.vue";

let isSettingsSheetOpen = ref(false);
let isFilterSheetOpen = ref(false);
let isNewSheetOpen = ref(false);
</script>

<template>
    <FilterSheet v-model:is-open="isFilterSheetOpen" />
    <SettingsSheet v-model:is-open="isSettingsSheetOpen" />
    <EditTodoSheet />
    <NewTodoSheet v-model:is-open="isNewSheetOpen" />
    <div
        class="flex justify-between fixed bottom-0 w-dvw bg-stone-200 dark:bg-stone-800 h-12"
    >
        <div class="relativ flex -z-10">
            <button
                @click="isSettingsSheetOpen = true"
                class="relative m-1 h-10 aspect-square rounded bg-stone-400 dark:bg-stone-700 hover:bg-stone-500 transition-colors flex items-center justify-center"
            >
                <Icon
                    name="material-symbols:settings-outline-rounded"
                    size="24"
                />
            </button>
            <button
                @click="isFilterSheetOpen = true"
                class="relative m-1 h-10 aspect-square rounded bg-stone-400 dark:bg-stone-700 hover:bg-stone-500 transition-colors flex items-center justify-center"
            >
                <Icon name="material-symbols:filter-alt" size="24" />
            </button>
        </div>
        <button
            @click="isNewSheetOpen = true"
            class="relative m-1 h-10 rounded aspect-square bg-cyan-400 dark:bg-cyan-700 hover:bg-stone-500 transition-colors flex items-center justify-center"
        >
            <Icon name="material-symbols:add-2-rounded" size="24" />
        </button>
    </div>
</template>
