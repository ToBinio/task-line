<script setup lang="ts">
let props = defineProps<{
    day: DayData;
    selectedFrom: Date | undefined;
    selectedTo: Date | undefined;
}>();

let emit = defineEmits<{ select: [] }>();

let isSelected = computed(() => {
    let date = props.day.date;

    if (!date) return false;

    if (date.getTime() == props.selectedFrom?.getTime()) return true;
    if (date.getTime() == props.selectedTo?.getTime()) return true;

    if (!props.selectedFrom || !props.selectedTo) return false;

    return (
        date.getTime() >= (props.selectedFrom?.getTime() ?? 0) &&
        date.getTime() <= (props.selectedTo?.getTime() ?? Infinity)
    );
});

let isToday = computed(() => {
    let now = sanitizeDate(new Date());
    return now.getTime() == props.day.date.getTime();
});
</script>

<template>
    <button
        class="w-8 rounded border-1 border-stone-300 dark:border-stone-700"
        :disabled="day == undefined"
        @click="emit('select')"
        :class="{
            'dark:bg-stone-700': isSelected,
            'bg-stone-300': isSelected,
            'dark:text-cyan-300': isToday,
            'text-cyan-600': isToday,
            'text-stone-400': !day?.thisMonth,
        }"
    >
        {{ day?.id }}
    </button>
</template>
