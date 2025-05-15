<script setup lang="ts">
const title = defineModel<string>("title");
</script>

<template>
  <input
    v-model="title"
    placeholder="Title"
    class="border-secondary rounded border-2 pl-1 text-xl"
  />
</template>
