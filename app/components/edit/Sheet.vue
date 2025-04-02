<script setup lang="ts">
import DateSelect from "./date/DateSelect.vue";
import TagSelect from "./TagSelect.vue";
import TitleSelect from "./TitleSelect.vue";

defineProps<{ isOpen: boolean; todo: TodoEditData }>();
</script>
<template>
    <div
        class="fixed rounded-t-lg h-96 bottom-0 left-0 translate-y-full bg-stone-200 dark:bg-stone-800 w-full transition-transform z-40"
        :class="{ '!translate-y-0': isOpen }"
    >
        <div class="flex flex-col justify-between p-2 pb-1 gap-5 h-full">
            <TitleSelect v-model:title="todo.title" />
            <DateSelect v-model:from="todo.from" v-model:to="todo.to" />
            <TagSelect v-model:tags="todo.tags" />
        </div>
    </div>
</template>
