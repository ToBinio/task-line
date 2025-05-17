<script setup lang="ts">
import Todos from "~/components/todo/Todos.vue";
import { useInitdata } from "~/composables/useInitData";

await useInitdata();
</script>
<template>
  <div class="overflow-x-hidden md:pl-48">
    <TimeHeader />
    <Todos />
    <Nav />
  </div>
</template>
