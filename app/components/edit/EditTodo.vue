<script setup lang="ts">
import Sheet from "../utils/Sheet.vue";
import DateSelect from "./date/DateSelect.vue";
import TagSelect from "./TagSelect.vue";
import TitleSelect from "./TitleSelect.vue";

let isOpen = defineModel<boolean>("isOpen", { required: true });
let isButtonDisabled = defineModel<boolean>("isButtonDisabled");

let isEditingTodo = ref<UUID | undefined>(undefined);

let todoData = ref<TodoEditData>({
    title: "",
    tags: [],
    from: sanitizeDate(new Date()),
    to: undefined,
});

let todoStore = useTodoStore();
let { getTodoById } = storeToRefs(todoStore);

useEditTodoEventBus().on((uuid) => {
    isEditingTodo.value = uuid;
    let todo = getTodoById.value(uuid)!;

    todoData.value.title = todo.title;
    todoData.value.tags = [...todo.tags];
    todoData.value.from = todo.start;
    todoData.value.to = addDays(todo.end, -1);

    open();
});

useInteractionButtonEventBus().on(() => {
    if (isOpen.value) {
        if (!isEditingTodo.value) {
            todoStore.addTodo(todoData.value);
        } else {
            todoStore.updateTodo(isEditingTodo.value, todoData.value);
        }

        close();
    } else {
        todoData.value.title = "";
        todoData.value.tags = [];
        todoData.value.from = sanitizeDate(new Date());
        todoData.value.to = undefined;

        open();
    }
});

function open() {
    isOpen.value = true;
}

function close() {
    isOpen.value = false;
    isEditingTodo.value = undefined;
}

watch([todoData.value, isOpen], () => {
    if (!isOpen.value) {
        isButtonDisabled.value = false;
        return;
    }

    isButtonDisabled.value =
        todoData.value.title == "" || todoData.value.from == undefined;
});
</script>

<template>
    <div class="fixed">
        <Sheet :isOpen="isOpen" @close="close">
            <div class="flex flex-col justify-between p-2 pb-1 gap-5 h-full">
                <TitleSelect v-model:title="todoData.title" />
                <DateSelect
                    v-model:from="todoData.from"
                    v-model:to="todoData.to"
                />
                <TagSelect v-model:tags="todoData.tags" />
            </div>
        </Sheet>
    </div>
</template>
