<script setup lang="ts">
import Todos from "~/components/todo/Todos.vue";
import { useInitdata } from "~/composables/useInitData";

await useInitdata();
</script>
<template>
  <div class="overflow-x-hidden">
    <TimeHeader />
    <Todos />
    <Nav />
  </div>
</template>
