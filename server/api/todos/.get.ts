import type { Todo } from "~~/shared/types";

export default defineEventHandler(async (event): Promise<Todo[]> => {
  const token = Auth.getOrThrow(event);
  return await Todos.getAll(token.sub);
});
