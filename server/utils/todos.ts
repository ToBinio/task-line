import { H3Error } from "h3";
import type { Todo, UUID } from "~~/shared/types";

export const TODOS_KEY = "todos";

export async function getTodos(): Promise<Todo[] | H3Error> {
  const storage = useStorage();
  const todos = await storage.get<Todo[]>(TODOS_KEY);

  if (!todos)
    return createError({
      status: 500,
      statusMessage: "Internal Server Error",
      message: `no todos found`,
    });

  return todos;
}

export async function moveTodo(
  toMove: UUID,
  to: UUID,
): Promise<undefined | H3Error> {
  const storage = useStorage();
  const todos = await getTodos();

  if (todos instanceof H3Error) return todos;

  const targetIndex = todos.findIndex((todo) => todo.uuid == to);
  const movedIndex = todos.findIndex((todo) => todo.uuid == toMove);

  if (targetIndex === -1 || movedIndex === -1)
    return createError({
      status: 404,
      statusMessage: "Not Found",
      message: `todo not found`,
    });

  const moved = todos.splice(movedIndex, 1)[0]!;
  todos.splice(targetIndex, 0, moved);

  await storage.set(TODOS_KEY, todos);
}

export async function updateOrAddTodo(todo: Todo): Promise<Todo | H3Error> {
  const storage = useStorage();
  const todos = await getTodos();

  if (todos instanceof H3Error) return todos;

  const index = todos.findIndex((value) => value.uuid === todo.uuid);

  if (index === -1) {
    todos.push(todo);
  } else {
    todos[index] = todo;
  }

  await storage.set(TODOS_KEY, todos);

  return todo;
}

export async function deleteTodo(uuid: UUID): Promise<Todo | H3Error> {
  const storage = useStorage();
  const todos = await getTodos();

  if (todos instanceof H3Error) return todos;

  const index = todos.findIndex((value) => value.uuid === uuid);
  if (index == -1)
    return createError({
      status: 404,
      statusMessage: "Not Found",
      message: `Todo with with uuid ${uuid} not found`,
    });

  const todo = todos.splice(index, 1)[0]!;
  await storage.set(TODOS_KEY, todos);

  return todo;
}
