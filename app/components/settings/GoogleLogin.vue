<script setup lang="ts">
import type { ImplicitFlowSuccessResponse } from "vue3-google-signin";
import {
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from "reka-ui";
import { useLoginImageUrl } from "~/composables/login/useLoginImageUrl";
import { useLoginToken } from "~/composables/login/useLoginToken";

const token = useLoginToken();
const userImage = useLoginImageUrl();

const isLoggedIn = computed(() => {
  return !!token.value;
});

const { isReady, login } = useCodeClient({
  onSuccess: handleLoginSuccess,
  onError: handleLoginError,
});

async function handleLoginSuccess(response: ImplicitFlowSuccessResponse) {
  const code = response.code;

  const res = await $fetch("/api/auth/", {
    method: "POST",
    body: { code },
    ...useFetchOptions(),
  }).catch(async (err) => {
    //todo - show in toast
    console.warn(err);
    return undefined;
  });

  if (res) {
    token.value = res.token;
  }
}

async function handleLoginError() {
  console.error("Login failed");
}

function logout() {
  token.value = undefined;
}
</script>

<template>
  <div v-if="!isLoggedIn" class="flex gap-1 overflow-scroll pt-1 pb-2">
    <div
      class="flex h-8 items-center rounded border-1 border-stone-300 px-1 dark:border-stone-700"
    >
      <button
        class="flex cursor-pointer gap-1"
        :disabled="!isReady"
        @click="() => login()"
      >
        Login
        <img src="/img/google_logo.svg" alt="Google Logo" />
      </button>
    </div>
  </div>
  <div v-if="isLoggedIn" class="flex gap-1 overflow-scroll pt-1 pb-2">
    <div
      class="flex h-8 items-center gap-1 rounded border-1 border-stone-300 px-1 dark:border-stone-700"
    >
      <PopoverRoot>
        <PopoverTrigger class="h-6 cursor-pointer">
          <div class="flex gap-1">
            <div class="text-nowrap">Logout</div>

            <img
              :src="userImage!"
              alt="User Profile Img"
              class="h-6 w-6 rounded-full object-cover"
            />
          </div>
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
              Logout
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
</template>
