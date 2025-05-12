<script setup lang="ts">
import Sheet from "../utils/Sheet.vue";
import GoogleLogin from "./GoogleLogin.vue";

const isOpen = defineModel<boolean>("isOpen", { required: true });

const tagStore = useTagStore();

function close() {
  isOpen.value = false;
}
</script>

<template>
  <Sheet :is-open="isOpen" title="Settings Sheet" @close="close">
    <div class="p-1 pt-0">
      <h2 class="text-lg text-stone-400">Tags</h2>
      <div class="flex gap-1 overflow-scroll pt-1 pb-2">
        <SettingsAddTag />
        <SettingsTag v-for="tag in tagStore.data" :key="tag.uuid" :tag="tag" />
      </div>
    </div>

    <div class="p-1 pt-0">
      <h2 class="text-lg text-stone-400">Login</h2>
      <GoogleLogin />
    </div>
  </Sheet>
</template>
