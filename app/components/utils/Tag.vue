<script setup lang="ts">
const props = defineProps<{ tag: Tag; isSelected: boolean }>();
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
    class="rounded border-1 border-stone-300 px-1 text-nowrap transition-all dark:border-stone-700"
    :style="{
      color: fontColor,
      'background-color': bgColor,
    }"
    @click="emits('press')"
  >
    {{ tag.name }}
  </button>
</template>
