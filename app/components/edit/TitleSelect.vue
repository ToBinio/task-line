<script setup lang="ts">
const title = defineModel<string>("title");
</script>

<template>
  <input
    v-model="title"
    placeholder="Title"
    class="rounded border-2 border-stone-300 pl-1 text-xl dark:border-stone-700"
  />
</template>
