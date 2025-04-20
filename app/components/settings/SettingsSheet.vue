<script setup lang="ts">
import Sheet from "../utils/Sheet.vue";
import {
  GoogleSignInButton,
  type CredentialResponse,
} from "vue3-google-signin";

const isOpen = defineModel<boolean>("isOpen", { required: true });

const tagStore = useTagStore();

function close() {
  isOpen.value = false;
}

const handleLoginSuccess = (response: CredentialResponse) => {
  const { credential } = response;
  console.log("Access Token", credential);
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};
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
      <div class="flex gap-1 overflow-scroll pt-1 pb-2">
        <GoogleSignInButton
          @success="handleLoginSuccess"
          @error="handleLoginError"
        ></GoogleSignInButton>
      </div>
    </div>
  </Sheet>
</template>
