<script setup lang="ts">
defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{ close: [] }>();
</script>
<template>
    <div
        class="fixed h-dvh w-dvw top-0 left-0 backdrop-blur-[1.5px] z-30"
        v-if="isOpen"
        @click="emit('close')"
    />
    <div
        class="transition-transform fixed rounded-t-lg h-96 bottom-0 left-0 translate-y-full bg-stone-200 dark:bg-stone-800 w-full z-40"
        :class="{ '!translate-y-0': isOpen }"
    >
        <slot />
    </div>
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
