<script setup lang="ts">
import NewTodoSheet from "../edit/NewTodoSheet.vue";
import InteractButton, { type DisplayState } from "./InteractButton.vue";

let eventBus = useInteractionButtonEventBus();

let isSettingsSheetOpen = ref(false);
let isSettingsSheetValid = ref(false);

let isFilterSheetOpen = ref(false);
let isFilterSheetValid = ref(false);

let isEditSheetOpen = ref(false);
let isEditSheetValid = ref(false);

let isNewSheetOpen = ref(false);
let isNewSheetValid = ref(false);

let isAnyOpen = computed(
    () =>
        isEditSheetOpen.value ||
        isNewSheetOpen.value ||
        isFilterSheetOpen.value ||
        isSettingsSheetOpen.value,
);

let disabled = computed(() => {
    if (isNewSheetOpen.value) {
        return !isNewSheetValid.value;
    }

    if (isEditSheetOpen.value) {
        return !isEditSheetValid.value;
    }

    return false;
});
let displayState = computed<DisplayState>(() => {
    if (isEditSheetOpen.value || isFilterSheetOpen.value) {
        return "SAVE";
    }

    if (isSettingsSheetOpen.value) {
        return "CLOSE";
    }

    return "ADD";
});

function onInteractButtonPress() {
    if (isAnyOpen.value) {
        eventBus.emit();
        return;
    }

    isNewSheetOpen.value = true;
}
</script>

<template>
    <div
        class="flex justify-between fixed bottom-0 w-dvw bg-stone-200 dark:bg-stone-800 h-12"
    >
        <FilterSheet v-model:is-open="isFilterSheetOpen" />
        <SettingsSheet v-model:is-open="isSettingsSheetOpen" />
        <EditTodoSheet
            v-model:is-open="isEditSheetOpen"
            v-model:is-valid="isEditSheetValid"
        />
        <NewTodoSheet
            v-model:is-open="isNewSheetOpen"
            v-model:is-valid="isNewSheetValid"
        />
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
        <InteractButton
            :disabled="disabled"
            :displayState="displayState"
            @pressed="onInteractButtonPress"
        />
    </div>
</template>
