<script setup lang="ts">
import { useWeekDays } from "~/composables/useWeekDays";

const dayStrings = useWeekDays(new Date());
</script>

<template>
  <div class="fixed top-0 z-10 w-dvw bg-stone-100 px-1 dark:bg-stone-900">
    <div class="relative flex items-center justify-evenly">
      <template v-for="(day, index) in dayStrings" :key="day">
        <div class="flex-1 text-center">{{ day }}</div>
        <div v-if="index != dayStrings.length - 1" class="spacer h-5 w-0.5" />
      </template>
    </div>
    <div class="spacer h-0.5" />
  </div>
</template>
