<script setup lang="ts">
import NewTodo from "~/components/NewTodo.vue";
import TimeHeader from "~/components/TimeHeader.vue";

let todoStore = useTodoStore();
</script>

<template>
    <div class="h-dvh w-dvw overflow-hidden relative">
        <div class="p-1">
            <TimeHeader />
            <div class="h-0.5 spacer"></div>
            <TransitionGroup>
                <div
                    class="max-h-15 h-15"
                    v-for="todo in todoStore.data"
                    :key="todo.uuid"
                >
                    <Todo :data="todo" />
                </div>
            </TransitionGroup>
        </div>
        <NewTodo />
    </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: 0.5s ease;
}

.v-leave-to {
    max-height: 0;
    opacity: 0;
}
</style>
