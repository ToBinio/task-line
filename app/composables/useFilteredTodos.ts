import { getLocalTimeZone, parseDate, today } from "@internationalized/date";

export function useFilteredTodos() {
  const todoStore = useTodoStore();
  const filterStore = useFilterStore();

  const filterdTodos = computed(() => {
    return todoStore.data.filter((todo) => {
      for (const tag of filterStore.tags) {
        if (!todo.tags.includes(tag)) {
          return false;
        }
      }

      if (filterStore.time === "all") return true;
      if (!todo.timeframe) return false;

      const start = parseDate(todo.timeframe.start);
      const end = parseDate(todo.timeframe.end);

      if (filterStore.time === "today") {
        const now = today(getLocalTimeZone());

        if (start.compare(now) > 0 || end.compare(now) < 0) {
          return false;
        }
      } else if (filterStore.time === "week") {
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
