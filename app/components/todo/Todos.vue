<script setup lang="ts">
import type { UUID } from "~~/shared/types";
import { useFilteredTodos } from "~/composables/useFilteredTodos";

const todoStore = useTodoStore();

const filterdTodos = useFilteredTodos();

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
    <div
      class="max-h-[calc(100dvh-5.75rem)] w-dvw max-w-200 overflow-scroll px-1 md:max-h-[calc(100dvh-2.5rem)]"
    >
      <TransitionGroup
        leave-to-class="max-h-0! opacity-0 scale-y-0"
        enter-from-class="max-h-0! opacity-0 scale-y-0"
      >
        <Todo
          v-for="todo in filterdTodos"
          :key="todo.uuid"
          draggable="true"
          class="max-h-18 transition-all duration-300 data-[dragged]:blur-[1px] data-[dragged]:grayscale-100"
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
