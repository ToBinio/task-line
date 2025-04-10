<script setup lang="ts">
import { useFilterStore } from "~/stores/useFilterStore";

const todoStore = useTodoStore();
const filterStore = useFilterStore();

await callOnce(async () => {
  await todoStore.fetch();
});

const filterdTodos = computed(() => {
  return todoStore.data.filter((todo) => {
    for (const tag of filterStore.tags) {
      if (!todo.tags.includes(tag)) {
        return false;
      }
    }

    return true;
  });
});
</script>

<template>
  <div class="flex justify-center">
    <div class="mt-3 mb-10 w-dvw max-w-200 overflow-x-hidden px-1 py-3">
      <TransitionGroup
        leave-to-class="max-h-0! opacity-0 scale-y-0"
        enter-from-class="max-h-0! opacity-0 scale-y-0"
      >
        <Todo
          v-for="todo in filterdTodos"
          :key="todo.uuid"
          class="max-h-16 transition-all duration-300 ease-in"
          :data="todo"
        />
      </TransitionGroup>
    </div>
  </div>
</template>
