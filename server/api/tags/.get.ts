import type { Tag } from "~~/shared/types";

export default defineEventHandler(async (event): Promise<Tag[]> => {
  const token = Auth.getOrThrow(event);
  return await Tags.getAll(token.sub);
});
