<script setup lang="ts">
import Todos from "~/components/todo/Todos.vue";

const todoStore = useTodoStore();
const tagStore = useTagStore();

await callOnce(async () => {
  await Promise.all([todoStore.fetch(), tagStore.fetch()]);
});

onMounted(() => {
  todoStore.initSSE();
  tagStore.initSSE();
});
</script>
<template>
  <div class="overflow-x-hidden">
    <TimeHeader />
    <Todos />
    <Nav />
  </div>
</template>
