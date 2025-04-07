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
        class="fixed top-0 left-0 z-20 h-dvh w-dvw backdrop-blur-[1.5px]"
        @click="emit('close')"
      />
      <DrawerContent
        class="fixed bottom-0 z-30 flex h-96 w-dvw flex-col gap-2 rounded-t-lg bg-stone-200 p-1 pt-2 dark:bg-stone-800"
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
