<script setup lang="ts">
import { VisuallyHidden } from "reka-ui";
import {
    DrawerRoot,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerHandle,
    DrawerTitle,
    DrawerDescription,
} from "vaul-vue";

defineProps<{ isOpen: boolean; title: string }>();
const emit = defineEmits<{ close: [] }>();
</script>
<template>
    <DrawerRoot :open="isOpen" @close="emit('close')">
        <DrawerPortal>
            <DrawerOverlay
                class="fixed h-dvh w-dvw top-0 left-0 backdrop-blur-[1.5px] z-20"
                @click="emit('close')"
            />
            <DrawerContent
                class="fixed bottom-0 rounded-t-lg w-dvw h-96 bg-stone-200 dark:bg-stone-800 z-30 p-1 pt-2 flex flex-col gap-2"
            >
                <VisuallyHidden>
                    <DrawerTitle>{{ title }}</DrawerTitle>
                    <DrawerDescription>{{ title }}</DrawerDescription>
                </VisuallyHidden>
                <DrawerHandle class="" />
                <slot />
            </DrawerContent>
        </DrawerPortal>
    </DrawerRoot>
</template>
