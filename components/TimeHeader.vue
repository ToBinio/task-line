<script setup lang="ts">
import { useWeekDays } from "~/composables/useWeekDays";

let dayStrings = useWeekDays(new Date());
</script>

<template>
    <div class="fixed top-0 w-dvw px-1 z-10 bg-stone-900">
        <div class="flex justify-evenly items-center relative">
            <template v-for="(day, index) in dayStrings">
                <div class="flex-1 text-center">{{ day }}</div>
                <div
                    v-if="index != dayStrings.length - 1"
                    class="h-5 w-0.5 spacer"
                ></div>
            </template>
        </div>
        <div class="h-0.5 spacer"></div>
    </div>
</template>
