import { H3Error } from "h3";
import { updateOrAddTag } from "~~/server/utils/tags";
import { TagSchema, type Tag } from "~~/shared/types";

export default defineEventHandler(async (event): Promise<Tag> => {
  const newTag = await readValidatedBody<Tag>(event, (data) => {
    return TagSchema.parse(data) as Tag;
  });

  const tag = await updateOrAddTag(newTag);
  if (tag instanceof H3Error) throw tag;

  sendTagsUpdate();
  return tag;
});
