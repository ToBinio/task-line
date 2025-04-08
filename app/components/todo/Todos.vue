<script setup lang="ts">
import { useFilterStore } from "~/stores/useFilterStore";

const todoStore = useTodoStore();
const filterStore = useFilterStore();

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
  <div class="mt-3 mb-10 w-dvw flex-1 px-1 py-3">
    <TransitionGroup
      leave-to-class="max-h-0! opacity-0"
      enter-from-class="max-h-0! opacity-0"
    >
      <Todo
        v-for="todo in filterdTodos"
        :key="todo.uuid"
        class="max-h-16 overflow-hidden transition-all duration-500"
        :data="todo"
      />
    </TransitionGroup>
  </div>
</template>
