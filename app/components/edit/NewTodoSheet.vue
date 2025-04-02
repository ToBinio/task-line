<script setup lang="ts">
import Sheet from "../utils/Sheet.vue";
import DateSelect from "./date/DateSelect.vue";
import TagSelect from "./TagSelect.vue";
import TitleSelect from "./TitleSelect.vue";

let isOpen = defineModel<boolean>("isOpen", { required: true });
let isValid = defineModel<boolean>("isValid");

let todoData = ref<TodoEditData>({
    title: "",
    tags: [],
    from: sanitizeDate(new Date()),
    to: undefined,
});

let todoStore = useTodoStore();

useInteractionButtonEventBus().on(() => {
    if (!isOpen.value) {
        return;
    }

    todoStore.addTodo(todoData.value);

    todoData.value = {
        title: "",
        tags: [],
        from: sanitizeDate(new Date()),
        to: undefined,
    };

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
