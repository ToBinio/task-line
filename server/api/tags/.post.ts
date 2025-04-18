import { H3Error } from "h3";
import { updateOrAddTag } from "~~/server/utils/tags";
import type { Tag } from "~~/shared/types";

export default defineEventHandler(async (event): Promise<Tag> => {
  const newTag = await readValidatedBody<Tag>(event, (data) => {
    const tag = data as Tag;
    if (!tag.uuid || !tag.color || !tag.name)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Invalid tag",
      });
  });

  const tag = await updateOrAddTag(newTag);
  if (tag instanceof H3Error) throw tag;

  sendTagsUpdate();
  return tag;
});
