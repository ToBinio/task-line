import type { H3Error } from "h3";
import type { Todo, UUID } from "~~/shared/types";

function getKey(userId: string): string {
  return `todos:${userId}`;
}

export const Todos = {
  async getAll(userId: string): Promise<Todo[]> {
    const storage = useStorage();
    return (
      (await storage.get<Todo[]>(getKey(userId))) ??
      (import.meta.dev ? getTestTodos(10) : [])
    );
  },

  async move(
    userId: string,
    toMove: UUID,
    to: UUID,
  ): Promise<undefined | H3Error> {
    const storage = useStorage();
    const todos = await Todos.getAll(userId);

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

    await storage.set(getKey(userId), todos);
  },

  async updateOrAdd(
    userId: string,
    todo: Todo,
    previous?: UUID,
  ): Promise<Todo | H3Error> {
    const storage = useStorage();
    const todos = await Todos.getAll(userId);

    const index = todos.findIndex((value) => value.uuid === todo.uuid);
    const previousIndex = previous
      ? todos.findIndex((value) => value.uuid === previous)
      : undefined;

    if (index === -1) {
      if (previousIndex !== undefined) {
        todos.splice(previousIndex + 1, 0, todo);
      } else {
        todos.push(todo);
      }
    } else {
      todos[index] = todo;
    }

    await storage.set(getKey(userId), todos);

    return todo;
  },

  async delete(userId: string, uuid: UUID): Promise<Todo | H3Error> {
    const storage = useStorage();
    const todos = await Todos.getAll(userId);

    const index = todos.findIndex((value) => value.uuid === uuid);
    if (index == -1)
      return createError({
        status: 404,
        statusMessage: "Not Found",
        message: `Todo with with uuid ${uuid} not found`,
      });

    const todo = todos.splice(index, 1)[0]!;
    await storage.set(getKey(userId), todos);

    return todo;
  },
};
