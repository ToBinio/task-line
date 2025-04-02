<script setup lang="ts">
export type DisplayState = "ADD" | "SAVE";

defineProps<{
    disabled: boolean;
    displayState: DisplayState;
}>();

const emit = defineEmits<{ pressed: [] }>();
</script>
<template>
    <button
        class="z-50 relative m-1 h-10 rounded aspect-square bg-cyan-400 dark:bg-cyan-700 hover:bg-stone-500 disabled:dark:bg-stone-700 disabled:bg-stone-300 transition-colors flex items-center justify-center"
        :disabled="disabled"
        @click="emit('pressed')"
    >
        <Transition>
            <Icon
                v-if="displayState == 'ADD'"
                class="absolute"
                name="material-symbols:add-2-rounded"
                size="24"
            />
        </Transition>
        <Transition>
            <Icon
                v-if="displayState == 'SAVE'"
                class="absolute"
                name="material-symbols:save-rounded"
                size="24"
            />
        </Transition>
    </button>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
