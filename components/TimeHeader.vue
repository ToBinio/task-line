<script setup lang="ts">
let dayStrings = [];

let now = new Date();

for (let i = 0; i < 7; i++) {
    dayStrings.push(
        now.toLocaleString(undefined, { weekday: "long" }).substring(0, 2),
    );
    // Increment the date by one day
    now = addDays(now, 1);
}
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
