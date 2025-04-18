import { H3Error } from "h3";
import { sendTodoUpdate } from "~~/server/utils/sse/todosSee";
import type { Todo } from "~~/shared/types";

export default defineEventHandler(async (event): Promise<Todo> => {
  const newTodo = await readValidatedBody<Todo>(event, (data) => {
    const todo = data as Todo;
    if (!todo.uuid || !todo.title || !todo.tags)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Invalid todo",
      });
  });

  const todo = await updateOrAddTodo(newTodo);
  if (todo instanceof H3Error) throw todo;

  sendTodoUpdate();
  return todo;
});
