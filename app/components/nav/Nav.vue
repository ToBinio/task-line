<script setup lang="ts">
// todo
// via event buss onInteractionButtonPress propegaten -> check if open handle respectifly
// modals: setting, filter, new, edit
// every model model gets disabled & isOpen
//
// displayState <- computed from is open states
//
// move event bus definition to given file e.g no useEventBus file isntead just in editModal.vue file
//

import InteractButton, { type DisplayState } from "./InteractButton.vue";

let eventBus = useInteractionButtonEventBus();

let isEditModalOpen = ref(false);

let disabled = ref(false);
let displayState = ref<DisplayState>("ADD");

function onInteractButtonPress() {
    isEditModalOpen.value = true;

    eventBus.emit();
}
</script>

<template>
    <div
        class="flex justify-between fixed bottom-0 w-dvw bg-stone-200 dark:bg-stone-800 h-12"
    >
        <EditTodo
            v-model:is-open="isEditModalOpen"
            v-model:is-button-disabled="disabled"
        />
        <button>Settings</button>
        <InteractButton
            :disabled="disabled"
            :displayState="displayState"
            @pressed="onInteractButtonPress"
        />
    </div>
</template>
