<script setup lang="ts">
import type { Label, Todo } from "~~/shared/types";
import Tag from "../utils/Tag.vue";
import TimeDisplay from "./TimeDisplay.vue";
import { useTagStore } from "~/stores/labels/useTagStore";

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

function onTagPress(tag: Label) {
  filterStore.tags.push(tag.uuid);
}
</script>

<template>
  <div class="relative flex flex-col justify-center">
    <div class="flex items-center gap-1 pt-2 pb-1">
      <button class="cursor-pointer" :disabled="checking" @click="onCheck()">
        <div
          class="border-secondary m-1 flex h-8 w-8 items-center justify-center rounded-xl border-2"
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
      <div class="flex w-full flex-col">
        <button
          class="flex cursor-pointer items-center text-left text-lg"
          @click="() => editBus.emit(data.uuid)"
        >
          <icon
            v-if="data.note ?? '' != ''"
            class=""
            size="20"
            name="material-symbols:note-outline"
          />
          {{ data.title }}
        </button>
        <div class="flex gap-1">
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
