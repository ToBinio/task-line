import { H3Error } from "h3";
import { TodoSchema, type Todo } from "~~/shared/types";

export default defineEventHandler(async (event): Promise<Todo> => {
  const newTodo = await readValidatedBody<Todo>(event, (data) => {
    return TodoSchema.parse(data) as Todo;
  });

  const token = Auth.getOrThrow(event);

  const todo = await Todos.updateOrAdd(token.sub, newTodo);
  if (todo instanceof H3Error) throw todo;

  TodoEventStream.sendUpdate(token.sub);
  return todo;
});
