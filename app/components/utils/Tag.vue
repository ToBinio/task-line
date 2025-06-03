<script setup lang="ts">
import type { Label } from "~~/shared/types";

const props = defineProps<{ tag: Label; isSelected: boolean }>();
const emits = defineEmits(["press"]);

const bgColor = computed(() => {
  return props.isSelected ? props.tag.color : "transparent";
});

const fontColor = computed(() => {
  return props.isSelected ? "white" : props.tag.color;
});
</script>
<template>
  <button
    type="button"
    class="border-secondary cursor-pointer rounded border-1 px-1 text-nowrap transition-all"
    :style="{
      color: fontColor,
      'background-color': bgColor,
    }"
    @click="emits('press')"
  >
    {{ tag.name }}
  </button>
</template>
