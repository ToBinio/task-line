<script setup lang="ts">
import {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
  RangeCalendarHeader,
  RangeCalendarHeading,
  RangeCalendarNext,
  RangeCalendarPrev,
  RangeCalendarRoot,
} from "reka-ui";
import type { DateRange } from "reka-ui";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";

const from = defineModel<Date>("from");
const to = defineModel<Date>("to");

const dateRange = computed<DateRange>({
  get() {
    let start = undefined;
    if (from.value) {
      start = new CalendarDate(
        from.value!.getFullYear(),
        from.value!.getMonth() + 1,
        from.value!.getDate(),
      );
    }

    let end = undefined;
    if (to.value) {
      end = new CalendarDate(
        to.value!.getFullYear(),
        to.value!.getMonth() + 1,
        to.value!.getDate(),
      );
    }

    return {
      start: start,
      end: end,
    };
  },
  set(value) {
    from.value = value.start?.toDate(getLocalTimeZone());
    to.value = value.end?.toDate(getLocalTimeZone());
  },
});
</script>

<template>
  <div class="flex justify-center">
    <RangeCalendarRoot
      v-slot="{ weekDays, grid }"
      v-model="dateRange"
      fixed-weeks
      class="flex flex-col gap-1"
    >
      <RangeCalendarHeader class="flex items-center justify-between">
        <RangeCalendarPrev>
          <Icon name="material-symbols:chevron-left-rounded" size="24" />
        </RangeCalendarPrev>
        <RangeCalendarHeading />
        <RangeCalendarNext>
          <Icon name="material-symbols:chevron-right-rounded" size="24" />
        </RangeCalendarNext>
      </RangeCalendarHeader>
      <RangeCalendarGrid
        v-for="month in grid"
        :key="month.value.toString()"
        class="flex flex-col gap-1"
      >
        <RangeCalendarGridHead>
          <RangeCalendarGridRow class="flex">
            <RangeCalendarHeadCell
              v-for="day in weekDays"
              :key="day"
              class="flex-1 text-xs"
            >
              {{ day }}
            </RangeCalendarHeadCell>
          </RangeCalendarGridRow>
        </RangeCalendarGridHead>
        <RangeCalendarGridBody class="flex flex-col gap-1">
          <RangeCalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="flex gap-1"
          >
            <RangeCalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              class="flex-1"
            >
              <RangeCalendarCellTrigger
                class="w-8 rounded border-1 border-stone-300 text-center data-[outside-view]:text-stone-400 data-[selected]:bg-stone-300 data-[today]:text-cyan-600 dark:border-stone-700 data-[selected]:dark:bg-stone-700 data-[today]:dark:text-cyan-300"
                :day="weekDate"
                :month="month.value"
              />
            </RangeCalendarCell>
          </RangeCalendarGridRow>
        </RangeCalendarGridBody>
      </RangeCalendarGrid>
    </RangeCalendarRoot>
  </div>
</template>
