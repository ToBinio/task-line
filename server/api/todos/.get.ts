import type { Todo } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
  async (event, token): Promise<Todo[]> => {
    return await Todos.getAll(token.sub);
  },
);
