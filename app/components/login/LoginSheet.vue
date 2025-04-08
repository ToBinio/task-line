<script setup lang="ts">
import Sheet from "~/components/utils/Sheet.vue";

const isOpen = defineModel<boolean>("isOpen", { required: true });

function close() {
  isOpen.value = false;
}
</script>

<template>
  <Sheet :is-open="isOpen" title="Login Sheet" @close="close">
    <div class="p-1 pt-0">
      <h2 class="text-lg text-stone-400">Login</h2>
    </div>
  </Sheet>
</template>

<style scoped></style>
