import type { UUID } from "~~/shared/types";

export const useFilterStore = defineStore("filter", {
  state: (): {
    tags: UUID[];
    category: UUID | undefined;
    time: "all" | "today" | "week";
  } => ({
    tags: [],
    category: undefined,
    time: "all",
  }),
  getters: {
    isFiltering(state) {
      return () => {
        if (state.time != "all") return true;

        return state.tags.length != 0;
      };
    },
  },
});
