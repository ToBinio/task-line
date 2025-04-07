<script setup lang="ts">
import TagSelect from "../utils/input/TagSelect.vue";
import Sheet from "../utils/Sheet.vue";
import DateSelect from "./DateSelect.vue";
import TitleSelect from "./TitleSelect.vue";

let isOpen = defineModel<boolean>("isOpen", { required: true });

let todoData = ref<TodoEditData>({
    title: "",
    tags: [],
    from: sanitizeDate(new Date()),
    to: undefined,
});

let todoStore = useTodoStore();

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

let isValid = computed(() => {
    return todoData.value.title !== "" && todoData.value.from !== undefined;
});
</script>

<template>
    <Sheet :isOpen="isOpen" title="New Todo Sheet" @close="close">
        <div class="flex flex-col justify-between h-full">
            <TitleSelect v-model:title="todoData.title" />
            <TagSelect v-model:tags="todoData.tags" />
            <DateSelect v-model:from="todoData.from" v-model:to="todoData.to" />
            <button
                @click="onAddTodo"
                :disabled="!isValid"
                class="h-10 rounded aspect-square bg-cyan-400 dark:bg-cyan-700 hover:bg-stone-500 disabled:dark:bg-stone-700 disabled:bg-stone-300 transition-colors flex items-center justify-center"
            >
                <Icon name="material-symbols:add-2-rounded" size="24" />
            </button>
        </div>
    </Sheet>
</template>
