<script setup lang="ts">
let isOpen = ref(false);
let title = ref("");

let todoStore = useTodoStore();

function onAddTodo() {
    isOpen.value = false;
    if (title.value == "") return;

    todoStore.addTodo(
        title.value,
        new Date(),
        new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3),
    );
    title.value = "";
}
</script>
<template>
    <div
        class="absolute rounded-t-lg h-48 -bottom-48 bg-stone-800 w-full transition-all"
        :class="{ 'bottom-0': isOpen }"
    >
        <div class="flex flex-col m-2">
            <label for="title"> Title </label>
            <input
                v-model="title"
                id="title"
                class="border-2 border-stone-700 rounded"
            />
        </div>
    </div>
    <button
        v-if="!isOpen"
        class="m-2 h-14 absolute bottom-0 right-0 rounded-full aspect-square dark:bg-stone-600 hover:bg-stone-500"
        @click="isOpen = true"
    >
        New
    </button>
    <button
        v-if="isOpen"
        class="m-2 h-14 absolute bottom-0 right-0 rounded-full aspect-square dark:bg-stone-600 hover:bg-stone-500"
        @click="onAddTodo"
    >
        Add
    </button>
</template>
