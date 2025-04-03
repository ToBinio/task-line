<script setup lang="ts">
import Sheet from "../utils/Sheet.vue";
import DateSelect from "./DateSelect.vue";
import TagSelect from "./TagSelect.vue";
import TitleSelect from "./TitleSelect.vue";

let isOpen = defineModel<boolean>("isOpen", { required: true });
let isValid = defineModel<boolean>("isValid");

let uuid = ref<UUID>("");
let todoData = ref<TodoEditData>({
    title: "",
    tags: [],
    from: sanitizeDate(new Date()),
    to: undefined,
});

let todoStore = useTodoStore();
let { getTodoById } = storeToRefs(todoStore);

useEditTodoEventBus().on((selectedUuid) => {
    uuid.value = selectedUuid;
    let todo = getTodoById.value(selectedUuid)!;

    todoData.value.title = todo.title;
    todoData.value.tags = [...todo.tags];
    todoData.value.from = todo.start;
    todoData.value.to = addDays(todo.end, -1);

    isOpen.value = true;
});

useInteractionButtonEventBus().on(() => {
    if (!isOpen.value) {
        return;
    }

    todoStore.updateTodo(uuid.value, todoData.value);
    close();
});

function close() {
    isOpen.value = false;
}

watch(
    [todoData.value, isOpen],
    () => {
        isValid.value =
            todoData.value.title !== "" && todoData.value.from !== undefined;
    },
    { immediate: true },
);
</script>

<template>
    <Sheet :isOpen="isOpen" @close="close">
        <div class="flex flex-col justify-between p-2 pb-1 gap-5 h-full">
            <TitleSelect v-model:title="todoData.title" />
            <DateSelect v-model:from="todoData.from" v-model:to="todoData.to" />
            <TagSelect v-model:tags="todoData.tags" />
        </div>
    </Sheet>
</template>
