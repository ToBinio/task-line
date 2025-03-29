<script setup lang="ts">
import DateSelect from "./DateSelect.vue";
import TagSelect from "./TagSelect.vue";
import TitleSelect from "./TitleSelect.vue";

let isOpen = ref(false);

let title = ref("");
let tags = ref([]);
let from = ref<Date | undefined>(sanitizeDate(new Date()));
let to = ref<Date | undefined>(undefined);

function reset() {
    title.value = "";
    tags.value = [];
    from.value = sanitizeDate(new Date());
    to.value = undefined;
}

let todoStore = useTodoStore();

function onButtonPress() {
    if (isOpen.value) {
        onAddTodo();
    } else {
        open();
    }
}

function open() {
    isOpen.value = true;
}

function close() {
    isOpen.value = false;
    reset();
}

function isValid(): boolean {
    return title.value !== "" && from.value !== undefined;
}

function onAddTodo() {
    if (!to.value) {
        to.value = from.value;
    }

    todoStore.addTodo(title.value, from.value!, to.value!, tags.value);
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
            class="fixed rounded-t-lg h-96 bottom-0 translate-y-full bg-stone-800 w-full transition-all z-100"
            :class="{ '!translate-y-0': isOpen }"
        >
            <div class="flex flex-col justify-between p-2 gap-5 h-full">
                <TitleSelect v-model:title="title" />
                <DateSelect v-model:from="from" v-model:to="to" />
                <TagSelect v-model:tags="tags" />
            </div>
        </div>
        <button
            class="m-2 h-10 fixed bottom-0 right-0 rounded-full aspect-square dark:bg-stone-600 hover:bg-stone-500 z-200 disabled:bg-stone-700 flex items-center justify-center"
            :disabled="isOpen && !isValid()"
            @click="onButtonPress"
        >
            <Transition>
                <Icon
                    v-if="!isOpen"
                    class="absolute"
                    name="material-symbols:add-2-rounded"
                    size="24"
                />
            </Transition>
            <Transition>
                <Icon
                    v-if="isOpen"
                    class="absolute"
                    name="material-symbols:save-rounded"
                    size="24"
                />
            </Transition>
        </button>
    </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
