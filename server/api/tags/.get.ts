import type { Tag } from "~~/shared/types";
import { H3Error } from "h3";

export default defineEventHandler(async (): Promise<Tag[]> => {
  const tags = await Tags.getAll();

  if (tags instanceof H3Error) throw tags;
  return tags;
});
