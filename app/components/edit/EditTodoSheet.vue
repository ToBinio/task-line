<script setup lang="ts">
import { ref, computed } from "vue";
import type { TodoData, UUID } from "~~/shared/types";
import Sheet from "../utils/Sheet.vue";
import TitleSelect from "./TitleSelect.vue";
import DataSelect from "./DataSelect.vue";

const isOpen = ref(false);

const uuid = ref<UUID>("");
const todoData = ref<TodoData>({
  title: "",
  tags: [],
  timeframe: undefined,
});

const todoStore = useTodoStore();
const { getTodoById } = storeToRefs(todoStore);

useEditTodoEventBus().on((selectedUuid) => {
  uuid.value = selectedUuid;
  const todo = getTodoById.value(selectedUuid)!;

  todoData.value.title = todo.title;
  todoData.value.tags = [...todo.tags];
  todoData.value.timeframe = todo.timeframe;

  isOpen.value = true;
});

function onSaveTodo() {
  todoStore.updateTodo(uuid.value, todoData.value);
  close();
}

function close() {
  isOpen.value = false;
}

const isValid = computed(() => {
  return todoData.value.title !== "";
});
</script>

<template>
  <Sheet :is-open="isOpen" title="Edit Todo Sheet" @close="close">
    <div class="flex h-full flex-col justify-between">
      <TitleSelect v-model:title="todoData.title" />
      <DataSelect
        v-model:timeframe="todoData.timeframe"
        v-model:tags="todoData.tags"
      />
      <button
        :disabled="!isValid"
        class="bg-primary hover:bg-primary-hover disabled:bg-secondary flex aspect-square h-10 cursor-pointer items-center justify-center rounded transition-colors"
        @click="onSaveTodo"
      >
        <Icon name="material-symbols:save-rounded" size="24" />
      </button>
    </div>
  </Sheet>
</template>
