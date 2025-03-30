export function useEditTodoEventBus() {
  return useEventBus<UUID>("editTodo");
}
