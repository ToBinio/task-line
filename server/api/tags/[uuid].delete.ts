import { H3Error } from "h3";
import { deleteTag } from "~~/server/utils/tags";
import type { Tag, UUID } from "~~/shared/types";

export default defineEventHandler(async (event): Promise<Tag> => {
  const uuid: UUID | undefined = getRouterParam(event, "uuid");

  if (!uuid)
    throw createError({
      status: 400,
      statusMessage: "Bad Request",
      message: `no uuid set - uuid:'${uuid}'`,
    });

  const tag = await deleteTag(uuid);
  if (tag instanceof H3Error) throw tag;

  sendTagsUpdate();
  return tag;
});
