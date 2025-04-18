import { H3Error } from "h3";
import { sendTodoUpdate } from "~~/server/utils/sse/todosSee";
import { moveTodo } from "~~/server/utils/todos";
import type { UUID } from "~~/shared/types";

export type moveTodoBody = {
  toMove: UUID;
  to: UUID;
};

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody<moveTodoBody>(event, (data) => {
    const body = data as moveTodoBody;
    if (!body.toMove || !body.to)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Invalid MoveTodoBody",
      });
  });

  const todo = await moveTodo(body.toMove, body.to);
  if (todo instanceof H3Error) throw todo;

  sendTodoUpdate();
});
