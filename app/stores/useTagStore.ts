import { v4 } from "uuid";
import type { Tag, UUID } from "~~/shared/types";

export const useTagStore = defineStore("tags", {
  state: (): { data: Tag[] } => ({
    data: [],
  }),
  actions: {
    async fetch() {
      const data = await $fetch("/api/tags").catch(async (err) => {
        //todo - show in toast
        console.warn(err);
        return [];
      });

      this.data = data;
    },

    async initSSE() {
      const eventSource = new EventSource("/api/tags/sse");

      eventSource.onmessage = (event) => {
        const tags = JSON.parse(event.data);
        this.data = tags;
      };
    },

    async deleteTag(uuid: UUID) {
      this.data = this.data.filter((tag) => tag.uuid !== uuid);

      await $fetch("/api/tags/" + uuid, {
        method: "DELETE",
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

      await $fetch("/api/tags", {
        method: "POST",
        body: tag,
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
