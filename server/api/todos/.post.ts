import { H3Error } from "h3";
import { TodoSchema, type Todo } from "~~/shared/types";

export default defineEventHandler(async (event): Promise<Todo> => {
  const newTodo = await readValidatedBody<Todo>(event, (data) => {
    return TodoSchema.parse(data) as Todo;
  });

  const todo = await updateOrAddTodo(newTodo);
  if (todo instanceof H3Error) throw todo;

  sendTodoUpdate();
  return todo;
});
