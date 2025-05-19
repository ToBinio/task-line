import { H3Error } from "h3";
import { TagSchema, type Tag } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
  async (event, token): Promise<Tag> => {
    const newTag = await readValidatedBody<Tag>(event, (data) => {
      return TagSchema.parse(data) as Tag;
    });

    const tag = await Tags.updateOrAdd(token.sub, newTag);
    if (tag instanceof H3Error) throw tag;

    TagEventStream.sendUpdate(token.sub);
    return tag;
  },
);
