<script setup lang="ts">
import TagSelect from "../utils/input/TagSelect.vue";
import Sheet from "../utils/Sheet.vue";
import DateSelect from "./DateSelect.vue";
import TitleSelect from "./TitleSelect.vue";

const isOpen = defineModel<boolean>("isOpen", { required: true });

const todoData = ref<TodoEditData>({
  title: "",
  tags: [],
  from: sanitizeDate(new Date()),
  to: undefined,
});

const todoStore = useTodoStore();

function onAddTodo() {
  todoStore.addTodo(todoData.value);

  todoData.value = {
    title: "",
    tags: [],
    from: sanitizeDate(new Date()),
    to: undefined,
  };

  close();
}

function close() {
  isOpen.value = false;
}

const isValid = computed(() => {
  return todoData.value.title !== "" && todoData.value.from !== undefined;
});
</script>

<template>
  <Sheet :is-open="isOpen" title="New Todo Sheet" @close="close">
    <div class="flex h-full flex-col justify-between">
      <TitleSelect v-model:title="todoData.title" />
      <TagSelect v-model:tags="todoData.tags" />
      <DateSelect v-model:from="todoData.from" v-model:to="todoData.to" />
      <button
        :disabled="!isValid"
        class="flex aspect-square h-10 items-center justify-center rounded bg-cyan-400 transition-colors hover:bg-stone-500 disabled:bg-stone-300 dark:bg-cyan-700 disabled:dark:bg-stone-700"
        @click="onAddTodo"
      >
        <Icon name="material-symbols:add-2-rounded" size="24" />
      </button>
    </div>
  </Sheet>
</template>
