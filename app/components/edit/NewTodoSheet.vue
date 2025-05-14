<script setup lang="ts">
import { ref, computed } from "vue";
import TagSelect from "../utils/input/TagSelect.vue";
import Sheet from "../utils/Sheet.vue";
import DateSelect from "./DateSelect.vue";
import TitleSelect from "./TitleSelect.vue";
import type { TodoData } from "~~/shared/types";

const isOpen = defineModel<boolean>("isOpen", { required: true });

const todoData = ref<TodoData>({
  title: "",
  tags: [],
  timeframe: undefined,
});

const todoStore = useTodoStore();

function onAddTodo() {
  onAddTodoNoClose();
  close();
}

function onAddTodoNoClose() {
  todoStore.addTodo(todoData.value);

  todoData.value = {
    title: "",
    tags: [],
    timeframe: undefined,
  };
}

function close() {
  isOpen.value = false;
}

const isValid = computed(() => {
  return todoData.value.title !== "";
});
</script>

<template>
  <Sheet :is-open="isOpen" title="New Todo Sheet" @close="close">
    <div class="flex h-full flex-col justify-between">
      <TitleSelect v-model:title="todoData.title" />
      <TagSelect v-model:tags="todoData.tags" />
      <DateSelect v-model:timeframe="todoData.timeframe" />
      <div class="flex h-10 gap-1">
        <button
          :disabled="!isValid"
          class="flex flex-1 items-center justify-center rounded bg-cyan-400 transition-colors hover:bg-cyan-600 disabled:bg-stone-300 dark:bg-cyan-700 disabled:dark:bg-stone-700"
          @click="onAddTodo()"
        >
          <Icon name="material-symbols:add-2-rounded" size="24" />
        </button>
        <button
          :disabled="!isValid"
          class="flex w-min items-center justify-center gap-1 rounded bg-cyan-400 px-2 text-sm transition-colors hover:bg-cyan-600 disabled:bg-stone-300 dark:bg-cyan-700 disabled:dark:bg-stone-700"
          @click="onAddTodoNoClose"
        >
          <Icon name="material-symbols:add-2-rounded" size="20" />
          Another
        </button>
      </div>
    </div>
  </Sheet>
</template>
