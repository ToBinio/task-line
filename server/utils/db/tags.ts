import { H3Error } from "h3";
import type { Tag, UUID } from "~~/shared/types";

export const TAGS_KEY = "tags";

export const Tags = {
  KEY: "tags",
  async getAll(): Promise<Tag[] | H3Error> {
    const storage = useStorage();
    const tags = await storage.get<Tag[]>(TAGS_KEY);

    if (!tags)
      return createError({
        status: 500,
        statusMessage: "Internal Server Error",
        message: `no tags found`,
      });

    return tags;
  },
  async updateOrAdd(tag: Tag): Promise<Tag | H3Error> {
    const storage = useStorage();
    const tags = await Tags.getAll();

    if (tags instanceof H3Error) return tags;

    const index = tags.findIndex((value) => value.uuid === tag.uuid);

    if (index === -1) {
      tags.unshift(tag);
    } else {
      tags[index] = tag;
    }

    await storage.set(TAGS_KEY, tags);

    return tag;
  },
  async delete(uuid: UUID): Promise<Tag | H3Error> {
    const storage = useStorage();
    const tags = await Tags.getAll();

    if (tags instanceof H3Error) return tags;

    const index = tags.findIndex((value) => value.uuid === uuid);
    if (index == -1)
      return createError({
        status: 404,
        statusMessage: "Not Found",
        message: `Tag with with uuid ${uuid} not found`,
      });

    const todo = tags.splice(index, 1)[0]!;
    await storage.set(TAGS_KEY, tags);

    return todo;
  },
};
