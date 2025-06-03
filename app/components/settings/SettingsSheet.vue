<script setup lang="ts">
import Sheet from "../utils/Sheet.vue";
import Categories from "./Categories.vue";
import GoogleLogin from "./GoogleLogin.vue";
import Tags from "./Tags.vue";

const isOpen = defineModel<boolean>("isOpen", { required: true });

function close() {
  isOpen.value = false;
}
</script>

<template>
  <Sheet :is-open="isOpen" title="Settings Sheet" @close="close">
    <Tags />
    <Categories />

    <div class="p-1 pt-0">
      <h2 class="text-muted-text text-lg">Login</h2>
      <GoogleLogin />
    </div>
  </Sheet>
</template>
