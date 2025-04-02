<script setup lang="ts">
let todoStore = useTodoStore();
</script>

<template>
    <div class="flex-1 overflow-y-scroll overflow-x-hidden p-1 mt-4 w-dvw">
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
