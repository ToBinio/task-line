<script setup lang="ts">
import Day from "./Day.vue";

let from = defineModel<Date>("from");
let to = defineModel<Date>("to");

let now = new Date();
let viewDate = ref(new Date(now.getFullYear(), now.getMonth()));

function addMonthToViewDate(number: number) {
    viewDate.value.setMonth(viewDate.value.getMonth() + number);
    viewDate.value = new Date(viewDate.value); // Force reactivity update
}

const year = computed(() => viewDate.value.getFullYear());
const month = computed(() => viewDate.value.getMonth());

let selectedDateString = computed(() => {
    return viewDate.value.toLocaleString("default", {
        year: "numeric",
        month: "long",
    });
});

let monthData = useMonthData(year, month);
let weekDays = useWeekDays(monthData.value[0][0]!.date);

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
</script>

<template>
    <div class="flex justify-center">
        <div class="flex flex-col gap-1 w-min">
            <div class="flex justify-between align-center">
                <button @click="addMonthToViewDate(-1)">
                    <Icon
                        name="material-symbols:chevron-left-rounded"
                        size="24"
                    />
                </button>
                {{ selectedDateString }}
                <button @click="addMonthToViewDate(1)">
                    <Icon
                        name="material-symbols:chevron-right-rounded"
                        size="24"
                    />
                </button>
            </div>
            <div class="flex">
                <div class="flex-1 text-center" v-for="dayString in weekDays">
                    {{ dayString }}
                </div>
            </div>
            <div v-for="week in monthData" class="flex gap-1">
                <Day
                    v-for="day in week"
                    :day="day"
                    :selected-from="from"
                    :selected-to="to"
                    @select="onSelectDay(day!.date)"
                />
            </div>
        </div>
    </div>
</template>
