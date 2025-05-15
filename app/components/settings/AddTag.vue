<script setup lang="ts">
import {
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
  PopoverArrow,
} from "reka-ui";

const tagStore = useTagStore();

const open = ref(false);
const color = ref("#009966");
const tagName = ref("");

const isValid = computed(() => {
  return tagName.value != "" && color.value != "";
});

function onRandomizeColor() {
  color.value =
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
}

function onAddTag() {
  tagStore.addTag(tagName.value, color.value);

  open.value = false;
  tagName.value = "";
}
</script>
<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger
      class="border-secondary flex aspect-square items-center rounded border-1 px-1"
    >
      <Icon name="material-symbols:add-2-rounded" size="20" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        class="bg-popover z-50 mx-2 flex flex-col gap-2 rounded-lg p-2 drop-shadow-lg/30"
        side="top"
        :side-offset="5"
      >
        <input
          v-model="tagName"
          class="border-secondary-popover h-8 w-36 rounded border-1 pl-1"
          placeholder="new Tag"
          type="text"
        />
        <div class="border-secondary-popover flex h-8 rounded border-1">
          <button
            class="flex aspect-square items-center justify-center"
            @click="onRandomizeColor"
          >
            <Icon
              name="material-symbols:autorenew-rounded"
              class="text-muted-text hover:text-text transition-colors"
              size="24"
            />
          </button>
          <input
            v-model="color"
            class="h-full w-full rounded-sm"
            type="color"
          />
        </div>
        <button
          class="bg-primary hover:bg-primary-hover border-secondary-popover disabled:bg-popover flex h-8 items-center justify-center rounded border-1 px-0.5 transition-colors"
          :disabled="!isValid"
          @click="onAddTag"
        >
          <Icon
            name="material-symbols:add-2-rounded"
            class="transition-colors"
            size="20"
          />
        </button>
        <PopoverArrow
          class="fill-popover"
          :height="10"
          :width="20"
          :rounded="true"
        />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style scoped>
::-moz-color-swatch,
::-moz-focus-inner {
  border: 0;
}
</style>
