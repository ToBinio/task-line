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
  note: "",
  tags: [],
  timeframe: undefined,
  category: undefined,
});

const todoStore = useTodoStore();
const { getTodoById } = storeToRefs(todoStore);

useEditTodoEventBus().on((selectedUuid) => {
  uuid.value = selectedUuid;
  const todo = getTodoById.value(selectedUuid)!;

  todoData.value.title = todo.title;
  todoData.value.note = todo.note;
  todoData.value.tags = [...todo.tags];
  todoData.value.category = todo.category;
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
    <form
      class="flex h-full flex-col justify-between"
      @submit.prevent="onSaveTodo"
    >
      <TitleSelect v-model:title="todoData.title" />
      <DataSelect
        v-model:timeframe="todoData.timeframe"
        v-model:tags="todoData.tags"
        v-model:category="todoData.category"
        v-model:note="todoData.note"
      />
      <button
        type="submit"
        :disabled="!isValid"
        class="bg-primary hover:bg-primary-hover disabled:bg-secondary flex aspect-square h-10 cursor-pointer items-center justify-center rounded transition-colors"
      >
        <Icon name="material-symbols:save-rounded" size="24" />
      </button>
    </form>
  </Sheet>
</template>
