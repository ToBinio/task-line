import type { Todo } from "~~/shared/types";
import { H3Error } from "h3";

export default defineEventHandler(async (): Promise<Todo[]> => {
  const todos = await Todos.getAll();

  if (todos instanceof H3Error) throw todos;
  return todos;
});
