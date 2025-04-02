<script setup lang="ts">
let title = defineModel<string>("title");
</script>

<template>
    <input
        placeholder="Title"
        v-model="title"
        class="pl-1 border-2 border-stone-300 dark:border-stone-700 rounded text-xl"
    />
</template>
