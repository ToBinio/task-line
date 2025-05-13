<script setup lang="ts">
import Todos from "~/components/todo/Todos.vue";
import { useLoginToken } from "~/composables/login/useLoginToken";

const token = useLoginToken();

const todoStore = useTodoStore();
const tagStore = useTagStore();

function initSSE() {
  todoStore.initSSE();
  tagStore.initSSE();
}

async function initData() {
  await Promise.all([todoStore.fetch(), tagStore.fetch()]);
}

async function init() {
  initSSE();
  await initData();
}

function reset() {
  todoStore.reset();
  tagStore.reset();
}

watch(token, async () => {
  if (token.value) {
    init();
  } else {
    reset();
  }
});

onMounted(() => {
  if (token.value) initSSE();
});

await callOnce(async () => {
  if (token.value) await initData();
});
</script>
<template>
  <div class="overflow-x-hidden">
    <TimeHeader />
    <Todos />
    <Nav />
  </div>
</template>
