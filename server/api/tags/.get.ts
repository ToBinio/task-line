import type { Tag } from "~~/shared/types";
import { H3Error } from "h3";
import { getTags } from "~~/server/utils/tags";

export default defineEventHandler(async (): Promise<Tag[]> => {
  const tags = await getTags();

  if (tags instanceof H3Error) throw tags;
  return tags;
});
