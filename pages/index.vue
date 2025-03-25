<script setup lang="ts">
import TimeHeader from "~/components/TimeHeader.vue";

let todoStore = useTodoStore();
</script>

<template>
    <div>
        <TimeHeader />
        <div class="h-0.5 mx-1 bg-black"></div>
        <TransitionGroup>
            <div
                class="max-h-12"
                v-for="todo in todoStore.data"
                :key="todo.title"
            >
                <Todo :data="todo" />
                <div class="h-0.5 mx-1 bg-black"></div>
            </div>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    max-height: 0;
    opacity: 0;
}
</style>
