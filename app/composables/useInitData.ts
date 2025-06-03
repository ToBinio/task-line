import { useTagStore } from "~/stores/labels/useTagStore";
import { useLoginToken } from "./login/useLoginToken";
import { useCategoryStore } from "~/stores/labels/useCategoryStore";

export async function useInitdata() {
  const todoStore = useTodoStore();
  const tagStore = useTagStore();
  const categoryStore = useCategoryStore();

  const Init = {
    client() {
      todoStore.initSSE();
      tagStore.initSSE();
      categoryStore.initSSE();
    },
    async data() {
      await Promise.all([
        todoStore.fetch(),
        tagStore.fetch(),
        categoryStore.fetch(),
      ]);
    },
    async all() {
      Init.client();
      await Init.data();
    },
  };

  function reset() {
    todoStore.reset();
    tagStore.reset();
    categoryStore.reset();
  }

  const token = useLoginToken();

  onMounted(async () => {
    if (token.value) {
      Init.client();

      const fetch = useRequestFetch();
      const data = await fetch("/api/auth/renew", {
        ...useFetchOptions(),
      }).catch(async (err) => {
        //todo - show in toast
        console.warn(err);
        return undefined;
      });

      if (data) {
        token.value = data.token;
      }
    }

    watch(token, async () => {
      if (token.value) Init.all();
      else reset();
    });
  });

  await callOnce(async () => {
    if (token.value) await Init.data();
  });

  const visibility = useDocumentVisibility();
  const focus = useWindowFocus();

  watch([visibility, focus], async ([visible, focus]) => {
    if (visible === "visible" || focus) {
      await Init.data();
    }
  });
}
