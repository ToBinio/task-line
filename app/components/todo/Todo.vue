<script setup lang="ts">
import type { Tag as TagType, Todo } from "~~/shared/types";
import Tag from "../utils/Tag.vue";
import TimeDisplay from "./TimeDisplay.vue";

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

const filterStore = useFilterStore();
const tagStore = useTagStore();

const tags = computed(() => {
  return props.data.tags
    .map((tagId) => {
      const tag = tagStore.getTagByUUID(tagId);
      if (!tag) {
        //todo - show in toast
        console.warn(`Tag with id ${tagId} not found`);
      }
      return tag;
    })
    .filter((tag) => !!tag)
    .filter((tag) => !filterStore.tags.includes(tag.uuid))
    .sort((a, b) => a.name.localeCompare(b.name));
});

function onTagPress(tag: TagType) {
  filterStore.tags.push(tag.uuid);
}
</script>

<template>
  <div class="relative flex flex-col justify-center">
    <div class="flex items-center gap-1 pt-2 pb-1">
      <button :disabled="checking" @click="onCheck()">
        <div
          class="m-1 flex h-8 w-8 items-center justify-center rounded-xl border-2 border-stone-600 dark:border-stone-400"
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
        </div>
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
            @press="onTagPress(tag)"
          />
        </div>
      </div>
    </div>
    <TimeDisplay v-if="data.timeframe" :timeframe="data.timeframe!" />
  </div>
</template>
