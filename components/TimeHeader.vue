<script setup lang="ts">
let dayStrings = [];

let now = new Date();

for (let i = 0; i < 7; i++) {
    dayStrings.push(
        now.toLocaleString(undefined, { weekday: "long" }).substring(0, 2),
    );
    // Increment the date by one day
    now = new Date(now.getTime() + 24 * 60 * 60 * 1000);
}
</script>

<template>
    <div class="flex justify-evenly items-center relative h-8">
        <template v-for="(day, index) in dayStrings">
            <div>{{ day }}</div>
            <div
                v-if="index != dayStrings.length - 1"
                class="h-5 w-0.5 bg-gray-300"
            ></div>
        </template>
    </div>
</template>
