<script setup lang="ts">
import Tag from "../utils/Tag.vue";

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

const tags = computed(() => {
  return props.data.tags
    .map((tagId) => {
      return tagStore.getTagByUUID(tagId)!;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
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
      <div class="flex flex-col">
        <button class="text-lg" @click="() => editBus.emit(data.uuid)">
          {{ data.title }}
        </button>
        <div class="flex">
          <Tag
            v-for="tag in tags"
            :key="tag?.uuid"
            :tag="tag"
            :is-selected="false"
            class="text-xs"
          />
        </div>
      </div>
    </div>
    <div class="relative">
      <div class="absolute flex h-2 w-1/1 -translate-y-1/3 justify-evenly">
        <div v-for="n in 6" :key="n" class="spacer h-2 w-0.5 rounded-full" />
      </div>
      <div
        class="absolute -bottom-0.25 h-1 w-1/2 rounded-full bg-emerald-600"
        :style="{
          width: `${width * 100}%`,
          left: `${offset * 100}%`,
        }"
      />
      <div class="spacer h-0.5 rounded-full" />
    </div>
  </div>
</template>
