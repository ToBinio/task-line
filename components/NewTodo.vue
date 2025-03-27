<script setup lang="ts">
let isOpen = ref(false);

let title = ref("");
let from = ref("");
let to = ref("");

let todoStore = useTodoStore();

function open() {
    isOpen.value = true;
}

function close() {
    isOpen.value = false;
}

function isValid(): boolean {
    return title.value !== "" && from.value !== "" && to.value !== "";
}

function onAddTodo() {
    close();

    let fromDate = new Date(from.value);
    let toDate = new Date(new Date(to.value).getTime() + 24 * 60 * 60 * 1000);

    todoStore.addTodo(title.value, fromDate, toDate);

    title.value = "";
    from.value = "";
    to.value = "";
}
</script>
<template>
    <div class="fixed h-dvh w-dvw" v-if="isOpen" @click="close" />
    <div
        class="fixed rounded-t-lg h-48 -bottom-48 bg-stone-800 w-full transition-all"
        :class="{ 'bottom-0': isOpen }"
    >
        <div class="flex flex-col m-2 gap-2">
            <div class="flex flex-col">
                <label for="title"> Title </label>
                <input
                    v-model="title"
                    id="title"
                    class="border-2 border-stone-700 rounded"
                />
            </div>
            <div class="flex justify-between">
                <div class="flex flex-col">
                    <label for="from"> From </label>
                    <input
                        v-model="from"
                        id="from"
                        class="border-2 border-stone-700 rounded"
                        type="date"
                    />
                </div>
                <div class="flex flex-col">
                    <label for="to"> To </label>
                    <input
                        v-model="to"
                        id="to"
                        class="border-2 border-stone-700 rounded"
                        type="date"
                    />
                </div>
            </div>
        </div>
    </div>
    <button
        v-if="!isOpen"
        class="m-2 h-14 absolute bottom-0 right-0 rounded-full aspect-square dark:bg-stone-600 hover:bg-stone-500"
        @click="open"
    >
        New
    </button>
    <button
        v-if="isOpen"
        :disabled="!isValid()"
        class="m-2 h-14 absolute bottom-0 right-0 rounded-full aspect-square dark:bg-stone-600 hover:bg-stone-500 disabled:bg-stone-700"
        @click="onAddTodo"
    >
        Add
    </button>
</template>
