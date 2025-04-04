<script setup lang="ts">
let todoStore = useTodoStore();
</script>

<template>
    <div class="flex-1 overflow-y-scroll overflow-x-hidden p-1 mt-4 w-dvw pb-16">
        <TransitionGroup leave-to-class="max-h-0! opacity-0">
            <div
                class="transition-all duration-500 max-h-15 h-15"
                v-for="todo in todoStore.data"
                :key="todo.uuid"
            >
                <Todo :data="todo" />
            </div>
        </TransitionGroup>
    </div>
</template>
