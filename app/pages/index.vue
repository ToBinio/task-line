<script setup lang="ts">
import Todos from "~/components/todo/Todos.vue";
import { useLoginToken } from "~/composables/login/useLoginToken";

const todoStore = useTodoStore();
const tagStore = useTagStore();

const Init = {
  client() {
    todoStore.initSSE();
    tagStore.initSSE();
  },
  async data() {
    await Promise.all([todoStore.fetch(), tagStore.fetch()]);
  },
  async all() {
    Init.client();
    await Init.data();
  },
};

function reset() {
  todoStore.reset();
  tagStore.reset();
}

const token = useLoginToken();

await callOnce(async () => {
  if (token.value) await Init.data();
});

onMounted(async () => {
  if (token.value) {
    Init.client();

    const fetch = useRequestFetch();
    const data = await fetch("/api/auth/renew", { ...useFetchOptions() }).catch(
      async (err) => {
        //todo - show in toast
        console.warn(err);
        return undefined;
      },
    );

    if (data) {
      token.value = data.token;
    }
  }

  watch(token, async () => {
    if (token.value) Init.all();
    else reset();
  });
});
</script>
<template>
  <div class="overflow-x-hidden">
    <TimeHeader />
    <Todos />
    <Nav />
  </div>
</template>
