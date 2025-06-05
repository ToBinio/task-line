import { getLocalTimeZone, parseDate, today } from "@internationalized/date";

export function useFilteredTodos() {
  const todoStore = useTodoStore();
  const { filter } = useFilter();

  const filterdTodos = computed(() => {
    return todoStore.data.filter((todo) => {
      //filter by tags
      for (const tag of filter.value.tags) {
        if (!todo.tags.includes(tag)) {
          return false;
        }
      }

      //filter by category
      if (filter.value.category) {
        if (filter.value.category != todo.category) {
          return false;
        }
      }

      //filter by date
      if (filter.value.time === "all") return true;
      if (!todo.timeframe) return false;

      const start = parseDate(todo.timeframe.start);
      const end = parseDate(todo.timeframe.end);

      if (filter.value.time === "today") {
        const now = today(getLocalTimeZone());

        if (start.compare(now) > 0 || end.compare(now) < 0) {
          return false;
        }
      } else if (filter.value.time === "week") {
        const weekStart = today(getLocalTimeZone());
        const weekEnd = weekStart.add({ weeks: 1 });

        if (start.compare(weekEnd) > 0 || end.compare(weekStart) < 0) {
          return false;
        }
      }

      return true;
    });
  });

  return filterdTodos;
}
