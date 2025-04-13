<script setup lang="ts">
import { ref, computed } from "vue";
import type { TodoData, UUID } from "~~/shared/types";
import TagSelect from "../utils/input/TagSelect.vue";
import Sheet from "../utils/Sheet.vue";
import DateSelect from "./DateSelect.vue";
import TitleSelect from "./TitleSelect.vue";

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
      <TagSelect v-model:tags="todoData.tags" />
      <DateSelect v-model:timeframe="todoData.timeframe" />
      <button
        :disabled="!isValid"
        class="flex aspect-square h-10 items-center justify-center rounded bg-cyan-400 transition-colors hover:bg-stone-500 disabled:bg-stone-300 dark:bg-cyan-700 disabled:dark:bg-stone-700"
        @click="onSaveTodo"
      >
        <Icon name="material-symbols:save-rounded" size="24" />
      </button>
    </div>
  </Sheet>
</template>
