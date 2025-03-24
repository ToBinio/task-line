<script setup lang="ts">
let todoStore = useTodoStore()
</script>

<template>
    <div>
        <div v-for="(todo, index) in todoStore.data" :key="todo.title">
            <Todo :data="todo"/>
            <div v-if="index != (todoStore.data.length - 1)" class="h-0.5 mx-1 bg-black"></div>
        </div>
    </div>
</template>

<style scoped>
</style>
