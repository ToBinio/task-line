<script setup lang="ts">
import NewTodo from "../edit/NewTodo.vue";
import InteractButton, { type DisplayState } from "./InteractButton.vue";

let eventBus = useInteractionButtonEventBus();

let isEditModalOpen = ref(false);
let isEditModalValid = ref(false);

let isNewModalOpen = ref(false);
let isNewModalValid = ref(false);

let isAnyOpen = computed(() => isEditModalOpen.value || isNewModalOpen.value);

let disabled = computed(() => {
    if (isNewModalOpen.value) {
        return !isNewModalValid.value;
    }

    if (isEditModalOpen.value) {
        return !isEditModalValid.value;
    }

    return false;
});
let displayState = computed<DisplayState>(() => {
    if (isEditModalOpen.value) {
        return "SAVE";
    }
    return "ADD";
});

function onInteractButtonPress() {
    if (isAnyOpen.value) {
        eventBus.emit();
        return;
    }

    isNewModalOpen.value = true;
}
</script>

<template>
    <div
        class="flex justify-between fixed bottom-0 w-dvw bg-stone-200 dark:bg-stone-800 h-12"
    >
        <EditTodo
            v-model:is-open="isEditModalOpen"
            v-model:is-valid="isEditModalValid"
        />
        <NewTodo
            v-model:is-open="isNewModalOpen"
            v-model:is-valid="isNewModalValid"
        />
        <button>Settings</button>
        <InteractButton
            :disabled="disabled"
            :displayState="displayState"
            @pressed="onInteractButtonPress"
        />
    </div>
</template>
