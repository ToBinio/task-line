<script setup lang="ts">
import { useFilterStore } from "~/stores/useFilterStore";
import type { UUID } from "~~/shared/types";

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

function startDrag(event: DragEvent, uuid: UUID) {
  event.dataTransfer!.setData("text", uuid);
  (event.target as HTMLElement).dataset.dragged = "true";
}

function endDrag(event: DragEvent) {
  delete (event.target as HTMLElement).dataset.dragged;
}

function dropHandler(event: DragEvent, uuid: UUID) {
  event.preventDefault();
  const dragedUUID = event.dataTransfer!.getData("text");

  todoStore.moveTodo(dragedUUID, uuid);
}
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
          draggable="true"
          class="max-h-16 transition-all duration-300 data-[dragged]:blur-[1px] data-[dragged]:grayscale-100"
          :data="todo"
          @dragstart="
            (event: DragEvent) => {
              startDrag(event, todo.uuid);
            }
          "
          @dragend="endDrag"
          @dragover="
            (event: DragEvent) => {
              event.preventDefault();
            }
          "
          @drop="
            (event: DragEvent) => {
              dropHandler(event, todo.uuid);
            }
          "
        />
      </TransitionGroup>
    </div>
  </div>
</template>
