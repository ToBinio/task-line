import { H3Error } from "h3";
import type { Todo, UUID } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
  async (event, token): Promise<Todo> => {
    const uuid: UUID | undefined = getRouterParam(event, "uuid");

    if (!uuid)
      throw createError({
        status: 400,
        statusMessage: "Bad Request",
        message: `no uuid set - uuid:'${uuid}'`,
      });

    const todo = await Todos.delete(token.sub, uuid);
    if (todo instanceof H3Error) throw todo;

    TodoEventStream.sendUpdate(token.sub);
    return todo;
  },
);
