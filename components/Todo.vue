<script setup lang="ts">
let props = defineProps<{ data: Todo }>();

let checking = ref(false);
let todoStore = useTodoStore();

function onCheck() {
    checking.value = true;
    setTimeout(() => {
        todoStore.removeTodo(props.data.uuid);
    }, 1000);
}

let width = computed(() => {
    let timeDiff = props.data.end.getTime() - props.data.start.getTime();
    let numberOfDays = timeDiff / (24 * 60 * 60 * 1000.0);
    let percentage = numberOfDays / 7.0;
    return percentage;
});

let offset = computed(() => {
    let now = new Date();
    now.setHours(0, 0, 0, 0);

    let timeDiff = props.data.start.getTime() - now.getTime();
    let numberOfDays = timeDiff / (24 * 60 * 60 * 1000.0);
    let percentage = numberOfDays / 7.0;
    return percentage;
});

let tagStore = useTagStore();
let { getTagByUUID } = storeToRefs(tagStore);

let color = computed(() => {
    return (
        getTagByUUID.value(props.data.tags[0])?.color ??
        "oklch(0.596 0.145 163.225)"
    );
});
</script>

<template>
    <div class="h-full relative flex flex-col justify-center">
        <div class="py-2 pl-1 flex items-center gap-2">
            <button :disabled="checking" @click="onCheck()">
                <span
                    class="flex items-center justify-center h-7 w-7 border-2 border-stone-800 dark:border-stone-200 rounded-full"
                >
                    <transition>
                        <icon
                            v-if="checking"
                            size="24"
                            name="material-symbols:check-rounded"
                        />
                    </transition>
                </span>
            </button>
            <span class="text-lg">
                {{ data.title }}
            </span>
        </div>
        <div class="relative">
            <div
                class="flex justify-evenly h-2 w-1/1 absolute -translate-y-1/3"
            >
                <div v-for="n in 6" class="h-2 w-0.5 spacer rounded-full"></div>
            </div>
            <div
                class="h-1 rounded-full w-1/2 absolute -bottom-0.25"
                :style="{
                    width: `${width * 100}%`,
                    left: `${offset * 100}%`,
                    backgroundColor: color,
                }"
            ></div>
            <div class="h-0.5 spacer rounded-full"></div>
        </div>
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
