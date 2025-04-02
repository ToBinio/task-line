<script setup lang="ts">
let isOpen = ref(false);
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

function onButtonPress() {
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
}

function open() {
    isOpen.value = true;
}

function close() {
    isOpen.value = false;
    isEditingTodo.value = undefined;
}

function isValid(): boolean {
    return todoData.value.title !== "" && todoData.value.from !== undefined;
}
</script>

<template>
    <div>
        <div
            class="fixed h-dvh w-dvw top-0 left-0 backdrop-blur-[1.5px] z-30"
            v-if="isOpen"
            @click="close"
        />
        <EditSheet :isOpen="isOpen" :todo="todoData" />
        <button
            class="relative m-1 h-10 rounded aspect-square bg-cyan-400 dark:bg-cyan-700 hover:bg-stone-500 z-50 disabled:dark:bg-stone-700 disabled:bg-stone-300 transition-colors flex items-center justify-center"
            :disabled="isOpen && !isValid()"
            @click="onButtonPress"
        >
            <Transition>
                <Icon
                    v-if="!isEditingTodo"
                    class="absolute"
                    name="material-symbols:add-2-rounded"
                    size="24"
                />
            </Transition>
            <Transition>
                <Icon
                    v-if="isEditingTodo"
                    class="absolute"
                    name="material-symbols:save-rounded"
                    size="24"
                />
            </Transition>
        </button>
    </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
