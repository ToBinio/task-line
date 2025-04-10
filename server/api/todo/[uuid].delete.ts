import { H3Error } from "h3";
import { deleteTodo } from "~~/server/utils/todos";
import type { Todo, UUID } from "~~/shared/types";

export default defineEventHandler(async (event): Promise<Todo> => {
  const uuid: UUID | undefined = getRouterParam(event, "uuid");

  if (!uuid)
    throw createError({
      status: 400,
      statusMessage: "Bad Request",
      message: `no uuid set - uuid:'${uuid}'`,
    });

  const todo = await deleteTodo(uuid);

  if (todo instanceof H3Error) throw todo;
  return todo;
});
