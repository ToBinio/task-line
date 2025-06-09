import { H3Error } from "h3";
import z from "zod";
import { Todo } from "~~/shared/types";

export const Body = z.object({
  data: Todo,
  previousId: z.string().uuid().optional(),
});

export default defineAuthenticatedEventHandler(
  async (event, token): Promise<Todo> => {
    const body = await readValidatedBody(event, (data) => {
      return Body.parse(data);
    });

    const todo = await Todos.updateOrAdd(token.sub, body.data, body.previousId);
    if (todo instanceof H3Error) throw todo;

    TodoEventStream.sendUpdate(token.sub);
    return todo;
  },
);
