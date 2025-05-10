<script setup lang="ts">
import Sheet from "../utils/Sheet.vue";
import type { ImplicitFlowSuccessResponse } from "vue3-google-signin";

const isOpen = defineModel<boolean>("isOpen", { required: true });
const token = useLocalStorage<string | null>("token", null);

const tagStore = useTagStore();

function close() {
  isOpen.value = false;
}

const handleLoginSuccess = async (response: ImplicitFlowSuccessResponse) => {
  const code = response.code;

  const res = await $fetch("/api/auth/", {
    method: "POST",
    body: { code },
  });

  token.value = res.token;
};

function logout() {
  token.value = null;
}

const isLoggedIn = computed(() => {
  return token.value !== null;
});

const handleLoginError = () => {
  console.error("Login failed");
};

const { isReady, login } = useCodeClient({
  onSuccess: handleLoginSuccess,
  onError: handleLoginError,
});
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
        <button
          v-if="!isLoggedIn"
          :disabled="!isReady"
          class="google-login-button"
          @click="() => login()"
        >
          <span class="icon"></span>Login with Google
        </button>

        <button
          v-if="isLoggedIn"
          class="google-login-button"
          @click="() => logout()"
        >
          <span class="icon"></span>Logout
        </button>
      </div>
    </div>
  </Sheet>
</template>

<style>
.google-login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: black;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 24px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  max-width: 300px;
  box-sizing: border-box;
  transition: background-color 0.3s ease;
}

.google-login-button:hover {
  background-color: #d3d3d3;
}

.google-login-button:focus {
  outline: none;
}

.google-login-button svg {
  margin-right: 10px;
  width: 18px;
  height: 18px;
}

.google-login-button .icon {
  background-image: url("https://img.icons8.com/color/512/google-logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  width: 18px;
  height: 18px;
  margin-right: 10px;
}
</style>
