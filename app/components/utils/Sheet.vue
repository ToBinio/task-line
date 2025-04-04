<script setup lang="ts">
import {
    DrawerRoot,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
} from "vaul-vue";

defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{ close: [] }>();
</script>
<template>
    <DrawerRoot :open="isOpen" @close="emit('close')">
        <DrawerPortal>
            <DrawerOverlay
                class="fixed h-dvh w-dvw top-0 left-0 backdrop-blur-[1.5px] z-20"
            />
            <DrawerContent
                class="fixed bottom-0 rounded-t-lg w-dvw h-96 bg-stone-200 dark:bg-stone-800 z-30"
            >
                <slot />
            </DrawerContent>
        </DrawerPortal>
    </DrawerRoot>
</template>
