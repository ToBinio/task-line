import { H3Error } from "h3";
import type { UUID } from "~~/shared/types";

export type moveTodoBody = {
  toMove: UUID;
  to: UUID;
};

export default defineAuthenticatedEventHandler(async (event, token) => {
  const body = await readValidatedBody<moveTodoBody>(event, (data) => {
    const body = data as moveTodoBody;
    if (!body.toMove || !body.to)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Invalid MoveTodoBody",
      });
  });

  const todo = await Todos.move(token.sub, body.toMove, body.to);
  if (todo instanceof H3Error) throw todo;

  TodoEventStream.sendUpdate(token.sub);
});
