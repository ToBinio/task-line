<script setup lang="ts">
import {
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
  PopoverArrow,
} from "reka-ui";
import type { Label } from "~~/shared/types";

const props = defineProps<{ defaultLabel: Label }>();

const label = ref({
  uuid: "",
  color: props.defaultLabel.color,
  name: props.defaultLabel.name,
});

const open = ref(false);

watch(open, () => {
  if (open.value) {
    label.value = {
      uuid: "",
      color: props.defaultLabel.color,
      name: props.defaultLabel.name,
    };
  }
});

const isValid = computed(() => {
  return label.value.name != "" && label.value.color != "";
});

function onRandomizeColor() {
  label.value.color =
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
}

const emit = defineEmits<{ save: [Label] }>();

function onClick() {
  open.value = false;
  emit("save", label.value);
}
</script>
<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger>
      <slot />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        class="bg-popover z-50 mx-2 flex flex-col gap-2 rounded-lg p-2 drop-shadow-lg/30"
        side="top"
        :side-offset="5"
      >
        <input
          v-model="label.name"
          class="border-secondary-popover h-8 w-36 rounded border-1 pl-1"
          placeholder="Name"
          type="text"
        />
        <div class="border-secondary-popover flex h-8 rounded border-1">
          <button
            class="flex aspect-square cursor-pointer items-center justify-center"
            @click="onRandomizeColor"
          >
            <Icon
              name="material-symbols:autorenew-rounded"
              class="text-muted-text hover:text-text transition-colors"
              size="24"
            />
          </button>
          <input
            v-model="label.color"
            class="h-full w-full cursor-pointer rounded-sm"
            type="color"
          />
        </div>
        <button
          class="bg-primary hover:bg-primary-hover border-secondary-popover disabled:bg-popover flex h-8 cursor-pointer items-center justify-center rounded border-1 px-0.5 transition-colors"
          :disabled="!isValid"
          @click="onClick"
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
