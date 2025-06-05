<script setup lang="ts">
import { ref, computed } from "vue";
import Sheet from "../utils/Sheet.vue";
import TitleSelect from "./TitleSelect.vue";
import type { TodoData } from "~~/shared/types";
import DataSelect from "./DataSelect.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const isOpen = defineModel<boolean>("isOpen", { required: true });
const todoStore = useTodoStore();
const { filter } = useFilter();

function close() {
  isOpen.value = false;
}

const todoData = ref<TodoData>({
  title: "",
  note: "",
  tags: [],
  timeframe: undefined,
  category: undefined,
});

watch(isOpen, () => {
  if (isOpen.value) {
    resetData();
  }
});

function resetData() {
  todoData.value.title = "";
  todoData.value.note = "";
  todoData.value.tags = [...filter.value.tags];
  todoData.value.category = filter.value.category;
  todoData.value.timeframe = undefined;
}

function onAddTodo() {
  onAddTodoNoClose();
  close();
}

function onAddTodoNoClose() {
  todoStore.addTodo(todoData.value);
  resetData();
}

const shift = useKeyModifier("Shift");
function onSubmitForm() {
  if (shift.value) {
    onAddTodoNoClose();
  } else {
    onAddTodo();
  }
}

const isValid = computed(() => {
  return todoData.value.title !== "";
});
</script>

<template>
  <Sheet :is-open="isOpen" title="New Todo Sheet" @close="close">
    <form
      class="flex h-full flex-col justify-between"
      @submit.prevent="onSubmitForm"
    >
      <TitleSelect v-model:title="todoData.title" />
      <DataSelect
        v-model:timeframe="todoData.timeframe"
        v-model:tags="todoData.tags"
        v-model:category="todoData.category"
        v-model:note="todoData.note"
      />
      <div class="flex h-10 gap-1">
        <button
          type="button"
          :disabled="!isValid"
          class="bg-primary hover:bg-primary-hover disabled:bg-secondary flex flex-1 cursor-pointer items-center justify-center rounded transition-colors"
          @click="onAddTodo()"
        >
          <Icon name="material-symbols:add-2-rounded" size="24" />
        </button>
        <button
          type="button"
          :disabled="!isValid"
          class="bg-primary hover:bg-primary-hover disabled:bg-secondary flex w-min cursor-pointer items-center justify-center gap-1 rounded px-2 text-sm transition-colors"
          @click="onAddTodoNoClose"
        >
          <Icon name="material-symbols:add-2-rounded" size="20" />
          {{ t("another") }}
        </button>
      </div>
    </form>
  </Sheet>
</template>
