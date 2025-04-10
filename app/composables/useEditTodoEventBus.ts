import type { UUID } from "~~/shared/types";

export function useEditTodoEventBus() {
  return useEventBus<UUID>("editTodo");
}
