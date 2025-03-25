<script setup lang="ts">
let props = defineProps<{ data: Todo }>()

let checking = ref(false)
let todoStore = useTodoStore()

function onCheck() {
    checking.value = true
    setTimeout(() => {
        todoStore.removeTodo(props.data.title)
    }, 1000)
}

</script>

<template>
    <div class="p-2 flex items-center gap-1">
        <button :disabled="checking" @click="onCheck()">
            <span class="flex items-center justify-center h-5 w-5 border-2 border-gray-800 rounded-full">
                <transition>
                    <icon v-if="checking" name="material-symbols:check-rounded"/>
                </transition>
            </span>
        </button>
        <span>
            {{ data.title }}
        </span>
    </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>