import type { Todo } from "~~/shared/types";
import { getTodos } from "../utils/todos";
import { H3Error } from "h3";

export default defineEventHandler(async (): Promise<Todo[]> => {
  const todos = await getTodos();

  if (todos instanceof H3Error) throw todos;
  return todos;
});
