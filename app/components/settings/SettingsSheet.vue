<script setup lang="ts">
import { useTagStore } from "~/stores/labels/useTagStore";
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
      <h2 class="text-muted-text text-lg">Tags</h2>
      <SettingsAddTag />
      <div>
        <div
          v-for="tag in tagStore.data"
          :key="tag.uuid"
          class="inline-block pr-1 pb-1"
        >
          <SettingsTag :tag="tag" />
        </div>
      </div>
    </div>

    <div class="p-1 pt-0">
      <h2 class="text-muted-text text-lg">Login</h2>
      <GoogleLogin />
    </div>
  </Sheet>
</template>
