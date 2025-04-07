export const useFilterStore = defineStore("filter", {
  state: (): { tags: UUID[] } => ({
    tags: [],
  }),
});
