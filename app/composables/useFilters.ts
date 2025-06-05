import type { UUID } from "~~/shared/types";

export type Filter = {
  tags: UUID[];
  category: UUID | undefined;
  time: "all" | "today" | "week";
};

export function useFilter() {
  const filter = useCookie<Filter>("filter", {
    maxAge: 60 * 60 * 24 * 30, // 1month
    sameSite: true,
    default: () => {
      return {
        tags: [],
        category: undefined,
        time: "all",
      };
    },
  });

  const isFiltering = computed(() => {
    if (filter.value.time != "all") return true;
    if (filter.value.category != undefined) return true;

    return filter.value.tags.length != 0;
  });

  return { filter, isFiltering };
}
