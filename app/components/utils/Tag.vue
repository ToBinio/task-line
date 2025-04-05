<script setup lang="ts">
let props = defineProps<{ tag: Tag; isSelected: boolean }>();
let emits = defineEmits(["press"]);

let bgColor = computed(() => {
    return props.isSelected ? props.tag.color : "transparent";
});

let fontColor = computed(() => {
    return props.isSelected ? "white" : props.tag.color;
});
</script>
<template>
    <button
        class="text-nowrap rounded border-1 border-stone-300 dark:border-stone-700 px-1 transition-all"
        :style="{
            color: fontColor,
            'background-color': bgColor,
        }"
        @click="emits('press')"
    >
        {{ tag.name }}
    </button>
</template>
