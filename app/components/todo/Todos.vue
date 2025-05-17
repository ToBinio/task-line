<script setup lang="ts">
import { useFilterStore } from "~/stores/useFilterStore";
import type { UUID } from "~~/shared/types";
import { parseDate, today, getLocalTimeZone } from "@internationalized/date";

const todoStore = useTodoStore();
const filterStore = useFilterStore();

const filterdTodos = computed(() => {
  return todoStore.data.filter((todo) => {
    for (const tag of filterStore.tags) {
      if (!todo.tags.includes(tag)) {
        return false;
      }
    }

    if (todo.timeframe) {
      const start = parseDate(todo.timeframe.start);
      const end = parseDate(todo.timeframe.end);

      if (filterStore.time === "today") {
        const now = today(getLocalTimeZone());

        if (start.compare(now) > 0 || end.compare(now) < 0) {
          return false;
        }
      } else if (filterStore.time === "week") {
        const weekStart = today(getLocalTimeZone());
        const weekEnd = weekStart.add({ weeks: 1 });

        if (start.compare(weekEnd) > 0 || end.compare(weekStart) < 0) {
          return false;
        }
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
    <div
      class="max-h-[calc(100dvh-5.25rem)] w-dvw max-w-200 overflow-scroll px-1 md:max-h-[calc(100dvh-2rem)]"
    >
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
