export type Tag = {
  uuid: UUID;
  name: string;
  color: string;
};

export const useTagStore = defineStore("tags", {
  state: (): { data: Tag[] } => ({
    data: [
      {
        uuid: crypto.randomUUID(),
        name: "School",
        color: "oklch(0.444 0.177 26.899)",
      },
      {
        uuid: crypto.randomUUID(),
        name: "Work",
        color: "oklch(0.555 0.163 48.998)",
      },
      {
        uuid: crypto.randomUUID(),
        name: "School",
        color: "oklch(0.444 0.177 26.899)",
      },
      {
        uuid: crypto.randomUUID(),
        name: "Work",
        color: "oklch(0.555 0.163 48.998)",
      },
      {
        uuid: crypto.randomUUID(),
        name: "School",
        color: "oklch(0.444 0.177 26.899)",
      },
      {
        uuid: crypto.randomUUID(),
        name: "Work",
        color: "oklch(0.555 0.163 48.998)",
      },
      {
        uuid: crypto.randomUUID(),
        name: "School",
        color: "oklch(0.444 0.177 26.899)",
      },
      {
        uuid: crypto.randomUUID(),
        name: "Work",
        color: "oklch(0.555 0.163 48.998)",
      },
    ],
  }),
  getters: {
    getTagByUUID(state) {
      return (uuid: UUID | undefined) =>
        state.data.find((tag) => tag.uuid === uuid);
    },
  },
});
