import { H3Error } from "h3";
import { TagSchema, type Tag } from "~~/shared/types";

export default defineEventHandler(async (event): Promise<Tag> => {
  const newTag = await readValidatedBody<Tag>(event, (data) => {
    return TagSchema.parse(data) as Tag;
  });

  const tag = await Tags.updateOrAdd(newTag);
  if (tag instanceof H3Error) throw tag;

  TagEventStream.sendUpdate();
  return tag;
});
