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
  <div class="mt-4 mb-12 w-dvw flex-1 overflow-x-hidden overflow-y-scroll p-1">
    <TransitionGroup
      leave-to-class="max-h-0! opacity-0"
      enter-from-class="max-h-0! opacity-0"
    >
      <div
        v-for="todo in filterdTodos"
        :key="todo.uuid"
        class="h-15 max-h-15 transition-all duration-200"
      >
        <Todo :data="todo" />
      </div>
    </TransitionGroup>
  </div>
</template>
