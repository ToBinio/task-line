<script setup lang="ts">
import DateSelect from "./DateSelect.vue";

let isOpen = ref(false);

let title = ref("");
let from = ref<Date | undefined>(sanitizeDate(new Date()));
let to = ref<Date | undefined>(sanitizeDate(new Date()));

function reset() {
    title.value = "";
    from.value = sanitizeDate(new Date());
    to.value = sanitizeDate(new Date());
}

let todoStore = useTodoStore();

function open() {
    isOpen.value = true;
}

function close() {
    isOpen.value = false;
    reset();
}

function isValid(): boolean {
    return (
        title.value !== "" && from.value !== undefined && to.value !== undefined
    );
}

function onAddTodo() {
    todoStore.addTodo(title.value, from.value!, to.value!);
    close();
}
</script>
<template>
    <div>
        <div
            class="fixed h-dvh w-dvw top-0 left-0 backdrop-blur-[1.5px] z-50"
            v-if="isOpen"
            @click="close"
        />
        <div
            class="fixed rounded-t-lg h-100 bottom-0 translate-y-full bg-stone-800 w-full transition-all z-100"
            :class="{ '!translate-y-0': isOpen }"
        >
            <div class="flex flex-col m-2 gap-2">
                <div class="flex flex-col">
                    <input
                        placeholder="Title"
                        v-model="title"
                        class="pl-1 border-2 border-stone-700 rounded"
                    />
                </div>
                <DateSelect v-model:from="from" v-model:to="to" />
            </div>
        </div>
        <button
            v-if="!isOpen"
            class="m-2 h-14 fixed bottom-0 right-0 rounded-full aspect-square dark:bg-stone-600 hover:bg-stone-500 z-50"
            @click="open"
        >
            New
        </button>
        <button
            v-if="isOpen"
            :disabled="!isValid()"
            class="m-2 h-14 fixed bottom-0 right-0 rounded-full aspect-square dark:bg-stone-600 hover:bg-stone-500 disabled:bg-stone-700 z-110"
            @click="onAddTodo"
        >
            Add
        </button>
    </div>
</template>
