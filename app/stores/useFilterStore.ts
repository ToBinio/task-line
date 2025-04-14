import type { UUID } from "~~/shared/types";

export const useFilterStore = defineStore("filter", {
  state: (): { tags: UUID[] } => ({
    tags: [],
  }),
});
