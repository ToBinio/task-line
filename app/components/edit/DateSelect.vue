<script setup lang="ts">
import { parseDate } from "@internationalized/date";
import {
  type DateRange,
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
import type { Timeframe } from "~~/shared/types";

const timeframe = defineModel<Timeframe | undefined>("timeframe");

const dateRange: Ref<DateRange> = ref({
  start: undefined,
  end: undefined,
});

if (timeframe.value) {
  dateRange.value = {
    start: parseDate(timeframe.value.start),
    end: parseDate(timeframe.value.end),
  };
}

watch(dateRange, (value) => {
  //todo - correcly handle deselection and single day selection - https://github.com/unovue/reka-ui/issues/1820

  if (value.end == undefined || value.start == undefined) {
    timeframe.value = undefined;
    return;
  }

  timeframe.value = {
    start: value.start!.toString(),
    end: value.end!.toString(),
  };
});

function clear() {
  dateRange.value = {
    start: undefined,
    end: undefined,
  };
}
</script>

<template>
  <div class="flex justify-center">
    <RangeCalendarRoot
      v-slot="{ weekDays, grid }"
      v-model="dateRange"
      fixed-weeks
      class="flex flex-col gap-2"
    >
      <RangeCalendarHeader class="flex items-center justify-between">
        <button
          class="border-secondary hover:bg-secondary cursor-pointer rounded border-1 px-2 text-center transition"
          @click="clear"
        >
          clear
        </button>
        <div class="flex items-center justify-between gap-2">
          <RangeCalendarPrev class="flex cursor-pointer">
            <Icon name="material-symbols:chevron-left-rounded" size="24" />
          </RangeCalendarPrev>
          <RangeCalendarHeading />
          <RangeCalendarNext class="flex cursor-pointer">
            <Icon name="material-symbols:chevron-right-rounded" size="24" />
          </RangeCalendarNext>
        </div>
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
                class="border-secondary data-[outside-view]:text-muted-text data-[selected]:bg-secondary data-[today]:text-primary w-8 cursor-pointer rounded border-1 text-center"
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
