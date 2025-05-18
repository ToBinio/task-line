<script setup lang="ts">
import { useWeekDays } from "~/composables/useWeekDays";

const dayStrings = useWeekDays(new Date());
</script>

<template>
  <div class="flex justify-center">
    <div class="bg-background h-10 w-full max-w-200 px-1 pt-1">
      <div class="relative flex items-center justify-evenly">
        <template v-for="(day, index) in dayStrings" :key="day">
          <div class="bold flex-1 text-center text-xl">{{ day }}</div>
          <div
            v-if="index != dayStrings.length - 1"
            class="bg-secondary h-8 w-0.5"
          />
        </template>
      </div>
      <div class="bg-secondary h-0.5" />
    </div>
  </div>
</template>
