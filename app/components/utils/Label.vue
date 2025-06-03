<script setup lang="ts">
import type { Label } from "~~/shared/types";

const props = defineProps<{
  label: Label;
  isSelected: boolean;
  type: "tag" | "category";
}>();
const emits = defineEmits(["press"]);

const bgColor = computed(() => {
  return props.isSelected ? props.label.color : "transparent";
});

const fontColor = computed(() => {
  return props.isSelected ? "white" : props.label.color;
});
</script>
<template>
  <button
    type="button"
    class="cursor-pointer rounded border-1 px-1 text-nowrap transition-all"
    :class="{
      'border-secondary': type == 'tag',
    }"
    :style="{
      color: fontColor,
      'background-color': bgColor,
    }"
    @click="emits('press')"
  >
    {{ label.name }}
  </button>
</template>
