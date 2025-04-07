<script setup lang="ts">
import { useFilterStore } from "~/stores/useFilterStore";

let todoStore = useTodoStore();
let filterStore = useFilterStore();

let filterdTodos = computed(() => {
    return todoStore.data.filter((todo) => {
        for (let tag of filterStore.tags) {
            if (!todo.tags.includes(tag)) {
                return false;
            }
        }

        return true;
    });
});
</script>

<template>
    <div
        class="flex-1 overflow-y-scroll overflow-x-hidden p-1 mt-4 mb-12 w-dvw"
    >
        <TransitionGroup
            leave-to-class="max-h-0! opacity-0"
            enter-from-class="max-h-0! opacity-0"
        >
            <div
                class="transition-all duration-200 max-h-15 h-15"
                v-for="todo in filterdTodos"
                :key="todo.uuid"
            >
                <Todo :data="todo" />
            </div>
        </TransitionGroup>
    </div>
</template>
