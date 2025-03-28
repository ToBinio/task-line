<script setup lang="ts">
let from = defineModel<Date>("from");
let to = defineModel<Date>("to");

let rawFrom = computed({
    get() {
        return from.value ? dateToString(from.value) : "";
    },
    set(value) {
        from.value = stringToDate(value);
    },
});
let rawTo = computed({
    get() {
        return to.value ? dateToString(to.value) : "";
    },
    set(value) {
        to.value = stringToDate(value);
    },
});

function stringToDate(text: string): Date {
    let date = new Date(text);
    return sanitizeDate(date);
}

function dateToString(date: Date): string {
    return useDateFormat(date, "YYYY-MM-DD").value;
}

function onSelectDay(date: Date) {
    if (!from.value) {
        from.value = date;
    } else if (!to.value) {
        to.value = date;

        if (date < from.value!) {
            [from.value, to.value] = [date, from.value];
        }
    } else {
        from.value = date;
        to.value = undefined;
    }
}

function isSelectedDate(date: Date | undefined): boolean {
    if (!date) return false;

    if (date.getTime() == from.value?.getTime()) return true;
    if (date.getTime() == to.value?.getTime()) return true;

    if (!from.value || !to.value) return false;

    return (
        date.getTime() >= (from.value?.getTime() ?? 0) &&
        date.getTime() <= (to.value?.getTime() ?? Infinity)
    );
}

let monthData = useMonthData(2025, 3);
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="flex justify-between">
            <input
                type="date"
                v-model="rawFrom"
                class="border-2 border-stone-700 rounded"
            />
            <input
                type="date"
                v-model="rawTo"
                class="border-2 border-stone-700 rounded"
            />
        </div>
        <div class="flex justify-center">
            <div class="flex flex-col gap-1 w-min">
                <div v-for="week in monthData" class="flex gap-1">
                    <button
                        v-for="day in week"
                        class="w-8 text-center aspect-square rounded border-1 border-stone-700 flex flex-col justify-center"
                        :disabled="day == undefined"
                        @click="onSelectDay(day!.date)"
                        :class="{ 'bg-stone-500': isSelectedDate(day?.date) }"
                    >
                        {{ day?.id }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
