<script setup lang="ts">
import Sheet from "../utils/Sheet.vue";
import type { ImplicitFlowSuccessResponse } from "vue3-google-signin";
import {
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from "reka-ui";

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

      <div v-if="!isLoggedIn" class="flex gap-1 overflow-scroll pt-1 pb-2">
        <div
          class="flex h-8 items-center gap-2 rounded border-1 border-stone-300 pl-1 dark:border-stone-700"
        >
          <div class="text-nowrap">Login</div>

          <PopoverRoot>
            <PopoverTrigger class="h-6 cursor-pointer">
              <img src="@/assets/images/google_logo.svg" alt="google_logo" />
            </PopoverTrigger>
            <PopoverPortal>
              <PopoverContent
                class="z-50 mx-2 flex flex-col gap-2 rounded-lg bg-stone-700 p-2 drop-shadow-lg/30"
                side="top"
                :side-offset="5"
              >
                <button
                  class="h-6 cursor-pointer"
                  :disabled="!isReady"
                  @click="() => login()"
                >
                  <img
                    src="@/assets/images/google_logo.svg"
                    alt="google_logo"
                  />
                </button>
                <PopoverArrow
                  class="fill-stone-700"
                  :height="10"
                  :width="20"
                  :rounded="true"
                />
              </PopoverContent>
            </PopoverPortal>
          </PopoverRoot>
        </div>

<!--        <div>-->
<!--          <img src="@/assets/images/google_logo.svg" alt="google_logo" />-->
<!--        </div>-->
      </div>

      <div v-if="isLoggedIn" class="flex gap-1 overflow-scroll pt-1 pb-2">
        <div
          class="flex h-8 items-center gap-2 rounded border-1 border-stone-300 pl-1 dark:border-stone-700"
        >
          <div class="text-nowrap">Logout</div>

          <PopoverRoot>
            <PopoverTrigger class="h-6 cursor-pointer">
              <img src="@/assets/images/google_logo.svg" alt="google_logo" />
            </PopoverTrigger>
            <PopoverPortal>
              <PopoverContent
                class="z-50 mx-2 flex flex-col gap-2 rounded-lg bg-stone-700 p-2 drop-shadow-lg/30"
                side="top"
                :side-offset="5"
              >
                <button
                  class="h-6 cursor-pointer"
                  :disabled="!isReady"
                  @click="logout()"
                >
                  <img
                    src="@/assets/images/google_logo.svg"
                    alt="google_logo"
                  />
                </button>
                <PopoverArrow
                  class="fill-stone-700"
                  :height="10"
                  :width="20"
                  :rounded="true"
                />
              </PopoverContent>
            </PopoverPortal>
          </PopoverRoot>
        </div>
      </div>
    </div>
  </Sheet>
</template>
