import type { Tag } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
  async (event, token): Promise<Tag[]> => {
    return await Tags.getAll(token.sub);
  },
);
