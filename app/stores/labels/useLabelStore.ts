import { v4 } from "uuid";
import type { Label, UUID } from "~~/shared/types";

export function createLabelStore(labelType: "tags" | "categories") {
  const useStore = defineStore(labelType, {
    state: (): { data: Label[]; sse: EventSource | undefined } => ({
      data: [],
      sse: undefined,
    }),
    actions: {
      async fetch() {
        const fetch = useRequestFetch();
        const data = await fetch<Label[]>(`/api/${labelType}`, {
          ...useFetchOptions(),
        }).catch(async (err) => {
          //todo - show in toast
          console.warn(err);
          return [];
        });

        this.data = data;
      },
      reset() {
        this.data = [];
        this.stopSSE();
      },

      async initSSE() {
        this.stopSSE();
        this.sse = new EventSource(`/api/${labelType}/sse`);

        this.sse.onmessage = (event) => {
          const tags = JSON.parse(event.data);
          this.data = tags;
        };
      },
      stopSSE() {
        if (!this.sse) return;
        this.sse.close();
      },

      async deleteTag(uuid: UUID) {
        this.data = this.data.filter((tag) => tag.uuid !== uuid);

        const fetch = useRequestFetch();
        await fetch(`/api/${labelType}/${uuid}`, {
          method: "DELETE",
          ...useFetchOptions(),
        }).catch(async (err) => {
          //todo - show in toast
          console.warn(err);
          await this.fetch();
        });
      },
      async addTag(name: string, color: string) {
        const tag = {
          uuid: v4(),
          name,
          color,
        };

        this.data.unshift(tag);

        const fetch = useRequestFetch();
        await fetch(`/api/${labelType}`, {
          method: "POST",
          body: tag,
          ...useFetchOptions(),
        }).catch(async (err) => {
          //todo - show in toast
          console.warn(err);
          await this.fetch();
        });
      },

      async updateTag(uuid: UUID, color: string, name: string) {
        const tag = {
          uuid,
          color,
          name,
        };

        const index = this.data.findIndex((value) => value.uuid === uuid);
        this.data[index] = tag;

        const fetch = useRequestFetch();
        await fetch("/api/tags", {
          method: "POST",
          body: tag,
          ...useFetchOptions(),
        }).catch(async (err) => {
          //todo - show in toast
          console.warn(err);
          await this.fetch();
        });
      },
    },
    getters: {
      getTagByUUID(state) {
        return (uuid: UUID | undefined) =>
          state.data.find((tag) => tag.uuid === uuid);
      },
    },
  });

  return useStore;
}
