<script setup lang="ts">
import {
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  VisuallyHidden,
  DialogOverlay,
} from "reka-ui";
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

const useModal = useMediaQuery("(min-width: 40rem)");
</script>

<template>
  <ClientOnly>
    <DrawerRoot v-if="!useModal" :open="isOpen" @close="emit('close')">
      <DrawerPortal>
        <DrawerOverlay
          class="fixed top-0 left-0 z-20 h-dvh w-dvw backdrop-blur-[1.5px]"
          @click="emit('close')"
        />
        <DrawerContent
          class="bg-surface fixed bottom-0 z-30 flex h-96 w-dvw flex-col gap-2 rounded-t-lg p-1 pt-2"
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
    <DialogRoot v-if="useModal" :open="isOpen" @close="emit('close')">
      <DialogPortal>
        <DialogOverlay
          class="fixed top-0 left-0 z-20 h-dvh w-dvw backdrop-blur-[1.5px]"
          @click="emit('close')"
        />
        <Transition
          enter-from-class="opacity-0 scale-90"
          leave-to-class="opacity-0 scale-95"
        >
          <DialogContent
            class="bg-surface fixed top-1/2 left-1/2 z-30 h-96 w-9/10 max-w-128 -translate-x-1/2 -translate-y-1/2 rounded-lg p-1 drop-shadow-2xl duration-200"
          >
            <VisuallyHidden>
              <DialogTitle>{{ title }}</DialogTitle>
              <DialogDescription>{{ title }}</DialogDescription>
            </VisuallyHidden>
            <slot />
          </DialogContent>
        </Transition>
      </DialogPortal>
    </DialogRoot>
  </ClientOnly>
</template>
