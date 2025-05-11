<script setup lang="ts">
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import type { Timeframe } from "~~/shared/types";

const props = defineProps<{ timeframe: Timeframe }>();

const time = computed(() => {
  return {
    start: parseDate(props.timeframe.start)
      .toDate(getLocalTimeZone())
      .getTime(),
    end: parseDate(props.timeframe.end)
      .add({ days: 1 })
      .toDate(getLocalTimeZone())
      .getTime(),
  };
});

const cappedStart = computed(() => {
  return Math.max(time.value.start, sanitizeDate(new Date()).getTime());
});

const cappedEnd = computed(() => {
  return Math.min(
    time.value.end,
    addDays(sanitizeDate(new Date()), 7).getTime(),
  );
});

const width = computed(() => {
  const timeDiff = cappedEnd.value - cappedStart.value;
  const numberOfDays = timeDiff / (24 * 60 * 60 * 1000.0);
  const percentage = numberOfDays / 7.0;
  return percentage;
});

const offset = computed(() => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const timeDiff = cappedStart.value - now.getTime();
  const numberOfDays = timeDiff / (24 * 60 * 60 * 1000.0);
  const percentage = numberOfDays / 7.0;
  return percentage;
});

const isCappedRight = computed(() => {
  return time.value.end > addDays(sanitizeDate(new Date()), 7).getTime();
});

const isCappedLeft = computed(() => {
  return time.value.start < sanitizeDate(new Date()).getTime();
});
</script>

<template>
  <div class="relative flex h-2 flex-col justify-center">
    <div
      class="absolute top-1/2 flex h-2 w-full -translate-y-1/2 justify-evenly"
    >
      <div v-for="n in 6" :key="n" class="spacer h-2 w-0.5 rounded-full" />
    </div>
    <div
      class="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-emerald-600"
      :style="{
        width: `${width * 100}%`,
        left: `${offset * 100}%`,
      }"
    />
    <div
      v-if="isCappedRight"
      class="absolute top-1/2 right-0 h-1 w-12 -translate-y-1/2 rounded-full bg-linear-to-r from-transparent to-stone-500"
    />
    <div
      v-if="isCappedLeft"
      class="absolute top-1/2 left-0 h-1 w-12 -translate-y-1/2 rounded-full bg-linear-to-l from-transparent to-stone-500"
    />
    <div class="spacer h-0.5 w-full rounded-full" />
  </div>
</template>
