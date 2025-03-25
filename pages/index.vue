<script setup lang="ts">
import TimeHeader from "~/components/TimeHeader.vue";

let todoStore = useTodoStore();
</script>

<template>
    <div class="m-1">
        <TimeHeader />
        <div class="h-0.5 bg-gray-300"></div>
        <TransitionGroup>
            <div
                class="max-h-14"
                v-for="todo in todoStore.data"
                :key="todo.title"
            >
                <Todo :data="todo" />
            </div>
        </TransitionGroup>
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
