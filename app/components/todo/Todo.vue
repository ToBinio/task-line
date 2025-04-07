<script setup lang="ts">
const props = defineProps<{ data: Todo }>();

const checking = ref(false);
const todoStore = useTodoStore();
const editBus = useEditTodoEventBus();

function onCheck() {
  checking.value = true;
  setTimeout(() => {
    todoStore.removeTodo(props.data.uuid);
  }, 1000);
}

const width = computed(() => {
  const timeDiff = props.data.end.getTime() - props.data.start.getTime();
  const numberOfDays = timeDiff / (24 * 60 * 60 * 1000.0);
  const percentage = numberOfDays / 7.0;
  return percentage;
});

const offset = computed(() => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const timeDiff = props.data.start.getTime() - now.getTime();
  const numberOfDays = timeDiff / (24 * 60 * 60 * 1000.0);
  const percentage = numberOfDays / 7.0;
  return percentage;
});

const tagStore = useTagStore();
const { getTagByUUID } = storeToRefs(tagStore);

const color = computed(() => {
  return (
    getTagByUUID.value(props.data.tags[0])?.color ??
    "oklch(0.596 0.145 163.225)"
  );
});
</script>

<template>
  <div class="relative flex h-full flex-col justify-center">
    <div class="flex items-center gap-2 py-2 pl-1">
      <button :disabled="checking" @click="onCheck()">
        <span
          class="flex h-7 w-7 items-center justify-center rounded-full border-2 border-stone-800 dark:border-stone-200"
        >
          <transition
            class="transition-opacity duration-500"
            enter-from-class="opacity-0"
          >
            <icon
              v-if="checking"
              size="24"
              name="material-symbols:check-rounded"
            />
          </transition>
        </span>
      </button>
      <button class="text-lg" @click="() => editBus.emit(data.uuid)">
        {{ data.title }}
      </button>
    </div>
    <div class="relative">
      <div class="absolute flex h-2 w-1/1 -translate-y-1/3 justify-evenly">
        <div v-for="n in 6" :key="n" class="spacer h-2 w-0.5 rounded-full" />
      </div>
      <div
        class="absolute -bottom-0.25 h-1 w-1/2 rounded-full"
        :style="{
          width: `${width * 100}%`,
          left: `${offset * 100}%`,
          backgroundColor: color,
        }"
      />
      <div class="spacer h-0.5 rounded-full" />
    </div>
  </div>
</template>
